package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Customer;

public interface CustomerDao extends JpaRepository<Customer, Long>  {


	Customer findByUsernameAndPassword(String username, String password);

	Customer findByUsername(String username);
	

}
