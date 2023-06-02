package com.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.HotelManagerDto;
import com.app.pojos.Documents;
import com.app.pojos.HotelManager;
import com.app.pojos.Menu;

public interface HotelOwnerService {

	HotelManager registerCustomer(HotelManager newHotelManager);

	String registerhotelDocuments(Long doc_Id,Long cust_Id, MultipartFile aadharfile, MultipartFile panfile, MultipartFile fsaiifile, MultipartFile hotelfile);

	HotelManager validate(HotelManager hotelmanager);

	String addMenu(Menu menu, Long hotelId, MultipartFile file);

	HotelManager forgotCustomerPassword(HotelManager newHotel);
	
	public List<String> getHotelNameSuggestionsService(String input);
	
	public List<HotelManagerDto> getHomepage(String city);
	
	public List<String> getAllCities();
	
	public List<String> getSearch(String input);
	
	public List<HotelManagerDto> getSearchResult(String hotelName);
	
	Documents registerhotelDocumentsNo(Documents docs);
	
	Menu addMenudata(Menu menu, Long hotelId); 
	 
	 String addMenuPhoto(MultipartFile file, Long dishId);
	
	

}
