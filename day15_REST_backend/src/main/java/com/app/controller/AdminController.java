package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Documents;
import com.app.pojos.HotelManager;
import com.app.pojos.hotelStatus;
import com.app.service.AdminService;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class AdminController {

	@Autowired
	AdminService service;
	
	@RequestMapping("/showAllHotels")
	List<HotelManager> showAllHotel()
	{
		return service.showAllHotels() ;
		
	}
	@RequestMapping("/AdminLogin/{name}/{pass}")
	public String adminLogin(@PathVariable String name, @PathVariable String pass)
	{
		if(name.equals("Admin")&& pass.equals("123"))
			return "Logged in";
		else
		return "Not logged in";
	}
	
	@RequestMapping("/showApprovedHotels/{status}")
	public List<HotelManager> showApprovedHotels(@PathVariable int status)
	{
		List<HotelManager> list = service.showApprovedHotels();
		ArrayList<HotelManager> newlist = new ArrayList<>();
		System.out.println(status);
		for(int i=0;i<list.size();i++)
		{
			System.out.println(list.get(i).getHotelstatus());
			if(list.get(i).getHotelstatus().ordinal()== status)
			{
				//System.out.println(list.get(i).getHotelstatus().valueOf("REJECTED").ordinal());
				newlist.add(list.get(i));
			}
		}
		return newlist;
	}
	
	@RequestMapping("/showRejectedHotels/{status}")
	public List<HotelManager> showRejectedHotels(@PathVariable int status)
	{
		List<HotelManager> list = service.showApprovedHotels();
		ArrayList<HotelManager> newlist = new ArrayList<>();
		System.out.println(status);
		for(int i=0;i<list.size();i++)
		{
			System.out.println(list.get(i).getHotelstatus());
			if(list.get(i).getHotelstatus().ordinal()== status)
			{
				//System.out.println(list.get(i).getHotelstatus().valueOf("REJECTED").ordinal());
				newlist.add(list.get(i));
			}
		}
		return newlist;
	}
	@GetMapping("/showDocs/{hotelId}")
	public Documents showDocuments(@PathVariable long hotelId)
	{
		
		return service.showDocs(hotelId).getDocuments();
	}
	@RequestMapping("/ApproveStatus/{hotelId}")
	public String ApproveStatus(@PathVariable int hotelId)
	{
		service.ApproveStatus(hotelId);
		return "success";
	}
	
	@RequestMapping("/RejectStatus/{hotelId}")
	public String RejectStatus(@PathVariable int hotelId)
	{
		service.RejectStatus(hotelId);
		return "success";
	}
}
