import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

function CustomerDetails(params) {

    const [customer,setCustomer] = useState({});
    const [customerHistroy,setCustomerHistroy] = useState([]);
    const [address,setAddress] = useState([{}]);
    const [showTab,setShowTab] = useState(1);
    const [custId,setCustId] = useState(0);
    const [debitCards,SetDebitCards] = useState([{}]);
  const navigate=useNavigate();
  var x="";
    useEffect(()=>{
        getCustomer();
       getCustomerHistroy();
       getDebitCards();
     
    },[])
 var x=localStorage.getItem("user_id");
    let getDebitCards = async()=>{
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        const result = await axios.get("http://localhost:8081/day15_boot/customer/cards/"+x, config);
        SetDebitCards(result.data);
       // console.log(debitCards[0]);
    }

    let getCustomerHistroy =async()=>{
        console.log("x "+x);
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        const result = await axios.get("http://localhost:8081/day15_boot/cart/"+x, config);
        console.log("Customer order history : "+result.data)
        setCustomerHistroy(result.data);
       
    }

    let getCustomer = async()=>{
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        const result = await axios.get("http://localhost:8081/day15_boot/customer/"+x, config);
    
        setCustomer(result.data);
        x="http://localhost:8081/day15_boot/image/"+result.data.photo;
        console.log("image is "+x);
        setAddress(result.data.addressList);
        
    }
var addAddress=()=>{
    navigate("/addAddress/"+localStorage.getItem("user_id"));
}
var addCards=()=>{
    navigate("/addCards/"+localStorage.getItem("user_id"));
}
const handleChange =(e)=>{
    console.log(e);
    getCustomerHistroy();
    console.log(customerHistroy);
          setShowTab(e);
         
}
    
    return(<div className='container'>
       <div className='row'>
            <div className='col-4 mt-5'>
        
            <img style={{height:"250px",width:"250px"}}class="rounded-circle" alt="avatar1" src={`http://localhost:8081/day15_boot/image/${customer.photo}`} />
             <div className='mt-5' >
            
             <p ><b>Username </b>: {customer.username}</p>
             <p ><b>Name</b> : {customer.firstName +" "+customer.lastName}</p>
             <p ><b>Gender</b> : {customer.gender}</p>
             <p><b>Email</b>: {customer.password}</p>
             <p><b>Mobile No</b> : {customer.mobileNo}</p>

             </div>
             
             <div className='row'>
                <button  onClick={addAddress} className='btn btn-outline-info flex col-4 btn-sm me-3'>Add Address</button>
                
                <button onClick={addCards} className='btn btn-outline-info col-4 btn-sm '>Add Debit Card</button>
             </div>
        
            </div>
            <div className='col-8 bg-light  mt-5'>
            
            <div className='row mt-5'>
                <center>
                <button className='btn btn-outline-success btn-md col-2 flex me-4' onClick={()=>{handleChange(1)}}>Your Orders</button>
                <button className='btn btn-outline-success btn-md col-2 flex me-4'onClick={()=>{handleChange(2)}}>Address Book</button>
                <button className='btn btn-outline-success btn-md col-2 flex me-4'onClick={()=>{handleChange(3)}}>Debit Cards</button>
                </center>
            </div>
            {
                
showTab===1 &&  <div>
                
<table className="table table-borderless text-center mt-5">
<thead>
<tr>
<th scope="col">Sr No</th>
<th scope="col">Dish Name</th>
<th scope="col">Quantity</th>
<th scope="col">Dish Price</th>
<th scope="col">Order Date</th>
</tr>
</thead>
<tbody>
{
customerHistroy.map((histroy,i)=>{

return(<>
    <tr>
<th scope="row">{i+1}</th>
<td>{histroy.dishName}</td>
<td>{histroy.quantity}</td>
<td>{histroy.dishPrice}</td>
<td>{histroy.orderdate}</td>
</tr>
    </>)
})
}
</tbody>
</table>

</div>
            }


            
                {
                    showTab===2 && <div className='w-100 p-3  h-100 d-inline-block mt-12'>
                        {
                        address.map((history,i)=>{
                         // console.log("in address "+ history.addressLine1);
                           return(<div>
                            <center>
                                    <p className='mt-5'><i class="bi bi-geo-alt-fill"></i><b> Address {i+1}</b> : {history.addressLine1},{" "}{history.addressLine2},{" "}{history.city},{" "}{history.state},{" "},{history.pincode},{" "}{history.country}</p>          
                                    </center>
                                  </div>)
                        })
                
                        }
                        
                    </div>
                }


{
showTab===3 &&  <div>
                
<table className="table table-borderless text-center mt-5">
<thead>
<tr>
<th scope="col">Sr No</th>
<th scope="col">Card Holders Name</th>
<th scope="col">Card Number</th>
<th scope="col">CVV</th>
<th scope="col">Expiry Date</th>
</tr>
</thead>
<tbody>
{
debitCards.map((histroy,i)=>{

return(<>
    <tr>
<th scope="row">{i+1}</th>
<td>{histroy.cardHolderName}</td>
<td>{histroy.cardNumber}</td>
<td>***</td>
<td>{histroy.expdate}</td>
</tr>
    </>)
})
}
</tbody>
</table>

</div>
            }
            
           
            
            </div>
           </div>
           </div>
    );
}

export default CustomerDetails;