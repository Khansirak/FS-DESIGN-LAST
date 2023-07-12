import React, { useRef, useState,useEffect } from "react";
import Project from './project';
import { Link } from 'react-router-dom';
import './phase.css';
import LineChart from "./linechart";
// import LineChart1 from "./linechart1";
import { Stage, Layer, Text, Rect, Image } from 'react-konva';
//IMPORTANTE DO NOT DELETE
import { Chart as ChartJS } from 'chart.js/auto'


const Graph = () => {
  const [visible, setVisible] = useState(true);
  const [visibles2, setVisibles2] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };
  const removeElement2 = () => {
    setVisibles2((prev) => !prev);
  };

  //FOR CHART
  const [lineColor, setLineColor] = useState('red');
  const handleColorChange = (e) => {
    setLineColor(e.target.value);
    console.log(lines);
  };


  const [inputFields, setInputFields] = useState([]);
  const stageRef = useRef(null);
  const layerRef = useRef([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [linePoints, setLinePoints] = useState([]); // Store line points separately
  const [lines, setLines] = useState([]); // Store the drawn lines
  const axesRef = useRef([]);

  const [lineType, setLineType] = useState('straight'); // Default line type
  const handleButtonClick = (type) => {
    setLineType(type);
  };

  useEffect(() => {
    
    // Create Konva stage
    const stage = new Konva.Stage({
      container: stageRef.current,

      width: 800,
      height: 1600
    });

    // Create Konva layer
    
    const layer = new Konva.Layer();
    layerRef.current = layer;
    stage.add(layer);

    // Initialize variables
    let isDrawing = false;
    let line;
    let axes = [];
    // Event listeners

    stage.on('mousedown touchstart', (e) => {
      //creating the line elem
      isDrawing = true;
      const pos = stage.getPointerPosition();
      line = new Konva.Line({
        stroke: lineColor,
        strokeWidth: 2,
        points: [pos.x, pos.y]
      });
      

      layer.add(line);
      setLines((prevLines) => [...prevLines, line]);
      // console.log(lines);

       // Focus on the newly added text field
       const lastIndex = inputFields.length;
       if (lastIndex > 0) {
         const lastTextInput = document.getElementById(`textInput_${lastIndex}`);
         if (lastTextInput) {
           lastTextInput.focus();
         }
       }
       layer.batchDraw();
     });

////////////////
    stage.on('mousemove touchmove', () => {
      if (!isDrawing) return;

      const pos = stage.getPointerPosition();
      const points = line.points();
      const [startX, startY] = points.slice(0, 2); // Get the start point of the line
    
      if (lineType === 'straight') {
        // Calculate the difference between current and start positions
        const dx = pos.x - startX;
        const dy = pos.y - startY;
    
        // Adjust the end point based on the difference (constraining to a straight line)
        const [endX, endY] = [startX + dx, startY + dy];
    
        // Update the points of the line
        line.points([startX, startY, endX, endY]);
      }else if (lineType === 'dashed-dotted-straight') {
        const [startX, startY] = line.points();
        const [endX, endY] = [pos.x, pos.y];

        const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

        const dashSize = 10; // Length of each dash
        const dotSize = 3; // Length of each dot
        const gapSize = 5; // Length of each gap

        const numSegments = Math.floor(length / (dashSize + dotSize + gapSize));

        const dashArray = [];
        for (let i = 0; i < numSegments; i++) {
          dashArray.push(dashSize, dotSize, gapSize);
        }

        line.dashEnabled(true);
        line.dash(dashArray);
        line.points([startX, startY, endX, endY]);
      }
      else if (lineType === 'dashed-straight') {
        const [startX, startY] = line.points();
        const [endX, endY] = [pos.x, pos.y];

        // Calculate the length of the line segment
        const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

        // Define the dash array
        const dashSize = 10; // Length of each dash
        const gapSize = 5; // Length of each gap

        // Calculate the number of dashes and gaps
        const numDashes = Math.floor(length / (dashSize + gapSize));

        // Create the dash array
        const dashArray = [];
        for (let i = 0; i < numDashes; i++) {
          dashArray.push(dashSize, gapSize);
        }

        // Update the line properties
        line.dashEnabled(true);
        line.dash(dashArray);
        line.points([startX, startY, endX, endY]);
      } 
      else if (lineType === 'freehand') {
        const newPoints = line.points().concat([pos.x, pos.y]);
        line.points(newPoints);
      }
    
      layer.batchDraw();
    });

    stage.on('mouseup touchend', () => {
      isDrawing = false;
      setLines((prevLines) => [...prevLines, line]);
    });

////FIRST CHART
    // Create horizontal axis line
    const horizontalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, stage.getHeight() / 2-500, stage.getWidth()/2+250, stage.getHeight() / 2-500]
    });
    layer.add(horizontalAxis);
    axes.push(horizontalAxis);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead = new Konva.RegularPolygon({
  x: stage.getWidth()/2+250,
  y: stage.getHeight() / 2-500,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});

layer.add(horizontalArrowhead);
    // Create vertical axis line
    const verticalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, 50, 20, stage.getHeight()/2-500]
    });
    layer.add(verticalAxis);
    axes.push(verticalAxis);



    // Add arrowhead at the end of the horizontal axis line
