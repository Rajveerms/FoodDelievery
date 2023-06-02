package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.DeliveryBoy;
import com.app.service.DeliveryBoyService;

@RestController
@RequestMapping("/deliveryboy")
@CrossOrigin("http://localhost:3000")
public class DeliveryBoyAdminController {

	@Autowired
	private DeliveryBoyService service;
	
	
	public DeliveryBoyAdminController() {
		System.out.println("Inside Delivery Boy Ctor");
	}
	
	@GetMapping("/all")
	public List<DeliveryBoy> findingAllDeliveryBoys(){
		return service.findAllDeliveryBoy();
	}
	
	@GetMapping("/active")
	public List<DeliveryBoy> findingAllActiveDeliveryBoys(){
		return service.findAllActiveDeliveryBoy();
	}
	
	@GetMapping("/inactive")
	public List<DeliveryBoy> findingAllInactiveDeliveryBoys(){
		return service.findAllInactiveDeliveryBoy();
	}
	
	
}
