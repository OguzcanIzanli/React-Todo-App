import LoginForm from "./Components/Forms/Loginform/index.js";
import Todo from "./Components/Forms/Todo/index.js"
import { useState } from "react";


function App() {

  const [user, setUser] = useState(localStorage.getItem("username") ? { username: localStorage.getItem("username") } : { username: "" });

  const Login = (details) => {
    setUser(details);
    localStorage.setItem("username", details.username)
  };

  const Logout = () => {
    setUser({ username: "" });
    localStorage.removeItem("username");
  };

  return (
    <>

      {(user.username !== "") ? (
        <div>
          <div>
            Welcome, {user.username}
            <br />
            <button onClick={Logout}>Logout</button>
          </div>
          <Todo />
        </div>
      ) : (<LoginForm Login={Login} />)}

    </>
  );
}

export default App;
