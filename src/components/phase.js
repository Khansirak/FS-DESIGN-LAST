import React, { useState,useEffect  } from "react";
import Project from './project';
import { Link } from 'react-router-dom';
import './phase.css';
import Detail from "../images/detail.png"
import 'reactflow/dist/style.css';
import { useCallback } from 'react';
import ImgNodeChain from './ImgNodeChain.js';
import ImgNodeChain1 from './ImgNodeChain1.js';
import ParallelImg from './ParalleStep.js';
import InsideParallel from './InsideParallel.js';
import RightAngleConnecting from "./edgecustom.js";
import RightAngleConnectingDown from './edgecustomdown';
const nodeTypes = {
  ImgNodeUpd: ImgNodeChain,
  ImgNodeUpd1: ImgNodeChain1,
  ImgNodeUpd2:ParallelImg,
  ImgNodeUpd3:InsideParallel,
  custom: { draggable: false },
};

  const edgeTypes = {
    customEdge: RightAngleConnecting,
    customEdgeDown:RightAngleConnectingDown,
    stepEdges: StepEdge,
  };
import ReactFlow, {
  
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  StepEdge,
  StraightEdge,
  useReactFlow,
  Panel,
  
} from 'reactflow';


//NEED TO STAY OUTSIDE
const getNodeId = () => `randomnode_${+new Date()}`;
const initialNodes = [ {
  id: "1", 
  sourcePosition: 'top',
   targetPosition: 'bottom',
   position: { x: 0, y: -300 },
   type: 'ImgNodeUpd',
    data: {  image:require(`../images/Start.png`) },
 },
 {
  id: "2", 
  sourcePosition: 'top',
   targetPosition: 'bottom',
   position: { x: 0, y: -200 },
   type: 'ImgNodeUpd1',
    data: {  image:require(`../images/Transition.png`) },
 },];
 
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const Phase = () => {
  //fortoolbox
  const [visible, setVisible] = useState(false);

  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [visibles3, setVisibles3] = useState(false);
  const [number, setNumber] = useState();

  const handleMultiStep = (event) => {
    
    setNumber(event.target.value);
  };

  //for project
  const [visibles2, setVisibles2] = useState(false);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  const get_detail = () => {
    setVisible1((prev) => !prev);
    setVisible2((prev) => !prev);
  }

  const addMultiStep = () => {
    setVisibles3((prev) => !prev);
  }

  const removeElement2 = () => {
    setVisibles2((prev) => !prev);
  };
  const myRecipe = JSON.parse(localStorage.getItem('recipe'));

  ////FOR STEP CHAIN
  const [nodes, setNodes,onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const [rfInstance, setRfInstance] = useState(null);
const [selectedNodeId, setSelectedNodeId] = useState(null);
const [isSelected, setIsSelected] = useState(false);
const { setViewport } = useReactFlow();
//FOR parallel section
const [parallnode, setParallelNode] = useState(null);

const [parallelCount, setParallelCount] = useState(0);
const [insertionIndex, setInsertionIndex] = useState(1); // Initial insertion index

const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

const handleKeyDown = (event) => {
  // console.log(event);
  if ( event.key === 'Backspace') {
    setParallelCount((prevCount) => prevCount - 1);
    // console.log(parallelCount);


  }
};

/////FOR THE STEP CHAIN DIAGRAM PERSITENCE MEMORY
const onSave = useCallback(() => {
  if (rfInstance) {
    const flow = rfInstance.toObject();
    localStorage.setItem("chain", JSON.stringify(flow));
  }
}, [rfInstance]);

const onRestore = useCallback(() => {
  const restoreFlow = async () => {
    const flow = JSON.parse(localStorage.getItem("chain"));
    // console.log(flow)
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };
  restoreFlow();
}, [setNodes, setViewport]);

//This IS FOR THE END
const getImg = useCallback((e) => {
  const previousNode = nodes[selectedNodeId +1];
  const node =  {
   id: "end", 
   sourcePosition: 'top',
    targetPosition: 'bottom',
    position: {
      x: 0, // Increment x-coordinate by 100
      y: previousNode.position.y + 100, // Increment y-coordinate by 100
    },
    type: 'ImgNodeUpd',
     data: {  image:require(`../images/Ende.png`) },
  }
  setNodes([...nodes, node]);

  if (nodes.length > 0) {
  const previousNode = nodes[selectedNodeId +1];
  // console.log(previousNode.id,node.id);
  const newedge= { id:getNodeId(), source: previousNode.id, target: node.id, type: 'stepEdges' }
  setEdges([...edges, newedge]);
  }

}, [nodes]);

//THIS IS FOR THE ACTION/TRANSITION STEPS
const getImg1 = useCallback((e) => {
  const previousNode = nodes[selectedNodeId +1];
  // const btnId=e.target.id;

  const node =  {
   id: getNodeId(), 
   key: getNodeId(),
   sourcePosition: 'top',
    targetPosition: 'bottom',
    position: {
      x: previousNode.position.x, // Increment x-coordinate by 100
      y: previousNode.position.y +100 , // Increment y-coordinate by 100
    },
    type: 'ImgNodeUpd1',
     data: {  image:require(`../images/Step.png`), isselected: isSelected},
     draggable: false,
  }

  const node2 = {
    id: "step" + getNodeId(),
    sourcePosition: 'top',
    targetPosition: 'bottom',
    position: {
      x: previousNode.position.x, // Same as the previous node's X position
      y: previousNode.position.y + 200, // Increment the y-coordinate by another 150 units
    },
    type: 'ImgNodeUpd1',
    data: { image: require(`../images/Transition.png`), isselected: isSelected },
    draggable: false,
  };

  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes];

if(parallnode && previousNode.position.y+200> parallnode.position.y){
  updatedNodes.forEach(nodes => {
    
    if (nodes.position.y > node.position.y) { 
      const deltaY = 200;
      nodes.position.y += deltaY;

    }
  });
}
    // Insert the new node at the insertion point
    updatedNodes.splice(insertionIndex, 0, node,node2);
    
    return updatedNodes;
  });

  if (nodes.length > 0) {
  const previousNode = nodes[selectedNodeId +1];
  const newedge= { id:getNodeId(), source: previousNode.id, target: node.id, type: 'stepEdges' }
    // Second Edge (Between First and Second Node)
    const newEdge2 = {
      id: getNodeId(),
      source: node.id,
      target: node2.id,
      type: 'stepEdges',
    };
  setEdges([...edges, newedge,newEdge2]);
  }


}, [nodes]);

