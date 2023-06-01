import { useEffect, useState } from "react";

function HotelSpecificMenu() {
    var [menu, setMenu] = useState([])
    var temporaryMenu = [
        {
            name: "paneer dish",
            price: 120,
            cuisine: "panjabi",
            scale: "medium",
            file: null
        },
        {
            name: "paneer dish",
            price: 120,
            cuisine: "panjabi",
            scale: "medium",
            file: null
        },
        {
            name: "paneer dish",
            price: 120,
            cuisine: "panjabi",
            scale: "medium",
            file: null
        }
    ]

    useEffect(() => {
        setMenu(menu)
    }, [])

    return (<>
        <div className="container my-5 col-md-9">

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: "center" }}>Image</th>
                        <th scope="col" style={{ textAlign: "center" }}>Name</th>
                        <th scope="col" style={{ textAlign: "center" }}>Price</th>
                        <th scope="col" style={{ textAlign: "center" }}>Cuisine</th>
                        <th scope="col" style={{ textAlign: "center" }}>Scale</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menu.map((item) => {
                            return (
                                <tr>
                                    <th scope="row">{item.image}</th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <a href='/deliveryOrderStatusByDeliveryPartner' className="btn btn-warning" >Accept</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>



        </div>
    </>)
}

export default HotelSpecificMenu;