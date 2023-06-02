package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.CuisineCategory;
import com.app.pojos.HotelManager;

public interface HotelOwnerDao extends JpaRepository<HotelManager, Long> {

	HotelManager findByUsernameAndPassword(String username, String password);

	HotelManager findByUsername(String username);
	
	List<HotelManager> findByAddressCity(String city);
	
	@Query("select distinct h.address.city from HotelManager h")
		public List<String> getAllCities();
//	
//	@Query("select * from Users u where u.first_name like %:keyword% or u.last_name like %:keyword%")
//	List<UserEntity> findUsersByKeyword(@Param("keyword") String keyword);
	
	
	@Query("select h.hotelName from HotelManager h where h.hotelName like %:input%")
	List<String> getMatchingSearchString(@Param ("input") String input);
	
	List<HotelManager> findByhotelNameContains(String input);
	
	List<HotelManager> findByhotelName(String hotelName);
	
	List<HotelManager> findBymenuListDishName(String dish); 
	
	List<HotelManager> findBymenuListCusineCategory(CuisineCategory category);
}
