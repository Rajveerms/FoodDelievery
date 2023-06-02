package com.app.service;

import java.util.List;

import com.app.dto.OrderHistroyDto;
import com.app.dto.OrderShDto;
import com.app.pojos.OrderDto;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;

public interface OrderService {

	List<Orders> getAllOrders();

	void updatestatusofOrder(Long order_Id, String status);
	
	OrderShDto findOrderStatus(OrderStatus order,Long custId);
	 
	 void ChangeOrderStatus(Long orderid);
	 
	 List<Orders> getAllOrderOfHotel(Long hotel_Id);
	 List<OrderHistroyDto> getHistroyOfCutomer(Long id);

}