////ADDING MULTIPLE STEPS 

const MultiSteps = useCallback(() => {
  const previousNode = nodes[selectedNodeId +1];

  const arrNode=[]
  var bool=true;
for (let i=1; i<2*number+1; i++){
  if(bool){
    const node3 =  { id: getNodeId()+i,  type: 'ImgNodeUpd1',
    data: { image: require(`../images/Step.png`), isselected: isSelected }, draggable: false, position: { x: previousNode.position.x, y: previousNode.position.y +i*100  } };
    arrNode.push(node3);
  }
  else{
    const node3 =  { id: getNodeId()+i,  type: 'ImgNodeUpd1',
    data: { image: require(`../images/Transition.png`), isselected: isSelected }, draggable: false, position: { x: previousNode.position.x, y: previousNode.position.y +i*100  } };
    arrNode.push(node3);
  }
 
bool=!bool;
  
}
  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes];

if(parallnode && previousNode.position.y+200> parallnode.position.y){
  updatedNodes.forEach(nodes => {
    
    if (nodes.position.y > previousNode.position.y) { 
      const deltaY = number*200;
      nodes.position.y += deltaY;

    }
  });
}

    updatedNodes.splice(insertionIndex, 0, ...arrNode);

    return updatedNodes;
  });
console.log(arrNode)
  if (nodes.length > 0) {
  const previousNode = nodes[selectedNodeId +1];
  const arrEdge=[]
  const newedge= { id:getNodeId(), source: previousNode.id, target:  arrNode[0].id, type: 'stepEdges' }
  arrEdge.push(newedge);
    // Second Edge (Between First and Second Node)
    
    for (let i=0; i<2*number-1; i++){
    const newEdge4 = {
      id: getNodeId(),
      source: arrNode[i].id,
      target: arrNode[i+1].id,
      type: 'stepEdges',
    };
    arrEdge.push(newEdge4);
  }
    
  setEdges([...edges, ...arrEdge]);
  }
  // arrNode.splice(0, arrNode.length);

}, [nodes,number]);


