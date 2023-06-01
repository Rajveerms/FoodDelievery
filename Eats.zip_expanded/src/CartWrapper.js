import Cart from "./components/Cart";
import PartOfCart from './components/PartOfCart'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CartWrapper() {
    //App.js Data by sharad

    const navigate = useNavigate();
    var {itemId} = useParams();
    let [imageState, setImageState] = useState([]);
    let [subTotal, setSubTotal] = useState(0);
    let [Discount, setDiscount] = useState(0);
    let [tax, setTax] = useState(0);
    let [total, setTotal] = useState(0);
    let[hotel,setHotelId] = useState(0);
    let[customer,setCustomerId] = useState(0);
    let[addItem,setCartItem] = useState([]);
    let[cartId,setCartId] = useState(0);

    const placeOrder =()=>{


        const dataRequired = 
            {
                "cartId":cartId,
                "totalAmount":total,
                "hotelId":hotel
            }
            console.log("hotelId"+hotel);

            var token = sessionStorage.getItem("token")
            const config = {
              headers: {
                "Authorization": "Bearer " + token
              }
            }
         axios.post("http://localhost:8081/day15_boot/cart/orderplaced",dataRequired, config).then((response)=>
         {
            

            
         })
         navigate(`/afterPlaceOrder`);

    }

    

    const subTotalCal = ()=>{
        let newSubTotal = 0;
       imageState.map((product)=>{
         newSubTotal +=  product.price*product.qunatity;
         let newHotelId = product.hotelId;
         setCartId(product.cartId);
         setCustomerId(product.customerId);
         setHotelId(newHotelId);
       });
       let newDiscount = 0;
      newDiscount = ((newSubTotal*12)/100);
      let newTax = 0;
      newTax = ((newSubTotal*18)/100);
      let newTotal = 0;
      newTotal = newSubTotal+newTax-newDiscount;
      setTotal(newTotal);
      setTax(newTax);
      setDiscount(newDiscount);
      setSubTotal(newSubTotal);
      setCustomerId(localStorage.getItem("user_id"));
      console.log(customer);
     }
     
    useEffect(()=>{

            setCustomerId(localStorage.getItem("user_id"));
           // console.log("Customer ID : "+customer)
          addItemToCart();
          getAllCartProducts();
       
    }, [])

    var customerId = localStorage.getItem("user_id");

   
    const getAllCartProducts =async()=>{
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        const getCartProducts = await axios.get(`http://localhost:8081/day15_boot/cart/getall/${localStorage.getItem("cartId")}`, config);
        setImageState(getCartProducts.data);
         subTotalCal();


    }
   

    const addItemToCart =async()=>{
        // from krishna
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        const getCartProducts = await axios.get(`http://localhost:8081/day15_boot/cart/${customerId}/${itemId}/`, config);
        
        
        // console.log(customerId)
        
        setCartItem(getCartProducts);
        getAllCartProducts();
        subTotalCal();

    }

 
   


       
    const UpdateQuantity =async(index,newquantity)=>{
       
        const newQuantity = 
            {
                "id":index,
                "quantity":newquantity
            }
            var token = sessionStorage.getItem("token")
            const config = {
              headers: {
                "Authorization": "Bearer " + token
              }
            }
         await axios.post("http://localhost:8081/day15_boot/cart/cartItem",newQuantity, config);
         subTotalCal();

         getAllCartProducts();
    }

    
    let decrementQuantitys = (itemsId)=>{
        const prod = imageState.map((product)=>{if(product.itemsId==itemsId){
            let oldQuantity = --product.qunatity;
            console.log(oldQuantity);
            if(oldQuantity==0){
                remove(itemsId);
            }
            UpdateQuantity(itemsId,oldQuantity);
        }});
        subTotalCal();

    }

    let incrementQuantity = (itemsId)=>{

        const prod = imageState.map((product)=>{if(product.itemsId==itemsId){
            let oldQuantity = ++product.qunatity;
            UpdateQuantity(itemsId,oldQuantity);
        }});
        subTotalCal();

  
    }
    
    let remove = async(itemsId)=>{      
        console.log(itemsId);   
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }               
     await axios.post("http://localhost:8081/day15_boot/cart/"+itemsId+"", null, config);
     getAllCartProducts();
     subTotalCal();

    }
   

    return(
    <>
        <Cart  image={imageState} increment={incrementQuantity} decrement={decrementQuantitys} remove={remove}/>
        <PartOfCart placeOrder={placeOrder} subTotal={subTotal} subTotalCal={subTotalCal} discount={Discount} tax={tax} total={total}/>
    </>
    )

}
export default CartWrapper