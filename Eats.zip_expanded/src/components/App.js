
import './App.css';
import Cart from './Component/Cart';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import PartOfCart from './Component/PartOfCart';
import { useState } from 'react';
import Map from './Component/Map';
import Feedback from './Component/Feedback';
import AdminDeliveryBoy from './Component/AdminDeliveryBoy';

function App() {


  const DeliveryBoy = [
                       {Name:"Random Guy",
                        Location: "Pune",
                        MobileNo:"9096157771",
                        Image: "./Image/Guy.jpg",
                        Status:0
                       },
                       {Name:"Random Girl",
                        Location: "Pune",
                        MobileNo:"9096157771",
                        Image: "./Image/Guy.jpg",
                        Status:1
                       }
                       
                      ]




 const image = [
               {Name : "Gualab jamun",
                Quantity : 0 ,
                Price : 20000,
                image : "./Image/Gulag_jamun.jpg"
               },
               {Name : "Gualab jamun Normal",
               Quantity : 0 ,
               Price : 10000,
               image : "../Image/Gulag_jamun.jpg"},
               {Name : "Gualab jamun Special",
               Quantity : 0 ,
               Price : 30000,
               image : "./Image/Gulag_jamun.jpg"}
                 
              ]

  let [orderAccepted,setOrderAccepted] = useState(1);
let [orderPreparing,setOrderPreparing] = useState(1);
let [orderEnroute,setOrderEnroute] = useState(0);
let [orderDelivered,setOrderDelivered] = useState(0);



  let  [imageState,setImageState] = useState(image);
  let [subTotal,setSubTotal] = useState(0);
  let [Discount,setDiscount] = useState(0);
  let [tax,setTax] = useState(0);
  let [total,setTotal] = useState(0);


let [name,setName] = useState("");
let [number,setNumber] = useState("");

  let incrementQuantity = (index) =>{
    let newImage = [...imageState];
    let  newSubTotal = subTotal;
    let newDiscount = Discount;
    let newTax = tax;
    let newTotal = total;
    
    newImage[index].Quantity++;
    newSubTotal +=  newImage[index].Price;
    newDiscount = ((newSubTotal)*20)/100;
    newTax = (newSubTotal*18)/100;
    newTotal = newSubTotal - newDiscount + newTax;
    setTotal(newTotal);
    setTax(newTax);
    setDiscount(newDiscount);
    setSubTotal(newSubTotal);
    setImageState(newImage);
  }

  let [decrementQuantity, setDecrementQuantity] = useState(image);

  let decrementQuantitys = (index)=>{
    let newImageSome = [...decrementQuantity];
    let  newSubTotal = subTotal;
   let newDiscount = Discount;
   let newTax = tax;
   let newTotal = total;
   newImageSome[index].Quantity--; 
    newSubTotal -= newImageSome[index].Price;
    newDiscount = ((newSubTotal)*20)/100;
    newTax = (newSubTotal*18)/100;
    newTotal = newSubTotal + newTax - newDiscount;
    setTotal(newTotal);
    setTax(newTax);
    setDiscount(newDiscount);
    setSubTotal(newSubTotal);
    newImageSome[index].Quantity > 0 ?
    setDecrementQuantity(newImageSome) : decreRemove(index);
  }

  let decreRemove = (index)=>{
    let newImage = [...imageState];
   
    newImage.splice(index,1);
   
    setImageState(newImage);
  }

  let remove = (index) =>{
    let newImage = [...imageState];
    let newSubTotal = subTotal;
    let newDiscount = Discount;
    let newTax = tax;
    let newTotal = total;
    newSubTotal -= newImage[index].Quantity*newImage[index].Price;
    newDiscount = ((newSubTotal)*20)/100; 
    newTax = (newSubTotal*18)/100;
    setTax(newTax);
    newTotal = newSubTotal+newTax-newDiscount;
    setTotal(newTotal);
    newImage.splice(index,1);
    setSubTotal(newSubTotal);
    setDiscount(newDiscount);
    setImageState(newImage);
  }

  

  return (
    <div className="App">
     <Navbar/>
     {/* <Login/> */}
     {/* <Cart image={imageState} increment={incrementQuantity} decrement={decrementQuantitys} remove={remove}/>
    <PartOfCart subTotal={subTotal} discount={Discount} tax={tax} total={total}/> */}
    <Map accepted={orderAccepted} preparing={orderPreparing} enroute={orderEnroute} delivered={orderDelivered} name={name} number={number}/>
     {/* <AdminDeliveryBoy delivery={DeliveryBoy} /> */}
     <Footer/> 
    </div>
  );
}

export default App;
