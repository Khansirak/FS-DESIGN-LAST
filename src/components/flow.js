import React, { useState } from 'react';
import ReactFlow, { addEdge, removeElements } from 'reactflow';

const MyFlowComponent = () => {
  const [nodes, setNodes] = useState([]);

  const onAddNodes = () => {
    console.log("hello")
    const newNodes = [
      { id: 'node1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
      { id: 'node2', data: { label: 'Node 2' }, position: { x: 200, y: 200 } },
      { id: 'node3', data: { label: 'Node 3' }, position: { x: 300, y: 300 } }
    ];
    setNodes([...nodes, ...newNodes]);
    console.log(nodes)
  };

  return (
    <div>
      <button onClick={onAddNodes}>Add Nodes</button>
      <ReactFlow nodes={nodes} />
    </div>
  );
};

export default MyFlowComponent;
