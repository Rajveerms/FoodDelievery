package com.app.service;

import java.util.List;

import com.app.pojos.Documents;
import com.app.pojos.HotelManager;

public interface AdminService {

	List<HotelManager> showAllHotels();
	List<HotelManager> showApprovedHotels();
	HotelManager showDocs(long hotelId);
	void ApproveStatus(long hotelId);
	void RejectStatus(long hotelId);
	
}
