package com.app.sec;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.pojos.Customer;
import com.app.pojos.DeliveryBoy;
import com.app.pojos.HotelManager;

//import com.app.pojos.Role;
//import com.app.pojos.User;

import com.app.sec.User;

public class ShopUser implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	
	private String username;
	private String password;
	private List<GrantedAuthority> authorities;
	
	
	public ShopUser(Customer cust)
	{
		this.password = cust.getPassword();
		this.username = cust.getUsername();
		
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_CUSTOMER");
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		list.add(authority);
		
		this.authorities = list;
	}
	
	public ShopUser(HotelManager mgr)
	{
		this.password = mgr.getPassword();
		this.username = mgr.getUsername();
		
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_HOTELMANAGER");
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		list.add(authority);
		
		this.authorities = list;
	}
	
	public ShopUser(DeliveryBoy dboy)
	{
		this.password = dboy.getPassword();
		this.username = dboy.getUsername();
		
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_DELIVERYPARTNER");
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		list.add(authority);
		
		this.authorities = list;
	}
	
	public ShopUser()
	{
		this.password = "Password";
		this.username = "Admin";
		
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ADMIN");
		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		list.add(authority);
		
		this.authorities = list;
	}
	
	
	
	public ShopUser(User user)
	{
//		this.username = user.getusername();
//		this.password = user.getPassword();
		
//		this.authorities =  Arrays.stream(user.getUserRole().toString().split(","))
//									.map(SimpleGrantedAuthority::new)
//									.collect(Collectors.toList());
		
		  
		
//		SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_CUSTOMER");
//		List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
//		list.add(authority);
//		
//		this.authorities = list;
		
	}
	

	public ShopUser(String username, String password, List<GrantedAuthority> authorities) {
		super();
		this.username = username;
		this.password = password;
		this.authorities = authorities;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
