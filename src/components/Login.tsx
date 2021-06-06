import React, { useEffect, useState } from "react";
import { useLoginMutation, useForgotPasswordMutation, useChangePasswordMutation } from "../generated/graphql";
import "./form.css";
const initialFormData: { email: string; password: string; token: string } = { email: "", password: "", token: "" };
export default function Login(props: any) {
    const [formdata, setformdata] = useState(initialFormData);
    const [forgot, setforgot] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [forgotPassword, { error: errorForgot, data: forgotData }] = useForgotPasswordMutation({ errorPolicy: "all" });
    const [changepass, { error: errorChange, data: changeData }] = useChangePasswordMutation({ errorPolicy: "all" });
    const [login, { loading, error, data }] = useLoginMutation({ errorPolicy: "all" });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!forgot) {
            login({ variables: { email: formdata.email, password: formdata.password } });
        } else if (forgot && !changePassword) {
            forgotPassword({ variables: { email: formdata.email } });
        } else {
            changepass({ variables: { token: formdata.token, password: formdata.password } });
        }
    };
    useEffect(() => {
        if (changeData) {
            setChangePassword(false);
            setforgot(false);
        }
        if (errorChange) {
            alert(errorChange.message);
        }
    }, [changeData, errorChange]);
    useEffect(() => {
        if (forgotData) {
            setChangePassword(true);
        }
        if (errorForgot) {
            alert(errorForgot.message);
            return;
        }
    }, [errorForgot, forgotData]);
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
                    <h1>{forgot ? "Forgot Password" : "Login"}</h1>
                    <form action="" onSubmit={handleSubmit} className="form--container">
                        {!changePassword && (
                            <div className="form__field">
                                <label htmlFor="email">Email</label>
                                <input value={formdata.email} onChange={handleChange("email")} autoComplete="off" type="email" name="email" id="email" />
                            </div>
                        )}
                        {changePassword && (
                            <div className="form__field">
                                <label htmlFor="emaitokenl">Enter Token</label>
                                <input value={formdata.token} onChange={handleChange("token")} autoComplete="off" type="text" name="token" id="token" />
                            </div>
                        )}
                        {(!forgot || changePassword) && (
                            <div className="form__field">
                                <label htmlFor="password">{changePassword ? "New Password" : "Password"}</label>
                                <input value={formdata.password} onChange={handleChange("password")} type="password" name="password" id="password" />
                            </div>
                        )}
                        <button type="submit">{!forgot ? "Login" : changePassword ? "Change Password" : "Send Email"}</button>
                    </form>
                    <button
                        onClick={() => {
                            setforgot(!forgot);
                            setChangePassword(false);
                        }}
                        style={{ width: "30%" }}
                    >
                        {!forgot ? "Forgot Password" : "Login"}
                    </button>
                </div>
            )}
        </>
    );
}
