import './common.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
function HotelOwnerRegister() {

  const backdata=useLocation();
  var [custo_address, setaddress] = useState(
    {
      addressLine1: "", addressLine2: "", country: "", state: "", city: "", pincode: ""

    });
    const navigate = useNavigate();
   var address={
      "addressLine1":"",
      "addressLine2":"",
      "city":"",
      "country":"",
      "pincode":"",
      "state":""
    }

  var next = () => {


   
    let i = 0;
    let count=0;
    for (const key in custo_address) {

      i = i + 1;
      console.log("error" + i);
      console.log("hi " + custo_address[key]);

      if (custo_address[key] == "") {
        console.log("Hi");
        document.getElementById("error" + i).innerText = "required";
        count=count+1;
      }
      else
      {
        document.getElementById("error" + i).innerText = "";
      }


    }
    if(count>0)
    console.log("something wrog "+count);
    else{


    console.log("You clicked on next button");
    address.addressLine1=custo_address.addressLine1;
    address.addressLine2=custo_address.addressLine2;
    address.country=custo_address.country;
    address.state=custo_address.state;
    address.city=custo_address.city;
    address.pincode=custo_address.pincode;
    
 var x=backdata.state;
    x.address=address;
   if(x.hotelType=="1")
   x.hotelType=1;
   else
   x.hotelType=0;

    console.log("Hotel Type "+x.hotelType);

    console.log(x);
    var token = sessionStorage.getItem("token")
    const config = {
      headers: {
        "Authorization": "Bearer " + token
      }
    }
    
    axios.post("http://localhost:8081/day15_boot/hotelowner/register",x)
           .then (res => {
           
           console.log(res.data);
           var hotel_Id=res.data;

          navigate(`/hotelOwnerDocs/${hotel_Id}`)

           })

          }
  }
  var clearAllfield = () => {
    console.log("In clear ")
    var copyaddress = {
      addressLine1: "", addressLine2: "", country: "", state: "", city: "", pincode: ""

    };
    setaddress(copyaddress);

  }



  var HandleChange = (args) => {
    
    var copyaddress = { ...custo_address };
    // console.log(args.value+" "+args.name);
    copyaddress[args.target.name] = args.target.value;
    setaddress(copyaddress);

  }
  return (

    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp" alt="Sample photo" className="img-fluid" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Hotel  Registration form</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example1m">AddressLine1</label>
                          <input type="text" name="addressLine1" onChange={HandleChange} id="form3Example1m" value={custo_address.addressLine1} placeholder="AddressLine1" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error1"></h6>
                          </div>
                          
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="form3Example1n">Address Line2 </label>
                          <input type="text" name="addressLine2" placeholder="Enter Address Line" onChange={HandleChange} value={custo_address.hotelAddress} id="form3Example1n" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error2"></h6>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <select className="select Country" value={custo_address.country} id="ctry" name="country" onChange={HandleChange}>
                          <option value={1}>Country</option>
                          <option value={"India"}>India</option>
                          <option value={"Japan"}>Japan</option>
                          <option value={"England"}>England</option>
                        </select>
                      </div>
                      <div>
                        <h6 style={{ color: "red" }} id="error3"></h6>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="select state" id="stat" value={custo_address.state} name="state" onChange={HandleChange}>
                          <option value={1}>State</option>
                          <option value={"Maharashtra"}>Maharashtra</option>
                          <option value={"GOA"}>GOA</option>
                          <option value={"Gujrat"}>Gujrat</option>
                        </select>
                      </div>

                      <div>
                        <h6 style={{ color: "red" }} id="error4"></h6>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="select city" id="city" name="city" value={custo_address.city} onChange={HandleChange}>
                          <option value={1}>City</option>
                          <option value={"Nagar"}>Nagar</option>
                          <option value={"Pune"}>Pune</option>
                          <option value={"Nashik"}>Nashik</option>
                        </select>
                      </div>
                      <div>
                        <h6 style={{ color: "red" }} id="error5"></h6>
                      </div>
                    </div>


                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example9">Enter Pincode</label>
                      <input type="text" id="form3Example9" placeholder="Enter Pincode" name="pincode" onChange={HandleChange} value={custo_address.pincode} className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error6"></h6>
                      </div>
                      
                    </div>


                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" onClick={clearAllfield} className="btn btn-light btn-lg">Reset all</button>
                      {/* // href='/hotelOwnerDocs' */}
                      <button  onClick={next} className="btn btn-warning btn-lg ms-2">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelOwnerRegister;