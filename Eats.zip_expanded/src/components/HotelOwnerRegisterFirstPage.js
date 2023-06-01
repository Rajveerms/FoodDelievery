import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelOwnerRegister from './HotelOwnerRegister';

function HotelOwnerRegisterFirstPage() {

  const navigate = useNavigate();


  var [hoteldata, sethoteldata] = useState(
    { firstName: "", lastName: "",hotelName: "", hotelType: 0, email: "", password: "", username: "", mobileNo: "",  description: "" });


  var data = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "username": "",
    "hotelName": "",
    "mobileNo": "",
    "hotelType": 1,
    "hotelstatus": 0,
    "rating": 0,
    "description": ""
  }

  var next = () => {
    let i = 0;
    let count = 0;
    for (const key in hoteldata) {

      i = i + 1;
      console.log("error" + i);


      if (hoteldata[key] == "") {
        console.log("Hi");
        document.getElementById("error" + i).innerText = "required";
        count = count + 1;
      }
      else {
        document.getElementById("error" + i).innerText = " ";
      }


    }
    if (count > 0)
      console.log("something wrog " + count);
    else {
      data.description = hoteldata.description;
      data.firstName = hoteldata.firstName;
      data.lastName = hoteldata.lastName;
      data.password = hoteldata.password;
      data.email = hoteldata.email;
      data.hotelName = hoteldata.hotelName;
      data.mobileNo = hoteldata.mobileNo;
      data.username = hoteldata.username;
      if (hoteldata.hotelType == 0)
        data.hotelType = 0;
      else
        data.hotelType = 1;

      data.hotelType = hoteldata.hotelType;
      data.rating = 0;


      console.log("DATA IS AS FOLLOW" + data);
      navigate('/hotelownerNext', { state: data });
    }


  }
  var reset = () => {
    let i = 0;
    console.log("In reset");
    var copy = { ...hoteldata };
    for (const key in hoteldata) {
      i = i + 1;
      console.log(document.getElementById(key).value = "");
      if (key == "gender") {
        var ar = document.getElementsByName(key);
        console.log(ar);
        ar[0].checked = false;
        ar[1].checked = false;
        ar[2].checked = false;
      }

    }
    console.log(copy);

    sethoteldata(copy);
  }
  var HandleChange = (args) => {

    var copyhoteldata = { ...hoteldata };

    if (args.target.name == "photo") {
      var photo = args.target.files[0];
      copyhoteldata.photo = photo;
    }
    else {
      copyhoteldata[args.target.name] = args.target.value;
    }

    sethoteldata(copyhoteldata);
    console.log(copyhoteldata);

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
                    <h3 className="mb-5 text-uppercase">User registration form</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">First name</label>
                          <input type="text" name="firstName" placeholder="Enter firstName" onChange={HandleChange} id="firstName" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error1"></h6>
                          </div>

                        </div>
                      </div>




                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n">Last name</label>
                          <input type="text" name="lastName" placeholder="Enter LastName" onChange={HandleChange} id="lastName" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error2"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">Hotel name</label>
                          <input type="text" name="hotelName" placeholder="Enter firstName" onChange={HandleChange} id="hotelName" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error3"></h6>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label" htmlFor="form3Example1m">Hotel Type</label>
                      <br></br>
                      <select className="select hotelType" value={hoteldata.hotelType} id="hotelType" name="hotelType" onChange={HandleChange}>
                        <option value={"select"} selected>HotelType</option>
                        <option value={1}>Veg</option>
                        <option value={0}>NonVeg</option>

                      </select>
                      <div>
                            <h6 style={{ color: "red" }} id="error4"></h6>
                          </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m1">Email</label>
                          <input type="text" name="email" placeholder="Enter Email" onChange={HandleChange} id="email" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error5"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">Password</label>
                          <input type="password" name="password" placeholder="Enter Password" onChange={HandleChange} id="password" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error6"></h6>
                          </div>
                        </div>
                      </div>
                    </div>


                    
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example9">Username</label>

                      <input type="text" id="username" name="username" placeholder="Enter Username" onChange={HandleChange} className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error7"></h6>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example9">Mob No</label>

                      <input type="text" id="mobileNo" name="mobileNo" placeholder="Enter Mobile No" onChange={HandleChange} className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error8"></h6>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example9">Description</label>

                      <input type="text" id="description" name="description" placeholder="Enter description of Hotel" onChange={HandleChange} className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error9"></h6>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" onClick={reset} className="btn btn-light btn-lg">Reset all</button>

                      {/* href="/hotelownerNext" */}
                      <button onClick={next} className="btn btn-warning btn-lg ms-2">Next</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // </form>
  );
}

export default HotelOwnerRegisterFirstPage;

