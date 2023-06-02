package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.OrderDetails;

public interface OrderDetailsDao extends JpaRepository<OrderDetails, Long>{

	List<OrderDetails> findByOrderCustomerId(Long id);

}
