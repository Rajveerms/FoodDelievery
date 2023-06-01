import { useState } from 'react';
import { Input, Button, Upload } from 'antd';
import './common.css'
import axios from 'axios';

function DeliveryPartnerRegister() {


  var formdata = new FormData();

  var [state, setState] = useState({
    fname: "", lname: "", email: "", password: "", gender: "", dob: "", contactNo: "",
    vehicleRegNo: "", drivingLiscenceNO: "", addressLine1: "", addressLine2: "", city: "", country: "",
    state: "", pincode: "", file: null
  })

  var change = (arg) => {
    var updated = { ...state };
    if (arg.target.name == "drivingLiscencePhoto") {

      updated["file"] = arg.target.files[0];
    }
    else
      updated[arg.target.name] = arg.target.value;

    console.log(arg.target.value)
    console.log(updated)

    setState(updated)

  }

  var clearAll = () => {
    var updated = { ...state };
    updated.fname = ""
    updated.lname = ""
    updated.address = "";
    updated.contactNo = ""
    updated.dob = ""
    updated.drivingLiscenceNO = ""
    updated.email = "";
    updated.gender = "";
    updated.password = "";
    updated.vehicleRegNo = ""
    updated.file = ""

    setState(updated)
  }
  // fname: "", lname: "", email: "", password: "", gender: "", dob: "", contactNo: "",
  // vehicleRegNo: "", drivingLiscenceNO: "", address: "", file: null

  var sendTextData = () => {
    var data =
    {
      "deliveryBoyStatus": "ACTIVE",
      "gender": state.gender.toUpperCase(),
      "firstName": state.fname,
      "lastName": state.lname,
      "email": state.email,
      "password": state.password,
      "username": state.username,
      "mobileNo": state.contactNo,
      "address": {
        "addressLine1": state.addressLine1,
        "addressLine2": state.addressLine2,
        "city": state.city,
        "country": state.country,
        "pincode": state.pincode,
        "state": state.state
      }
    }
    var formdata = new FormData();

    formdata.append("image", state.file);

    axios.post("http://localhost:8081/day15_boot/deliveryPartner/register/data", data).then((res) => {
      if (res.data == "success") {
        console.log("Successful data upload")
        axios.post("http://localhost:8081/day15_boot/deliveryPartner/register/image", formdata).then((res) => {
          if (res.data == "success") {
            console.log("Complete success")
          }
        }).catch((error) => {
          console.log(error)
          console.log("Failure in image upload")
        })
      }
    }).catch((error) => {
      console.log(error)

      console.log("Failure in data upload...")
    })
  }
  var sendImage=()=>{
    console.log("Data sent")
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
                      <h3 className="mb-5 text-uppercase">Delivery partner registration form</h3>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" id="form3Example1m" className="form-control form-control-lg" value={state.fname} onChange={change} name="fname" />
                            <label className="form-label" htmlFor="form3Example1m">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1n" className="form-control form-control-lg" value={state.lname} onChange={change} name="lname" />
                            <label className="form-label" htmlFor="form3Example1n">Last name</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1m1" className="form-control form-control-lg" value={state.email} onChange={change} name="email" />
                            <label className="form-label" htmlFor="form3Example1m1">Email</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1n1" className="form-control form-control-lg" value={state.username} onChange={change} name="username" />
                            <label className="form-label" htmlFor="form3Example1n1">Username</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="password" id="form3Example1n1" className="form-control form-control-lg" value={state.password} onChange={change} name="password" />
                            <label className="form-label" htmlFor="form3Example1n1">Password</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input className="form-check-input" type="radio" id="femaleGender" value="female" onChange={change} name="gender" />
                          <label className="form-check-label" htmlFor="femaleGender">Female</label>
                        </div>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input className="form-check-input" type="radio" id="maleGender" value="male" onChange={change} name="gender" />
                          <label className="form-check-label" htmlFor="maleGender">Male</label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input className="form-check-input" type="radio" id="otherGender" value="other" onChange={change} name="gender" />
                          <label className="form-check-label" htmlFor="otherGender">Other</label>
                        </div>
                      </div>
                      {/* <div className="form-outline mb-4">
                      <input type="date" id="form3Example9" className="form-control form-control-lg" value={state.dob} onChange={change} name="dob" />
                      <label className="form-label" htmlFor="form3Example9">DOB</label>
                    </div> */}
                      <div className="form-outline mb-4">
                        <input type="number" id="form3Example97" className="form-control form-control-lg" value={state.contactNo} onChange={change} name="contactNo" />
                        <label className="form-label" htmlFor="form3Example97">Contact No.</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.vehicleRegNo} onChange={change} name="vehicleRegNo" />
                        <label className="form-label" htmlFor="form3Example97">Vehicle registration number</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.addressLine1} onChange={change} name="addressLine1" />
                        <label className="form-label" htmlFor="form3Example97">Address Line 1</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.addressLine2} onChange={change} name="addressLine2" />
                        <label className="form-label" htmlFor="form3Example97">Address Line 2</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.city} onChange={change} name="city" />
                        <label className="form-label" htmlFor="form3Example97">City</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.state} onChange={change} name="state" />
                        <label className="form-label" htmlFor="form3Example97">State</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.country} onChange={change} name="country" />
                        <label className="form-label" htmlFor="form3Example97">Country</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="number" id="form3Example97" className="form-control form-control-lg" value={state.pincode} onChange={change} name="pincode" />
                        <label className="form-label" htmlFor="form3Example97">pincode</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={state.drivingLiscenceNO} onChange={change} name="drivingLiscenceNO" />
                        <label className="form-label" htmlFor="form3Example97">Driving Liscence number</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="file" id="form3Example97" className="form-control form-control-lg" onChange={change} name="drivingLiscencePhoto"/>
                        <label className="form-label" htmlFor="form3Example97">Driving Liscence Photo</label>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button type="button" className="btn btn-light btn-lg" onClick={clearAll}>Reset all</button>
                        <a href="/login" type="button" className="btn btn-warning btn-lg ms-2" onClick={sendTextData}>Next</a>
                        
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

export default DeliveryPartnerRegister;