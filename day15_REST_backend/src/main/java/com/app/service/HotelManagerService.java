package com.app.service;

import java.util.List;

import com.app.dto.HotelManagerDto;

public interface HotelManagerService {
	public List<HotelManagerDto> getHomepage(String city);
}