//This is for adding a parallel step
const getImgParallelstep = useCallback((e) => {
    const btnId=e.target.id;
    // const insertionIndex = 1;
    const node =  {
     id: "parall" +getNodeId(),
     key: getNodeId(), 
     sourcePosition: 'top',
      targetPosition: 'bottom',
      position: {
        x: nodes[insertionIndex].position.x, y: nodes[insertionIndex].position.y 
      },
      type: 'ImgNodeUpd2',
       data: {  image:require(`../images/Pr.png`) },
       draggable: false,
    }
    // setNodes([...nodes, node]);
    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];

      updatedNodes.forEach(nodes => {
     
        if (nodes.position.y >= node.position.y ) {
            const deltaY = 50;
            nodes.position.y += deltaY;
  
        }
      });
      // Insert the new node at the insertion point
      updatedNodes.splice(insertionIndex, 0, node);
      
      return updatedNodes;
    });

    if (nodes.length > 0) {
    const previousNode = nodes[selectedNodeId+1];

    setParallelCount(1);
    }

    setParallelNode(node);

    
    localStorage.setItem('parallelid', node.id);
  }, [nodes]);



  useEffect(() => {
    // Retrieve the saved data from localStorage
    const parallelid = localStorage.getItem('parallelid');
    const parallelCountN=localStorage.getItem("parallelCount");
    const flow = JSON.parse(localStorage.getItem("chain"));
    const nodeValues = Object.values(flow.nodes)
    const matchedNode = nodeValues.find((node) => node.id == parallelid);
    // If there is saved data, update the state with it
    setParallelNode(matchedNode);
    const parsedNumber = parseInt(parallelCountN);
    setParallelCount(parsedNumber);
  }, []);



//This is for adding parallel actions inside the parallel step
const getImgParallelstepAction = useCallback((e) => {
  const previousNode = nodes[selectedNodeId +1];
    const btnId=e.target.id;
    const node =  {
     id: getNodeId(), 
     key: getNodeId(),
     sourcePosition: 'top',
      targetPosition: 'bottom',
      position: {
        x: previousNode.position.x + parallelCount *200, 
        y: previousNode.position.y  +47, 
      },
      type: 'ImgNodeUpd3',
       data: {  image:require(`../images/${btnId}`) },
       draggable: false,
    }
    setNodes([...nodes, node]);
  
    if (nodes.length > 0) {
    const newedge= { id:getNodeId(), source:previousNode.id, target: node.id,     sourceHandle: 'right',
    targetHandle: 'left',
    type: 'customEdge',
      // Additional props you want to pass to the custom edge component
      data: {
        sourceX: previousNode.position.x,
        sourceY: previousNode.position.y,
        targetX: node.position.x,
        targetY: node.position.y,
      },
     }

    setEdges([...edges, newedge]);
    setParallelCount((prevCount) => prevCount + 1);
    localStorage.setItem('parallelCount',  parallelCount );
    }
    
  
  }, [nodes]);

///This is for Transition move
const getImgParallel = useCallback((e) => {
  const btnId=e.target.id;
  const node =  {
   id: getNodeId(), 
   sourcePosition: 'top',
    targetPosition: 'bottom',
    position: {
      x: nodes[insertionIndex].position.x+200, y: nodes[insertionIndex].position.y +100
    },
    type: 'ImgNodeUpd1',
     data: {  image:require(`../images/${btnId}`) },
     draggable: false,
  }
  setNodes([...nodes, node]);

  if (nodes.length > 0) {
    const previousNode = nodes[selectedNodeId+1];
    // const commingNode = nodes[nodes.length - 1];
    const newedge= { id:getNodeId(), source:previousNode.id,  target: node.id, type: 'stepEdges' }
  
    setEdges([...edges, newedge]);

    }
}, [nodes]);


