import React from "react";
import { Link } from 'react-router-dom';
import Recipe from './recipe';


const Project = ({ recipe, operation,phase }) => {

    return(
       <>
          <ul className="d-flex tree mt-5 p-0 ">
            <li>
              <details open>
                <summary className="pb-3"><input  id="message" type="text"  className="border border-success" defaultValue=" Novartis-Insulin"  /> Project Name </summary>
                <ul className='d-flex flex-column pb-3'>
                  <li className="d-flex" >
                  <details  open>
                    <summary className="pb-3" > Automation</summary>
                    <ul className='d-flex flex-column h-100vh pb-2'>
                        <li  >        
                          <summary className="pb-2"> Funtional specification</summary> 
                        
                          {recipe.map((_, index) => (<Recipe operation={operation} phase={phase} key={index} />))}                                               
                          <li>
                              <details open>
                              <summary className="pb-3"><input  id="message" type="text"  className="border border-success" defaultValue=" EQM" />
                              Equipement Module </summary>
                              <ul className='pb-3' >
                        <li><input type="text" id="message3" className="border  border-success" defaultValue="EQM1"  /> 
                        <Link to="/equipemen-module">Agitator </Link> 
                         </li> 
                      </ul>
                              </details>
                          </li>
                          <li>
                              <details open>
                              <summary className="pb-3"><input  id="message" type="text"  className="border border-success" defaultValue=" Ilock"  /> Interlock </summary>
                              <ul className='pb-3'>
                        <li><input type="text" id="message3" className="border border-success" defaultValue="Ilock1" /> <Link to="/interlock-module">Agitator </Link>  </li> 
                      </ul>
                              </details>
                          </li>    
                        </li>     
                  <li>
                    <details open>
                      <summary className="pb-3">Human Machine Interface</summary>
                      <ul>
                        <li><input type="text" id="message3" className="border border-success" defaultValue="HMI1"  /> Name-number </li>  
                      </ul>
                    </details>
                  </li>
                  </ul>
                </details>                                 
                  </li>
                  <li className=''>
                    <details >
                      <summary className="pb-3">Process</summary>
                      <ul className='d-flex flex-column'>
                        <li>Uranus</li>
                        <li>Neptune</li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        
        </> 
    );

    };


export default Project;