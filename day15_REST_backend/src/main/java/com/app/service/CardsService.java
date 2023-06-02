package com.app.service;

import java.util.List;

import com.app.pojos.Cards;

public interface CardsService {

	List<Cards> findDebitCardsByCustomerId(long id);
}
