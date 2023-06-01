import './common.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Address() {


  const navigate = useNavigate();
  const { cust_Id } = useParams();


  var [custo_address, setaddress] = useState(
    {
      line1: "", line2: "", country: "", state: "", city: "", pincode: ""

    });
  var addressdata = {
    "addressLine1": "",
    "addressLine2": "",
    "city": "",
    "country": "",
    "pincode": "",
    "state": ""
  }

  var hotelDocument = {
    "firstName": "Praj",
    "lastName": "Patil",
    "email": "Praj@gmail.com",
    "password": "Praj@123",
    "username": "Praj123",
    "hotelName": "The Ketan Hotel",
    "mobileNo": "8459968355",
    "hotelType": 1,
    "rating": 5,
    "description": "Best",
    "address": {
      "addressLine1": "At post Chikhali",
      "addressLine2": "Chikali",
      "city": "Shrigondda",
      "country": "India",
      "pincode": "414103",
      "state": "Maharashtra"
    }
  }



  var clearAllfield = () => {
    var copy = { ...custo_address };
    copy.city = "";
    copy.line1 = "";
    copy.line2 = "";
    copy.country = "";
    copy.state = "";
    copy.city = "";
    copy.pincode = "";
    setaddress(copy);
  }
  var next = () => {


    let i = 0;
    let count = 0;
    for (const key in custo_address) {

      i = i + 1;
      console.log("error" + i);
      console.log("hi " + custo_address[key]);

      if (custo_address[key] == "") {
        console.log("Hi");
        document.getElementById("error" + i).innerText = "required";
        count = count + 1;
      }
      else {
        document.getElementById("error" + i).innerText = "";
      }


    }
    if (count > 0)
      console.log("something wrog " + count);
    else {
      console.log(custo_address);
      addressdata.addressLine1 = custo_address.line1;
      addressdata.addressLine2 = custo_address.line2;
      addressdata.country = custo_address.country;
      addressdata.state = custo_address.state;
      addressdata.city = custo_address.city;
      addressdata.pincode = custo_address.pincode;

      var path = "http://localhost:8080/day15_boot/customer/registerAddress/" + cust_Id;
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      console.log(path);
      axios.post(path, addressdata, config)
        .then(res => {
          navigate(`/userCardDetails/${cust_Id}`)
          console.log(res.data);

        })



    }











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
                    <h3 className="mb-5 text-uppercase">Address Info</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">Address Line 1</label>
                          <input type="text" name="line1" value={custo_address.line1} onChange={HandleChange} id="line1" placeholder="Enter Address Line1" className="form-control form-control-lg" />

                          <div>
                            <h6 style={{ color: "red" }} id="error1"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n">Address Line 2</label>
                          <input type="text" name="line2" value={custo_address.line2} placeholder="Enter Address Line2" onChange={HandleChange} id="line2" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error2"></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <select className="select Country" value={custo_address.country} id="country" name="country" onChange={HandleChange}>
                          <option value={1} selected>Country</option>
                          <option value={"India"}>India</option>
                          <option value={"Japan"}>Japan</option>
                          <option value={"England"}>England</option>
                        </select>
                      </div>
                      <div>
                        <h6 style={{ color: "red" }} id="error3"></h6>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="select state" value={custo_address.state} id="state" name="state" onChange={HandleChange}>
                          <option value={"State"} selected>State</option>
                          <option value={"Maharashtra"}>Maharashtra</option>
                          <option value={"GOA"}>GOA</option>
                          <option value={"Gujrat"}>Gujrat</option>
                        </select>
                      </div>

                      <div>
                        <h6 style={{ color: "red" }} id="error4"></h6>
                      </div>

                      <div className="col-md-6 mb-4">
                        <select className="select city" id="city" value={custo_address.city} name="city" onChange={HandleChange}>
                          <option value={"City"} selected >City</option>
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
                      <input type="text" id="pincode" value={custo_address.pincode} placeholder="Enter Pincode" name="pincode" onChange={HandleChange} className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error6"></h6>
                      </div>
                    </div>


                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" onClick={clearAllfield} className="btn btn-light btn-lg">Reset all</button>
                      {/* href='/userCardDetails' */}
                      <button type="button" onClick={next} className="btn btn-warning btn-lg ms-2">Next</button>
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

export default Address;