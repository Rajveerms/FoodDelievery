import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './components/dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HotelOwnerDocument from './components/HotelOwnerDocument';
import { Routes , Route, BrowserRouter } from "react-router-dom"
import DeliveryOrderStatusByDeliveryPartner from './components/deliveryOrderStatusByDeliveryPartner'
import App from './components/KrishApp'
import Login2 from './components/Login2';
import Address from './components/Address';
import CardPaymentRegister from './components/CardPaymentRegister';
import RegisterProtectedRoute from './RegisterProtectedRoute';
import AfterLoginProtectedRoute from './AfterLoginProtectedRoute';
import CartWrapper from './CartWrapper';
import HotelMenuRegistry from './components/HotelMenuRegistry';
import HotelSpecificMenu from './components/HotelSpecificMenu';
import MapWrapper from './components/MapWrapper';
import HotelDocsShowPage from './components/HotelDocsShowPage';
import WrapperAdminDeliveryBoy from './components/WrapperAdminDeliveryBoy';
import Map from './components/Map' 
import HotelOrders from "./components/HotelOrders";
import DeliveryPartnerDashboard from "./components/deliveryPartnerDashboard";
import HotelOwnerRegister from './components/HotelOwnerRegister';
import CustomerRegister from './components/CustomerRegister';
import DeliveryPartnerRegister from './components/DeliveryPartnerRegister';
import Feedback from './components/Feedback';
import CustomerDetails from './components/CustomerDetails'
import AddAddress from './components/AddAddress';
import AddCards from './components/AddCards';
import AdminDashboard from './components/AdminDashboard';
import AddDish from './components/AddDish';
import Forgot from './components/Forgot';
import HotelOwnerRegisterFirstPage from './components/HotelOwnerRegisterFirstPage';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path="/city/:searchBy" element={<Menu/>}></Route>
      <Route path="/search/:search" element={<Menu/>}></Route>
      <Route path='/hotelownerNext' element={<HotelOwnerRegister/>}></Route>
      <Route path="/backToAdminDashboard" element={<AdminDashboard/>}></Route>
      <Route path="/" element={<Menu/>}></Route>
      <Route path="/adminDeliveryBoy" element={<WrapperAdminDeliveryBoy/>}></Route>
      <Route path="/gotoDocsPage/:hotelId" element={<HotelDocsShowPage/>}></Route>
      <Route path="/afterPlaceOrder" element={<MapWrapper/>}></Route>
      <Route path="/HotelSpecificMenu" element={<HotelSpecificMenu/>}></Route>
      <Route path="/HotelOwnerMenuEntry/:hotel_Id" element={<HotelMenuRegistry/>}></Route>
      <Route path="/addDish/:hotel_Id" element={<AddDish/>}></Route>
      <Route path="/addToCart/:itemId" element={ localStorage.getItem("user_id")!=undefined? <CartWrapper/>:<Login2></Login2>}></Route>
      <Route path="/afterLogin" element={<AfterLoginProtectedRoute/>}></Route>
      <Route path="/visit/:hotelId" element={<App/>}></Route>
      <Route path='/login' element={<Login2/>}></Route>
      <Route path='/Feedback/:id' element={<Feedback/>} ></Route>
      <Route path='/CustomerDetails' element={<CustomerDetails/>}></Route>
      <Route path='/addAddress/:cust_Id' element={<AddAddress/>}></Route>
      <Route path='/register' element={<RegisterProtectedRoute/>}></Route>
      <Route path='/userNext/:cust_Id' element={<Address/>}></Route>
      <Route path='/userCardDetails/:cust_Id' element={<CardPaymentRegister/>}></Route>
      <Route path='/addCards/:cust_Id' element={<AddCards/>}></Route>
      <Route path='/hotelOwnerDocs/:hotel_Id' element={<HotelOwnerDocument/>}></Route>
      <Route path='/hotelOwnerDashBoard' element={<HotelOrders/>}></Route>
      <Route path='/forgot' element={<Forgot/>}></Route>
      <Route path="/deliveryOrderStatusByDeliveryPartner" element={<DeliveryOrderStatusByDeliveryPartner/>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  </React.StrictMode>
);

