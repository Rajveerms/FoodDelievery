import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
function PartOfCart(props) {

  const [open, setOpen] = useState(false);



    return ( <>
 <center>
 <Button
        onClick={() =>{ setOpen(!open); props.subTotalCal()} }
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Show Cart Total
      </Button>
      </center>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <div className="card mt-5">

<div className="card-body mx-4">
  <div className="container">
   
    <div className="row">
      
      <div className="col-xl-10">
        <p>Sub Total</p>
      </div>
      <div className="col-xl-2">
        <p className="float-end">₹ {props.subTotal}
        </p>
      </div>
      <hr />
    </div>
    <div className="row">
      <div className="col-xl-10">
        <p>Discount 20%</p>
      </div>
      <div className="col-xl-2">
        <p className="float-end">₹ {props.discount}
        </p>
      </div>
      <hr />
    </div>
    <div className="row">
      <div className="col-xl-10">
        <p>Taxes & Charges</p>
      </div>
      <div className="col-xl-2">
        <p className="float-end">₹ {props.tax}
        </p>
      </div>
      <hr style={{border: '2px solid black'}} />
    </div>
    <div className="row text-black">
      <div className="col-xl-12">
        <p className="float-end fw-bold">Total: ₹ {props.total}
        </p>
      </div>
     
    </div>
   <center>
    <a href='/afterPlaceOrder' onClick={()=>{props.placeOrder()}} className='btn btn-primary  mb-3'>Place Order</a>
    </center>
  </div>
</div>
</div>
        </div>
      </Collapse>
   
  </>)
}

export default PartOfCart;