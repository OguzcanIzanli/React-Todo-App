import {useContext} from "react";
import "./Loading.css";
import ThemeContext from "./Context/ThemeContext";

function Loading() {

    const {theme} = useContext(ThemeContext);

    return (
        <>
            <br />
            <div className="loading-screen">
                <div className="balls" >
                    <div className={`ball ball1 ${theme === "light" ? "" : "dark"}`} ></div>
                    <div className={`ball ball2 ${theme === "light" ? "" : "dark"}`}></div>
                    <div className={`ball ball3 ${theme === "light" ? "" : "dark"}`}></div>
                </div>
            </div>
        </>
    )
}

export default Loading