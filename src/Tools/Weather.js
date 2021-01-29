import React,{Component} from "react";
import ReactDOM from 'react-dom';
import './Weather.css';
import feels_icon from "../img/feels_icon.png"
import wind_icon from "../img/wind_icon.png"
import humidity_icon from "../img/humidity_icon.png"
import pressure_icon from "../img/pressure_icon2.png"
import visibility_icon from "../img/visibility_icon.png"
import cloud_icon from "../img/cloud_icon.png"

class Weather extends Component {
    constructor(props) {

        super(props);
        this.state = {weather: ""};

        this.city = 1819729;
        this.key = "5d8c8408f8c2572b75f4964b4902866c";
        this.req = `https://api.openweathermap.org/data/2.5/weather?id=${this.city}&appid=${this.key}`;

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather = async () => {
        console.log("yey");
        const response = await fetch(this.req);
        const data = await response.json();
    
        console.log(data);
        this.setState({
            temp: parseInt((data.main.temp-272)),
            temp_max: parseInt((data.main.temp_max-272)),
            temp_min: parseInt((data.main.temp_min-272)),
            feels_like: parseInt((data.main.feels_like-272)),
            wind: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility,
            cloud: data.clouds.all
        });
    };

    componentDidMount() {
        this.getWeather();

        this.timerID = setInterval(
            () => this.tick(),
            600000
        );
    }
    
    componentWillUnmount() {
            clearInterval(this.timerID);
    }
    
    tick() {
        this.getWeather();
    }

    render() {
        return (
            <div>
                <h1 className="city">Hong Kong</h1>
                <div>
                    <table>
                        <tr>
                            <td className="temp" rowspan="2">{this.state.temp}°C</td>
                            <td className="temp_max">{this.state.temp_max}°C</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="temp_max">{this.state.temp_min}°C</td>
                        </tr>
                    </table>

                    <table className="weatherTable">
                        <tr>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={feels_icon}/>
                                    <p className="weatherType">Feels</p>
                                    <p className="weatherData">{this.state.feels_like}°C</p>
                                </div>
                            </td>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={wind_icon}/>
                                    <p className="weatherType">Wind</p>
                                    <p className="weatherData">{this.state.wind}km/h</p>
                                </div>

                            </td>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={humidity_icon}/>
                                    <p className="weatherType">Humidity</p>
                                    <p className="weatherData">{this.state.humidity}%</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={pressure_icon}/>
                                    <p className="weatherType">Pressure</p>
                                    <p className="weatherData">{this.state.pressure}Pa</p>
                                </div>
                            </td>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={visibility_icon}/>
                                    <p className="weatherType">Visibility</p>
                                    <p className="weatherData">{this.state.visibility/1000}km</p>
                                </div>
                            </td>
                            <td>
                                <div className="weatherCell">
                                    <img className="weatherIcon" src={cloud_icon}/>
                                    <p className="weatherType">Cloud</p>
                                    <p className="weatherData">{this.state.cloud}%</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                
            </div>
        );
    }
}

ReactDOM.render(<Weather/>,document.getElementById("root"));

export default Weather;