import { useState } from 'react';
import './common.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function HotelOwnerDocument() {


  var [state, setState] = useState({
    hotelPhoto: null, aadharNo: "", aadharPhoto: null, panNo: "", panPhoto: null, fsasiiNo: "", fp: null
  })
  var navigate = useNavigate();
  const { hotel_Id } = useParams();
  var docs = {


    "panPhoto": null,
    "aadharPhoto": null,
    "fsaiiPhoto": null,
    "hotelPhoto": null
  }
  var hotelData = {

    "panNo": "",
    "aadharNo": "",
    "fsaiiNo": "",
  }
  var change = (args) => {
    console.log(hotel_Id);
    var updated = { ...state };
    if (args.target.name == "hotelPhoto") {

      var photo = args.target.files[0];

      updated.hotelPhoto = photo;
    }
    else if (args.target.name == "aadharPhoto") {

      var photo = args.target.files[0];

      updated.aadharPhoto = photo;
    }
    else if (args.target.name == "panPhoto") {
      console.log("hI");
      var photo = args.target.files[0];

      updated.panPhoto = photo;
    }

    else if (args.target.name == "fp") {
      console.log("hI");
      var photo = args.target.files[0];

      updated.fp = photo;
    }

    else
      updated[args.target.name] = args.target.value;

    console.log(args.target.value)
    console.log(updated)

    setState(updated)

  }

  var clearAll = () => {
    console.log("In clear All");
    var updated = { ...state };
    updated.hotelname = ""
    updated.hotelPhoto = null;
    updated.aadharNo = "";
    updated.aadharPhoto = null;
    updated.panNo = ""
    updated.panPhoto = null;
    updated.fasiiNo = "";
    updated.fasiiPhoto = null;


    setState(updated)
  }

  var reset = () => {

  }
  var next = () => {


    let i = 0;
    let count = 0;
    for (const key in state) {

      i = i + 1;
      console.log("error" + i);
      console.log("hi " + state[key]);

      if (key == "hotelPhoto" && state[key] == null) {

        document.getElementById("error" + i).innerText = "required";
      }
      else if (key == "aadharPhoto" && state[key] == null) {
        document.getElementById("error" + i).innerText = "required";
      }
      else if (key == "panPhoto" && state[key] == null) {
        document.getElementById("error" + i).innerText = "required";
      }

      else if (key == "fp" && state[key] == null) {
        document.getElementById("error" + i).innerText = "required";
      }



      else if (state[key] == "") {
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
      docs.aadharPhoto = state.aadharPhoto;
      docs.panPhoto = state.panPhoto;
      docs.aadharPhoto = state.aadharPhoto;
      docs.fsaiiPhoto = state.fp;
      docs.hotelPhoto = state.hotelPhoto;



      hotelData.aadharNo = state.aadharNo;
      hotelData.panNo = state.panNo;
      hotelData.fsaiiNo = state.fsasiiNo;
      console.log(hotelData);
      console.log(docs);
      var x = new FormData();
      x.append("aadharPhoto", docs.aadharPhoto);
      x.append("panPhoto", docs.panPhoto);
      x.append("fsaiiPhoto", docs.fsaiiPhoto);
      x.append("hotelPhoto", docs.hotelPhoto);
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
      axios.post("http://localhost:8081/day15_boot/hotelowner/registerdocumnets", hotelData)
        .then(res => {

          console.log(res.data);
          var docs_Id = res.data;


          var path = "http://localhost:8081/day15_boot/hotelowner/registerdocumnets/" + hotel_Id + "/" + docs_Id;

          axios.post(path, x)
            .then(res => {

              navigate(`/HotelOwnerMenuEntry/${hotel_Id}`);

            })



          //  navigate(`/hotelOwnerDocs/${hotel_Id}`)

        })
    }

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
                    <h3 className="mb-5 text-uppercase">Hotel owner Docs</h3>
                    <div className="row">


                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">Hotel Photo</label>
                          <input type="file" id="form3Example1n1" className="form-control form-control-lg" onChange={change} name="hotelPhoto" />
                          <div>
                            <h6 style={{ color: "red" }} id="error1"></h6>
                          </div>

                        </div>
                      </div>



                    </div>

                    <div className="row">

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">Pan No</label>
                          <input type="text" placeholder='Enter Pan No' id="form3Example1m" className="form-control form-control-lg" onChange={change} name="panNo" />
                          <div>
                            <h6 style={{ color: "red" }} id="error4"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">Pan card</label>
                          <input type="file" id="form3Example1n1" className="form-control form-control-lg" onChange={change} name="panPhoto" />
                          <div>
                            <h6 style={{ color: "red" }} id="error5"></h6>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row">

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">Aadhar No</label>
                          <input type="text" placeholder='Enter Aadhar No' id="form3Example1m" className="form-control form-control-lg" onChange={change} name="aadharNo" />
                          <div>
                            <h6 style={{ color: "red" }} id="error2"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">Aadhar card</label>
                          <input type="file" id="form3Example1n1" className="form-control form-control-lg" onChange={change} name="aadharPhoto" />
                          <div>
                            <h6 style={{ color: "red" }} id="error3"></h6>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="row">

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1m">FSAII No</label>
                          <input type="text" placeholder='Enter FSAII No' id="form3Example1m" className="form-control form-control-lg" onChange={change} name="fsasiiNo" />
                          <div>
                            <h6 style={{ color: "red" }} id="error6"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form3Example1n1">FSAII Photo</label>
                          <input type="file" id="form3Example1n1" className="form-control form-control-lg" onChange={change} name="fp" />
                          <div>
                            <h6 style={{ color: "red" }} id="error7"></h6>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button type="button" onClick={clearAll} className="btn btn-light btn-lg">Reset all</button>

                      {/* href='/HotelOwnerMenuEntry' */}
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
  );
}

export default HotelOwnerDocument;