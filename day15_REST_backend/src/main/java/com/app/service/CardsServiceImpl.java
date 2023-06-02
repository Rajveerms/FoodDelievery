package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CardDao;
import com.app.pojos.Cards;

@Service
@Transactional
public class CardsServiceImpl implements CardsService{

	
	@Autowired
	private CardDao dao;
	
	@Override
	public List<Cards> findDebitCardsByCustomerId(long id) {
		return dao.findByCustomerId(id);
	}

}
