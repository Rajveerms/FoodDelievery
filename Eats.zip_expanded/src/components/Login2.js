import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
function Login2() {

  var [customer, setcustomer] = useState(
    { username: "", password: "" });
  var [role, setRole] = useState({ role: "Customer" })
  var [Loginstatus1, setLoginstatus1] = useState("")
  // const history = useHistory();
  const navigate = useNavigate();


  var afterlogin = () => {
    saveRole();
    console.log("Loged in");
    console.log(customer);
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
      document.getElementById("error1").innerText = "";
      document.getElementById("error2").innerText = "";

      var path = "";
      if (role.role == "Hotel Owner") {
        console.log("path is " + role.role);
        path = "http://localhost:8081/day15_boot/hotelowner/login";
      }
      else if (role.role == "Customer") {
        path = "http://localhost:8081/day15_boot/customer/login";
      }
      else if (role.role == "Admin") {
        axios.post("http://localhost:8081/day15_boot/authenticate", customer).then((response) => {
          sessionStorage.setItem("token", response.data)
        })
        if (customer.username == "Admin" && customer.password == "Password") {
          navigate('/afterLogin')
        }
        else {
          setLoginstatus1("Login failed");
          console.log("error");
        }
      }
      else if (sessionStorage.getItem("role") == "Delivery Partner") {
        axios.post("http://localhost:8081/day15_boot/authenticate", customer).then((response) => {

          sessionStorage.setItem("token", response.data)
          var token = sessionStorage.getItem("token")
          const config = {
            headers: {
              "Authorization": "Bearer " + token
            }
          };
          axios.post("http://localhost:8081/day15_boot/deliveryPartner/login", customer, config).then((response) => {
            console.log(response.data);
            if (response.data != 0) {
              // Shard method : 


              setLoginstatus1("");
              console.log("errorrt");
              sessionStorage.setItem("id", response.data)

              navigate("/afterLogin")

            }
            else {
              setLoginstatus1("Login failed");
            }

          })
        })
      }
      // my code


      //for customer
      if (path != "") {
        console.log('In path ');

        axios.post("http://localhost:8081/day15_boot/authenticate", customer).then((response) => {

          sessionStorage.setItem("token", response.data)
          var token = sessionStorage.getItem("token")
          const config = {
            headers: {
              "Authorization": "Bearer " + token
            }
          }

          axios.post(path, customer, config)
            .then(function (response) {
              var x = response.data;
              var user_id = Number.parseInt(x);

              console.log(user_id);
              localStorage.setItem("user_id", user_id);
              // Sharad method : 
              var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
              const getCartId = axios.get(`http://localhost:8081/day15_boot/cart/cartId/${response.data}`,config).then((response) => {
                console.log("hii" + response.data)
                localStorage.setItem("cartId", response.data)

              }
              )


              if (response.data != "-1") {


                //, { replace: true }
                // localStorage.setItem("user_id",user_id);
                navigate('/afterLogin')
                //  history.push("/afterLogin");
              }
              else {
                document.getElementById("error1").innerText = "Login failed!";
                setLoginstatus1("Login failed");
                console.log("errorrt");
              }
            })
            .catch(function (error) {
              console.log(error);
              setLoginstatus1("Login failed");

            });


        })






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

  }

  var saveRole = () => {

    sessionStorage.clear();
    sessionStorage.setItem("role", role.role);

  }

  return (

    <div className="container">
      <h2 style={{ textAlignVertical: "center", textAlign: "center", }} >{role.role} Login</h2>
      <center><h5 id="error1" style={{ color: "red" }}>{Loginstatus1}</h5></center>
      <select class="selectpicker btn btn-warning" onChange={selectedRole}>
        <option title="Combo 1">Customer</option>
        <option title="Combo 2">Hotel Owner</option>
        <option title="Combo 3">Delivery Partner</option>
        <option title="Combo 3">Admin</option>
      </select>
      <br></br>
      <br></br>
      {/* <form> */}
      {/* Email input */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email address</label>
        <input type="email" id="form2Example1" onChange={HandleChange} placeholder="Enter Username" name="username" className="form-control" />
        <div>
          <h6 style={{ color: "red" }} id="error1"></h6>
        </div>
      </div>
      {/* Password input */}
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Password</label>
        <input type="password" onChange={HandleChange} placeholder="Enter Password" id="form2Example2" name="password" className="form-control" />
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
        <div className="col">
          {/* Simple link */}
          <a href="/forgot">Forgot password?</a>
        </div>
      </div>
      {/* Submit button */}
      {/* //a href="/afterLogin" */}
      <center><button onClick={afterlogin} className="btn btn-primary btn-block mb-4">Log in</button></center>
      {/* Register buttons */}
      <div className="text-center">
        <p>Not a member? <a href="/register" className="btn btn-success" onClick={saveRole}>Register</a></p>
      </div>
      {/* </form> */}
    </div>
  );
}

export default Login2;