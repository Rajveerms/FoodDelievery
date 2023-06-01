import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

function AdminDeliveryBoy(props) {

  


    let[changeState,setChangeState] = useState([]);

    useEffect(()=>{
      loadAllDeliveryBoys();
    },[])

    const loadAllDeliveryBoys = async() =>{
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
     const result = await axios.get("http://localhost:8081/day15_boot/deliveryboy/all", config);
     setChangeState(result.data);
      
    }

    const loadActiveDeliveryBoys = async() =>{
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      const result = await axios.get("http://localhost:8081/day15_boot/deliveryboy/active", config);
      setChangeState(result.data);
       
     }

     const loadInactiveDeliveryBoys = async() =>{
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      const result = await axios.get("http://localhost:8081/day15_boot/deliveryboy/inactive", config);
      setChangeState(result.data);
       
     }

     let ShowAll =()=>{
      loadAllDeliveryBoys();
        }

let ShowActive =()=>{
  loadActiveDeliveryBoys();
    }
    
    let ShowInactive =()=>{
      loadInactiveDeliveryBoys();
        
        
            }

    return (
            
    <div className="row">
          
          <div className='col-2'>
              <h6 className="p-1 border-bottom">Filter By</h6>
              <h6>Delivery Partner Status</h6>
              <form className="ml-md-2">
              <div className="form-inline border rounded p-sm-2 my-2">
                  <input type="radio" name="type" defaultValue="Approved" onChange={()=>ShowAll()} id="ugly" />
                  <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1" >Show All</label>
                </div>
                    <div className="form-inline border rounded p-sm-2 my-2">
                  <input type="radio" name="type" defaultValue="Approved" onChange={()=>ShowActive()} id="ugly" />
                  <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1" >Active</label>
                </div>
                <div className="form-inline border rounded p-md-2 p-sm-1">
                  <input type="radio" name="type" defaultValue="Rejected" onChange={()=>{ShowInactive()}} id="notugly" />
                  <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Inactive</label>
                </div>
             
            
              </form>
            </div>
          <div className='col-10 mt-5 justify-content-between'>
          <center>
          <div className='row'>
           {
         changeState.map((boy,i)=>{

         return (<>
               <div className='col-4 mt-4' key={i}>
                
                <img  src={`http://localhost:8081/day15_boot/image/${boy.photo}`} height='150px' width='150' alt='image'></img>

            </div>
            <div className='col-4 mt-4'>
                <p>
                    <b>Name: </b> {boy.firstName +" " + boy.lastName}<br/>
                    <b>Location: </b>{boy.address.city}<br/>
                    <b>Mobile No: </b>{boy.mobileNo}<br/>
                </p>
            </div>

            <div className='col-4 mt-4'>
            <button className={boy.deliveryBoyStatus=="INACTIVE" ?'btn btn-danger text-light':'btn btn-success text-light'}>{boy.deliveryBoyStatus=="INACTIVE"?"Inactive":"Active"}</button>

            </div>

            </> )})
           }
           </div>
           </center>
         </div>

    </div>
           
        );
}

export default AdminDeliveryBoy;