import './HotelOrderCss.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function HotelOrders() {
  const [modeldata, setModeldata] = useState({
    id: '',
    orderStatus: "NA",
    cookingStatus: "NA",
  });

  var [orders, setorders] = useState([
    {}

  ]);
  var [state, setState] = useState("");
  useEffect(() => {
    var path = "http://localhost:8081/day15_boot/hotelowner/getAllOrderofHotel/" + localStorage.getItem("user_id");
    var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    axios.get(path, config)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setFilterList(response.data);
        setorders(response.data);

      })
  }

    , []);

  var [filterList, setFilterList] = useState([]);


  var HandleChange = (arg) => {
    var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    var path = "http://localhost:8081/day15_boot/hotelowner/getAllOrderofHotel/" + localStorage.getItem("user_id");
    axios.get(path, config)
      .then(function (response) {
        // handle success
        console.log(response.data);

        setorders(response.data);

      })
   
    var val = arg.target.value;
    console.log(val +" "+ arg.target.value);
    var filteredorders = orders.filter((order) => {
      console.log(val + " " + order.cookingStatus);
      
      if (((order.cookingStatus == val) && order.orderStatus == "NEW") || (val == "HISTROY" && order.orderStatus == "OLD") || (val == "AllORDERS")) {
        console.log("Hi");
        return true;
      }
      else
        return false;
    });


    setFilterList(filteredorders);

  }
  var uporderDateorderStatus = (arg) => {

    var upd_cstat = document.getElementById("s2").value;
 
    console.log(" csta " + modeldata.cookingStatus);
    var path = "http://localhost:8081/day15_boot/hotelowner/changeorderstatus/" + modeldata.id + "/" + upd_cstat;
    console.log(path);
    var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
    axios.get(path, config)

      .then(function (response) {

        var path = "http://localhost:8081/day15_boot/hotelowner/getAllOrderofHotel/" + localStorage.getItem("user_id");
        
        axios.get(path, config)
          .then(function (response) {
            // handle success
            console.log(response.data);

            setorders(response.data);
            setFilterList(response.data);
            var ele = document.getElementsByName("type");
            for (var i = 0; i < ele.length; i++)
              ele[i].checked = false;

          })
        console.log(response.data);
      })

    console.log(modeldata.id);

   // var modal = document.getElementById('exampleModal');



  }
  var HandleChange2 = (arg) => {
    console.log("Handlechange 2" + arg.target.value);

  }


