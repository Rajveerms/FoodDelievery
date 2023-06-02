package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.OrderDetailsDao;
import com.app.dao.OrdersDao;
import com.app.dto.OrderHistroyDto;
import com.app.dto.OrderShDto;
import com.app.pojos.CookingStatus;
import com.app.pojos.OrderDetails;
import com.app.pojos.OrderDto;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	OrdersDao od;
	
	@Autowired
	OrderDetailsDao dao;
	
	public OrderServiceImpl() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public List<Orders> getAllOrders() {//Long hotelId
		
		List<Orders> ls= od.findAll();
		System.out.println("Order list is as follow "+ls);
		
		return ls;
	}
	
	@Override
	public void updatestatusofOrder(Long order_Id, String status) {
		
		try {
		Orders order=od.findById(order_Id).orElseThrow();
		order.setCookingStatus(CookingStatus.valueOf(status));
		od.save(order);
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("Error occured in updatestatusofOrder");
		}
	}
	

	 @Override
	 public OrderShDto findOrderStatus(OrderStatus order, Long custId) {

		 Orders or = od.findByCustomerIdAndOrderStatus(custId, order);
	      String deliveryBoyMobileNo= "";
	      String delveryBoyFirstName = "";
	      deliveryBoyMobileNo = or.getDeliveryboy()!=null? deliveryBoyMobileNo= or.getDeliveryboy().getMobileNo() : "";
	      delveryBoyFirstName = or.getDeliveryboy()!=null?or.getDeliveryboy().getFirstName() :"";
	      
	   OrderShDto o = new OrderShDto(or.getPrice(), or.getOrderDate(), or.getOrderStatus(), or.getCookingStatus(),
	     or.getDeliveryStatus(), deliveryBoyMobileNo,delveryBoyFirstName,
	     or.getId(), or.getHotelManager().getId());

	   System.out.println(or);
	   return o;

	 }

	 @Override
	 public void ChangeOrderStatus(Long orderid) {
	  Orders order = od.findById(orderid).orElseThrow(()->new ResourceNotFoundException("orderid not found"));
	  order.setOrderStatus(OrderStatus.OLD);
	  od.save(order);
	  System.out.println("orderStatus changed successfully");
	  
	 }
	 @Override 
	 public List<Orders> getAllOrderOfHotel(Long hotel_Id) { 
	  // TODO Auto-generated method stub 
	  List<Orders> lst= od.findByHotelManagerId(hotel_Id); 
	   System.out.println(lst); 
	  return lst; 
	    //findByHotelManagerId(hotel_Id); 
	 }
	 
	 @Override
	  public List<OrderHistroyDto> getHistroyOfCutomer(Long id) {
	   System.out.println("Inside order histroy");

	    List<OrderDetails> details = dao.findByOrderCustomerId(id);
	    List<OrderHistroyDto> histroy = new ArrayList<>();
	   
	    
	    for(int i  = 0; i<details.size() ; i++) {
	    
	     histroy.add(new OrderHistroyDto(details.get(i).getQuantity(),details.get(i).getTotalPrice(),details.get(i).getDish().getId(),
	       details.get(i).getOrder().getId(),details.get(i).getDish().getDishName(),details.get(i).getDish().getPrice(),details.get(i).getOrder().getOrderDate()));
	    }
	     
	     return histroy;
	  }

}
