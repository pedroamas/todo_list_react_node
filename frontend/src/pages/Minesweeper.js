import React , {useState , useRef} from 'react';
import MinesweeperGame from '../components/MinesweeperGame';
import { Button , Form , InputGroup , FormControl , Row , Col} from 'react-bootstrap';

const dificulty = {easy: {height:10,width:10,mines:3} , medium: {height:15,width:15,mines:10} , hard: {height:20,width:30,mines:40}};

function Minesweeper(props) {
    const [mines , setMines] = useState(dificulty.medium.mines);
    const [height , setHeigth] = useState(dificulty.medium.width);
    const [width , setWidth] = useState(dificulty.medium.height);
    const [start , setStart] = useState(true);
    var heightRef=React.createRef();
    var minesRef=React.createRef();
    var widthRef=React.createRef();
    var minesweeperChild=React.createRef(null);

    var htmlmine =  <MinesweeperGame ref={minesweeperChild} height={height} width={width} mines={mines} start={start}/>;
    var ifmine;
    if (start){
        ifmine=htmlmine;
    }
    return (
        <>
        <div className="container  separe-margin">
            <div className="separe-margin">
                {/* <h2 className="separe-margin">Minesweeper</h2>
                <Form>
                
                <Form.Group className="mb-3">
                    
                <Row>
                    <Col>
                    <Form.Control
                        onChange={optionsControl}
                        defaultValue="medium"
                        as="select">
                        <option value="easy">Easy</option>
                        <option value="medium" >Medium</option>
                        <option value="hard">Hard</option>
                        <option value="custom">Custom</option>
                    </Form.Control>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Mines</InputGroup.Text>
                            <FormControl type="text" placeholder="Mines" ref={minesRef} defaultValue={dificulty.medium.mines}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Height</InputGroup.Text>
                            <FormControl id="height" placeholder="Height" ref={heightRef} defaultValue={dificulty.medium.height}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Width</InputGroup.Text>
                            <FormControl id="width" placeholder="Width" ref={widthRef} defaultValue={dificulty.medium.width}/>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={newGame}>New Game</Button>
                    </Col>
                </Row>
                </Form.Group>
                </Form> */}
                {ifmine}
            </div>

        </div>
        
        </>
    );

    function newGame(e) {
        setMines(minesRef.current.value);
        setHeigth(heightRef.current.value);
        setWidth(widthRef.current.value);
        setStart(true);
        /* if(start) {
            alert("Empezado");
        }else {
            alert("No empezado");
        } */
        console.log(minesweeperChild.current);
    }

    function optionsControl(e){
        var option = e.target.value;
        if(option=="easy"){
            heightRef.current.value=dificulty.easy.height;
            widthRef.current.value=dificulty.easy.width;
            minesRef.current.value=dificulty.easy.mines;
        }
        if(option=="medium"){
            heightRef.current.value=dificulty.medium.height;
            widthRef.current.value=dificulty.medium.width;
            minesRef.current.value=dificulty.medium.mines;
        }
        if(option=="hard"){
            heightRef.current.value=dificulty.hard.height;
            widthRef.current.value=dificulty.hard.width;
            minesRef.current.value=dificulty.hard.mines;
        }
        if(option=="custom"){
            heightRef.current.value="";
            widthRef.current.value="";
            minesRef.current.value="";
        }
    }
}

export default Minesweeper;