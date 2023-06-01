import React from 'react';
function FinalProduct(props) {

   

    return (<div className='row mt-4 '>
             <div className='col-3 text-center'>
             <img src={`http://localhost:8081/day15_boot/image/${props.product.dishPhoto}`} height='150px' width='150' alt='image'></img>
             </div>
          <div className='col-3 text-center' >
          <h4  className='text-primary '>{props.product.dishName}</h4>
          <p className='text-left'>Price : <span className="badge bg-secondary">₹ {props.product.price}</span></p>
          <p className='text-left'>Quantity : {props.product.qunatity}</p>
          <p className='text-left'>Size : {props.product.size}</p>

             
             </div>
             <div className='col-2 text-center'>
                <h5>Quantity</h5>
             <div className='btn-group' role="group" aria-label="Basic mixed styles example">
  <button type="button" className="btn btn-danger" onClick={()=>{props.decrement(props.product.itemsId)}}>-</button>
  <button type="button" className="btn btn-warning">{props.product.qunatity}</button>
  <button type="button" className="btn btn-success" onClick={()=>{props.increment(props.product.itemsId)}}>+</button>
             </div>
            
             </div>
             <div className='col-2'>
                <h4>₹</h4>
              <h3 >{props.product.price*props.product.qunatity}</h3>
             </div>
             <div className='col-2'>
             <button className='btn btn-danger' onClick={()=>{props.remove(props.product.itemsId)}}>Remove</button>
             </div>

           </div>)
}

export default FinalProduct;