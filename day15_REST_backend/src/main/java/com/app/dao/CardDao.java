package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Cards;

public interface CardDao extends JpaRepository<Cards, Long> {

	List<Cards> findByCustomerId(Long id);
}
