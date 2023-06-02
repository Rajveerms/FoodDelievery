package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.HotelManager;
import com.app.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin("http://localhost:3000")
public class FeedbackController {

	@Autowired
	private FeedbackService service;
	
	public FeedbackController() {
		System.out.println("In feedback controller");
	}
	
	@PostMapping("/addingfeedback")
	public void addFeedbacktoHotel(@RequestBody HotelManager  addingfeedback)
	{
		service.addRatingAndDescription(addingfeedback.getRating(), addingfeedback.getDescription(), addingfeedback.getId());
		
	}
}
