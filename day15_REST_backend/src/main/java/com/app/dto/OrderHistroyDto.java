package com.app.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Setter
@Getter
public class OrderHistroyDto {

	private int quantity;
	private double totalPrice;
	private Long dishId;
	private Long orderId;
	private String dishName;
	private int dishPrice;
	private LocalDate orderdate;
	
	public OrderHistroyDto(int quantity, double totalPrice, Long dish, Long order, String dishName, int dishPrice,LocalDate orderdate) {
		super();
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.dishId = dish;
		this.orderId = order;
		this.dishName = dishName;
		this.dishPrice = dishPrice;
		this.orderdate = orderdate;
	}
	
	
	
	
	
	
}
