package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderShDto;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;
import com.app.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin("http://localhost:3000")
public class OrderController {

	public OrderController() {
		System.out.println("Inside orderController");
	}
	
	@Autowired
	private OrderService service;
	
	
	@GetMapping("/{custId}")
	public OrderShDto getStatusOfOrder(@PathVariable String custId ) {
		System.out.println("Indside custId");
	     
		return service.findOrderStatus(OrderStatus.valueOf("NEW"),Long.parseLong(custId));
	}
	
	@PostMapping("/changestatus/{orderid}")
	public void updateOrderStatus(@PathVariable Long orderid ) {
		service.ChangeOrderStatus(orderid);
	}
	
	
	
}
