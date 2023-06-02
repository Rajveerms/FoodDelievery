package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.FeedbackDao;
import com.app.pojos.HotelManager;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private FeedbackDao dao;
	
	@Override
	public void addRatingAndDescription(Integer rating, String description,Long id) {
		
		HotelManager m = dao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id is wrong"));
		Integer presentRating = m.getRating();
		m.setRating((presentRating+rating)/2);
		String newDescription  = m.getDescription() + "@"+description;
		m.setDescription(newDescription);
		dao.save(m);
		
		
	}

}
