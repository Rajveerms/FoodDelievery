package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "orderstable")

public class Orders extends BaseEntity{
	
	@Column(name = "price")
	private double price;
	
	@Column(name = "orderDate")
	private LocalDate orderDate;
	
	@Column(name = "orderStatus")
	private OrderStatus orderStatus;
	
	@Column(name = "cookingStatus")
	private CookingStatus cookingStatus;
	
	@Column(name = "deliveryStatus")
	private DeliveryStatus deliveryStatus;
	
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	private DeliveryBoy deliveryboy;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "hotelId")
	private HotelManager hotelManager;
	
	@OneToMany(mappedBy = "order")
	List<OrderDetails> itemList=new ArrayList<>();
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CustomerId")
	private Customer customer;
	
	
	
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

	public DeliveryBoy getDeliveryboy() {
		return deliveryboy;
	}

	public void setDeliveryboy(DeliveryBoy deliveryboy) {
		this.deliveryboy = deliveryboy;
	}

	public HotelManager getHotelManager() {
		return hotelManager;
	}

	public void setHotelManager(HotelManager hotelManager) {
		this.hotelManager = hotelManager;
	}

	public List<OrderDetails> getItemList() {
		return itemList;
	}

	public void setItemList(List<OrderDetails> itemList) {
		this.itemList = itemList;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Orders(double price, LocalDate orderDate, OrderStatus orderStatus, CookingStatus cookingStatus,
			   DeliveryStatus deliveryStatus, DeliveryBoy deliveryboy, HotelManager hotelManager,
			    Customer orderCustomer) {
			  super();
			  this.price = price;
			  this.orderDate = orderDate;
			  this.orderStatus = orderStatus;
			  this.cookingStatus = cookingStatus;
			  this.deliveryStatus = deliveryStatus;
			  this.deliveryboy = deliveryboy;
			  this.hotelManager = hotelManager;
			  this.customer = orderCustomer;
			 }
			 
			 public void saveOrderDetatils(OrderDetails order) {
			  itemList.add(order);
			  order.setOrder(this);
			 }
	
	
	
	

}
