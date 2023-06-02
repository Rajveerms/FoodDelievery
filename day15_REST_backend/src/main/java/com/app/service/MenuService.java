package com.app.service;

import java.util.List;

import com.app.pojos.CuisineCategory;
import com.app.pojos.Menu;
import com.app.pojos.MillType;
import com.app.pojos.VegNonVegCategory;

public interface MenuService {

	List<Menu> getAllMneuperHotel(Long hotelId);

	void addMenu(Menu menu, Long hotelId);

	void updateMenu(Menu dish, Long dishId);
	
	List<Menu> findMenuById(long hotelId);
	  

	 List<Menu>findMenuByMealType(MillType mealid);
	  
	  List<Menu>findMenuByCuisineType(CuisineCategory cuisineId);
	  
	  List<Menu>findMenuByVegNonVegType(VegNonVegCategory cuisineId);


}
