package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.HotelManager;

public interface AdminDao extends JpaRepository<HotelManager, Long>{

}
