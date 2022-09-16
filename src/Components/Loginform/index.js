import { useState } from "react";
import "./Login.css";

function LoginForm({ Login }) {

    const [user, setUser] = useState({ username: "" });
    const [error, setError] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();

        if (user.username.trim() === "") {
            setError("Field cannot be left blank");
        } else if (user.username.toString().length < 4) {
            setError("Username must have 4 or more characters");
        } else {
            Login(user);
        };
        setUser({ username: "" });
    };


    return (
        <div className="login">

            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form className="login-form" onSubmit={submitHandle} >

                <h3>Login Here</h3>

                {(error === "") ? <div><br /></div> : <div >{error}</div>}

                <label for="username">Username</label>

                <input className="login-input"
                    type="text"
                    onChange={(e) => setUser({ username: e.target.value })}
                    value={user.username} />

                <button className="login-button" >Log In</button>

            </form>
        </div>
    )
}

export default LoginForm