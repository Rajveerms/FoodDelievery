package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "cartstable")
public class Cart extends BaseEntity {
	
	@Column(name = "totalAmount")
	private double totalAmount;
	
	@Column(name = "quantity")
	private int quantity;
	
	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<CartItem> getItemList() {
		return itemList;
	}

	public void setItemList(List<CartItem> itemList) {
		this.itemList = itemList;
	}

	@OneToOne
	Customer customer;
	
	@OneToMany(mappedBy = "cart",  orphanRemoval = true)
	List<CartItem> itemList=new ArrayList<>();
	
	public void addtoItemTables(CartItem cart) {
		  System.out.println("inside cart list"+itemList.size());
		  itemList.add(cart);
		  cart.setCart(this);
		 }

		 public Cart(double totalAmount, int quantity, Customer customer) {
		  super();
		  this.totalAmount = totalAmount;
		  this.quantity = quantity;
		  this.customer = customer;
		  
		 }

		public Cart() {
			super();
		}
	
	
	

}
