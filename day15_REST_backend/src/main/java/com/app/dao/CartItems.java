package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.CartItem;

public interface CartItems extends JpaRepository<CartItem, Long>{

	List<CartItem> findByCartId(Long cartId);

	Long deleteByCartId(Long cartId);
	
}
