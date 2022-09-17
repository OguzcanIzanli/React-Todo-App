import LoginForm from "./Login";
import Todo from "./Todo"
import { useState, useContext } from "react";
import ThemeContext from "./Context/ThemeContext";
import "./Container.css"

function Container() {

  const { theme, setTheme } = useContext(ThemeContext);

  const [user, setUser] = useState(localStorage.getItem("username")
    ? { username: localStorage.getItem("username") }
    : { username: "" });

  const Login = (details) => {
    setUser(details);
    localStorage.setItem("username", details.username)
  };

  const Logout = () => {
    setUser({ username: "" });
    localStorage.removeItem("username");
  };

  return (
    <div className={`App ${theme === "light" ? "" : "dark"}`}>

      <button
        className={`theme-button ${theme === "light" ? "" : "dark"}`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")} >Change Theme
      </button>

      {(user.username !== "") ? (
        <div>
          <div className="welcome">
            
            Welcome, {user.username}

            <br />

            <button
              className={`logout-button ${theme === "light" ? "" : "dark"}`}
              onClick={Logout}>Logout
            </button>

          </div>

          <Todo />

        </div>

      ) : (<LoginForm Login={Login} />)}
    </div>
  );
}

export default Container;
