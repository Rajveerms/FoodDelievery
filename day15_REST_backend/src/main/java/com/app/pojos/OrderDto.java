package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@ToString
@AllArgsConstructor
public class OrderDto  {
	
	private Long Id;
	private double price;
	
//	@Column(name = "orderDate")
	private LocalDate orderDate;
	
//	@Column(name = "orderStatus")
	private OrderStatus orderStatus;
	
//	@Column(name = "cookingStatus")
	private CookingStatus cookingStatus;
	
//	@Column(name = "deliveryStatus")
	private DeliveryStatus deliveryStatus;
	
//	Map<Long,String> map=new LinkedHashMap<Long, String>();
//	List<List<String>> itemList=new ArrayList<>();

	
	
	
//	List<Menu> dishlist=new ArrayList<Menu>();
	List<String> itemlist=new ArrayList<String>();
	public OrderDto(Long id, double price, LocalDate orderDate, OrderStatus orderStatus, CookingStatus cookingStatus,
		DeliveryStatus deliveryStatus, List<String> itemlist, List<Integer> itemquantity) {
	super();
	Id = id;
	this.price = price;
	this.orderDate = orderDate;
	this.orderStatus = orderStatus;
	this.cookingStatus = cookingStatus;
	this.deliveryStatus = deliveryStatus;
	this.itemlist = itemlist;
	this.itemquantity = itemquantity;
}
	public OrderDto() {
	super();
}
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	public CookingStatus getCookingStatus() {
		return cookingStatus;
	}
	public void setCookingStatus(CookingStatus cookingStatus) {
		this.cookingStatus = cookingStatus;
	}
	public DeliveryStatus getDeliveryStatus() {
		return deliveryStatus;
	}
	public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	public List<String> getItemlist() {
		return itemlist;
	}
	public void setItemlist(List<String> itemlist) {
		this.itemlist = itemlist;
	}
	public List<Integer> getItemquantity() {
		return itemquantity;
	}
	public void setItemquantity(List<Integer> itemquantity) {
		this.itemquantity = itemquantity;
	}
	List<Integer> itemquantity=new ArrayList<Integer>();

}
