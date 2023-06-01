import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Navbar(props) {

  const navigate = useNavigate();
  var [cities, setCities] = useState([]);
  var [search, setSearch] = useState([]);
  var [searchData, setSearchData] = useState("");
  var [photo,setPhoto]=useState("");
  var searchAction = (searchBy) => {
    console.log(searchData)
    navigate(searchBy)
   
  }
var logout=()=>{
  sessionStorage.clear();
  localStorage.clear();
}
  var [searchData, setSearchData] = useState("");


  var changeSearch = (arg) => {
    console.log("event occured")
    setSearchData(arg.target.value)
    console.log(arg)
    axios.get(`http://localhost:8081/day15_boot/deliveryPartner/hotelSuggestion/${arg.target.value}`).then((response) => {
      console.log(response.data)
      setSearch(response.data)
    })
  }

 useEffect(()=>{
getCustomer();
 },[])
  let getCustomer = async()=>{
    var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    const result = await axios.get("http://localhost:8081/day15_boot/customer/"+localStorage.getItem("user_id"), config);


    setPhoto(result.data.photo);
   
    
}

  var getCities = () => {
    axios.get("http://localhost:8081/day15_boot/deliveryPartner/allcities").then((response) => {
      console.log(response.data)
      setCities(response.data)
    })
  }

  return (<nav className="navbar navbar-expand-lg bg-body-tertiary">

    <div className="container-fluid">
      <a className="navbar-brand col-1" href="/">eats</a>


      <div className="dropdown col-2">
        <a onClick={getCities} className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Select City
        </a>
        <ul className="dropdown-menu">
          {
            cities.map(ele => {
              return (
                <li><a className="dropdown-item" href={`/city/${ele}`}>{ele}</a></li>
              )
            })
          }
        </ul>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="d-flex col-6" role="search">
          <input list="data" className="form-control me-3 " type="search" placeholder="Search by resturant, cusine or dish" aria-label="Search" onChange={changeSearch} />
            <datalist id='data'>
              {
                search.map(ele=>{
                  return(
                    <option>
                      <a >{ele}</a>
                    </option>      
                  )
                })
              }
              
            </datalist>
          <button className="btn btn-outline-success " type="submit" onClick={()=>{searchAction(`/search/${searchData}`)}}>Search</button>

        </form>
          

      </div>
      <div>
        <form className="d-flex col-3">
          <a href='login' className="btn btn-outline-success text-right me-3" type="submit">Login</a>
          <a href='/' onClick={logout} className="btn btn-outline-danger text-right me-3" type="submit">Logout</a>
        </form>
      </div>



      <center>
            <div className='d-flex col-1'>
              <button className='btn btn-outline-light'>
                <a href='/CustomerDetails'>
            <img className="rounded-circle me-5" height="50px" width="50px" alt="avatar1"  src={`http://localhost:8081/day15_boot/image/${photo}`}/>
            </a>
            </button>
            </div>
            </center>


    </div>










    
  </nav>);
}

export default Navbar;
