package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Cart;
import com.app.pojos.CartItem;

public interface CartDao  extends JpaRepository<Cart, Long>  {

	Cart findByCustomerId(Long customerId);
	
	
}