const handleNodeClick = (event, element) => {
 const ids = element.id;
 const indx=nodes.findIndex((element) => element.id === ids);
 setSelectedNodeId(indx-1);
//  console.log(element.id);
 localStorage.setItem('parallelCount',  parallelCount );
  setInsertionIndex(indx);
  const selectedNode = nodes[indx];
  // if (isSelected) {
  //   selectedNode.style = {
  //     ...selectedNode.style,
  //     border: '2px solid blue',
  //   };
  //   setNodes([...nodes, selectedNode]);
    
  // }
  // else{
  //   selectedNode.style = {
  //     ...selectedNode.style,
  //     border: 'none',
  //   };
  //   setNodes([...nodes, selectedNode]);
  // }
  // console.log(selectedNode);

};

const ConnectNode = (event) => {
  const previousNode = nodes[selectedNodeId+1];
    console.log("hello");
    if (parallnode  ){
      
      const newEdge = {
        id: getNodeId(),
        stroke: 'red',
        source: previousNode.id,
        target: parallnode.id, // Modify this to the desired target node ID
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'customEdgeDown',
        data: {
          // sourceX: previousNode.position.x,
          sourceY: previousNode.position.y,
          targetX: previousNode.position.x,
          targetY: parallnode.position.y,
        },
      };
      setEdges([...edges, newEdge]);
    }
 
 };
    

