package com.app.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.Address;
import com.app.pojos.Cards;
import com.app.pojos.Cart;
import com.app.pojos.Customer;
import com.app.service.CardsService;
import com.app.service.CustomerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class CustomerController {

	@Autowired
	CustomerService us;
	
	@Autowired
	 private CardsService service;
	@Autowired
	ObjectMapper mapper;

	public CustomerController() {
		System.out.println("In ctor of customer class");
	}

	@PostMapping("/forgotPassword")
	String forgotCustomerPassword(@RequestBody Customer newUser) {

		Customer ct = us.forgotCustomerPassword(newUser);
		return "Password updated succesfully";

	}

	@PostMapping("/register")
	String registerNewCustomer(@RequestParam("photo") MultipartFile file, @RequestParam("data") String newUser)
			throws JsonMappingException, JsonProcessingException {
		Customer newUser1 = mapper.readValue(newUser, Customer.class);
		Customer ct;
		try {
			ct = us.registerCustomer(newUser1, file);
		} catch (IOException e) {
			return "Unable to register";

		}
		System.out.println(ct);
		System.out.println(file);
		// addcartofRegisterCustomer(ct.getId());
		// return ct;
		return "Registration successful";

	}
	@GetMapping("/{custid}")
	  public Customer getCustomerDetails(@PathVariable Long custid) {
	   return us.getCustomerDetails(custid);
	  }

	  
	  @GetMapping("/cards/{custId}")
	  public List<Cards> getAllDebitCards(@PathVariable Long custId){
	   return service.findDebitCardsByCustomerId(custId);
	  }

//	@PostMapping("/registerAddress/{cust_Id}")
//	String registerNewCustomerAddress(@RequestBody Address newUserAddress, @PathVariable Long cust_Id) {
//		us.addAddress(newUserAddress, cust_Id);
//		return "User registered successfully ";
//
//	}
//
//	@PostMapping("/registerdebitcards/{cust_Id}")
//	String registerNewCustomerDebitCard(@RequestBody Cards newUserDebitCard, @PathVariable Long cust_Id) {
//		us.addCard(newUserDebitCard, cust_Id);
//		return "Card added successfully";
//
//	}

	@PostMapping("/login")
	String customerLogin(@RequestBody Customer customer) {
		Customer c = us.validate(customer);
		if (c != null) {
			Long id = c.getId();
			return Long.toString(id);
		} else
			return "-1";

	}

	@RequestMapping("/removeUser/{cust_id}")
	public int removeCustomer(@PathVariable Long cust_id) {
		int i = us.removecustomer(cust_id);
		return 0;

	}

	private void addcartofRegisterCustomer(Long id) {
		us.findCustomer(id);
		// TODO Auto-generated method stub

	}
	
	//New methods : 
	
	@PostMapping("/registerCustomerData") 
	 String registerNewCustomerdata(@RequestBody Customer newUserdata) { 
	  Customer c = us.addUser(newUserdata); 
	  addcartofRegisterCustomer(c.getId()); 
	  return Long.toString(c.getId()); 
	 
	 }
	
	 @PostMapping(value = "/registercustomerphoto/{cust_id}") 
	 String registerNewCustomerPhoto(@RequestParam(value = "photo") MultipartFile file, @PathVariable Long cust_id) { 
	 
	  try { 
	 
	   us.registerCustomerphoto(file, cust_id); 
	 
	  } catch (Exception e) { 
	   e.printStackTrace(); 
	   return "Unable to register"; 
	 
	  } 
	  return "image uploaded succesfully"; 
	 
	 }
	 
	 @PostMapping("/registerdebitcards/{cust_Id}") 
	 String registerNewCustomerDebitCard(@RequestBody Cards newUserDebitCard, @PathVariable Long cust_Id) { 
	  us.addCard(newUserDebitCard, cust_Id); 
	  return "Card added successfully"; 
	 
	 }
	 
	 @PostMapping("/registerAddress/{cust_Id}") 
	 String registerNewCustomerAddress(@RequestBody Address newUserAddress, @PathVariable Long cust_Id) { 
	  us.addAddress(newUserAddress, cust_Id); 
	  return "User registered successfully "; 
	 
	 }

}
