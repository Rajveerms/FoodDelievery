package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.BaseEntity;
import com.app.pojos.CookingStatus;
import com.app.pojos.DeliveryBoy;
import com.app.pojos.DeliveryStatus;
import com.app.pojos.OrderStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@ToString
@Setter
@Getter
@NoArgsConstructor
@JsonInclude(Include.NON_EMPTY)
public class OrderShDto extends BaseEntity {
	private double price;
	private String orderNo;
	private LocalDate orderDate;
	private OrderStatus orderStatus;
    private CookingStatus cookingStatus;
	private DeliveryStatus deliveryStatus;
	private String deliveryBoyName;
	private String deliveryBoyNo;
	private String hotelId;
	
	
	public OrderShDto(double price, LocalDate orderDate, OrderStatus orderStatus, CookingStatus cookingStatus,
			DeliveryStatus deliveryStatus,String deliveryMobileNo, String deliveryName,Long Id,Long hotelId) {
		super();
		this.price = price;
		this.orderDate = orderDate;
		this.orderStatus = orderStatus;
		this.cookingStatus = cookingStatus;
		this.deliveryStatus = deliveryStatus;
		this.deliveryBoyName = deliveryName;
		this.deliveryBoyNo = deliveryMobileNo;
		this.orderNo = ""+Id;
		this.hotelId = ""+hotelId;
	}
	
	
}
