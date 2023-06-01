import './common.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function AddDish() {

    var [dish, setdish] = useState(
        {
            dishName: "", dishPhoto: null, cuisineCategory: "", size: "", price: "", vegNonVegCategory: 0, milltype: 0

        });

    var { hotel_Id } = useParams();

    var navigate = useNavigate();

    var dataofMenu = {

        "dishName": "",
        "vegNonVegCategory": 0,
        "cusineCategory": 0,
        "price": 0,
        "size": 0,
        "milltype": 0
    }



    var next = () => {


        let i = 0;
        let count = 0;
        for (const key in dish) {

            i = i + 1;
            console.log("error" + i);
            if(key=="dishPhoto" && dish[key]==null)
            {
                document.getElementById("error" + i).innerText = "required";
                count = count + 1;
            }

            else if (dish[key] == "") {
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
            console.log("You clicked on next button");

            var x = new FormData();
            x.append("dishPhoto", dish.dishPhoto);

            dataofMenu.cusineCategory = Number.parseInt(dish.cuisineCategory);
            dataofMenu.dishName = dish.dishName;
            dataofMenu.price = Number.parseInt(dish.price);
            dataofMenu.vegNonVegCategory = Number.parseInt(dish.vegNonVegCategory);
            dataofMenu.size = Number.parseInt(dish.size);
            dataofMenu.milltype = Number.parseInt(dish.milltype);

            console.log(dataofMenu);

            var path = "http://localhost:8081/day15_boot/hotelowner/addDish/" + hotel_Id;
            var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
            axios.post(path, dataofMenu, config).then((res) => {
                console.log(res.data);
                var path = "http://localhost:8081/day15_boot/hotelowner/addmenuPhoto/" + res.data;

                axios.post(path, x, config).then((res) => {
                    console.log(res.data);
                    navigate("/hotelOwnerDashBoard");


                })

            })

        }

    }
    var clearAllfield = () => {
        console.log("Hi");
        var copy = { ...dish };

        // var a={
        //     dishName: "", dishPhoto: null, category: "", cuisineCategory: "", scale: "", dishPrice: ""

        // }
        copy.dishName = "";
        copy.dishPhoto = null;
        copy.cuisineCategory = ""
        copy.category = "";
        copy.dishPrice = "";
        copy.scale = "";

        setdish(copy);

    }




    var HandleChange = (args) => {
        console.log(hotel_Id);
        var copydish = { ...dish };
        console.log(args.target.value);
        if (args.target.name == "dishPhoto") {
            var dishp = args.target.files[0];
            copydish.dishPhoto = dishp;

        }
        else {
            console.log(args.target.value + " hi " + args.target.name);
            copydish[args.target.name] = args.target.value;
        }
        setdish(copydish);


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
                                        <h3 className="mb-5 text-uppercase">Hotel Menu Registration</h3>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example1m">dishName</label>
                                                    <input type="text" name="dishName" onChange={HandleChange} id="form3Example1m" value={dish.dishName} placeholder="Enter Dish Name" className="form-control form-control-lg" />
                                                    <div>
                                                        <h6 style={{ color: "red" }} id="error1"></h6>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="form3Example1m">dishPhoto</label>
                                                    <input type="file" name="dishPhoto" id="dishPhoto" placeholder="Upload photo here" onChange={HandleChange} value={dish.hotelAddress} className="form-control form-control-lg" />
                                                    <div>
                                                        <h6 style={{ color: "red" }} id="error2"></h6>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <select className="vegNonVegCategory" id="vegNonVegCategory"

                                                    name="vegNonVegCategory" onChange={HandleChange}>
                                                    <option value={1} selected>Veg-NonVeg</option>
                                                    <option value={0}>Veg</option>
                                                    <option value={1}>NonVeg</option>


                                                </select>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "red" }} id="error6"></h6>
                                            </div>

                                            {/* ALL,BREAKFAST,LUNCH,DINNER */}

                                            <div className="col-md-6 mb-4">
                                                <select className="milltype" id="milltype"

                                                    name="milltype" onChange={HandleChange}>
                                                    <option value={1} selected>Mill Type</option>
                                                    <option value={0}>ALL</option>
                                                    <option value={1}>BREAKFAST</option>
                                                    <option value={2}>LUNCH</option>
                                                    <option value={3}>DINNER</option>


                                                </select>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "red" }} id="error7"></h6>
                                            </div>


                                            <div className="col-md-6 mb-4">
                                                <select className="cuisineCategory" id="cuisineCategory"

                                                    name="cuisineCategory" onChange={HandleChange}>
                                                    <option value={1} selected>Cuisine</option>
                                                    <option value={0}>Maharashtrian cuisine</option>
                                                    <option value={1}>Panjabi Cuisine</option>
                                                    <option value={2}>RAJASTAHNI Cuisine</option>

                                                </select>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "red" }} id="error3"></h6>
                                            </div>


                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <select className="select Country" id="size" name="size" onChange={HandleChange}>
                                                    <option value={1} selected>Scale</option>
                                                    <option value={0}>Small</option>

                                                    <option value={1}>Medium</option>

                                                    <option value={2}>Half</option>
                                                    <option value={4}>Large</option>
                                                    <option value={3}>Full</option>
                                                </select>
                                            </div>
                                            <div>
                                                <h6 style={{ color: "red" }} id="error4"></h6>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example1m">dishPrice</label>
                                                <input type="number" min="1" name="price" onChange={HandleChange} id="form3Example1m" value={dish.dishPrice} placeholder="Enter Dish Price" className="form-control form-control-lg" />
                                                <div>
                                                    <h6 style={{ color: "red" }} id="error5"></h6>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="d-flex justify-content-end pt-3">

                                            <button type="button" onClick={clearAllfield} className="btn btn-light btn-lg">Reset all</button>
                                            <a onClick={next} className="btn btn-warning btn-lg ms-2">Add dish</a>
                                            {/* //href='/HotelSpecificMenu' */}
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

export default AddDish;