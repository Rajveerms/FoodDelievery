package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MenuDao;
import com.app.pojos.CuisineCategory;
import com.app.pojos.Menu;
import com.app.pojos.MillType;
import com.app.pojos.Scale;
import com.app.pojos.VegNonVegCategory;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	MenuDao menudao;
	
	
	@Override
	public List<Menu> getAllMneuperHotel(Long hotelId) {
		// TODO Auto-generated method stub
		List<Menu> list=menudao.findAllByHotelManagerId(hotelId);
		System.out.println("List is as follows "+list);
		return list;
	}

	@Override
	public void addMenu(Menu menu, Long hotelId) {
		// TODO Auto-generated method stub
		menudao.save(menu);
		
		
	}

	@Override
	public void updateMenu(Menu dish, Long dishId) {
		
		try {
		Menu menu=menudao.findById(dishId).orElseThrow();
		String dishPhoto=dish.getDishPhoto();
		String dishName=dish.getDishName();
		int price=dish.getPrice();
		Scale size=dish.getSize();
		
		

		if(dishName!=null)
		{
			menu.setDishName(dishName);
		}
		if(dishPhoto!=null)
		{
			menu.setDishPhoto(dishPhoto);
		}
		if(price>0)
		{
			menu.setPrice(price);
		}
		if(size!=null)
		{
		menu.setSize(size);	
		}
		menudao.save(menu);
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("Error occured in updating menu");
		}
		
		
		
		
	}
	
	

	  @Override
	  public List<Menu> findMenuById(long hotelId) {
	    // TODO Auto-generated method stub
	    return (List<Menu>) menudao.findAll();
	  }

	  @Override
	  public List<Menu> findMenuByMealType(MillType mealid) {
	    // TODO Auto-generated method stub
	    return menudao.findMenu(mealid);
	  }

	  @Override
	  public List<Menu> findMenuByCuisineType(CuisineCategory cuisineId) {
	    // TODO Auto-generated method stub
	    return menudao.findMenu(cuisineId);
	  }

	  @Override
	  public List<Menu> findMenuByVegNonVegType(VegNonVegCategory vegnonveg) {
	    // TODO Auto-generated method stub
	    return menudao.findMenu(vegnonveg);
	  }
	

}
