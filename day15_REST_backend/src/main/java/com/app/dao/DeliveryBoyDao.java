package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.DeliveryBoy;

public interface DeliveryBoyDao extends JpaRepository<DeliveryBoy, Long> 
{
	DeliveryBoy findByUsernameAndPassword(String username, String password);
	DeliveryBoy findByUsername(String username);
}
