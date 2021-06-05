import React, { useState } from "react";
import { LOGIN_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import "./form.css";
const initialFormData: { email: string; password: string } = { email: "", password: "" };
export default function Login(props: any) {
    const [formdata, setformdata] = useState(initialFormData);
    const [login, { loading, error, data }] = useMutation(LOGIN_USER, { errorPolicy: "ignore" });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await login({ variables: { email: formdata.email, password: formdata.password } });
        if (error) {
            alert(error.message);
            setformdata({ email: "", password: "" });
        }
        if (data) {
            console.log(data);
        }
    };
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