return(
       <>
      <div className="fixed-top text-center mt-2" style={{paddingLeft:"50em"}} > 
      <button type="button"  className="border rounded-circle m-2 p-4  btn border-info" style={{backgroundColor: "#b7e778"}} >Run</button>
      <button type="button"  className="border rounded-circle m-2 p-4  btn border-info" style={{backgroundColor: "#b7e778"}}>Hold</button>
      <button type="button"  className="border rounded-circle m-2 p-4 btn border-info" style={{backgroundColor: "#b7e778"}} >Abort</button>
      <button type="button"  className="border rounded-circle m-2 p-4 btn border-info" style={{backgroundColor: "#b7e778"}} >Stop</button>
      </div> 
    <div className=" d-flex menu-body w-100   "  >
    <div className=" menu-body2 d-flex flex-row  h-75 w-100">
     
       <div className="border d-flex row w-100  border-info" >
       <div className="d-flex  justify-content-between">
        <div>
            <button type="button"  className="border text-center m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement2}>Management</button>
            </div>
            <div>
            <Link to="/logic">
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}}>Logic </button>
            </Link>
            <Link to="/graph">
            <button type="button"  className="border  btn  border-info" style={{backgroundColor: "#b7e778"}} >Graph</button>
            </Link>
            <Link to="/description">
            <button type="button" className="border m-1 btn border-info" style={{backgroundColor: "#b7e778"}}>Descrition</button>
            </Link>
            <Link to="/parameter">
            <button type="button"  className="border  m-1 btn border-info" style={{backgroundColor: "#b7e778"}}>Parameter</button>
            </Link>
            <Link to="/signals">
            <button type="button"  className="border  m-1 btn border-info" style={{backgroundColor: "#b7e778"}}>Signals</button>
            </Link>
            <Link to="/alarmprompt">
            <button type="button"  className="border m-1 btn border-info" style={{backgroundColor: "#b7e778"}} >Alarm&Prompt</button>
            </Link>           
            <button type="button"  className="border m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button>
            </div>       
          </div>
      <div className=" border d-flex p-0 m-0 border-info">
      {visibles2&& 

<div className=" m-0" style={{width:"18%"}}>
<Project />
</div>
} 
        <div className="border border-info " style={{width:"12%"}} > 
        jii       
        <div className=" d-flex mt-5 row justify-content-between p-4 h-75" >
        <div><button className="rounded border logic-btn p-0  w-75 border-info"  onClick={getImg1 } ><img className="logic-button" id="Start.png" alt="Start" src={require(`../images/addStep.PNG`)} style={{backgroundColor: "white"}} /> </button></div>
        <div ><button className="rounded border logic-btn p-0  w-75 border-info" onClick={addMultiStep } ><img className="logic-button" id="Pr.png" alt="Parallel" src={require(`../images/AddMultipleStep.PNG`)}  style={{backgroundColor: "white"}}/></button>  </div>
         {/* <div><button className="Action logic-btn border-0 p-0 w-100"  onClick={getImg1 }  > <img className="logic-button" id="Transition.png" alt="Transition" src={require(`../images/Transition.png`)}  style={{backgroundColor: "white"}}/></button></div> */}
         <div ><button className="rounded border logic-btn p-0  w-100 border-info" onClick={getImgParallelstep } ><img className="logic-button" id="Pr.png" alt="Parallel" src={require(`../images/Parall.png`)}  style={{backgroundColor: "white"}}/></button>  </div>

         <div><button className="rounded border logic-btn p-0  w-75 border-info"  onClick={getImgParallelstepAction }  ><img className="logic-button" id="Step.png" src={require(`../images/InsideParal.PNG`)} style={{backgroundColor: "white"}} /></button></div>
         <div><button className="border logic-btn  p-0 m-0 w-100 border-info"  onClick={ConnectNode }  >Connect</button> </div>
         <div><button className="logic-btn border-0 p-0 w-100"  onClick={getImgParallel }  > <img className="logic-button" id="Transition.png" alt="Transition" src={require(`../images/Transition.png`)}  style={{backgroundColor: "white", width:"100px"}}/></button> Decision</div>
         <div><button className="logic-btn border-0 p-0 w-100"  onClick={getImg }  ><img className="logic-button" id="Ende.png" src={require(`../images/Ende.png`)} style={{backgroundColor: "white"}} /></button></div>

      </div>
      <Link to="/">
           <div className="mt-auto text-center "> <button type="button"  className="border btn btn-rounded p-4  border-info" style={{backgroundColor: "#b7e778"}}>Back</button></div>
          </Link>
        </div>

        <div className="border w-100 border-info" >        
          <div className="d-flex h-100">

          <div className="border w-100 border-info" >        
          <text className=" border-bottom d-flex  justify-content-center p-2 border-info "> {myRecipe}  Run:O </text>
          <section className="d-flex p-2 mb-5 justify-content-between"> 

            <button className="p-0 no-border" style={{width:"3em", height:"3em"}}> <img alt="detail" className="image" src={Detail} style={{width:"100%", height:"100%"}} onClick={get_detail}/> </button>
            <text> Rev-01.00</text>
             </section>           
             <div className="d-flex column justify-content-around"> 
             <div className="d-flex w-100 "> 
             <section className="d-flex h-100 w-100 justify-content-between"> 
            <div className="border w-100">
            <div  style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', height:"100hv"}}>
            <div onKeyDown={handleKeyDown}  className=" w-100 " style={{ height: '90vh', width:"90em" }}>
              <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  // onSelectionChange={handleNodeMouseDown}
                  onConnect={onConnect}
                  onInit={setRfInstance}
                  nodeTypes={nodeTypes}
                  onNodeClick={handleNodeClick}

                  fitView
                  attributionPosition="bottom-left"
                  // edgeTypes={{ default: StepEdge }}
                  edgeTypes={edgeTypes}
                 >
              <MiniMap />
              <Controls />

              <Panel position="top-right">
                <button onClick={onRestore}>Restore</button>
              </Panel>
              <Panel position="bottom-right">
                <button onClick={onSave}>save</button>
              </Panel>
                
              </ReactFlow>
    </div>
        </div>
            </div>
             </section>
             </div>


             {visible2 &&
             <div className="border  d-flex row justify-content-between border-info m-2 w-50 h-25">
              <h5 className="border border-info text-center" style={{backgroundColor: "#b7e778"}}> All steps </h5>
              <table  className="table border border-dark " > 
              <thead >
                <tr>
                <th className="p-0">Scrittname</th>
                <th className="p-0">Scrittnummer</th>
                <th className="p-0">Restartadress</th>
                </tr>

              </thead>
                <tbody>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="Grundstellung" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="pH-Phufen" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="pH-Einstellen" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="Prozess-Freigabe" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
               </tbody> 
              </table>
            <div className="d-flex justify-content-end">
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}} >Cancel </button>
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}} >Confirm </button>
            </div>
             </div>
              }

