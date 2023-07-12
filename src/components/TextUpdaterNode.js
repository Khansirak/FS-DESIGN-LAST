
import { Handle, Position } from 'reactflow';
import React, { } from 'react';


function TextUpdaterNode({ data, isConnectable }) {

  return (

    <div className=" text-center ">
 
        <input id="text" name="text" className="p-1 w-100" />
      
      <Handle type="source" position={Position.Right}  isConnectable={isConnectable} />
    </div>
 
  );
}

export default TextUpdaterNode;
