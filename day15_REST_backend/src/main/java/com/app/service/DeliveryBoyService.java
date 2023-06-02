package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.Credentials;
import com.app.dto.DeliveryBoyDto;
import com.app.dto.OrdersDto;
import com.app.pojos.DeliveryBoy;

public interface DeliveryBoyService 
{
	
	public void uploadImage(String path, MultipartFile file, DeliveryBoy dboy) throws IOException;
	public List<OrdersDto> getNotYetAccptedOrders();
	public String updateOrder(Long deliveryBoyId, Long orderId, String orderStatus);
	public String login(Credentials cred);
	public String forgotpassword(Credentials cred);
	
	List<DeliveryBoy> findAllDeliveryBoy();
	 List<DeliveryBoy> findAllActiveDeliveryBoy();
	 List<DeliveryBoy> findAllInactiveDeliveryBoy();
	
}
