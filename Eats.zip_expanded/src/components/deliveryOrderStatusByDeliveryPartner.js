import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams , useNavigate} from "react-router-dom";

function DeliveryOrderStatusByDeliveryPartner()
{
    const navigate = useNavigate();
     var acceptedOrder = useLocation()
    
    var [order, setOrder]=useState({
        "id":acceptedOrder.state.id,
        "price" : acceptedOrder.state.price,
        "source" : acceptedOrder.state.source,
        "destination" : acceptedOrder.state.destination,
        "status" : acceptedOrder.state.status
})

    useEffect(()=>{

        console.log(acceptedOrder.state)
        setOrder({
            "id":acceptedOrder.state.id,
            "price" : acceptedOrder.state.price,
            "source" : acceptedOrder.state.source,
            "destination" : acceptedOrder.state.destination,
            "status" : acceptedOrder.state.status
    })

    }, [])
    

    var statusUpdated=(arg)=>
    {
        console.log(arg.target.value)
        var updated={...order}
        updated.status=arg.target.value
        console.log(updated)
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.put(`http://localhost:8081/day15_boot/deliveryPartner/${sessionStorage.getItem("id")}/acceptOrder/${order.id}/${arg.target.value}`, updated, config)
        .then((res)=>{
            console.log(res)
            if(arg.target.value == "DELIVERED")
                navigate("/afterLogin")
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    return(
        <>
            
      <center>
      <div className="container">
        <div className="card" style={{width: '36rem'}}>
            <div className="card-body">
            <h5 className="card-title text-primary">Order Details</h5>
            <p className="card-text text-secondary" >Details of accepted order </p>
            <ul class="list-group list-group-flush  ">
            <li class="list-group-item text-secondary">Order id : {order.id}</li>
            <li class="list-group-item text-secondary">Order price : {order.price}</li>
            <li class="list-group-item text-secondary">Pick Up address : {order.source}</li>
            <li class="list-group-item text-secondary">Destination address : {order.destination}</li>
        </ul>
            <hr></hr>
            
            <select class="selectpicker btn btn-warning" onChange={statusUpdated}>
                <option title="Combo 1">ACCEPTED</option>
                <option title="Combo 2">PICKEDUP</option>
                <option title="Combo 3">DELIVERED</option>
            </select>            
            </div>
        </div>
      </div>
      </center>
    

        </>
    )
}

export default DeliveryOrderStatusByDeliveryPartner;
