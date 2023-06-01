import React, { useState } from 'react';
import './Status.css'

function Map(props) {


  let [time,setTime] = useState(" ");
  let [isTimeSet,setTimeSet] = useState(false);

     let changeClassAccepted =["step0"];
     props.accepted==1 ? changeClassAccepted.push("active") : changeClassAccepted.push("");

     let changeClassPreparing =["step0"];
     props.preparing==1 ? changeClassPreparing.push("active") : changeClassPreparing.push("");

     let changeClassEnroute =["step0"];
     props.enroute==1 ? changeClassEnroute.push("active") : changeClassEnroute.push("");

     let changeClassDelivered =["step0"];
     props.delivered==1 ? changeClassDelivered.push("active") : changeClassDelivered.push("");

const date = new Date();
date.setMinutes(date.getMinutes()+30);

let expctedTime = " : "+date.getHours().toString()+ " : "+(date.getMinutes().toString()) +" ";
expctedTime +=   date.getHours()>12 ? "PM" :"AM";

if(!isTimeSet){
setTime(expctedTime);
setTimeSet(true);
}


    return( 
    <div className='FeedbackFluidContainer'>
    <div className="container px-1 px-md-4 py-5 mx-auto ">
    <div className="card ">
      <div className="row d-flex justify-content-between px-3 top">
        <div className="d-flex">
          <h5>ORDER No<span className="text-primary font-weight-bold">#{props.oderId}</span></h5>
        </div>
        <div className="d-flex flex-column text-sm-right">
          <p className="mb-0">Expected Arrival <span>{time}</span></p>
        </div>
      </div>
      {/* Add class 'active' to progress */}
      <div className="row d-flex justify-content-center">
        <div className="col-12">
          <ul id="progressbar" className="text-center">
            <li  className={changeClassAccepted.join(" ")} />
            <li  className={changeClassPreparing.join(" ")} />
            <li  className={changeClassEnroute.join(" ")} />
            <li   className={changeClassDelivered.join(" ")} />
          </ul>
        </div>
      </div>
      <div className=" justify-content-between top row">
        <div className=" d-flex col-3">
          <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
          <div className="d-flex flex-column">
            <p className="font-weight-bold">Order<br />Accepted</p>
          </div>
        </div>
        <div className=" d-flex col-3">
          <img className="icon" src="https://cdn-icons-png.flaticon.com/512/651/651203.png" />
          <div className="d-flex ">
            <p className="font-weight-bold">Order<br />Preparing</p>
          </div>
        </div>
        <div className=" d-flex col-3">
          <img className="icon" src="https://cdn0.iconfinder.com/data/icons/logistics-delivery-set-2-1/512/1-512.png" />
          <div className="d-flex flex-column">
            <p className="font-weight-bold">Order<br />En Route</p>
          </div>
        </div>
        <div className=" d-flex col-3">
          <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
          <div className="d-flex flex-column">
            <p className="font-weight-bold" >Order<br />Delivered</p>
          </div>
        </div>
        <center>
        <div className="w-100 p-3 mt-3 " style={{backgroundColor: '#eee'}}>
            <img className='icon ' src="https://cdn-icons-png.flaticon.com/512/1920/1920658.png"></img>
            <p className='mt-3'>Delivery Partner :{props.name}</p>
            <p>Mobile No : {props.number}</p>
        </div>
        <div>
        <button className='btn btn-success' onClick={()=>props.buttons()}>Check Status</button>
        </div>
        </center>

      </div>
    </div>
    
  </div>
  </div>)
}

export default Map;