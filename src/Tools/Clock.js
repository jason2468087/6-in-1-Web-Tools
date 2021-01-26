import React,{Component} from "react";
import ReactDOM from 'react-dom';
import './Clock.css';

/*class Stopwatch extends Component{
    state={}
    render(){
        return(
            <div className="App">
                <h1>Current Time</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}</h2>
                
            </div>
        );
    }
}*/

class Clock extends Component {
    constructor(props) {

        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }

    render() {
        return (
            <div>
                <h1 className="digitalClock">{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

ReactDOM.render(<Clock/>,document.getElementById("root"));

export default Clock;