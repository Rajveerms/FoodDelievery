package com.app.dto;

import javax.persistence.Column;

import com.app.pojos.BaseEntity;
import com.app.pojos.CuisineCategory;
import com.app.pojos.Scale;
import com.app.pojos.VegNonVegCategory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@Getter
public class CartDto  {

	
	private String dishName;
	
	private String dishPhoto;

	private int price;
	
	private Scale size;
	private Long orderId;
	private Long dishId;
	private Long hotelId;
	private Long itemsId;
	private Long cartId;
	private Long customerId;
	private int qunatity;
	
	public CartDto(String dishName, int i, Scale scale,String path,Long dishId,Long hotelId,Long itemsId) {
		super();
		this.dishName = dishName;
		this.price = i;
		this.size = scale;
		this.dishPhoto = path;
		this.dishId = dishId;
		this.hotelId = hotelId;
		this.itemsId = itemsId;
	}
	
	public CartDto(String dishName, int i, Scale scale,String path,Long dishId,Long hotelId,Long itemsId,int quantity,long customerId,long orderId,long cartId) {
		  super();
		  this.orderId = orderId;
		  this.dishName = dishName;
		  this.price = i;
		  this.size = scale;
		  this.dishPhoto = path;
		  this.dishId = dishId;
		  this.hotelId = hotelId;
		  this.itemsId = itemsId;
		  this.qunatity = quantity;
		  this.customerId = customerId;
		  this.cartId = cartId;
		 }
	
	
}