const navigate = useNavigate();  

  var addDish = ()=>{
    navigate(`/addDish/${localStorage.getItem("user_id")}`);
  }

  var imgclk = (val) => {

    var cpy = orders.filter((item) => {

      if (item.id == val) {

        setModeldata(item);
        return (true);
      }
      else
        return false;

    })

  }
  return (
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table class="table table-striped table-sm">
                <thead class="thead-light">
                  <tr>
                    <th>Order No</th>
                    <th>Order orderStatus</th>
                    <th>Cooking orderStatus</th>

                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td >{modeldata.id}</td>
                    <td>
                      {modeldata.orderStatus}
                    </td>
                    <td>{modeldata.cookingStatus
                    }</td>

                  </tr>

                  <tr>
                    <td>UpdateorderDate orderStatus?</td>
                    {/* <td>
                      <select id="s1" onChange={HandleChange2}>
                        <option>ACCEPTED</option>
                        <option>REJECTED</option>
                        <option>PENDING</option>
REJECTED,ACCEPTED,PREPARING,READY,NOTYETSTARTED
                      </select>
                    </td> */}
                    <td>
                      <select id="s2" onChange={HandleChange2}>
                      <option>Select status</option>
                        <option>REJECTED</option>
                        <option>ACCEPTED</option>
                        <option>PREPARING</option>
                        <option>READY</option>
                        <option>NOTYETSTARTED</option>
                
                        

                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" onClick={uporderDateorderStatus} class="btn btn-primary">UporderDate orderStatus</button>
            </div>
          </div>
        </div>
      </div>

      <section style={{
        width: "20%",
        padding: "10px",
        margin: "0",
        float: "left"
      }}>

        <div>
          <h6 className="p-1 border-bottom">Filter By</h6>
          <h6>Order orderStatus</h6>
          <form className="ml-md-2">
            <div className="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" defaultValue="PENDING" onChange={HandleChange} id="boring" />
              <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">Pending</label>
            </div>
            <div className="form-inline border rounded p-sm-2 my-2">
              <input type="radio" name="type" defaultValue="ACCEPTED" onChange={HandleChange} id="ugly" />
              <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Accepted</label>
            </div>
            <div className="form-inline border rounded p-md-2 p-sm-1">
              <input type="radio" name="type" defaultValue="REJECTED" onChange={HandleChange} id="notugly" />
              <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Rejected</label>
            </div>

            <div>
              <br></br>
              <h6>Cooking orderStatus</h6>
              {/* <form className="ml-md-2"> */}
              <div className="form-inline border rounded p-sm-2 my-2">
                <input type="radio" name="type" onChange={HandleChange} defaultValue="NOTYETSTARTED" id="NOTYETSTARTED" />
                <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">NotStartedPreparingYet</label>
              </div>
              <div className="form-inline border rounded p-sm-2 my-2">
                <input type="radio" name="type" onChange={HandleChange} defaultValue="PREPARING" id="preparing" />
                <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Preaparing</label>
              </div>
              <div className="form-inline border rounded p-md-2 p-sm-1">
                <input type="radio" name="type" onChange={HandleChange} defaultValue="READY" id="ready" />
                <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Ready</label>
              </div>
            </div>
            <div>
              <br></br>
              <h6>Order Histroy</h6>
              {/* <form className="ml-md-2"> */}
              <div className="form-inline border rounded p-sm-2 my-2">
                <input type="radio" name="type" onChange={HandleChange} defaultValue="HISTROY" id="notstarted" />
                <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">Histroy</label>
              </div>
            </div>
            <div>
              <br></br>
              <h6>View All Orders</h6>
              {/* <form className="ml-md-2"> */}
              <div className="form-inline border rounded p-sm-2 my-2">
                <input type="radio" name="type" onChange={HandleChange} defaultValue="AllORDERS" id="notstarted" />
                <label htmlFor="boring" className="pl-1 pt-sm-0 pt-1">All Order</label>
              </div>
              <center>
              <button className='btn btn-outline-info' onClick={addDish}>Add Dish</button>
              </center>
            </div>


          </form>
        </div>
      </section>
      <section style={{
        width: "80%",
        padding: "10px",
        margin: "0",
        float: "right"
      }}>
        <div className="container">
          <div className="row">
            {

              filterList.map(item => {
                // debugger;
                console.log("Length is " + filterList.length);
                return <>
                  <div style={{ height: "320px" }} className="col-lg-3 col-sm-5 col-11 offset-sm-0 offset-1">
                    <div className="card1" >
                      <img className="card-img-top1" src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => imgclk(item.id)} />
                      <div className="card-body1"  >
                        <p className="card-text"><b>id:{item.id}</b></p>
                        <p className="card-text"><b>Total Price:{item.price}</b></p>
                        <p className="card-text"><b>orderStatus:{item.orderStatus}</b></p>
                        <p className="card-text"><b>cookingStatus:{item.cookingStatus
                        }</b></p>
                        <p className="card-text"><b>DeliveryStatus:{item.deliveryStatus
                        }</b></p>

                        <span className="fa fa-circle" id="red" />
                        <span className="fa fa-circle" id="teal" />
                        <span className="fa fa-circle" id="blue" />
                      </div>
                    </div>
                  </div>

                </>

              })

            }
          </div>
        </div>
      </section></div>
  );


}

export default HotelOrders;