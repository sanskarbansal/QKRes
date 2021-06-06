import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import "./form.css";
const initialFormData: { email: string; password: string } = { email: "", password: "" };
export default function Login(props: any) {
    const [formdata, setformdata] = useState(initialFormData);
    const [login, { loading, error, data }] = useLoginMutation({ errorPolicy: "all" });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        login({ variables: { email: formdata.email, password: formdata.password } });
    };
    useEffect(() => {
        if (error) {
            alert(error.message);
            setformdata(initialFormData);
        }
        if (data && data.login) {
            console.log(data.login);

            setformdata(initialFormData);
            props.onLogin(data.login);
        }
    }, [error, data, props]);
    const handleChange = (key: any) => {
        return (event: any) => {
            setformdata({
                ...formdata,
                [key]: event.target.value,
            });
        };
    };
    return (
        <>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <div className="container">
                    <h1>Login</h1>
                    <form action="" onSubmit={handleSubmit} className="form--container">
                        <div className="form__field">
                            <label htmlFor="email">Email</label>
                            <input value={formdata.email} onChange={handleChange("email")} autoComplete="off" type="email" name="email" id="email" />
                        </div>
                        <div className="form__field">
                            <label htmlFor="password">Password</label>
                            <input value={formdata.password} onChange={handleChange("password")} type="password" name="password" id="password" />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </>
    );
}
