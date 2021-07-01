import React from 'react';
import { Link } from "react-router-dom";

function About(props) {
    return (
        <>
        <div className="container  separe-margin">
            <div className="separe-margin">
                <h2 className="separe-margin">About</h2>
                <p className="separe-margin">This sample application was designed with ReactJS and NodeJS technologies</p>
                <p>In detail, I built the frontend using Bootstrap, Babel, Material Design's icons, Axios (API's calls) and React framework.
                    To develop the backend, I've used Express and Mongodb in NodeJS.
                </p>
                <p><a target="_blank" href="https://github.com/pedroamas/todo_list_react_node">Source code in GitHub</a></p>
            </div>

        </div>
        
        </>
    )
}

export default About;