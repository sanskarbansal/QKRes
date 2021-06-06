import React, { useState, useEffect } from "react";
// import { REGISTER_USER } from "../graphql/mutations";
// import { useMutation } from "@apollo/client";
import { useRegisterMutation, useConfirmEamilMutation } from "../generated/graphql";
import "./form.css";
const initialFormData: { email: string; username: string; password: string; token: string } = { email: "", username: "", password: "", token: "" };
export default function Register(props: any) {
    const [formdata, setformdata] = useState(initialFormData);
    const [isConfirmMail, setisConfirmMail] = useState(false);
    const [register, { loading, error, data }] = useRegisterMutation({ errorPolicy: "all" });
    const [confirmEmail, { error: confirmError, data: confirmData }] = useConfirmEamilMutation();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isConfirmMail) {
            confirmEmail({ variables: { token: formdata.token } });
        } else {
            register({ variables: { email: formdata.email, password: formdata.password, username: formdata.username } });
            if (error) {
                alert(error.message);
                setformdata(initialFormData);
            }
        }
    };
    useEffect(() => {
        if (confirmError) {
            alert(confirmError.message);
        }
        if (confirmData && confirmData.confirmEamil) {
            alert("Email Confirmed! You may login now.");
            setisConfirmMail(false);
            props.toLogin(true);
        }
    }, [confirmError, confirmData, props]);

    useEffect(() => {
        if (error) {
            alert(error.message);
            setformdata(initialFormData);
        }
        if (data && data.register) {
            console.log(data.register);
            setformdata(initialFormData);
            setisConfirmMail(true);
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
                <>
                    {isConfirmMail ? (
                        <div className="container">
                            <h1>Confirm Email</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form__field">
                                    <label htmlFor="token">Token</label>
                                    <input value={formdata.token} onChange={handleChange("token")} autoComplete="off" type="text" name="token" id="token" />
                                </div>
                                <button type="submit">Confirm</button>
                            </form>
                        </div>
                    ) : (
                        <div className="container">
                            <h1>Register</h1>
                            <form action="" onSubmit={handleSubmit} className="form--container">
                                <div className="form__field">
                                    <label htmlFor="email">Username</label>
                                    <input
                                        value={formdata.username}
                                        onChange={handleChange("username")}
                                        autoComplete="off"
                                        type="text"
                                        name="username"
                                        id="username"
                                    />
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
            )}
        </>
    );
}
