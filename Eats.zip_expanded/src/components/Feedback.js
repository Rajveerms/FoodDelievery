import React, { useState } from 'react';
import './Feedback.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Feedback(props) {

  const [star,setStar] = useState(0);
  const [message,setMessage] = useState(" ");

  let handleMessageChange = (event)=>{
setMessage(event.target.value);
console.log(message);
  }

  const { id } = useParams();
  console.log(id);

let setstarvalue = (event)=>{
setStar(event.target.value);
console.log(star);
}
console.log(star);
 
const navigate = useNavigate();

const sendFeedback = ()=>{
  

  const sendData = {
    "id":id,
    "rating":star,
    "description":message
    }
    var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    axios.post("http://localhost:8081/day15_boot/feedback/addingfeedback",sendData, config);
    navigate('/');
  }

  

    return (<div className=' FeedbackFluidContainer'>
    
    
          <center className='outerClassFeedback mt-5'>
                        <h1>How you liked the food?</h1>

          <div className='containerFeedback mt-5'>
           <div>
           </div>
            <div className='star-widget'>
                <input type="radio" value="5" onChange={setstarvalue} name="rate" id="rate-5"></input>
                <label for="rate-5"  className='fas fa-star'></label>
                <input type="radio" onChange={setstarvalue} value="4" name="rate" id="rate-4"></input>
                <label for="rate-4"  className='fas fa-star'></label>
                <input type="radio" onChange={setstarvalue} value="3" name="rate" id="rate-3"></input>
                <label for="rate-3"  className='fas fa-star'></label>
                <input type="radio" onChange={setstarvalue} value="2" name="rate" id="rate-2"></input>
                <label for="rate-2" className='fas fa-star'></label>
                <input type="radio" value="1" onChange={setstarvalue} name="rate" id="rate-1"></input>
                <label for="rate-1"  className='fas fa-star'></label>
                <form action='#'>
                  <header>  </header>
                  <div className='textarea'>
                  <textarea cols="30" placeholder='Describe your experience.' value={message} onChange={handleMessageChange}></textarea>
                  </div>
                  <div className='btnFeedback'>
                    <button onClick={sendFeedback} className='buttonFeedback' type='submit'>Post</button>
                  </div>
                  
                </form>
            </div>
           </div>
           </center>
           </div>);
}

export default Feedback;