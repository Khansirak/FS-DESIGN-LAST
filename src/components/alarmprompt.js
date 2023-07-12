import React, { useState } from 'react';

import Addcolumn1 from './addcolumn1'
import Addrow1 from './addrow1'

const Alarmprompt = () => {

   const [column1, setInput] = useState([<Addcolumn1 defaultValue={1} />]);
   const [column2, setInput2] = useState([<Addcolumn1 defaultValue={1} />]);
   const [row1, setInput3] = useState([<Addrow1 defaultValue={1} />]);
   const [visible, setVisible] = useState(true);

   const removeElement = () => {
     setVisible((prev) => !prev);
   };
  return (
<>

    <div className="menu-body w-100 "  >
    
    <div className=" menu-body2 d-flex flex-row">
      <div className=" row" >
        <nav className ="navbar ">
          <ul className ="nav  d-flex justify-content-start navbar-nav">
          <li className ="nav-item w-75 ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput3([...row1, <row1 defaultValue={row1.length + 1} />]);}}   >New entry</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput([...column1, <column1 defaultValue={column1.length + 1} />]);}} onChange={() => this.addRow()} >New column</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button" className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput2([...column2, <column1 defaultValue={column2.length + 1} />]);}}>New status</button>
          </li>
          </ul>
          </nav>
      </div>

      <div className=" border w-100 border-info h-100"  >
      <div className=' d-flex row justify-content-between m-1'>
       <div className="col text-center "><h4 className=" p-2 font-weight-bold"> Alarm&Prompt
       </h4></div>
       <div className="col text-end" ><button type="button"  className="border right m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button></div>
     
       </div>


       <div className="d-flex h-100" >
       <div className="d-flex justify-content-center border w-100 border-info" >
        <div className=''>
          hi
       <table  className="table  mt-5  border">
    <thead>

  </thead>
  <tbody>

    <tr scope="row">
      <td className='p-0 w-75'>
    <table id= "tb" className="table m-0 border">
    <tbody>
    <tr>
    {column1.map((column1, index) => (<Addcolumn1 key={index} />))} 
    
    </tr>

    {row1.map((row1, index) => (<Addrow1 key={index}  param ={column1.length} />))} 


    </tbody>
    </table>
    </td>
    <td className='p-0 w-25' >
    <table className="table m-0 border">
    <tbody>
    <tr>
   
   
    {column2.map((column2, index) => (<Addcolumn1 key={index} />))}
    </tr>
    
    {row1.map((row1, index) => (<Addrow1 key={index}  param ={column2.length} />))}
    </tbody>
    </table>
    </td>
    
    </tr>
  
  </tbody>
  
</table>
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
export default Alarmprompt;
