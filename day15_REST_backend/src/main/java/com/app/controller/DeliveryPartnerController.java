package com.app.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.Credentials;
import com.app.dto.DeliveryBoyDto;
import com.app.dto.HotelManagerDto;
import com.app.dto.OrdersDto;
import com.app.pojos.DeliveryBoy;
import com.app.service.DeliveryBoyService;
import com.app.service.HotelManagerService;
import com.app.service.HotelOwnerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import packageForTesting.FormDataWrapper;

@RestController
@RequestMapping("/deliveryPartner")
@CrossOrigin("http://localhost:3000")
public class DeliveryPartnerController {
	
	@Autowired
	DeliveryBoyService deliveryBoyService;
	
	@Autowired
	HotelOwnerService hotelManagerService;
	
	private DeliveryBoy dboy = new DeliveryBoy(); 
	
	@Value("${project.image}")
	private String path;
	
	
	
	
	@PostMapping("/register/image")
	public String registerDeliveryBoyImage(@RequestParam("image") MultipartFile file) throws JsonMappingException, JsonProcessingException
	{   
		String result = ""; 
	  try { 
	   this.deliveryBoyService.uploadImage(path, file, dboy); 
	   result = "success"; 
	  } catch (IOException e) { 
		  result = "failure"; 
	   e.printStackTrace(); 
	  } 
	  return result; 
	}
	@PostMapping("/register/data")
	public String registerDeliveryBoyData(@RequestBody DeliveryBoy deliveryBoyData)
	{
		String result = "";
		try
		{
			dboy = deliveryBoyData;
			System.out.println(deliveryBoyData);
			result = "success";
		}
		catch (Exception e) {
			System.out.println("Unable to upload data");
			
			result = "failure";
		}
		return result;
	}
	
	
	
	
	@GetMapping("/home/{city}")
	public List<HotelManagerDto> homepageController(@PathVariable String city)
	{
		return hotelManagerService.getHomepage(city);
	}
	
	@GetMapping("/dashboard")
	public List<OrdersDto> deliveryBoyDashboard()
	{
		List<OrdersDto> list = deliveryBoyService.getNotYetAccptedOrders();
		System.out.println(list);
		return list;
	}
	
	@PutMapping("/{deliveryPartnerId}/acceptOrder/{orderId}/{orderStatus}")
	public String acceptOrder(@PathVariable Long orderId, @PathVariable Long deliveryPartnerId, @PathVariable String orderStatus)
	{
		return deliveryBoyService.updateOrder(deliveryPartnerId, orderId, orderStatus);
	}
	
	@PostMapping("/login")
	public String loginDeliveryPartner(@RequestBody Credentials cred)
	{
		return deliveryBoyService.login(cred);
	}
	
	@PostMapping("/forgotpassword")
	public String forgotPasswordDeliveryPartner(@RequestBody Credentials cred)
	{
		return deliveryBoyService.forgotpassword(cred);
	}
	
	@GetMapping("/allcities")
	public List<String> getAllCities()
	{
		List<String> list = hotelManagerService.getAllCities();
		
		return list;
	}
	
	@GetMapping("/search/{searchParameter}")
	public List<HotelManagerDto> searchResult(@PathVariable String searchParameter)
	{
//		hotelManagerService.getSearch(searchParameter);
//		System.out.println("hello");
//		return null;
		return hotelManagerService.getSearchResult(searchParameter);
	}
	
	@GetMapping("/hotelSuggestion/{searchParameter}")
	public List<String> getHotelNameSuggestions(@PathVariable String searchParameter)
	{
		return hotelManagerService.getHotelNameSuggestionsService(searchParameter);
	}
	
	
	

}
