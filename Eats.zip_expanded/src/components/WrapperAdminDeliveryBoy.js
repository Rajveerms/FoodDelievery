import AdminDeliveryBoy from './AdminDeliveryBoy'
function WrapperAdminDeliveryBoy()
{
    const DeliveryBoy = [
        {Name:"Random Guy",
         Location: "Pune",
         MobileNo:"9096157771",
         Image: "./Image/Guy.jpg",
         Status:0
        },
        {Name:"Random Girl",
         Location: "Pune",
         MobileNo:"9096157771",
         Image: "./Image/Guy.jpg",
         Status:1
        }
        
       ]

    return(
        <>
        <AdminDeliveryBoy delivery={DeliveryBoy} />
        </>
    )
}
export default WrapperAdminDeliveryBoy;