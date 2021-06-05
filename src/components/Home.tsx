import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME } from "../graphql/queries";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
    const [islogin, setIslogin] = useState(true);
    const [user, setuser] = useState({ username: "", email: "", id: "" });
    const { loading, error, data } = useQuery(ME);
    useEffect(() => {
        if (data && data.Me) {
            const { username, email, id } = data.Me;
            setuser({ username, email, id });
        }
    }, [data, error]);
    return (
        <>
            {user && user.id ? (
                <Dashboard user={user} />
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
