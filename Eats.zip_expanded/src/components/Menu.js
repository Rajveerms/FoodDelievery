import React from 'react'
import './Menu1.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Menu = ({items}) => {

  const navigate = useNavigate();

  const [filteMenuItems,setMenuFilterItems]=useState([]);

 useEffect(()=>
 {
        setMenuFilterItems(items);
 },[items])
  var addToCart=(item)=>
  {
    console.log("Item added to cart")
    console.log("cartItem id "+item);
    navigate(`/addToCart/${item}`)
    // axios.get(`http://localhost:8081/day15_boot/addToCart/${item}`).then(res=>
    // {
    //   console.log(res.data);
      
    //   localStorage.setItem("cartItem",item);
    // })
    // sessionStorage.clear();
    // sessionStorage.setItem("name", item.name)
    // sessionStorage.setItem("price", item.price)
    // sessionStorage.setItem("image",item.src)
  }

  // <option value="Breakfast">Breakfast</option>
  // <option value="Lunch">Lunch</option>
  // <option value="Dinner">Dinner</option>
  // <option value="Maharashtrain">Maharashtrain</option>
  // <option value="Punjabi">Punjabi</option>
  // <option value="Rajasthani">Rajasthani</option>
  // <option value="Veg">Veg</option>
  // <option value="NonVeg">Non-Veg</option>
  const display=()=>
{ 
    var x = document.getElementById("s1").value;
  if(x =="Breakfast")
  {
  
   const brkMENU =  items.filter(ele=>
    {
      if(ele.milltype == "BREAKFAST")
      return true;
      else
      return false;
    })
    setMenuFilterItems(brkMENU);
  }  
  else if(x == "Lunch") 
  {
    const lunchMENU =  items.filter(ele=>
      {
        if(ele.milltype == "LUNCH")
        return true;
        else
        return false;
      })
      setMenuFilterItems(lunchMENU);
  }
else if (x == "Dinner")
 { 

  
    const dinnerMENU =  items.filter(ele=>
      {
        if(ele.milltype == "DINNER")
        return true;
        else
        return false;
      })
      setMenuFilterItems(dinnerMENU);
  }
   else if (x == "Maharashtrain")
   {
  
    const mahaMenu = items.filter(ele=>
    {
      if(ele.cusineCategory == "MAHARASHTRIAN")
      return true;
      else
      return false;
    })
    setMenuFilterItems(mahaMenu);
  
  }
  else if ( x== "Punjabi")
  {
  
    const punjabiMenu = items.filter(ele=>
      {
        if(ele.cusineCategory == "PUNJABI")
        return true;
        else
        return false;
      })
      setMenuFilterItems(punjabiMenu);
  }
  else if ( x == "Rajasthani")
  {
 
    const rajaMenu = items.filter(ele=>
      {
        if(ele.cusineCategory == "RAJASTHANI")
        return true;
        else
        return false;
      })
      setMenuFilterItems(rajaMenu);
  }
  else if(x == "Veg")
  {
 
    const vegMenu = items.filter(ele=>
      {
        if(ele.vegNonVegCategory == "VEG")
        return true;
        else
        return false;
      })
      setMenuFilterItems(vegMenu);
  }
  else if(x == "NonVeg")
  {
  
    const nonvegMenu = items.filter(ele=>
      {
        if(ele.vegNonVegCategory == "NON_VEG")
        return true;
        else
        return false;
      })
      setMenuFilterItems(nonvegMenu);
  }

}






  return (
    <div>
       <div className="container">
        <div className="row">
          <div className="col-3">
          <div>
                    <h5 className="p-1 border-bottom">Filter By</h5>
                    
        {/* <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={AllType}> All</button><p> </p> */}

        <select onClick={display} id="s1" className="form-select">
        <option>select</option>
        <optgroup label='Meal Types'>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        </optgroup>
        <optgroup label='Cuisine Type'>
        <option value="Maharashtrain">Maharashtrain</option>
        <option value="Punjabi">Punjabi</option>
        <option value="Rajasthani">Rajasthani</option>
        </optgroup>
        <optgroup label='Veg / Non-Veg'>
        <option value="Veg">Veg</option>
        <option value="NonVeg">Non-Veg</option>
        </optgroup>
      </select>
                            
        
        {/* <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Breakfast}>BreakFast</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Lunch}>Lunch</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Dinner}>Dinner</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Maharashtrain}>Maharashtrain</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Punjabi}>Punjabi</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Rajasthani}>Rajasthani</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={Veg}>Veg</button><p> </p>
        <button type="button" className='btn btn-info' style={{height:"45px" , width:"150px"}} onClick={NonVeg}>Non-Veg</button><p> </p> */}


        
                </div>
          </div>
          <div className="col-8">
          <div className='Container'>
      
        {
            filteMenuItems.map((item)=>{
           
            return(
              <div className='row'>
              <div className='col-12'>
               <div key={item.id} className="main-div" >


                <div className='main-img border-radius:"30px" col-3 '>
                   <center> <img src={`http://localhost:8081/day15_boot/image/${item.dishPhoto}`} style={{height:'130px', width:'130px' ,borderRadius:"10px"}} alt=" "/></center>
                </div>




                <div className='content col-3'>
                <div className='title'>
                <h4>{item.dishName}</h4><p>  </p>
                </div>
                </div>
                <div className='col-3'>
                <h4>₹ {item.price}</h4>
                </div>
                
              

               
                <Button  className="btn btn-primary "  style={{height:"50px" ,width:"130px"}} onClick={()=>{addToCart(item.id)}}>Add to Cart</Button>
                <br></br>
                <br></br>

              

               </div> 
               </div>
               </div>
            )      
        })
        }

      </div>
    </div>
          </div>
          
        </div>
      </div>
 
    
    //     <div classname="col-4">

       
       
    // </div>
    
  )
}

export default Menu
