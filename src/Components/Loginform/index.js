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
        <form className="Login" onSubmit={submitHandle} >

            <div className="Form" >

                <h2>Login</h2>

                {(error === "") ? <div><br /></div> : <div className="error" >{error}</div>}

                <div className="form-inner" >

                    <label htmlFor='userName'>Username: </label>
                    <input type="text" onChange={(e) => setUser({ username: e.target.value })} value={user.username} />
                    <br />
                    <button>LOGIN</button>

                </div>
            </div>

        </form>
    )
}

export default LoginForm