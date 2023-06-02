package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor

@ToString
@Entity
@Table(name = "hotelmanagertable")
public class HotelManager extends BaseEntity {
	@Column(name = "firstName",length = 50)
	private String firstName;
	@Column(name = "lastName",length = 50)
	private String lastName;
	@Column(name = "email",length = 50,unique = true)
	private String email;
	@Column(name = "password",length = 50)
	private String password;
	@Column(name = "username",length = 50)
	private String username;
	@Column(name = "hotelname",length = 50)
	private String hotelName;
	@Column(name = "mobileNo",length = 50)
	private String mobileNo;
	@Column(name = "hotelType")
	private hotelType hotelType;
	
	
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public hotelType getHotelType() {
		return hotelType;
	}
	public void setHotelType(hotelType hotelType) {
		this.hotelType = hotelType;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public Documents getDocuments() {
		return documents;
	}
	public void setDocuments(Documents documents) {
		this.documents = documents;
	}
	public List<Menu> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}
	public List<Orders> getOrderList() {
		return orderList;
	}
	public void setOrderList(List<Orders> orderList) {
		this.orderList = orderList;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public hotelStatus getHotelstatus() {
		return hotelstatus;
	}
	public void setHotelstatus(hotelStatus hotelstatus) {
		this.hotelstatus = hotelstatus;
	}
	@Embedded
	private Address address;
	
	@OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
  	private Documents documents;
	
	
	@OneToMany(mappedBy = "hotelManager",cascade = CascadeType.ALL,orphanRemoval = true)
	List<Menu> menuList=new ArrayList<>();
	
	@OneToMany(mappedBy = "hotelManager",cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	List<Orders> orderList=new ArrayList<>();
	
	
	@Column(name="rating")
	private int rating;
	
	@Column(name="description")
	private String description;	
	
	@Column(name="hotelStatus")
	  private hotelStatus hotelstatus;
	
	
	public void adddocuments(Documents document) { 
		   
		  this.documents=document; 
		   
		   
		 } 
		public void addMenu(Menu menu) { 
		   
		  this.menuList.add(menu); 
		  menu.setHotelManager(this); 
		   
		   
		 }
	
	
	

}
