package com.app.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.CookingStatus;
import com.app.pojos.DeliveryStatus;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;

public interface OrdersDao extends JpaRepository<Orders, Long> {
	List<Orders> findByDeliveryStatusAndOrderStatusAndCookingStatus(DeliveryStatus status, OrderStatus orderStatus, CookingStatus cookingStatus);
	Orders findByCustomerIdAndOrderStatus(Long custId, OrderStatus order);
	List<Orders> findByHotelManagerId(Long hotel_Id);

}
