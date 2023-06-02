//package com.app.service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.app.dao.HotelManagerDao;
//import com.app.dto.HotelManagerDto;
//import com.app.pojos.Address;
//import com.app.pojos.HotelManager;
//
//@Service
//public class HotelManagerServiceImpl implements HotelManagerService {
//	// Omkar 
//patil	@Autowired
//	HotelManagerDao hotelManagerDao;
//	
//	public HotelManagerDto HotelManagerDtoBuilder(HotelManager mgr)
//	{
//		HotelManagerDto mgrDto = new HotelManagerDto();
//		mgrDto.setDescription(mgr.getDescription());
//		mgrDto.setHotelphoto(mgr.getDocuments().getHotelPhoto());
//		mgrDto.setHotelName(mgr.getHotelName());
//		mgrDto.setHotelType(mgr.getHotelType());
//		mgrDto.setRating(mgr.getRating());
//		return mgrDto;
//	}
//	
//	@Override
//	public List<HotelManagerDto> getHomepage(String city) {
//		Address adrr = new Address();
//		adrr.setCity(city);
//		List<HotelManager> mgr = hotelManagerDao.findByAddressCity(city);
//		List<HotelManagerDto> resultList=new ArrayList<HotelManagerDto>();
//		mgr.forEach((ele)->{
//			resultList.add(HotelManagerDtoBuilder(ele));
//		});
//		
//		return resultList;
//	}
//
//}
