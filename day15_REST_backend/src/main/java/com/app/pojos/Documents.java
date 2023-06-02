package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "documentstable")
public class Documents  extends BaseEntity{
	
	@Column(name = "panNo",length = 50)
	private String panNo;
	
	@Column(name = "panPhoto")
	private String panPhoto;
	
	@Column(name = "aadharNo",length = 12)
	private String aadharNo;
	
	@Column(name = "aadharPhoto")
	private String aadharPhoto;
	
	@Column(name = "fsaiiNo",length = 14)
	private String fsaiiNo;
	
	@Column(name = "fsaiiPhoto")
	private String fsaiiPhoto;
	
	@Column(name = "hotelphoto")
	private String hotelPhoto;

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public String getPanPhoto() {
		return panPhoto;
	}

	public void setPanPhoto(String panPhoto) {
		this.panPhoto = panPhoto;
	}

	public String getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getAadharPhoto() {
		return aadharPhoto;
	}

	public void setAadharPhoto(String aadharPhoto) {
		this.aadharPhoto = aadharPhoto;
	}

	public String getFsaiiNo() {
		return fsaiiNo;
	}

	public void setFsaiiNo(String fsaiiNo) {
		this.fsaiiNo = fsaiiNo;
	}

	public String getFsaiiPhoto() {
		return fsaiiPhoto;
	}

	public void setFsaiiPhoto(String fsaiiPhoto) {
		this.fsaiiPhoto = fsaiiPhoto;
	}

	public String getHotelPhoto() {
		return hotelPhoto;
	}

	public void setHotelPhoto(String hotelPhoto) {
		this.hotelPhoto = hotelPhoto;
	}
	
	
	
	
	

}
