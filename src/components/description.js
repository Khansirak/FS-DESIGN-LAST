import React, { useState } from 'react';

import Addcolumn1 from './addcolumn1'
import Addrow1 from './addrow1'

const Description = () => {

    const [state, setState] = useState('Please write an Description');


     const handleChange = (e) => {
        setState({value: e.target.value});
      };
    
     const  handleSubmit = (e) => {
        alert('An essay was submitted: ' + state.value);
        e.preventDefault();
    };
    const [visible, setVisible] = useState(true);

    const removeElement = () => {
      setVisible((prev) => !prev);
    };

  return (
<>

    <div className="menu-body w-100 "  >
    
    <div className=" menu-body2 d-flex flex-row">


      <div className=" border w-100 border-info h-100"  >
      <div className=' d-flex row justify-content-between m-1'>
       <div className="col text-center "><h4 className=" p-2 font-weight-bold"> Introduction</h4></div>
       <div className="col text-end" ><button type="button"  className="border right m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button></div>
     
       </div>

       <div className="d-flex h-100" >
       <div className="d-flex justify-content-center border w-100 border-info" >
        <div className='d-flex justify-content-center w-100 m-2'>
        <form classname=" row d-flex justify-content-center w-100"  onSubmit={handleSubmit}>
        <label className='  w-100'>
     
          <textarea rows="20" cols="100" defaultValue="Introduction ....." className='no-border' value={state.value} onChange={handleChange} />
        </label>
        <input className='w-25' type="submit" value="Submit" />
      </form>

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
export default Description;
