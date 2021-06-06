import React, { useState, useEffect } from "react";

import { useRegisterMutation } from "../generated/graphql";
import "./form.css";
const initialFormData: { email: string; username: string; password: string } = { email: "", username: "", password: "" };
export default function Register(props: any) {
    const [formdata, setformdata] = useState(initialFormData);
    const [register, { loading, error, data }] = useRegisterMutation({ errorPolicy: "all" });
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        register({ variables: { email: formdata.email, password: formdata.password, username: formdata.username } });
        if (error) {
            alert(error.message);
            setformdata(initialFormData);
        }
    };
    useEffect(() => {
        if (error) {
            alert(error.message);
            setformdata(initialFormData);
        }
        if (data && data.register) {
            console.log(data.register);

            setformdata(initialFormData);
            // props.onLogin(data.login);
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
                    <h1>Register</h1>
                    <form action="" onSubmit={handleSubmit} className="form--container">
                        <div className="form__field">
                            <label htmlFor="email">Username</label>
                            <input value={formdata.username} onChange={handleChange("username")} autoComplete="off" type="text" name="username" id="username" />
                        </div>
                        <div className="form__field">
                            <label htmlFor="email">Email</label>
                            <input value={formdata.email} onChange={handleChange("email")} autoComplete="off" type="email" name="email" id="email" />
                        </div>
                        <div className="form__field">
                            <label htmlFor="password">Password</label>
                            <input value={formdata.password} onChange={handleChange("password")} type="password" name="password" id="password" />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}
        </>
    );
}
