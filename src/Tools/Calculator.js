import React,{useState,useEffect} from "react";
import './Calculator.css';

function Calculator() {

    const [data,setData] = useState("0");
    const [isDecimal,setIsDecimal] = useState(false);
    const [isPos,setPositive] = useState(true);
    const [isAdd,setIsAdd] = useState(false);
    const [isMin,setIsMin] = useState(false);
    const [isMul,setIsMul] = useState(false);
    const [isDiv,setIsDiv] = useState(false);
    const [save,setSave] = useState(0.0);
    const [isNextDataStart, setIsNextDataStart] = useState(false);
    const [record1,setRecord1] = useState("");
    const [record2,setRecord2] = useState("");
    const [record3,setRecord3] = useState("");

    /* display operation function */
    const dataCat = digit => {
        if (!isNextDataStart && data.length <= 8)
        {
            if (data === "0"){
                setData(digit);
            }
            else{
                setData(data+digit);
            }
        }
        else if (isNextDataStart)
        {
            setIsNextDataStart(false);
            setData(digit);
        }
        reportStatus();
    }

    const clearData = () => {
        setData("0");
        setIsDecimal(false);
        setIsAdd(false);
        setIsMin(false);
        setIsMul(false);
        setIsDiv(false);
    }

    const delData = () => {
        if (data.length == 1){
            setData("0");
        }
        else{
            if (data.slice(-1) === ".")
            {
                setIsDecimal(false);
            }
            setData(data.substring(0,data.length-1));
        }
        reportStatus();
    }

    const addDot = () => {
        if (!isDecimal){
            setData(data+".");
            setIsDecimal(true);
        }
        reportStatus();
    }

    const switchSign = () => {
        if (data.substring(0,1) !== "-"){
            setData("-"+data);
        }
        else{
            setData(data.substring(1,data.length));
        }
        reportStatus();
    }

    const nextNum = () => {
        setIsNextDataStart(true);
        setIsDecimal(false);
        setIsAdd(false);
        setIsMin(false);
        setIsMul(false);
        setIsDiv(false);
    }

    const reportStatus = () => {
        console.log("data:",data
        ,"save:",save
        ,"isDecimal:",isDecimal
        ,"isAdd",isAdd
        ,"isMin",isMin
        ,"isMul",isMul
        ,"isDiv",isDiv
        ,"isNextDataStart",isNextDataStart);
    }

    /*Arithmetic function*/
    const add = () => {
        if (!isAdd && !isMin && !isMul && !isDiv)
        {
            nextNum();
            setIsAdd(true);
            setSave(parseFloat(Number(data)));
            reportStatus();
        }
    }

    const min = () => {
        if (!isAdd && !isMin && !isMul && !isDiv)
        {
            nextNum();
            setIsMin(true);
            setSave(parseFloat(Number(data)));
        }
    }

    const mul = () => {
        if (!isAdd && !isMin && !isMul && !isDiv)
        {
            nextNum();
            setIsMul(true);
            setSave(parseFloat(Number(data)));
        }
    }

    const div = () => {
        if (!isAdd && !isMin && !isMul && !isDiv)
        {
            nextNum();
            setIsDiv(true);
            setSave(parseFloat(Number(data)));
        }
    }

    const calculate = () => {
        var ans = 0.0;
        var sign = "";

        if (isAdd){
            ans = save+parseFloat(Number(data));
            sign = "+";
            setIsNextDataStart(true);
        }
        else if (isMin)
        {
            ans = save-parseFloat(Number(data));
            sign = "-";
            setIsNextDataStart(true);

        }
        else if (isMul)
        {
            ans = save*+parseFloat(Number(data));
            sign = "×";
            setIsNextDataStart(true);
            
        }
        else if (isDiv)
        {
            ans = save/parseFloat(Number(data));
            sign = "÷";
            setIsNextDataStart(true);
            
        }
        else{
            return;
        }

        if (ans.toString().length > 8)
        {
            ans = parseInt(ans*1000000)/1000000;
            /*ans = ans.toFixed(7);*/
        }
        setRecord3(record2);
        setRecord2(record1);
        setRecord1(save.toString()+" "+sign+" "+data+" = "+ans.toString());
        setData(ans.toString());
        nextNum();
        reportStatus();
    }

    /* HTML */
    return (
        <div className="calculator">
        <h1 className="displayPanel">{data}</h1>
        <table className="keyboard">
            <tr>
                <td onClick={clearData} className="ACButton">AC</td>
                <td onClick={delData} className="DelButton">DEL</td>
                <td onClick={switchSign} className="thinButton">[+/-]</td>
                <td onClick={div} className={isDiv ? "selectedButton":"thinButton"}>÷</td>
            </tr>
            <tr>
                <td onClick={e => dataCat("7")} className="boldButton">7</td>
                <td onClick={e => dataCat("8")} className="boldButton">8</td>
                <td onClick={e => dataCat("9")} className="boldButton">9</td>
                <td onClick={mul} className={isMul ? "selectedButton":"thinButton"}>×</td>
            </tr>
            <tr>
                <td onClick={e => dataCat("4")} className="boldButton">4</td>
                <td onClick={e => dataCat("5")} className="boldButton">5</td>
                <td onClick={e => dataCat("6")} className="boldButton">6</td>
                <td onClick={min} className={isMin ? "selectedButton":"thinButton"}>-</td>
            </tr>
            <tr>
                <td onClick={e => dataCat("1")} className="boldButton">1</td>
                <td onClick={e => dataCat("2")} className="boldButton">2</td>
                <td onClick={e => dataCat("3")} className="boldButton">3</td>
                <td onClick={add} className={isAdd ? "selectedButton":"thinButton"}>+</td>
            </tr>
            <tr>
                <td onClick={e => dataCat("0")} className="thinButton" colspan="2">0</td>
                <td onClick={addDot} className="boldButton">.</td>
                <td onClick={calculate} className="thinButton">=</td>
            </tr>
        </table>
        <p className="recordText">Record</p>
        <p className="record1">{record1}</p>
        <p className="record2">{record2}</p>
        <p className="record3">{record3}</p>
        </div>
    );
}

export default Calculator;