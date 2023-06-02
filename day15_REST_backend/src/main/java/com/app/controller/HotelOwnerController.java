package com.app.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.Customer;
import com.app.pojos.Documents;
import com.app.pojos.HotelManager;
import com.app.pojos.Menu;
import com.app.pojos.OrderDetails;
import com.app.pojos.OrderDto;
import com.app.pojos.Orders;
import com.app.service.HotelOwnerService;
import com.app.service.MenuService;
import com.app.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/hotelowner")
@CrossOrigin("http://localhost:3000")
public class HotelOwnerController {

	@Autowired
	HotelOwnerService hotelservice;
	@Autowired
	OrderService os;
	@Autowired
	MenuService menuservice;

	@Autowired
	ObjectMapper mapper;

	public HotelOwnerController() {
	}

	@PostMapping("/forgotPassword")
	String forgotHotelOwnerPassword(@RequestBody HotelManager newHotel) {

		HotelManager ct = hotelservice.forgotCustomerPassword(newHotel);
		return "Password updated succesfully";

	}

	@GetMapping("/getAllDish/{hotelId}")
	List<Menu> getAllMenuPerRestaurant(@PathVariable Long hotelId) {

		List<Menu> list = menuservice.getAllMneuperHotel(hotelId);
		return list;
	}

	@PostMapping("/updateDish/{dishId}")
	String updateDish(@RequestBody Menu dish, @PathVariable Long dishId) {
		menuservice.updateMenu(dish, dishId);
		return "Dish Updated succesfully";
	}

	@PostMapping("/login")
	String hotelManagerLogin(@RequestBody HotelManager hotelmanager) {
		HotelManager c = hotelservice.validate(hotelmanager);
		System.out.println("man is as follow +c" + c);
		if (c != null)
			return Long.toString(c.getId());
		else
			return "-1";

	}

	@PostMapping("/register")
	String registerNewHotel(@RequestBody HotelManager newHotelManager) {

		System.out.println("HotelManager object is " + newHotelManager);
		HotelManager m = hotelservice.registerCustomer(newHotelManager);
		return Long.toString(m.getId());

	}

	@RequestMapping("/changeorderstatus/{order_Id}/{status}")
	String changeOrderstatus(@PathVariable Long order_Id, @PathVariable String status) {
		System.out.println("Order id " + order_Id + " " + "orderstatus is " + status);
		os.updatestatusofOrder(order_Id, status);

		return "status updated succesfully";

	}

	@RequestMapping("/getAllOrders/{hotel_Id}")
	List<OrderDto> getAllOrders(@PathVariable Long hotel_Id) {
		List<Orders> list = new ArrayList<>();
		List<OrderDto> listdto = new ArrayList<>();
		list = os.getAllOrders();
		List<String> menulist = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {

			List<String> itemlist = new ArrayList<>();
			List<Integer> itemquantity = new ArrayList<>();

			Orders order = list.get(i);
			List<OrderDetails> orderdetails = order.getItemList();
			System.out.println("Orderdetails is ");
			orderdetails.forEach(x -> {

				itemlist.add(x.getDish().getDishName());
				itemquantity.add(x.getQuantity());
			});
			List<OrderDetails> orderdetaiList = order.getItemList();
			OrderDto od = new OrderDto(order.getId(), order.getPrice(), order.getOrderDate(), order.getOrderStatus(),
					order.getCookingStatus(), order.getDeliveryStatus(), itemlist, itemquantity);
			if (hotel_Id == order.getHotelManager().getId())
				listdto.add(od);
		}
		System.out.println(listdto);
		return listdto;

	}

	@PostMapping("/registerdocumnets/{hotel_Id}/{doc_Id}")
	String registerHotelDocuments(@RequestParam("aadharPhoto") MultipartFile aadharfile,
			@RequestParam("panPhoto") MultipartFile panfile, @RequestParam("fsaiiPhoto") MultipartFile fsaiifile,
			@RequestParam("hotelPhoto") MultipartFile hotelfile, @PathVariable Long hotel_Id,
			@PathVariable Long doc_Id) {

		System.out.println(hotel_Id + " gjgjhgfjgjhg " + doc_Id);

		// Documents docs = mapper.readValue(hotelDocuments, Documents.class);
		hotelservice.registerhotelDocuments(doc_Id, hotel_Id, aadharfile, panfile, fsaiifile, hotelfile);
		return "docs uploaded succesfully";

	}

	@PostMapping("/registerdocumnets")
	String registerHotelDocumentsNo(@RequestBody Documents docs) {

		Documents doc = hotelservice.registerhotelDocumentsNo(docs);

		return Long.toString(doc.getId());

	}

	@PostMapping("/addDish/{hotelId}")
	String registerMenu(@RequestBody Menu menu, @PathVariable Long hotelId) {
		Menu men = hotelservice.addMenudata(menu, hotelId);
		return Long.toString(men.getId());

	}

	@PostMapping("/addmenuPhoto/{dishId}")
	String setPhotomenu(@RequestParam(value = "dishPhoto") MultipartFile file, @PathVariable Long dishId) {
		String status = hotelservice.addMenuPhoto(file, dishId);
		return status;

	}

	@RequestMapping("/getAllOrderofHotel/{hotel_Id}")
	List<Orders> getAllOrdersofHotel(@PathVariable Long hotel_Id) {

		return os.getAllOrderOfHotel(hotel_Id);

	}

}
