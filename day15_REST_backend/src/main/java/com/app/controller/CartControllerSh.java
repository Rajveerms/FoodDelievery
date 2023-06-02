package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CartDto;
import com.app.dto.OrderHistroyDto;
import com.app.dto.PlaceOrderDto;
import com.app.pojos.CartItem;
import com.app.service.CartService;
import com.app.service.OrderService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class CartControllerSh {

	@Autowired
	private CartService service;
	
	@Autowired
	private OrderService oservice;
	
	public CartControllerSh() {
		System.out.println("Inside cart Controller");
	}
	
	
	@GetMapping("/{cartid}/{dishid}")
	public List<CartDto> getItemToCart(@PathVariable Long dishid,@PathVariable Long cartid) {
		 return service.findDishDetails(cartid, dishid);
	}
	
	@PostMapping("/cartItem")
	public void updateQuantity(@RequestBody CartItem cartItem) {
		service.updateQuantityOfItem(cartItem.getId(), cartItem.getQuantity());
	}
	
	@PostMapping("/{itemid}")
	public void removeItem(@PathVariable Long itemid) {
		service.removeItemfromTable(itemid);
	}
	
	
	//Long cartId, double totalAmount, int quantity,Long hotelId
	@PostMapping("/orderplaced")
	public void placeOrder(@RequestBody PlaceOrderDto placeorder) {
		service.placeOrder(placeorder.getCartId(), placeorder.getTotalAmount(), placeorder.getHotelId());
	}
	
	@GetMapping("/{custid}")
	 public List<OrderHistroyDto> getCustomerOrderHistroy(@PathVariable Long custid){
	  System.out.println("inside cart order histroy");
	  return oservice.getHistroyOfCutomer(custid);
	 }
	
	@GetMapping("/cartId/{custId}")
	public Long getCartId(@PathVariable Long custId)
	{
		
		return service.getCartId(custId);
	}
	
	@GetMapping("/getall/{cartId}")
	 public List<CartDto> getCartItems(@PathVariable Long cartId){
	  return service.getAllCartProducts(cartId);
	 }
}
