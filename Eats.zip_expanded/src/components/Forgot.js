import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Forgot() {

  var [customer, setcustomer] = useState(
    { username: "", password: "" });
  var [role, setRole] = useState({ role: "Customer" })
  var [Loginstatus1, setLoginstatus1] = useState("")
  // const history = useHistory();
  const navigate = useNavigate();

  const notify = () => toast("Wow so easy!");

  var afterlogin = () => {
    saveRole();
    console.log("Loged in");
    console.log(customer);
    if(customer.password=="" || customer.username==""){
        setLoginstatus1("Please fill data");
      

    }
    else{
        setLoginstatus1("");
    if (customer.password == "" && customer.username == "") {
      document.getElementById("error2").innerText = "Please fill it";
      document.getElementById("error1").innerText = "Please fill it";
    }
    else if (customer.username == "") {
      document.getElementById("error1").innerText = "Please fill it";
      document.getElementById("error2").innerText = "";
    }
    else if (customer.password == "") {
      document.getElementById("error2").innerText = "Please fill it";
      document.getElementById("error1").innerText = "";
    }


    else {
        console.log("Hello...");
      document.getElementById("error1").innerText = "";
      document.getElementById("error2").innerText = "";

      var path;
      if (role.role == "Hotel Owner") {
        path = "http://localhost:8081/day15_boot/hotelowner/forgotPassword";
      }
      else if (role.role == "Customer") {
        path = "http://localhost:8081/day15_boot/customer/forgotPassword";
      }
      
      console.log("2Hello..."+role.role);
      //for customer
      axios.post(path,{"username":customer.username,"password":customer.password})
        .then(function (response) {
      

          if (response.data != "-1") {


            navigate('/login')
         
          }
          else {

            setLoginstatus1("Username doesn't exist...please enter valid username");
            console.log("error");
          }
        })
        .catch(function (error) {
          setLoginstatus1("Username doesn't exist...please enter valid username");
        });


    }
    }


  }

  var HandleChange = (args) => {
    var copycustomer = { ...customer };
    console.log(args.value + " " + args.name);
    copycustomer[args.target.name] = args.target.value;
    setcustomer(copycustomer);
    console.log(copycustomer);

  }



  var selectedRole = (arg) => {

    console.log(arg.target.value)
    setRole({ role: arg.target.value })
    setLoginstatus1("");

  }

  var saveRole = () => {

    sessionStorage.clear();
    sessionStorage.setItem("role", role.role);
   

  }

  return (

    <div className="container">
      <h2 style={{ textAlignVertical: "center", textAlign: "center", }} >{role.role} forgot page</h2>
      <center><h5 id="error1" style={{color:"red"}}>{Loginstatus1}</h5></center>
      <select class="selectpicker btn btn-warning" onChange={selectedRole}>
        <option title="Combo 1">Customer</option>
        <option title="Combo 2">Hotel Owner</option>
        <option title="Combo 3">Delivery Partner</option>
      </select>
      <br></br>
      <br></br>
      {/* <form> */}
      {/* Email input */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Username</label>
        <input type="email" id="form2Example1" onChange={HandleChange} placeholder="Enter Username" name="username" className="form-control" />
        <div>
          <h6 style={{ color: "red" }} id="error1"></h6>
        </div>
      </div>
      {/* Password input */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">NewPassword</label>
        <input type="password" onChange={HandleChange} placeholder="Enter Password to change" id="form2Example2" name="password" className="form-control" />
        <div>
          <h6 style={{ color: "red" }} id="error2"></h6>
        </div>

      </div>

      {/* 2 column grid layout for inline styling */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          {/* Checkbox */}
          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultValue id="form2Example31" defaultChecked />
            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
          </div>
        </div>

      </div>
      {/* Submit button */}
      {/* //a href="/afterLogin" */}
      <center><button onClick={afterlogin} className="btn btn-primary btn-block mb-4">Update password</button></center>
      {/* Register buttons */}
     
      {/* </form> */}
    </div>
  );
}

export default Forgot;