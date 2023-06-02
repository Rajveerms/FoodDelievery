package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CartDao;
import com.app.dao.CartItemDao;
import com.app.dao.CartItems;
import com.app.dao.CustomerDao;
import com.app.dao.HotelOwnerDao;
import com.app.dao.MenuDao;
import com.app.dao.OrderDetailsDao;
import com.app.dao.OrdersDao;
import com.app.dto.CartDto;
import com.app.pojos.Cart;
import com.app.pojos.CartItem;
import com.app.pojos.CookingStatus;
import com.app.pojos.Customer;
import com.app.pojos.DeliveryStatus;
import com.app.pojos.HotelManager;
import com.app.pojos.Menu;
import com.app.pojos.OrderDetails;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;


@Service
@Transactional
public class CartServiceImpl implements CartService {

	@Autowired
	CartDao cartdao;
	@Autowired
	CartItemDao cartitemdao;

	@Override
	public Long addToCart(long cartItemId) {
		// TODO Auto-generated method stub
		
		CartItem item = cartitemdao.findById(cartItemId).get();
		return item.getId();
		
	}
	
	
	
	
	
	
	
	
	@Autowired
	 private CartDao dao;

	 @Autowired
	 private CartItems itemsDao;

	 @Autowired
	 private MenuDao menuDao;
	 
	 @Autowired
	 private CustomerDao Custdao;
	 
	 @Autowired
	 private OrdersDao orderdao;
	 
	 @Autowired
	 private HotelOwnerDao manager;
	 
	 @Autowired
	 private OrderDetailsDao orderDetails;

	// double totalAmount, int quantity, Customer customer

	 
	 @Override
	 public List<CartDto> findDishDetails(Long customerId, Long dishId) {
	  Customer cust = Custdao.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Wrong customer id"));
	       
	  if(dao.findByCustomerId(customerId)==null) {
	  Cart cart = new Cart(0,1,cust);
	  dao.save(cart);
	  }
	  
	  Cart cartI = dao.findByCustomerId(customerId);
	  Long cartId = cartI.getId();
	  Menu m = menuDao.findById(dishId).orElseThrow(() -> new ResourceNotFoundException("Wrong dish id"));
	  Cart c = dao.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Wrong CartId"));

	  List<CartItem> cartItems = itemsDao.findAll();

	  
	  int count = 0;
	  for (int i = 0; i < cartItems.size(); i++) {
	   

	   if (cartItems.get(i).getItem().getId() == dishId && cartItems.get(i).getCart().getId() == cartId) {
	    count++;
	   }
	  }
	  if (count == 0) {
	   CartItem cartItem = new CartItem(1, m.getPrice(), m, c);
	   itemsDao.save(cartItem);
	   c.addtoItemTables(cartItem);
	  }
	  count = 0;

	  List<CartItem> list = itemsDao.findAll();
	  List<CartDto> listDto = new ArrayList<>();
	  for (int i = 0; i < list.size(); i++) {
	   if (list.get(i).getCart().getId() == cartId) {
	    listDto.add(new CartDto(list.get(i).getItem().getDishName(), list.get(i).getItem().getPrice(),
	      list.get(i).getItem().getSize(), list.get(i).getItem().getDishPhoto(),
	      list.get(i).getItem().getId(), list.get(i).getItem().getHotelManager().getId(),
	      list.get(i).getId()));
	   }
	  }
	  return listDto;

	 }

	 @Override
	 public void updateQuantityOfItem(Long itemsId, Integer quantity) {
	  CartItem citem = itemsDao.findById(itemsId).orElseThrow(() -> new ResourceNotFoundException("Wrong items id"));
	  citem.setQuantity(quantity);
	  System.out.println("quantity changed succesfully");

	 }

	 @Override
	 public void removeItemfromTable(Long id) {
	  itemsDao.deleteById(id);
	  System.out.println("item deleted suceesfully");
	 }


	 
	// List<OrderDetails> itemList, Customer orderCustomer

	 @Override
	 public void placeOrder(Long cartId, double totalAmount,Long hotelId) {

	  List<CartItem> cart = itemsDao.findByCartId(cartId);
	  if(cart.size()!=0) {
	  Cart c = dao.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Wrong items id"));
	  c.setTotalAmount(totalAmount);
	  c.setQuantity(cart.size());
	  Long customerId = c.getCustomer().getId();
	  Customer cust = Custdao.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Wrong Customer Id"));
	  List<CartItem> cartItem = c.getItemList();

	  HotelManager hotel = manager.findById(hotelId).orElseThrow(() -> new ResourceNotFoundException("Wrong hotel Manager"));
	  Orders o = new Orders(totalAmount,LocalDate.now(),OrderStatus.valueOf("NEW"),CookingStatus.valueOf("REJECTED"),
	    DeliveryStatus.valueOf("NOTYETACCEPTED"),null,hotel,cust);
	  orderdao.save(o);

	  
	  for(int i = 0; i<cartItem.size() ; i++) {
	   Menu menu = menuDao.findById(cartItem.get(i).getItem().getId()).orElseThrow();
	   OrderDetails odetails =new OrderDetails(cartItem.get(i).getQuantity(),cartItem.get(i).getTotalPrice(),menu,o); 
	   o.saveOrderDetatils(odetails); 
	   orderDetails.save(odetails);
	  }
	  
	  Long count = itemsDao.deleteByCartId(cartId);
	  
	  System.out.println("Cart cleared and count is"+count);
	  
	  //dao.deleteById(customerId);
	  
	  }
	  
	  
	  
	  
	  
	 }

	@Override
	public Long getCartId(Long id) {
		
		return cartdao.findByCustomerId(id).getId();
	}
	
	@Override
	 public List<CartDto> getAllCartProducts(Long cartId) {
	    List<CartItem> list = itemsDao.findAll();
	    List<CartDto> listDto = new ArrayList<>();
	    for (int i = 0; i < list.size(); i++) {
	     if (list.get(i).getCart().getId() == cartId) {
	      listDto.add(new CartDto(list.get(i).getItem().getDishName(), list.get(i).getItem().getPrice(),
	        list.get(i).getItem().getSize(), list.get(i).getItem().getDishPhoto(),
	        list.get(i).getItem().getId(), list.get(i).getItem().getHotelManager().getId(),
	        list.get(i).getId(),list.get(i).getQuantity(),list.get(i).getCart().getCustomer().getId(),list.get(i).getId(),list.get(i).getCart().getId()));
	      
	     }
	    }  return listDto;
	    
	}

	

	

	

	


	


	

	
}
