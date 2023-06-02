package com.app.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.CustomerDao;
import com.app.dao.DeliveryBoyDao;
import com.app.dao.HotelOwnerDao;
import com.app.pojos.Customer;
import com.app.pojos.DeliveryBoy;
import com.app.pojos.HotelManager;
import com.app.sec.User;



@Transactional
@Service
public class MyUserDetailsService implements UserDetailsService {
//	@Autowired
//	private UserDao userDao;
	
	@Autowired
	private CustomerDao custDao;
	
	@Autowired
	private HotelOwnerDao hotelDao;
	
	@Autowired 
	private DeliveryBoyDao dboyDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//User user = userDao.findByEmail(email);
		com.app.sec.User user = new User("omkar@gmail.com", "omkar");
		System.out.println("came to loaduser by user name : "+ username);
		
		Customer cust = custDao.findByUsername(username);
		
		HotelManager mgr =  hotelDao.findByUsername(username);
		
		DeliveryBoy dboy = dboyDao.findByUsername(username);
		System.out.println("Came till here bro1..");
		System.out.println("Came till here bro2..");
		//System.out.println("Delivery Boy fetched : "+dboy.getUsername());
		System.out.println("Hello ");
		if(cust != null && username.equals(cust.getUsername()))
		{
			System.out.println("Returning customer");
			return new ShopUser(cust);
		}
		else if(mgr != null && username.equals(mgr.getUsername()))
		{
			System.out.println("Returning hotelManager");
			return new ShopUser(mgr);
		}
		else if(dboy != null && username.equals(dboy.getUsername()))
		{
			System.out.println("Returning Delivery Boy");
			return new ShopUser(dboy);
		}
		else if(username.equals("Admin"))
		{
			System.out.println("Returning customer");
			return new ShopUser();
		}
		else
		{
			System.out.println("Not Found here");
			throw new UsernameNotFoundException(username + " not found.");
		}
	}
}
