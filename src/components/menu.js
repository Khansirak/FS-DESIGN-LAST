import React, { useState } from 'react';
import './menu.css';
import Project from './project';
import Recipe from './recipe';
const Menu = () => {
///ADD PROJECT

const [project, setProject] = useState([<Project defaultValue={1} />]);

const handleButtonClick = () => {
  setProject([...project, <Project  />]);

};
///ADD RECEIPE
const [recipe, setReceipe] = useState([<Recipe defaultValue={1} />]);
const handleButtonClickReceipe = () => {

  setReceipe([...recipe, <Recipe  />])
};
///ADD PHASE
const [phase, setPhase] = useState(1);
const handleButtonClickPhase = () => {

  setPhase(phase+1);
};
///ADD OPERATION
const [operation, setOperation] = useState(1);
const handleButtonClickOperation = () => {

  setOperation(operation+1)
};


///for LIST-TOOLBOX
const [visible, setVisible] = useState(false);
const removeElement = () => {
  setVisible((prev) => !prev);
};


  return (
<>
    <div className="menu-body w-100 "  >
    <div className=" menu-body2 d-flex flex-row">
      <div className=" row" >
        <nav className =" p-0 pt-5">
          <ul className ="nav ml-2 d-flex justify-content-around navbar-nav">
          <li className ="nav-item w-75 ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}   onClick={handleButtonClick} >New Project</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={handleButtonClickReceipe} >New recipe</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button" className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}>New Partial recipe</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={handleButtonClickOperation}>New Operation</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={handleButtonClickPhase}>New Phase</button>
          </li>
          </ul>
          </nav>
      </div>

      <div className="border w-100  border-info"  >
     
        <div className=' d-flex row justify-content-between m-1'>
       <div className="col text-center "><h4 className=" p-2 font-weight-bold"> Management</h4></div>
       <div className="col text-end" ><button type="button"  className="border right m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button></div>
     
       </div>
       <div className="d-flex w-100 h-100 " >
       <div className="d-flex border w-100 justify-content-center border-info" >
        {/* <Project recipe={recipe}/> */}
       
        {project.map((column1, index) => (<Project recipe={recipe} phase={phase} operation={operation}   key={index} />))} 
        </div>
        <div className="border w-50 border-info">there</div>
        
        {visible && 
        <div className="border border-info" style={{width: "30%"}}>
 

           <ul className=" toolbox d-flex  m-0 p-0 ">
            <li className="border  border-info">I/O-List</li>
            <li className=" border  border-info">Signal-list</li>
            <li className=" border  border-info">Logic-In-Out</li>
            <li className=" border  border-info">Parameter</li>
            <li className=" border  border-info">EM</li>
            <li className=" border  border-info">Interlock</li>
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
export default Menu;
