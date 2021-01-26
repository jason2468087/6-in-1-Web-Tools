import React,{useState} from 'react';
import Calculator from './Tools/Calculator'
import Clock from './Tools/Clock'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container,Row,Col }from 'react-bootstrap';
import calculator_icon from './img/calculator_icon.png'
import stopwatch_icon from './img/stopwatch_icon.png'
import clock_icon from './img/clock_icon.png'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [isCalculator,setIsCalculator] = useState(false);
  const [isClock,setIsClock] = useState(false);

  const calculatorClicked = () => {
    clearStatus();
    setIsCalculator(true);
  }

  const clockClicked = () => {
    clearStatus();
    setIsClock(true);
  }

  const clearStatus = () => {
    setIsCalculator(false);
  }

  return (
    <div className="App">
      <Container fluid className="vh-100"  style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row fluid noGutters={true}>
          <Col sm={3}>
            <div className="indexPanel">
              <h1 className="toolHeader">Tool</h1>
              <p className="indexMessage">Select your tool from below</p>
              <div className="toolGrid">
                <a href="calculator"><img  src={calculator_icon} className="toolIcon" onClick={calculatorClicked}/></a>
                <a href="stopwatch"><img src={clock_icon} className="toolIcon" onClick={clockClicked}/></a>
                <img className="toolIcon" src={stopwatch_icon}/>
                <img className="toolIcon" src={calculator_icon}/>
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <div className="toolPanel">
              <Router>
                <Switch>
                  <Route path="/calculator" exact component={Calculator}/>
                  <Route path="/stopwatch" exact component={Clock}/>
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
