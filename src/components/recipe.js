import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';

const Recipe = ({operation, phase}) => {
  const [recipe, setRecipe] = useState();


  function handleInputChange(event){
    const name = event.target.value;
    setRecipe(name);
    localStorage.setItem('recipe',JSON.stringify(name));
  };

  useEffect(() => {
    const storedName = localStorage.getItem('recipe' );
    if (storedName) {
      setRecipe(JSON.parse(storedName));
    }
  }, [recipe]);

    return(
       <>
        <li>
        <details open>
          <summary className="pb-2"><input id="message2" type="text" className="border border-success" defaultValue={recipe} onChange={handleInputChange} /> 
          <Link to="/phase"  >Recipe-name</Link>           
           </summary>
          <ul className='d-flex flex-column pb-1'>
         
          {[...Array(operation)].map((_, index) => (          
          <>
             <li key={index}> 
            
            <details open>
            <summary className="pb-3"><input  id="message" type="text"  className="border border-success" defaultValue=" Operation"  /> <Link to="/phase"  >Name-number</Link> </summary>
            <ul className='d-flex flex-column pb-5' >
            {[...Array(phase)].map((_, index) => (    
              <li   > <input type="text" id="message3" className="border border-success" defaultValue="Phase"  /> <Link to="/phase"  >Name-number</Link>     
              
              <ul className='d-flex flex-column pb-5'>
              <li className='pb-3 mt-2'>
                <input type="text" id="message3" className="border  border-success" defaultValue="Parameter"  /> <Link to="/phase"  >Name-number</Link>  </li>
                <li className='pb-3'>
                <input type="text" id="message3" className="border border-success" defaultValue="Alarm"  /> <Link to="/phase"  >Name-number</Link> </li>
                <li >
                <input type="text" id="message3" className="border border-success" defaultValue="Logic"  /> <Link to="/phase"  >Name-number</Link> </li>
              </ul>
                </li>

))}
              </ul>
              </details>
            </li>
         </>
))}


         
          </ul>
         </details>
        </li>
        </> 
    );

    };


export default Recipe;