import { useEffect, useState } from "react";
import { Button, Rate } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function Menu() {

    //var [defaultSearch, setdefaultSearch] = useState("pune")
    const navigate = useNavigate();
    var defaultSearchCity = "pune"
    var defaultSearch = ""
    // var count=0;
    var [menu, setMenu] = useState({
        menu: [

            {
                hotelName: "",
                hotelType: "",
                hotelphoto: "",
                rating: "",
                description: ""
            }
        ]
    });

    var { searchBy } = useParams();
    var { search } = useParams();

    if (searchBy != undefined) {
        console.log(searchBy)
        defaultSearchCity = searchBy
    }

    useEffect(() => {
        
        

        // count=count+1;
    //    Navbar.getcustomer();
        if (search != undefined) {
            
            axios.get(`http://localhost:8081/day15_boot/deliveryPartner/search/${search}`).then((response)=>{
                console.log(search)
                console.log(response.data)
                setMenu({ menu: response.data });
            })
        }   
        else {
            axios.get(`http://localhost:8081/day15_boot/deliveryPartner/home/${defaultSearchCity}`).then((response) => {
                console.log(searchBy)
                console.log(response.data)
                setMenu({ menu: response.data });
            })
        }
    }, []);


    var visitHotel = (id) => {
        navigate(`/visit/${id}`)
        // sessionStorage.clear();
        // sessionStorage.setItem("hotel_id", id);
    }
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {
                        menu.menu.map(ele => {
                            return (
                                <div style={{margin:"15px"}} className="col-md-3">
                                    <div className="card" style={{ width: '18rem' }}>
                                   
                                        <img src={`http://localhost:8081/day15_boot/image/${ele.hotelphoto}`}
                                            className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.hotelName}</h5>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">{ele.hotelType}</li>
                                                <li class="list-group-item">
                                                    <Rate defaultValue={ele.rating} disabled />
                                                </li>
                                                <li class="list-group-item">{ele.description}</li>

                                                <li class="list-group-item" style={{ color: "green" }}>Open Now</li>
                                                {/* {
                                                        ele.cuisines.map(item=>{
                                                            return(<li class="list-group-item" style={{fontSize:"14px"}}>{item}</li>)
                                                        })
                                                    } */}

                                            </ul>
                                            <br></br>
                                            <center>
                                                <Button className="btn btn-primary" onClick={() => { visitHotel(ele.id) }}>Visit</Button>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </div>



        </>
    )
}

export default Menu;