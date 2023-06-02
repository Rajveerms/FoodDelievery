package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.CartItem;

public interface CartItemDao  extends JpaRepository<CartItem, Long>{

}
