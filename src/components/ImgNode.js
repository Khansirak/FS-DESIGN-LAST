import { Handle } from 'reactflow';


function ImgNode({ data, isConnectable }) {  
  return (
    <div style={{width:"100px"}}>

      <Handle type="target" position="left" id="16" style={{   bottom: "0%", backgroundColor:"black", opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="0" style={{  top: "20%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="1" style={{  top: "30%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="2" style={{  top: "40%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="3" style={{  top: "60%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="4" style={{  top: "70%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="5" style={{  top: "80%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="6" style={{  top: "95%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="target" position="left" id="15" style={{  top: "87%", backgroundColor:"rgba(0, 0, 0, 0)",opacity: "0", left:"0.5%" }} isConnectable={isConnectable} />
    <img src={data.image} alt="Node Image" className="img-fluid" />
      <Handle type="source" position="right" id ="7"  style={{ bottom: "0%", backgroundColor: "black", opacity: "0",right:"0.5%"}} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="8" style={{ top: "20%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="9" style={{ top: "30%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="13" style={{ top: "40%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="10" style={{ top: "60%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="14" style={{ top: "70%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="11" style={{ top: "80%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="17" style={{ top: "87%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
      <Handle type="source" position="right" id ="12" style={{ top: "95%", background: "rgba(0, 0, 0, 0)",opacity: "0", right:"0.5%" }} isConnectable={isConnectable} />
  
     
    </div>
  );
}

export default ImgNode;
