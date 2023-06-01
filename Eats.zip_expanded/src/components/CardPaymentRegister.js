import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
function CardPaymentRegister() {

  const navigate = useNavigate();
  const { cust_Id } = useParams();

  var [custo_card, setcarddetail] = useState({ cardno: 0, cardname: "", cvv: "", expdate: "" });

  var customerCard = {

    "cardHolderName": "",
    "cvv": "",
    "cardNumber": "",
    "expdate": ""

  };
  //style={{color: "red"}} 
  const notify = () => toast("Registration successful!");

  var regi = () => {



    console.log("You clicked me lot");


    let i = 0;
    let count = 0;
    for (const key in custo_card) {

      i = i + 1;
      console.log("error" + i);


      if (custo_card[key] == "") {
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

      customerCard.cardNumber = custo_card.cardno;
      customerCard.cardHolderName = custo_card.cardname;
      customerCard.cvv = custo_card.cvv;
      customerCard.expdate = custo_card.expdate;
      console.log("custo id is " + cust_Id);

      console.log(customerCard + "   " + cust_Id);
      var path = "http://localhost:8081/day15_boot/customer/registerdebitcards/" + cust_Id;

      console.log(path);
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      axios.post(path, customerCard)
        .then((res) => {


        //  notify();

          navigate('/login');

        })
    }


  }

  var HandleChange = (args) => {
    var copycarddetails = { ...custo_card };
    copycarddetails[args.target.name] = args.target.value;
    setcarddetail(copycarddetails);
    console.log(custo_card);
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
                    <h3 className="mb-5 text-uppercase">Card Info</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">Card No</label>
                          <input type="text" onChange={HandleChange} id="form3Example1m" name="cardno" placeholder="Enter Card Number" className="form-control form-control-lg" />

                          <div>
                            <h6 style={{ color: "red" }} id="error1"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n">Name on Card</label>
                          <input type="text" onChange={HandleChange}

                            id="form3Example1n" name="cardname" placeholder="Name on card" className="form-control form-control-lg" />
                          <div>
                            <h6 style={{ color: "red" }} id="error2"></h6>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example9">Enter Cvv</label>
                      <input type="text" placeholder="Enter Cvv" onChange={HandleChange} id="form3Example9" name="cvv" className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error3"></h6>
                      </div>

                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example9">Expiry Date</label>
                      <input type="date" onChange={HandleChange} id="form3Example9" name="expdate" className="form-control form-control-lg" />
                      <div>
                        <h6 style={{ color: "red" }} id="error4"></h6>
                      </div>

                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" className="btn btn-light btn-lg">Reset all</button>
                      {/* //href='/login' */}
                      <button onClick={regi} className="btn btn-warning btn-lg ms-2">Register</button>
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

export default CardPaymentRegister;