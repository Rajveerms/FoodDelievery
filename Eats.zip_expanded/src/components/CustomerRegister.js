import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CustomerRegister() {

  const navigate = useNavigate();


  var [customer, setcustomer] = useState(
    { firstName: "", lastName: "", email: "", password: "", gender: false, photo: null, username: "",mobileNo:"" });

   var customerdata= {
      "firstName":"",
      "lastName":"",
      "email":"",
      "password":"",
      "username":"",
      "gender":0,
      "mobileNo":""
  
  }
  var next = () => {

      var count=0;
      let  i =0;
 


    for (const key in customer) {

      i= i + 1;
        console.log("error" + i);
      
        if(key=="photo" && customer[key]==null)
        {
          console.log("Photo");
          count=count+1;
          document.getElementById("error5").innerText = "required";
        }
     else if(customer[key]=="")
      {
        document.getElementById("error" + i).innerText = "required";
        count=count+1;
      }
      else
      {
        console.log("Hi");
        document.getElementById("error" + i).innerHTML = "";
      }
      }

if(count>=1)
{
  console.log("some field remaining..."+count);
}
else{

    var x=new FormData();

    x.append("photo",customer.photo);

customerdata.firstName=customer.firstName;
customerdata.lastName=customer.lastName;
customerdata.email=customer.email;
customerdata.username=customer.username;
customerdata.password=customer.password;
if(customer.gender=="Male")
customerdata.gender=0;
else
customerdata.gender=1;
customerdata.mobileNo=customer.mobileNo;

console.log(customerdata);


//for customer data
var cust_Id;
var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
axios.post("http://localhost:8081/day15_boot/customer/registerCustomerData",customerdata)
        .then (res => {
           console.log(res.data);
           cust_Id=res.data;

           var path="http://localhost:8081/day15_boot/customer/registercustomerphoto/"+res.data;
           console.log(path);

           
            axios.post(path,x)
           .then (res => {
            navigate(`/userNext/${cust_Id}`)
           console.log(res.data);

           })

        })
    
      }




  }

  var reset = () => {
    let i = 0;
    console.log("In reset");
    var copy = { ...customer };
    for (const key in customer) {
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

    setcustomer(copy);
  }
  var HandleChange = (args) => {

    var copycustomer = { ...customer};
    
    if(args.target.name=="photo")
        {
          var photo = args.target.files[0];
          copycustomer.photo=photo;
        }
        else{
              copycustomer[args.target.name] = args.target.value;
          } 
  
    setcustomer(copycustomer);
    console.log(copycustomer);

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
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m1">Email</label>
                          <input type="text" name="email" placeholder="Enter Email" onChange={HandleChange} id="email" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error3"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">Password</label>
                          <input type="password" name="password" placeholder="Enter Password" onChange={HandleChange} id="password" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error4"></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example8">Photo</label>
                      <input type="file" id="photo" placeholder="Upload your photo" onChange={HandleChange} name="photo" className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error5"></h6>
                      </div>
                    </div>
                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Gender: </h6>
                      <div className="form-check form-check-inline mb-0 me-4">
                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                        <input className="form-check-input" type="radio" onChange={HandleChange} name="gender" id="gender" defaultValue="Female" checked/>

                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                        <input className="form-check-input" type="radio" onChange={HandleChange} name="gender" id="gender" defaultValue="Male" />

                      </div>

                      <div className="form-check form-check-inline mb-0">
                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                        <input className="form-check-input" type="radio" onChange={HandleChange} name="gender" id="gender" defaultValue="Other" />

                      </div>

                    </div>
                    <div>
                      <h6 style={{ color: "red" }} id="error6"></h6>
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

                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" onClick={reset} className="btn btn-light btn-lg">Reset all</button>
                      {/* a href='/userNext' */}
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
    // </form>
  );
}

export default CustomerRegister;

