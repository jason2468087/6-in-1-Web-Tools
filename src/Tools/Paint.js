import React, { useRef,useState,useEffect } from 'react';
import './Paint.css';

function Paint() {
    
    const canvasRef=useRef(null);
    const contextRef = useRef(null);
    const [isDrawing,setIsDrawing] = useState(false);
    const [mode,setMode] = useState("rect");
    const [points,setPoints] = useState("");
  
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth/2}px`;
        canvas.style.height = `${window.innerHeight/2}px`;
  
        const context = canvas.getContext("2d");
        context.scale(2,2);
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5;
        contextRef.current = context;
    },[])
  
    const startDrawing = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        setIsDrawing(true);
    }
  
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }
  
    const draw = ({nativeEvent}) => {
        if (!isDrawing){
            return;
        }
        const{offsetX,offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();
    }
  
    return(
        <div>
            <ul>

            </ul>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                className="paint-canvas"
            />
        </div>
        
    )
}

export default Paint;