package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "menutable")
public class Menu extends BaseEntity {
	@Column(name = "dishName",length = 50)
	private String dishName;
	@Column(name = "dishPhoto",length = 50)
	private String dishPhoto;
	@Column(name = "vegNonVegCategory")
	private VegNonVegCategory vegNonVegCategory ;
	
	@Column(name = "cusineCategory")
	private CuisineCategory cusineCategory;
	
	@Column(name = "price",length = 50)
	private int price;
	
	@Column(name = "size",length = 50)
	private Scale size;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	@JoinColumn(name = "hotelId")
	HotelManager hotelManager;
	
	@Column(name = "millType")
	  private MillType milltype;

	public String getDishName() {
		return dishName;
	}

	public void setDishName(String dishName) {
		this.dishName = dishName;
	}

	public String getDishPhoto() {
		return dishPhoto;
	}

	public void setDishPhoto(String dishPhoto) {
		this.dishPhoto = dishPhoto;
	}

	public VegNonVegCategory getVegNonVegCategory() {
		return vegNonVegCategory;
	}

	public void setVegNonVegCategory(VegNonVegCategory vegNonVegCategory) {
		this.vegNonVegCategory = vegNonVegCategory;
	}

	public CuisineCategory getCusineCategory() {
		return cusineCategory;
	}

	public void setCusineCategory(CuisineCategory cusineCategory) {
		this.cusineCategory = cusineCategory;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Scale getSize() {
		return size;
	}

	public void setSize(Scale size) {
		this.size = size;
	}

	public HotelManager getHotelManager() {
		return hotelManager;
	}

	public void setHotelManager(HotelManager hotelManager) {
		this.hotelManager = hotelManager;
	}

	public MillType getMilltype() {
		return milltype;
	}

	public void setMilltype(MillType milltype) {
		this.milltype = milltype;
	}
	
	
	

}
