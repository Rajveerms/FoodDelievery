package com.app.service;

import java.util.List;

import com.app.dto.CartDto;
import com.app.pojos.CartItem;

public interface CartService {

    
Long addToCart(long cartItemId);
List<CartDto> findDishDetails(Long cartId,Long dishId);
void updateQuantityOfItem(Long itemsId,Integer quantity);
void removeItemfromTable(Long id);
void placeOrder(Long cartId, double totalAmount,Long hotelId);
Long getCartId(Long id);
List<CartDto> getAllCartProducts(Long cartId);
	
	


}
