package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.DeliveryBoyDao;
import com.app.dao.OrdersDao;
import com.app.dto.AddressDto;
import com.app.dto.Credentials;
import com.app.dto.DeliveryBoyDto;
import com.app.dto.OrdersDto;
import com.app.pojos.Address;
import com.app.pojos.CookingStatus;
import com.app.pojos.DeliveryBoy;
import com.app.pojos.DeliveryStatus;
import com.app.pojos.OrderStatus;
import com.app.pojos.Orders;
import com.app.pojos.Status;

@Service
@Transactional
public class DeliveryBoyServiceImpl implements DeliveryBoyService
{
	@Autowired
	DeliveryBoyDao dao;
	
	@Autowired
	OrdersDao orderDao;
	
	public OrdersDto OrdersDtoBuilder(Orders order)
	{
		OrdersDto dto = new OrdersDto();
		dto.setDestination(order.getHotelManager().getAddress().toString());
		dto.setId(order.getId());
		dto.setPrice(order.getPrice());
		dto.setSource(order.getCustomer().getAddressList().get(0).toString());
		dto.setDeliveryStatus(order.getDeliveryStatus().toString());
		return dto;
	}
	
	public DeliveryBoy DeliveryBoyBuilder(DeliveryBoyDto dto, AddressDto AddrDto)
	{
		DeliveryBoy dboy = new DeliveryBoy();
		dboy.setDeliveryBoyStatus(dto.getDeliveryBoyStatus());
		dboy.setEmail(dto.getEmail());
		dboy.setFirstName(dto.getLastName());
		dboy.setGender(dto.getGender());
		dboy.setLastName(dto.getLastName());
		dboy.setMobileNo(dto.getMobileNo());
		dboy.setPassword(dto.getPassword());
		dboy.setUsername(dto.getUsername());
		Address addr = new Address();
		addr.setAddressLine1(AddrDto.getAddressLine1());
		addr.setAddressLine2(AddrDto.getAddressLine2());
		addr.setCity(AddrDto.getCity());
		addr.setCountry(AddrDto.getCountry());
		addr.setPincode(AddrDto.getPincode());
		addr.setState(AddrDto.getState());
		dboy.setAddress(addr);
		return dboy;
	}

	@Override
	public void uploadImage(String path, MultipartFile file, DeliveryBoy dboy) throws IOException {
		
		//DeliveryBoy dboy = DeliveryBoyBuilder(dto, AddrDto);
		String name = file.getOriginalFilename();
		String uniqName = dboy.getEmail().concat(name.substring(name.lastIndexOf(".")));
		System.out.println(uniqName);
		String filePath = path + uniqName;
		
		File f = new File(path);
		if(!f.exists())
			f.mkdir();
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		dboy.setPhoto(uniqName);
		System.out.println(dboy);
		System.out.println(dao.save(dboy));
	}
	
	

	@Override
	public List<OrdersDto> getNotYetAccptedOrders() {
		
		List<Orders> list = orderDao.findByDeliveryStatusAndOrderStatusAndCookingStatus(DeliveryStatus.NOTYETACCEPTED, OrderStatus.NEW, CookingStatus.READY);
		List<OrdersDto> resultList = new ArrayList<OrdersDto>();
		list.forEach(ele->{
			resultList.add(OrdersDtoBuilder(ele));
		});
		
		return resultList;
	}

	@Override
	public String updateOrder(Long deliveryBoyId, Long orderId, String orderStatus) {
		
		String result = null;
		try {
			Orders order = orderDao.findById(orderId).orElseThrow();
			
			order.setDeliveryStatus(DeliveryStatus.valueOf(orderStatus));
			
			DeliveryBoy deliveryBoy = dao.findById(deliveryBoyId).orElseThrow();
			
			order.setDeliveryboy(deliveryBoy);
			
			result = "Order Accepted";
		}
		catch (Exception e) {
			result = "Not Accepted";
		}
		
		return result;
		
	}

	@Override
	public String login(Credentials cred) {
		
		DeliveryBoy dboy = dao.findByUsernameAndPassword(cred.getUsername(), cred.getPassword());
		if(dboy != null)
			return dboy.getId().toString();
		else
			return "0";
	}

	@Override
	public String forgotpassword(Credentials cred) {
		DeliveryBoy dboy = dao.findByUsername(cred.getUsername());
		if(dboy != null)
		{
			dboy.setPassword(cred.getPassword());
			return "Successfull";
		}
		else
		{
			return "NotSuccessfull";
		}
		
	}
	
	 @Override
	 public List<DeliveryBoy> findAllDeliveryBoy() {
	  return dao.findAll();
	 }

	 @Override
	 public List<DeliveryBoy> findAllActiveDeliveryBoy() {
	  List<DeliveryBoy> list = dao.findAll();
	  for(int i = 0; i<list.size() ; i++) {
	   if(list.get(i).getDeliveryBoyStatus()!=Status.ACTIVE) {
	    list.remove(i);
	   }
	  }
	  return list;
	 }

	 @Override
	 public List<DeliveryBoy> findAllInactiveDeliveryBoy() {
	  List<DeliveryBoy> list = dao.findAll();
	  List<DeliveryBoy> inactiveList = new ArrayList<>();
	  for(int i = 0; i<list.size() ; i++) {
	   if(list.get(i).getDeliveryBoyStatus()==Status.INACTIVE) {
	    inactiveList.add(list.get(i));
	   }
	  }
	  return inactiveList;
	 }

}




















