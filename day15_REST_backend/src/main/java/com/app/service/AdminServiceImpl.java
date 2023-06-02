package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AdminDao;
import com.app.pojos.HotelManager;
import com.app.pojos.hotelStatus;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao dao;
	
	@Override
	public List<HotelManager> showAllHotels() {
		
		return dao.findAll() ;
	}

	@Override
	public List<HotelManager> showApprovedHotels() {
		
		return dao.findAll();
	}

	@Override
	public HotelManager showDocs(long hotelId) {
		// TODO Auto-generated method stub
		return dao.findById(hotelId).get();
	}
	public void ApproveStatus(long hotelId)
	{
		
	   HotelManager hm = dao.findById(hotelId).get();
	   hm.setHotelstatus(hotelStatus.APPROVED);
	   dao.save(hm);
	   
	}

	@Override
	public void RejectStatus(long hotelId) {
		HotelManager hm = dao.findById(hotelId).get();
		hm.setHotelstatus(hotelStatus.REJECTED);
		dao.save(hm);
	}

}
