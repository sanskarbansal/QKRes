import React, { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

const emptyUser = { username: "", email: "", id: "" };

export default function Home() {
    const [islogin, setIslogin] = useState(true);
    const [user, setuser] = useState(emptyUser);
    const { loading, error, data } = useMeQuery();
    useEffect(() => {
        if (data && data.Me) {
            const { username, email, id } = data.Me;
            setuser({ username, email, id });
        }
    }, [data, error]);
    return (
        <>
            {user && user.id ? (
                <Dashboard user={user} resetUser={() => setuser(emptyUser)} />
            ) : (
                <div className="container">
                    <button style={{ margin: "0 auto" }} onClick={() => setIslogin(!islogin)}>
                        {!islogin ? "Login" : "Register"}
                    </button>
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            {islogin && <Login onLogin={setuser} />}
                            {!islogin && <Register />}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
