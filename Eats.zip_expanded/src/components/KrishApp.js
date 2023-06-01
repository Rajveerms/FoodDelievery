import { useEffect, useState } from 'react';
import Menu from './Menu';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function App() {
   const navigate = useNavigate();
  const[menuItems,setMenuItems]=useState([]);
  var {hotelId} = useParams();
   useEffect(()=>{ 
      // var id = sessionStorage.getItem("id")
      // ajax call to fetch data from backend as per id
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      axios.get(`http://localhost:8081/day15_boot/showMenu/${hotelId}`).then((res)=>{
         // Menu details of corresponding hotel which will assign to "const ItemDetails"
        //  console.log("res - "+res);
        console.log(res.data)
         setMenuItems(res.data);
         
      })
      
   }, [])
  
   const orderDetails =
  [
    
  ]
  
  return (
    <div className="Container py-3">

     
      {/* <Categories filterCategories={filterItems} 
      categories={categories}></Categories> */}
      <br></br>
      <br></br>
      <Menu items={menuItems}></Menu>
    </div>
  );
}

export default App;