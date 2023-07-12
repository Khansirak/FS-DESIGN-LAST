import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function TextUpdaterNodeOutput({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className=" text-center ">
              <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
        <input id="text" name="text" onChange={onChange} className="p-1 w-100" />

    </div>
  );
}

export default TextUpdaterNodeOutput;