{visibles3 &&


             <div className="border  d-flex row justify-content-between border-info m-2 w-50 h-25">
              <h5 className="border border-info text-center" style={{backgroundColor: "#b7e778"}}> Add more steps </h5>
              <div className="d-flex column "><p>Number of steps</p><input type="number"  value={number} className="w-25 form-control mr-3 h-75" onChange={handleMultiStep}></input> 
             {/* <p>{number}</p> */}
              </div>
              
              <table  className="table border border-dark " > 
              <thead >
                <tr>
                <th className="p-0">Scrittname</th>
                <th className="p-0">Scrittnummer</th>
                <th className="p-0">Restartadress</th>
                </tr>

              </thead>
                <tbody>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="Grundstellung" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="pH-Phufen" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="pH-Einstellen" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
                <tr className="rows" >
                    <td ><input type="text" defaultValue="Prozess-Freigabe" className='w-100 no-border'></input></td>
                     <td ><input type="text" defaultValue="10" className=' no-border'></input></td>
                     <td ><input type="text" defaultValue="20" className=' no-border'></input></td>            
                </tr>
               </tbody> 
              </table>
            <div className="d-flex justify-content-end">
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}}>Cancel </button>
            <button type="button"  className="border  btn m-1  border-info" style={{backgroundColor: "#b7e778"}}  onClick={MultiSteps} >Confirm </button>
            </div>
             </div>
              }

             </div>
             
        </div>
        {visible1 && 
        <div className="border  border-info" >        
        <text className=" border-bottom d-flex  justify-content-center p-2 border-info "> Run:detail </text>
<div className="p-4">
        <table  className="table table-bordered p-5 border border-dark" > 
    <thead >
  <tr>
      <th className="p-0">Action:</th>
      <th className="p-0" ></th>
      <th className="p-0" >Step-no:</th>
      <th className="p-0" ></th>
      <th className="p-0" >Restart date:</th>            
    </tr>
    <tr>
      <th className="p-0">Delay-t</th>
      <th className="p-0" >Cond.</th>
      <th className="p-0" >Name</th>
      <th className="p-0" >Description</th>
      <th className="p-0" >Value</th>              
    </tr>
  </thead>
  <tbody>
    {[...Array(20)].map(() =>
      <tr className="rows" >
<td ><input type="text" defaultValue="" className='w-100 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-100 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-100 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-100 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-100 no-border' ></input></td>
   </tr>
  )}
  </tbody> 
</table>
<table  className="table table-bordered m-1 border border-dark" > 
    <thead >
  <tr>
      <th className="p-0">Action:</th>
      <th className="p-0" ></th>
      <th className="p-0" >Step-no:</th>
      <th className="p-0" ></th>
      <th className="p-0" ></th>            
    </tr>
    <tr>
      <th className="p-0">Delay-t</th>
      <th className="p-0" >Cond.</th>
      <th className="p-0" >Name</th>
      <th className="p-0" >Description</th>
      <th className="p-0" >Value</th>              
    </tr>
  </thead>
  <tbody>
    {[...Array(15)].map(() =>
      <tr className="rows" >
<td ><input type="text" defaultValue="" className='w-75 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-75 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-75 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-75 no-border'></input></td>
   <td ><input type="text" defaultValue="" className='w-75 no-border' ></input></td>
   </tr>
  )}
  </tbody> 
</table>
</div>
        </div>
       }


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


export default Phase;