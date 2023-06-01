import { useEffect, useState } from "react";
import {Button, Rate} from "antd";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function DeliveryPartnerDashboard()
{
    var navigate = useNavigate();
    useEffect(()=>{
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get("http://localhost:8081/day15_boot/deliveryPartner/dashboard", config).then((response)=>{
            console.log(response.data)
            setMenu(response.data)
        })
    }, [])
    var[orders, setMenu] = useState(
        [
         {
            id:1,
            from : "Hotel Vaishali, ShivajiNagar, Ratnagiri",
            to : "Sadashiv Peth, Haveli taluka, Pune",
            status : "Order not yet received"
         },
         {
            id:2,
            from : "Hotel Vaishali, ShivajiNagar, Ratnagiri",
            to : "Sadashiv Peth, Haveli taluka, Pune",
            status : "Order not yet received"
         },
         {
            id:3,
            from : "Hotel Vaishali, ShivajiNagar, Ratnagiri",
            to : "Sadashiv Peth, Haveli taluka, Pune",
            status : "Order not yet received"
         },
         {
            id:4,
            from : "Hotel Vaishali, ShivajiNagar, Ratnagiri",
            to : "Sadashiv Peth, Haveli taluka, Pune",
            status : "Order not yet received"
         }
        ]    
    );

    var saveOrder = (order)=>{
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.put(`http://localhost:8081/day15_boot/deliveryPartner/${sessionStorage.getItem("id")}/acceptOrder/${order.id}/ACCEPTED`,null, config)
        .then((res)=>{
            console.log(res)
            navigate("/deliveryOrderStatusByDeliveryPartner",{state : order})

        })
        .catch((err)=>{
            console.log(err)
        })
        // console.log("hello")
        // console.log(order)
        // navigate("/deliveryOrderStatusByDeliveryPartner",{state : order})
                
    }
    return (<>

    <div className="container my-5 col-md-9">
        
        <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col" style={{textAlign:"center"}}>Order id</th>
            <th scope="col" style={{textAlign:"center"}}>Pick Up</th>
            <th scope="col" style={{textAlign:"center"}}>Destination</th>
            <th scope="col" style={{textAlign:"center"}}>Price</th>
            <th scope="col" style={{textAlign:"center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                orders.map((order)=>{
                    return(
                        <tr>
                        <th scope="row">{order.id}</th>
                        <td>{order.source}</td>
                        <td>{order.destination}</td>
                        <td>{order.price}</td>
                        <td>
                            <Button  className="btn btn-warning" onClick={()=>{saveOrder(order)}}>Accept</Button>
                        </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </table>


    
    </div>
    
    </>)
}

export default DeliveryPartnerDashboard;