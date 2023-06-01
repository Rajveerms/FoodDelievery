import React from 'react';
import FinalProduct from './FinalProduct'

function Cart(props) {

    return(
        props.image.map((product,i)=>{
           return <FinalProduct product={product} increment={props.increment} index={i} key={i} 
           decrement={props.decrement} remove={props.remove}/>          
          })
          
    );
    
}


export default Cart;