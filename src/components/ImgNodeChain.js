import { Handle } from 'reactflow';


function ImgNodeChain({ data, isConnectable }) {  
  const nodeStyle = {
    width:"100px",
    // Add other styles as needed
  };
  return (
    <div className='' style={nodeStyle}  >

      <Handle type="target" position="top" id="0" style={{  top: "25%", opacity: "0",  backgroundColor:"black"}} isConnectable={isConnectable} />
     <img src={data.image} alt="Node Image" className="img-fluid" />
      <Handle type="source" position="bottom" id ="1"  style={{ bottom: "5%", opacity: "0",backgroundColor: "black"}} isConnectable={isConnectable} />
 
     
    </div>
  );
}

export default ImgNodeChain;
