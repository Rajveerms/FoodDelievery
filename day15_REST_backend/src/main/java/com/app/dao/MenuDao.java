package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.CuisineCategory;
import com.app.pojos.Menu;
import com.app.pojos.MillType;
import com.app.pojos.VegNonVegCategory;

public interface MenuDao extends JpaRepository<Menu, Long> {

	List<Menu> findAllByHotelManagerId(Long hotelId);
	
	@Query("SELECT u FROM Menu u WHERE u.milltype = ?1")
	  List<Menu> findMenu(MillType milltypeid);
	  
	  @Query("SELECT u FROM Menu u WHERE u.cusineCategory = ?1")
	  List<Menu> findMenu(CuisineCategory milltypeid);
	  
	  @Query("SELECT u FROM Menu u WHERE u.vegNonVegCategory = ?1")
	  List<Menu> findMenu(VegNonVegCategory milltypeid);
	  
	  
	

}
