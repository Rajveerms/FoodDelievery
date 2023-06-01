import HotelOwnerRegister from './components/HotelOwnerRegister';
import CustomerRegister from './components/CustomerRegister';
import DeliveryPartnerRegister from './components/DeliveryPartnerRegister';
import HotelOwnerRegisterFirstPage from './components/HotelOwnerRegisterFirstPage';
function RegisterProtectedRoute()
{
    if(sessionStorage.getItem("role")==="Customer")
    {
        return(
            <CustomerRegister></CustomerRegister>
        )
    }
    else if(sessionStorage.getItem("role")==="Hotel Owner")
    {
        return(
            <HotelOwnerRegisterFirstPage></HotelOwnerRegisterFirstPage>
        )
    }
    else
    {
        return(
            <DeliveryPartnerRegister></DeliveryPartnerRegister>
        )
    }
    
   
}
export default RegisterProtectedRoute;