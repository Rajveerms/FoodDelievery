package com.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Cart;
import com.app.service.CartService;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class CartController {

	@Autowired
	CartService service;
	
	@GetMapping("/addToCart/{cartItemId}")
	public Long addToCart(@PathVariable long cartItemId )
	{
		return service.addToCart(cartItemId);
	}
	
	
	
	
	
}