const verticalArrowhead = new Konva.RegularPolygon({
  x: 20,
  y: 50 ,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: -360
});      
layer.add(verticalArrowhead);



/////////////SECOND  CHART/////////////////////////////
    // Create horizontal axis line
    const horizontalAxis2 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [10, stage.getHeight() / 2-300, stage.getWidth()/2+200, stage.getHeight() / 2-300]
    });
    layer.add(horizontalAxis2);
    axes.push(horizontalAxis2);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead2 = new Konva.RegularPolygon({
  x: stage.getWidth()/2+200,
  y: stage.getHeight() / 2-300,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});
layer.add(horizontalArrowhead2);
    // Create vertical axis line
    const verticalAxis2 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, 350, 20, stage.getHeight()/2 -300]
    });
    layer.add(verticalAxis2);
    axes.push(verticalAxis2);


    /////////////ThHIRD  CHART/////////////////////////////
    // Create horizontal axis line
    const horizontalAxis3 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [10, stage.getHeight() / 2-100, stage.getWidth()/2+200, stage.getHeight() / 2-100]
    });
    layer.add(horizontalAxis3);
    axes.push(horizontalAxis3);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead3 = new Konva.RegularPolygon({
  x: stage.getWidth()/2+200,
  y: stage.getHeight() / 2-100,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});
