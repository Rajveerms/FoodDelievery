package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderdetailtable")
public class OrderDetails extends BaseEntity {
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "totalPrice")
	private double totalPrice;
	
	@OneToOne
	private Menu dish;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "orderId")
	private Orders order;
	
		
	public OrderDetails() {
		super();
	}
		
	public OrderDetails(int quantity, double totalPrice, Menu dish, Orders order) {
		super();
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.dish = dish;
		this.order = order;
	}




	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public Menu getDish() {
		return dish;
	}
	public void setDish(Menu dish) {
		this.dish = dish;
	}
	public Orders getOrder() {
		return order;
	}
	public void setOrder(Orders order) {
		this.order = order;
	}
	
	
	

}
