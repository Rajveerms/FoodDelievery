import HotelOrders from "./components/HotelOrders";
import DeliveryPartnerDashboard from "./components/deliveryPartnerDashboard";
import Menu from "./components/dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login2 from "./components/Login2";
function AfterLoginProtectedRoute()
{
    if(sessionStorage.getItem("role")==="Customer")
    {
        return(
            <Menu></Menu>
        )
    }
    else if(sessionStorage.getItem("role")==="Hotel Owner")
    {
        return(
            <HotelOrders></HotelOrders>
        )
    }
    else if(sessionStorage.getItem("role")==="Admin")
    {
        return(
            <AdminDashboard></AdminDashboard>
        )
    }
    else
    {
        if(sessionStorage.getItem("id") != undefined)
        return(
            <DeliveryPartnerDashboard></DeliveryPartnerDashboard>
        )
        else
            return(
                <Login2></Login2>
            )
    }
    
   
}
export default AfterLoginProtectedRoute;