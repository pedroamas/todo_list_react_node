import React from 'react';
import {Row , Col , Image} from 'react-bootstrap';

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
                <Row className="centered">
                    <Col xs={6} md={6} >
                        <Image className="image" src="images/mongo.png" fluid />
                    </Col>
                    
                    <Col xs={6} md={6}>
                        <Image className="image" src="images/node.png" fluid />
                    </Col>
                </Row>
                <Row className="centered">
                    <Col xs={6} md={6}>
                        <Image className="image" src="images/bootstrap.png" fluid />
                    </Col>
                    <Col xs={6} md={6}>
                        <Image className="image"  src="images/react.jpg" fluid />
                    </Col>
                </Row>
            </div>

        </div>
        
        </>
    )
}

export default About;