import React,{useState} from 'react';
import Calculator from './Tools/Calculator'
import Clock from './Tools/Clock'
import Stopwatch from './Tools/Stopwatch'
import Weather from './Tools/Weather'
import TodoList from './Tools/TodoList'
import Paint from './Tools/Paint'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container,Row,Col }from 'react-bootstrap';
import calculator_icon from './img/calculator_icon.png'
import stopwatch_icon from './img/stopwatch_icon.png'
import clock_icon from './img/clock_icon.png'
import weather_icon from './img/weather_icon.png'
import todo_icon from './img/todo_icon.png'
import paint_icon from './img/paint_icon.png'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [tool,setTool] = useState("Tools");

  const changeState = (toolName) => {
    console.log(tool);
    setTool(toolName);
}

  return (
    <div className="App">
      <Container fluid className="vh-100"  style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row  noGutters={true}>
          <Col lg={3}>
            <div className="indexPanel">
              <h1 className="toolHeader">{tool}</h1>
              <p className="indexMessage">Select your tool from below</p>
              <div className="toolGrid">
                <a href="calculator"><img  src={calculator_icon} className="toolIcon"/></a>
                <a href="clock"><img src={clock_icon} className="toolIcon" /></a>
                <a href="stopwatch"><img src={stopwatch_icon} className="toolIcon"/></a>
                <a href="weather"><img src={weather_icon}  className="toolIcon"/></a>
                <a href="todolist"><img src={todo_icon} className="toolIcon"/></a>
                <a href="paint"><img src={paint_icon}  className="toolIcon"/></a>
              </div>
            </div>
          </Col>
          <Col lg={9}>
            <div className="toolPanel">
              <Router>
                <Switch>
                  <Route path="/calculator" exact component={Calculator}/>
                  <Route path="/clock" exact component={Clock}/>
                  <Route path="/stopwatch" exact component={Stopwatch}/>
                  <Route path="/weather" exact component={Weather}/>
                  <Route path="/todolist" exact component={TodoList}/>
                  <Route path="/paint" exact component={Paint}/>
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
