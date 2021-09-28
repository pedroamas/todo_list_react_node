import React , {useState , useEffect, useRef} from "react";
import $ from 'jquery';
import { Button , Form , InputGroup , FormControl , Row , Col} from 'react-bootstrap';
import Flag  from '@material-ui/icons/Flag';
var minesweeper;
var height;
var width;
var mines;
var isNew;
var reminingBoxs;
var finished;
const dificulty = {easy: {height:10,width:10,mines:3} , medium: {height:15,width:15,mines:10} , hard: {height:20,width:30,mines:40}};


function MinesweeperGame(props) {
  isNew = props.start;
  const [height , setHeigth] = useState(props.height);
  const [width , setWidth] = useState(props.width);
  const [mines , setMines] = useState(props.mines);

  var heightRef=React.createRef();
  var minesRef=React.createRef();
  var widthRef=React.createRef();

  
  return (
    <>
    <div className="container  separe-margin">
            <div className="separe-margin">
                <h2 className="separe-margin">Minesweeper</h2>
                
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
                        <Button variant="primary" onClick={newGame3} >New Game</Button>
                    </Col>
                </Row>
                </Form.Group>
                </Form>
            </div>

        </div>
    {initialize()}
    </>
  );

function derecho(e , i , j) {
  e.preventDefault();
  if ($("#"+i+"-"+j).hasClass("hiddenBox")){
    if ($("#"+i+"-"+j).hasClass("flag")){
      $("#"+i+"-"+j).removeClass("flag");
    }else{
      $("#"+i+"-"+j).addClass("flag");
    }
  }

}

function initialize() {
  newGame();
  var retMinesweeper = 
      <> 
      <table>
        <tbody>
          {minesweeper.map(function(x , i) {
          return  <tr key={i}>{(x.map( function (y , j) {
            return <td key={j} 
                      className="box hiddenBox"
                      id={i+"-"+j}
                      onContextMenu={(e)=>derecho(e,i , j)}
                      onClick={()=>{
                        selectedBox(i,j)}                      
                      }>{y}</td> 
          }))}
          </tr>
          ;
        })}
      </tbody>
      </table>
      </>;
    return retMinesweeper; 
}

function newGame3() {
  finished=false;
  newGame();
  resetGame();
  isNew=true;
  setHeigth(heightRef.current.value);
  setWidth(widthRef.current.value);
  setMines(minesRef.current.value);
}
function resetGame() {
  for (let i=0 ; i<height ; i++){
    for (let j=0 ; j<width ; j++){
      $("#"+i+"-"+j).addClass("hiddenBox");
    }
  }
}
function selectedBox( i , j ) {
  if(finished){
    return;
  }
  if ($("#"+i+"-"+j).hasClass("flag")) {
    return;
  }
  if(isNew){
    isNew=false;
    ponerMinas(mines , i , j);
    completeNumbers();
    selectedBox( i , j );
  }
  else {
    if ($("#"+i+"-"+j).hasClass("hiddenBox")){
      reminingBoxs--;
      //Hay bomba
      if(minesweeper[i][j] == "-1") {
        $("#"+i+"-"+j).addClass("bomb");
        finish(false);
        return;
      }

      $("#"+i+"-"+j).text(minesweeper[i][j]);
      $("#"+i+"-"+j).removeClass("hiddenBox");
      if(minesweeper[i][j] == "") {
        if(0<=i-1) selectedBox(i-1 , j);
        if(0<=i-1 && 0<=j-1) selectedBox(i-1 , j-1);
        if(0<=i-1 && j+1<width) selectedBox(i-1 , j+1);
        if(i+1<height) selectedBox(i+1 , j);
        if(i+1<height && 0<=j-1) selectedBox(i+1 , j-1);
        if(i+1<height && j+1<width) selectedBox(i+1 , j+1);
        if(0<=j-1) selectedBox(i , j-1);
        if(j+1<width) selectedBox(i , j+1);
        
      }
      if(reminingBoxs == mines) {
        finish(true);
      }
    }
  }
  
}

function finish(win) {
  finished=true;
  if(win){
    
    alert("You win!");
  }
  else{
    alert("Game over!");
  }
}
function newGame() {
  reminingBoxs = height * width;
  finished=false;
  minesweeper = new Array(height);
  for (var i=0 ; i<height ; i++) {
    minesweeper[i] = new Array(width);
    for (var j=0 ; j<width ; j++) {
      minesweeper[i][j] = "";
    }
  }
}

function ponerMinas( minas , iSelected = -1 , jSelected = -1){
  var i=0;
  while( i<minas) {
    var mine_i = Math.floor(Math.random()*height);
    var mine_j = Math.floor(Math.random()*width);
    if ((iSelected!=mine_i && jSelected!=mine_j) && (minesweeper[mine_i][mine_j] != -1)) {
      minesweeper[mine_i][mine_j] = -1
      i++;
    }
    
  }
  
}
function completeNumbers () {
  for (var i=0 ; i<height ; i++) {
    for (var j=0 ; j<width ; j++) {
      minesweeper[i][j] = minesAround(i,j);
    }
  }
}
function minesAround( i , j) {
  var totalMines = 0;
  var viewi, viewj;
  if (minesweeper[i][j]) return -1;
  viewi = i-1;
  viewj = j-1;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i+1;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  
  viewi = i-1;
  viewj = j;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i+1;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  
  viewi = i-1;
  viewj = j+1;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  viewi = i+1;
  if ( 0<=viewi && viewi<height && 0<=viewj && viewj<width && minesweeper[viewi][viewj]==-1) totalMines++;
  
  if(totalMines==0) return "";
  return totalMines;
}

function print() {

  for (var i=0 ; i<height ; i++) {
    for (var j=0 ; j<width ; j++) {
      console.log(minesweeper[i][j]);
    }
    
  }
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
export default MinesweeperGame;