import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
var count =0;
const HotelDocsShowPage = () => {

  var {hotelId} = useParams();
    useEffect(()=>{
        // populate HotelDocs from backend
        var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get(`http://localhost:8081/day15_boot/showDocs/${hotelId}`, config)
        .then(res=>
            {
                console.log(res.data);
                setHotelDocs(res.data);
            })
    }, [])

    const [HotelDocs, setHotelDocs] = useState([]);

    const [disable1, setDisable1] = useState(0);
    const [disable2, setDisable2] = useState(0);
    const [disable3, setDisable3] = useState(0);
    const [disable4, setDisable4] = useState(0);

    

    var aadharUpdate=()=>
    {
       
        var upd_stat = document.getElementById("s1").value;
        console.log(upd_stat);
      
      if(upd_stat == "Approved")
      {
        document.getElementById("p1").innerHTML = "Approved";
        setDisable1(1);
        count++;
        console.log(count);
      }

    }
    var aadharUpdateR=()=>
    {
       
        var upd_stat = document.getElementById("s1").value;
        console.log(upd_stat);
      
      if(upd_stat == "Rejected")
      {
        document.getElementById("p1").innerHTML = "Rejected";
        setDisable1(1);
        count--;
        console.log(count);
      }

    }

    var panUpdate=()=>
    {
        
        var upd_stat = document.getElementById("s2").value;
        console.log(upd_stat);
        
      if(upd_stat == "Approved")
      {
        document.getElementById("p2").innerHTML = "Approved";
        setDisable2(1);
        count++;
        console.log(count);
      }

    }
    var panUpdateR=()=>
    {
        
        var upd_stat = document.getElementById("s2").value;
        console.log(upd_stat);
        
      if(upd_stat == "Rejected")
      {
        document.getElementById("p2").innerHTML = "Reject";
        setDisable2(1);
        count--;
        console.log(count);
      }

    }

    var fasaiiUpdate=()=>
    {
        
        var upd_stat = document.getElementById("s3").value;
        console.log(upd_stat);
        
      if(upd_stat == "Approved")
      {
        document.getElementById("p3").innerHTML = "Approved";
        setDisable3(1);
        count++;
        console.log(count);
      }

    }
    var fasaiiUpdateR=()=>
    {
        
        var upd_stat = document.getElementById("s3").value;
        console.log(upd_stat);
        
      if(upd_stat == "Rejected")
      {
        document.getElementById("p3").innerHTML = "Rejected";
        setDisable3(1);
        count--;
        console.log(count);
      }

    }

    var Approve=()=>
    {
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get(`http://localhost:8081/day15_boot/ApproveStatus/${hotelId}`, config).then(res=>
        {
            console.log(res.data);
        })
        console.log(count);
        if(count==3)
        {
            setDisable4(1);
            console.log(count);
            
        }
    }
    var Reject=()=>
    {
      var token = sessionStorage.getItem("token")
              const config = {
                headers: {
                  "Authorization": "Bearer " + token
                }
              }
        axios.get(`http://localhost:8081/day15_boot/RejectStatus/${hotelId}`, config).then(res=>
        {
            console.log(res.data);
        })
        console.log(count);
        if(count<3)
        {
            setDisable4(1);
            console.log(count);
            
        }
    }
    
    return (

        

            <div className="container my-5 col-md-7" >
                  <h1>in DocsShow Page</h1>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <td>{HotelDocs.aadharNo}</td>
                            <td><img src={`http://localhost:8081/day15_boot/image/${HotelDocs.aadharPhoto}`}style={{ height: "200px", width: "200px" }}></img></td>
                            <td>
                                <select id="s1">
                                    <option>Select</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </td>
                            <td><p id="p1">Approved or Not</p></td>

                            <td><button type="button" onClick={aadharUpdate} class="btn btn-primary" id="updbtn" disabled={disable1}>Approve Aadhar</button></td>
                            <td><button type="button" onClick={aadharUpdateR} class="btn btn-primary" id="updbtn" disabled={disable1}>Reject Aadhar</button></td>

                         </tr>
                         <tr>
                            <td>{HotelDocs.panNo}</td>
                            <td><img src={`http://localhost:8081/day15_boot/image/${HotelDocs.panPhoto}`} style={{ height: "200px", width: "200px" }}></img></td>
                            <td>
                                <select id="s2">
                                    <option>Select</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </td>
                            <td><p id="p2">Approved or Not</p></td>

                            <td><button type="button" onClick={panUpdate} class="btn btn-primary" id="panUpdBtn" disabled={disable2}>Approve pancard</button></td>   
                            <td><button type="button" onClick={panUpdateR} class="btn btn-primary" id="panUpdBtn" disabled={disable2}>Reject pancard</button></td>   


                        </tr>
                        <tr>
                            <td>{HotelDocs.fsaiiNo}</td>
                            <td><img  src={`http://localhost:8081/day15_boot/image/${HotelDocs.fsaiiPhoto}`} style={{ height: "200px", width: "200px" }}></img></td>
                            <td>
                                <select id="s3">
                                    <option>Select</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </td>
                            <td><p id="p3">Approved or Not</p></td>

                            <td><button type="button" onClick={fasaiiUpdate} class="btn btn-primary" id="panUpdBtn" disabled={disable3}>Approve FASII</button></td>   
                            <td><button type="button" onClick={fasaiiUpdateR} class="btn btn-primary" id="panUpdBtn" disabled={disable3}>Reject FASII</button></td>   
                             

                        </tr>
                        <br></br>
                        <hr></hr>
                        <center>
                        <div>
                        
                        <tr>
                            <td>
                               
                                <a href='/backToAdminDashboard' onClick={Approve} class="btn btn-primary" id="panUpdBtn" disabled={disable4}>Approve </a>
                               
                            </td>
                            <td>
                               
                               <a href='/backToAdminDashboard' onClick={Reject} class="btn btn-primary" id="panUpdBtn" disabled={disable4}>Reject </a>
                              
                           </td>
                        </tr>
                       
                        </div>
                        </center>

                    </tbody>
                </table>



            </div>

        

    )
}

export default HotelDocsShowPage

