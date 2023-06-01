import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import { Navigate,useNavigate, useParams } from "react-router-dom";
function MapWrapper()
{
 
    // /:customerId

   // const { CID } = useParams();
  

    let [combineStatus,setCombineStatus] = useState([]);
    let [orderAccepted,setOrderAccepted] = useState(0);
    let [orderPreparing,setOrderPreparing] = useState(0);
    let [orderEnroute,setOrderEnroute] = useState(0);
    let [orderDelivered,setOrderDelivered] = useState(0);
    let [hotelId,setHotelId] = useState(0);
    let [name,setName] = useState("");
    let [number,setNumber] = useState("");
    let[oderId,setOrderId] = useState(0);
      
    useEffect(()=>{
      getOrderStatus();
   
    },[])
        
   
       const navigate = useNavigate();
      const goToFeedback=()=> navigate(`/Feedback/${hotelId}`);

   

      


const getOrderStatus =(async()=>{
  var token = sessionStorage.getItem("token")
  const config = {
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  await axios.get("http://localhost:8081/day15_boot/order/"+localStorage.getItem("user_id"), config).then((respone)=>{
        setCombineStatus(respone.data);
        setHotelId(respone.data.hotelId);
        setOrderId(respone.data.orderNo);
        console.log("orderId"+respone.data.orderNo);
     if(respone.data.deliveryStatus=="DELIVERED"){
       
      setTimeout(()=>{
      goToFeedback();
      changeOrderStatus();
     },2000)
      
     }
     });
})
    

const changeOrderStatus=()=>{
  var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    axios.post("http://localhost:8081/day15_boot/order/changestatus/"+oderId+"",null, config);
}

     const changeOrderAcceptedStatus = ()=>{
      getOrderStatus();
        console.log(combineStatus);

//        ACCEPTED,DELIVERED, NOTYETACCEPTED, PICKEDUP


        var x = combineStatus.cookingStatus;
        var y = combineStatus.deliveryStatus;
        setName(combineStatus.deliveryBoyName);
        setNumber(combineStatus.deliveryBoyNo);
        x=="ACCEPTED" || x=="PREPARING" || x == "READY" || x=="NOTYETSTARTED" ?setOrderAccepted(1):setOrderAccepted(0);
        x=="PREPARING" || x == "READY"   ?setOrderPreparing(1) : setOrderPreparing(0);
        y=="ACCEPTED"  || y == "DELIVERED" || y=="PICKEDUP" ?setOrderEnroute(1):setOrderEnroute(0);
        y=="DELIVERED"?setOrderDelivered(1):setOrderDelivered(0);
       // console.log(CID);
    
        
        
        


     }
   


    
    return (
       
        <>
            <Map oderId={oderId} buttons={changeOrderAcceptedStatus} accepted={orderAccepted} preparing={orderPreparing} enroute={orderEnroute} delivered={orderDelivered} name={name} number={number}/>
        </>
    )
}
export default MapWrapper
