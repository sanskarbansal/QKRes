import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME } from "../graphql/queries";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
    const [islogin, setIslogin] = useState(true);
    const { loading, error, data } = useQuery(ME);
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log("logged in");
        }
    }, [data, error]);
    return (
        <div className="container">
            <button style={{ margin: "0 auto" }} onClick={() => setIslogin(!islogin)}>
                {islogin ? "Login" : "Register"}
            </button>
            {islogin && <Login />}
            {!islogin && <Register />}
        </div>
    );
}
