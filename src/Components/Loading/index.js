import React from "react";
import "./Loading.css";

function Loading() {
    return (
        <>
            <br />
            <div className="loading-screen">
                <div className="balls" >
                    <div className="ball ball1"></div>
                    <div className="ball ball2"></div>
                    <div className="ball ball3"></div>
                </div>
            </div>
        </>
    )
}

export default Loading