import React from 'react'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
// import AdminDashboard from './AdminDashboard';


const AdminDashboard = () => {
    const navigate = useNavigate();
    // const[modeldata,setModeldata]=useState({
    //     HotelNo:'',status:"NA",
    // });

    const [hotelList, setHotelList] = useState(
        [

        ]);
    var [filterlist, setFilterList] = useState([])
    useEffect(() => {
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get("http://localhost:8081/day15_boot/showAllHotels", config).then(res => {
            console.log(res.data);
            setHotelList(res.data)
        })

        setFilterList(hotelList);
    }, []);

    var HandleChange1 = () => {
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get("http://localhost:8081/day15_boot/showAllHotels", config).then(res => {
            console.log(res.data);
            setFilterList(res.data);
        })
    }
    var HandleChange2 = () => {
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get("http://localhost:8081/day15_boot/showApprovedHotels/1", config).then(res => {
            console.log(res.data);
            setFilterList(res.data);
        })
    }

    var HandleChange3 = () => {
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get("http://localhost:8081/day15_boot/showRejectedHotels/0", config).then(res => {
            console.log(res.data);
            setFilterList(res.data);
        })
    }





    var setGotoDocsPage = (id) => {
        // navigating to show docs

        navigate(`/gotoDocsPage/${id}`);
    }

    return (
        <div>
            {/* <h1>in admin AdminDashboard</h1> */}




            <section style={{
                width: "20%",
                padding: "10px",
                margin: "0",
                float: "left"
            }}>

                <div>
                    <h6 className="p-1 border-bottom">Filter By</h6>
                    <h6>Order Status</h6>
                    <form className="ml-md-2">
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" defaultValue="All" onChange={HandleChange1} id="ugly" />
                            <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Show All</label>
                        </div>
                        <div className="form-inline border rounded p-sm-2 my-2">
                            <input type="radio" name="type" defaultValue="Approved" onChange={HandleChange2} id="ugly" />
                            <label htmlFor="ugly" className="pl-1 pt-sm-0 pt-1">Approved</label>
                        </div>
                        <div className="form-inline border rounded p-md-2 p-sm-1">
                            <input type="radio" name="type" defaultValue="Rejected" onChange={HandleChange3} id="notugly" />
                            <label htmlFor="notugly" className="pl-1 pt-sm-0 pt-1">Rejected</label>
                        </div>
                        <br></br>
                        <a href='/adminDeliveryBoy' className='btn btn-warning'>Delivery Partner Status</a>


                    </form>
                </div>
            </section>
            <section style={{
                width: "80%",
                padding: "10px",
                margin: "0",
                float: "right"
            }}>

                <div className='container'>
                    <div className='row'>
                        {
                            filterlist.map((item) => {
                                console.log("length is " + filterlist.length);
                                return <>
                                    <div style={{ heigth: "320px" }} className="col-lg-3 col-sm-5 col-11 offset-sm-0 offset-1">
                                        <div className='card1'>
                                            <img className='card-img-top1' src={`http://localhost:8081/day15_boot/image/${item.documents.hotelPhoto
}`}
                                        
                                            >
                                            </img>
                                            <div className='card-body1'>
                                                <p className="card-text"><b>Hotel Name:{item.hotelName}</b></p>
                                                <p className="card-text"><b>Address:{item.address.addressLine1}
                                                    {" "}{item.address.addressLine2}{" "}{item.address.city}{" "}
                                                    {item.address.country}{" "}{item.address.pincode}
                                                    {" "}{item.address.state}
                                                </b></p>
                                                <p className="card-text"><b>Status:{item.hotelstatus}</b></p>
                                                <p className="card-text"><b>Ratings:{item.rating}</b></p>
                                                <p className="card-text"><b>Description:{item.description}</b></p>
                                                <Button class="btn btn-primary" onClick={() => { setGotoDocsPage(item.id) }}>Show Docs</Button>
                                                <br>
                                                </br>
                                                <br></br>

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
            </section>
        </div>


    )
}

export default AdminDashboard
