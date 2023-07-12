import React, { useState,useEffect } from "react";
import { Handle } from 'reactflow';


function ParallelImg({ data, isConnectable }) {  


  return (
    <div  style={{width:"700px"}}>
  
      <Handle type="target" position="top" id="0" style={{  top: "50%", opacity: "0",  backgroundColor:"black"}} isConnectable={isConnectable} />
   
     <img src={data.image} alt="Node Image" className="img-fluid" />
     
      <Handle type="source" position="bottom" id ="1"  style={{ bottom: "40%" ,backgroundColor: "black"}} isConnectable={isConnectable} />
      
    </div>
  );
}

export default ParallelImg;