layer.add(horizontalArrowhead3);


    // Create vertical axis line
    const verticalAxis3 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, stage.getHeight() / 2-250, 20, stage.getHeight()/2 -100 ]
    });
    layer.add(verticalAxis3);
    axes.push(verticalAxis3);



    // Clean up on component unmount
    return () => {
      stage.destroy();
    };
  }, [lineColor,inputFields,lineType]);


  


  const handleAddInputField = () => {
    setInputFields([...inputFields, 'Add Data']);
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index] = value;
    setInputFields(updatedFields);
  };




    return(
       <>
       
    <div className=" d-flex menu-body w-100 "  >
    <div className=" menu-body2 d-flex flex-row w-100">
    <div className="fixed-top text-center mt-2" style={{paddingLeft:"50em"}} > 
      <button type="button"  className="border text-dark m-2 px-5 p-2  btn border-info" style={{backgroundColor: "#b7e778"}} > <h4>Grahp</h4> </button>
      </div> 
      <div className=" d-flex row border w-100 border-info "  >

       <div className ="d-flex p-0 justify-content-between ">
       <div>
            <button type="button"  className="border text-center m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement2} >Management</button>
            </div>
            <div>
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}}>Overview </button>
            
            <button type="button"  className="border m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button>
            </div>
          </div>

       <div className="d-flex p-0 h-100" >  
        {visibles2&& 
        <div className=" border  m-0 border-info" style={{width:"20%"}}>
          {/* <Project /> */}
        </div> 
}    
        <div className="d-flex border  w-75 border-info" >  
        <div className="d-flex p-2" style={{width:"17%"}} >
        <nav className =" row">
          <ul className ="nav d-flex flex-wrap ">
        
          <li className ="nav-item w-50 ">
            <button type="button"  className="border btn btn-rounded m-3 p-0 border-info" style={{backgroundColor: "#b7e778"}} >New coordinate </button>
          </li>
          <li className ="nav-item w-50">
            <button  onClick={handleAddInputField} type="button"  className="border btn btn-rounded m-3 p-0 w-75 border-info" style={{backgroundColor: "#b7e778"}}>Text</button>
          </li>
          <li className ="nav-item w-50">
            <button type="button" className="border btn btn-rounded m-3 p-0 border-info" style={{backgroundColor: "#b7e778"}}  onClick={() => handleButtonClick('dashed-dotted-straight')}>Auxiliary Line horizontal</button>
          </li>
          <li className ="nav-item w-50">
            <button type="button"  className="border btn btn-rounded m-3 w-75 p-0 border-info" style={{backgroundColor: "#b7e778"}}  onClick={() => handleButtonClick('dashed-straight')} > Auxiliary Line vertical</button>
          </li>
          
          <li className ="nav-item w-50">
          <button type="button" className="border btn btn-rounded m-3 w-75 p-0 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => handleButtonClick('straight')} >Straight Line</button>
          </li>
          <li className ="nav-item w-50">
          <button type="button" className="border btn btn-rounded m-3 w-75 p-0 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => handleButtonClick('freehand')}>Handfree Line</button>
          </li> 
          
          <li className ="nav-item w-50">
            <button type="button"  className="border btn btn-rounded m-3 w-75 p-0 border-info" style={{backgroundColor: "#b7e778"}}>New Page</button>
          </li>
          </ul>
          <ul>
          <Link to="/phase">
          <li className ="nav-item  w-75">
            <button type="button"  className="border btn m-3 w-100 border-info" style={{backgroundColor: "#b7e778"}}>Back</button>
          </li>
          </Link>
          </ul>
          
          </nav>
      </div>
          <div className="d-flex w-75 row h-100">
         
          <section className="d-flex row p-4 h-50 justify-content-center"> 
          <div>
        <label htmlFor="colorSelect">Select Line Color:</label>
        <select id="colorSelect" value={lineColor} onChange={handleColorChange}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
      </div>
          <h3 className="border-bottom text-center"> Graph </h3>
          <div className="d-flex justify-content-center">
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',paddingTop:"80px",   }}>

      {inputFields.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          style={{ marginBottom: '50px', width:"130px",  textAlign: 'center',border:"none"}}
        />
      ))}

</div>



  <div  ref={stageRef} style={{ width: '800px', height: '900px' }} />


  {/* <div ref={layerRef}></div> */}
  <div>
        {/* {lines.map((line, index) => (
          <div key={index}>{`Line ${index + 1}: (${line[0]}, ${line[1]}) - (${line[2]}, ${line[3]})`}</div>
        ))} */}
      </div>

  </div>
          {/* <LineChart lineColor={lineColor} /> */}
          {/* <LineChart1  lineColor={lineColor} /> */}
             </section>
        </div>
    <div >

          </div>
        </div>

        {visible && 
        <div className="border w-25 border-info">
 

           <ul className=" toolbox column d-flex p-0 ">
            <li className="border small border-info">I/O-List</li>
            <li className=" border small border-info">Signal-list</li>
            <li className=" border small border-info">Logic-In-Out</li>
            <li className=" border small border-info">Parameter</li>
            <li className=" border small border-info">EM</li>
            <li className=" border small border-info">Interlock</li>
           </ul>

          </div>
}
       </div>
      </div>
    </div>
   </div>
        </> 
    );

    };

export default Graph;
