
package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.CuisineCategory;
import com.app.pojos.Menu;
import com.app.pojos.MillType;
import com.app.pojos.VegNonVegCategory;
import com.app.service.MenuService;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class MenuController {

	@Autowired
	MenuService menuservice;
	
	@RequestMapping("/showMenu/{hotelId}")
	public List<Menu> showMenu(@PathVariable long hotelId)
	{
		
		List<Menu> menulist = menuservice.findMenuById(hotelId);
		List<Menu> newMenuList=new ArrayList<>();
		
		for(int i=0;i<menulist.size();i++)
		{
			if(menulist.get(i).getHotelManager().getId() == hotelId)
			{
				System.out.println("Yes in ");
				newMenuList.add(menulist.get(i));
				
			}
		}
		
		return newMenuList;
	}
	
	
	@RequestMapping("/showBrkOrLunchOrDinnerMenu/{millid}")
	public List<Menu> showMenuByMealType(@PathVariable String millid)
	{
			
		List<Menu> menulist= menuservice.findMenuByMealType(MillType.valueOf(millid));
		
		return menulist;
	}
	
	@RequestMapping("/showCuisineMenu/{cuisineId}")
	public List<Menu> showMenuByCuisineType(@PathVariable String cuisineId)
	{
			
		List<Menu> menulist= menuservice.findMenuByCuisineType(CuisineCategory.valueOf(cuisineId));
		
		return menulist;
	}
	
	@RequestMapping("/showVegNonVegMenu/{vegnonveg}")
	public List<Menu> showMenuByVegNonVegType(@PathVariable String vegnonveg)
	{
			
		List<Menu> menulist= menuservice.findMenuByVegNonVegType(VegNonVegCategory.valueOf(vegnonveg));
		
		return menulist;
	}

	
	
}
