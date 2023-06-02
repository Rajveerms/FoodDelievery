package com.app.dto;


import com.app.pojos.DeliveryStatus;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor

public class OrdersDto {
	
	private Long id;
	
	private double price;
	
	private String deliveryStatus;
	
	private String destination;
	
	private String source;

	public OrdersDto() {
		super();
	}

	public OrdersDto(Long id, double price, String deliveryStatus, String destination, String source) {
		super();
		this.id = id;
		this.price = price;
		this.deliveryStatus = deliveryStatus;
		this.destination = destination;
		this.source = source;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
	
	

}
