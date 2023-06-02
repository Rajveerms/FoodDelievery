package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.CustomerDao;
import com.app.pojos.Address;
import com.app.pojos.Cards;
import com.app.pojos.Cart;
import com.app.pojos.Customer;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	CustomerDao ud;
	@Value("${project.image}")
	private String path;
	

	@Override
	public Customer registerCustomer(Customer newUser, MultipartFile file) throws IOException {
		
		String name = file.getOriginalFilename();
		String uniqName = newUser.getUsername().concat(name.substring(name.lastIndexOf(".")));
		String filePath = path + uniqName;
		
		File f = new File(path);
		if(!f.exists())
			f.mkdir();
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		newUser.setPhoto(uniqName);
		return ud.save(newUser);
		
		
	}

	@Override
	public List<Customer> findAlluser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Customer findCustomer(Long id) {
		// TODO Auto-generated method stub
		
		try {
		Customer c1=ud.findById(id).orElseThrow();
		c1.addCart(new Cart());
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("Some error occured in find customer");
		}
		
		return null;
	}

	@Override
	public int removecustomer(Long cust_id) {
		// TODO Auto-generated method stub
		try {
		Customer c1=ud.findById(cust_id).orElseThrow();
		//c1.removeCart(c1.getCart());
		ud.delete(c1);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.out.println("Error occured in removecustomer");
		}
		
		//ud.delete(c1);
		
		return 0;
	}

	@Override 
	 public void addAddress(Address newUserAddress, Long cust_Id) { 
	  // TODO Auto-generated method stub 
	  try { 
	  Customer c1=ud.findById(cust_Id).orElseThrow(); 
	  List<Address> addressList=c1.getAddressList(); 
	  addressList.add(newUserAddress); 
	  c1.setAddressList(addressList); 
	  } 
	  catch (Exception e) { 
	   // TODO: handle exception 
	   System.out.println("Error occured in addingAddress"); 
	  } 
	      
	 } 
	
 @Override 
	 public void addCard(Cards newUserDebitCard, Long cust_Id) { 
	  // TODO Auto-generated method stub 
	  try { 
	  Customer c1=ud.findById(cust_Id).orElseThrow(); 
	  List<Cards> cardList=c1.getCardList(); 
	  newUserDebitCard.setCustomer(c1); 
	  cardList.add(newUserDebitCard); 
	  } 
	  catch (Exception e) { 
	   System.out.println("Error occured in addingCard"); 
	    
	  } 
	   
	   
	 }



	





	





	@Override
	public Customer validate(Customer customer) {
		Customer c=ud.findByUsernameAndPassword(customer.getUsername(),customer.getPassword());
		System.out.println("User is as follow "+c);
		return c;
	}





	@Override
	public Customer forgotCustomerPassword(Customer newUser) {
		// TODO Auto-generated method stub
		Customer customer=ud.findByUsername(newUser.getUsername());
		customer.setPassword(newUser.getPassword());
		ud.save(customer);
		System.out.println("customer is as follow "+customer);
		return null;
	}
	
	
	@Override
	 public Customer getCustomerDetails(Long id) {
	  Customer c = ud.findById(id).orElseThrow();
	  System.out.println(c);
	  return c;
	 }
	@Override 
	 public Customer addUser(Customer newUserdata) { 
	  // TODO Auto-generated method stub 
	  try { 
	   return ud.save(newUserdata); 
	    
	   } 
	   catch (Exception e) { 
	    System.out.println("Error occured in addingCard"); 
	     
	   } 
	    
	  return null; 
	 } 
	 
	 
	 
	 
	 
	 @Override 
	 public void registerCustomerphoto(MultipartFile file, Long cust_id) { 
	  try { 
	   Customer c1=ud.findById(cust_id).orElseThrow(); 
	    
	    
	   System.out.println(c1); 
	    
	   String name = file.getOriginalFilename(); 
	    
	   String uniqName =c1.getUsername().concat(name.substring(name.lastIndexOf("."))); 
	   String filePath = path + uniqName; 
	    
	   File f = new File(path); 
	   if(!f.exists()) 
	    f.mkdir(); 
	   Files.copy(file.getInputStream(), Paths.get(filePath)); 
	    
	   c1.setPhoto(uniqName); 
	    
	   ud.save(c1); 
	    
	    
	    
	  } 
	  catch (Exception e) { 
	   // TODO: handle exception 
	   System.out.println("Error in uploading image"); 
	    
	  } 
	   
	   
	 }

	
	





}
