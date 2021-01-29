import React,{Component} from "react";
import ReactDOM from 'react-dom';
import './Stopwatch.css';

class Stopwatch extends Component {
    constructor(props) {

        super(props);
        this.state = {
            now: (new Date()).getTime(),
            time: "0000000"
        };

        this.startTimer = this.startTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resumeTimer = this.resumeTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.save = 0;
        this.start = 0;
        this.mode = 0; 
    }

    componentDidMount() {
        this.timerID = null;
    }
        
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({now: (new Date()).getTime(), time:"000000"+(this.state.now-this.start+this.save).toString()});
        if (this.mode == 1)
        {
            
        }
    }

    startTimer(){
        this.mode = 1;
        this.start = (new Date()).getTime();
        this.timerID = setInterval(() => this.tick(),1);
    }

    pauseTimer(){
        this.mode = 2;
        this.save = this.state.now-this.start+this.save;
        this.setState({now: (new Date()).getTime(), time:this.state.time});
        clearInterval(this.timerID);
    }

    resumeTimer(){
        this.mode = 1;
        this.start = (new Date()).getTime();
        this.timerID = setInterval(() => this.tick(),1);
    }

    resetTimer(){
        this.mode = 0;
        this.start = 0;
        this.save = 0;
        this.setState({now: (new Date()).getTime(), time: "0000000"});
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1 className="timer">{
                    this.state.time.substring(this.state.time.length-7, this.state.time.length-5)
                    +":"+this.state.time.substring(this.state.time.length-5, this.state.time.length-3)
                    +"."+this.state.time.substring(this.state.time.length-3, this.state.time.length-1)}
                </h1>
                <br/>
                <br/>
                <br/>
                <div className={this.mode == 0 ? "buttonContainer":"hideContainer"}>
                    <h2 onClick={this.startTimer} className="startButton">Start</h2>
                </div>
                <div className={this.mode == 1 ? "buttonContainer":"hideContainer"}>
                    <h2 onClick={this.pauseTimer} className="pauseButton">Pause</h2>
                </div>
                <div className={this.mode == 2 ? "buttonContainer":"hideContainer"}>
                    <h2 onClick={this.resumeTimer} className="resumeButton">Resume</h2>
                    <h2 onClick={this.resetTimer} className="resetButton">Reset</h2>
                </div>
            </div>
        );
        if (this.state.mode == 0)
        {
            
        }
        /*else if (this.state.mode == 1)
        {
            return (
                <div>
                    <h1 className="timer">{
                        this.state.time.substring(this.state.time.length-7, this.state.time.length-5)
                        +":"+this.state.time.substring(this.state.time.length-5, this.state.time.length-3)
                        +"."+this.state.time.substring(this.state.time.length-3, this.state.time.length-1)}
                    </h1>
                    <br/>
                    <br/>
                    <br/>
                    <div class="buttonContainer">
                        <h2 onClick={this.pauseTimer} className="pauseButton">Pause</h2>
                    </div>
                </div>
            );
        }
        else if (this.state.mode == 2)
        {
            return (
                <div>
                    <h1 className="timer">{
                        this.state.time.substring(this.state.time.length-7, this.state.time.length-5)
                        +":"+this.state.time.substring(this.state.time.length-5, this.state.time.length-3)
                        +"."+this.state.time.substring(this.state.time.length-3, this.state.time.length-1)}
                    </h1>
                    <br/>
                    <br/>
                    <br/>
                    <div class="buttonContainer">
                        <h2 onClick={this.startTimer} className="pauseButton">Resume</h2>
                        <h2 onClick={this.startTimer} className="pauseButton">Reset</h2>
                    </div>
                </div>
            );
        }*/
    }
}/*this.state.time.substring(0, 2)+":"+this.state.time.substring(2, 4)+"."+this.state.time.substring(4, 6) */

ReactDOM.render(<Stopwatch/>,document.getElementById("root"));

export default Stopwatch;