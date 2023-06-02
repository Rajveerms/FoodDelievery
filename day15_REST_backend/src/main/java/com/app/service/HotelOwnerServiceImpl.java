package com.app.service;

import java.io.File;
import java.lang.annotation.Documented;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.CustomerDao;
import com.app.dao.DocumentDao;
import com.app.dao.HotelOwnerDao;
import com.app.dao.MenuDao;
import com.app.dto.HotelManagerDto;
import com.app.pojos.Address;
import com.app.pojos.CuisineCategory;
import com.app.pojos.Customer;
import com.app.pojos.Documents;
import com.app.pojos.HotelManager;
import com.app.pojos.Menu;
import com.app.pojos.hotelStatus;

@Service
public class HotelOwnerServiceImpl implements HotelOwnerService{
	
	@Autowired
	HotelOwnerDao hoteldao;
	@Autowired
	DocumentDao documentdao;
	@Autowired
	MenuDao menudao;
	
	@Value("${project.image}")
	private String path;

	@Override 
	 public HotelManager registerCustomer(HotelManager newHotelManager) { 
	   
	  return hoteldao.save(newHotelManager); 
	   
	   
	   
	 }


	@Override 
	 public String registerhotelDocuments(Long doc_Id, Long hotel_Id, MultipartFile aadharfile, MultipartFile panfile, MultipartFile fsaiifile, MultipartFile hotelfile) { 
	  // TODO Auto-generated method stub 
	   
	   
	   
	  try { 
	    
	   System.out.println("Before"); 
	  Documents d1=documentdao.findById(doc_Id).orElseThrow(); 
	  HotelManager h1=hoteldao.findById(hotel_Id).orElseThrow(); 
	  System.out.println("after"+h1.getId()+"  "+h1.getUsername()); 
	  String username=h1.getUsername(); 
	  String name = aadharfile.getOriginalFilename(); 
	   
	  String uniqName = "aadhar"+username.concat(name.substring(name.lastIndexOf("."))); 
	  String filePath = path + uniqName; 
	   
	  File f = new File(path); 
	  if(!f.exists()) 
	   f.mkdir(); 
	   
	  Files.copy(aadharfile.getInputStream(), Paths.get(filePath)); 
	  d1.setAadharPhoto(uniqName); 
	   
	   name = panfile.getOriginalFilename(); 
	   uniqName = "pan"+username.concat(name.substring(name.lastIndexOf("."))); 
	   filePath = path + uniqName; 
	   
	   f = new File(path); 
	  if(!f.exists()) 
	   f.mkdir(); 
	  Files.copy(panfile.getInputStream(), Paths.get(filePath)); 
	  d1.setPanPhoto(uniqName); 
	   
	   
	  name = fsaiifile.getOriginalFilename(); 
	   uniqName = "fsaii"+username.concat(name.substring(name.lastIndexOf("."))); 
	   filePath = path + uniqName; 
	   
	   f = new File(path); 
	  if(!f.exists()) 
	   f.mkdir(); 
	  Files.copy(fsaiifile.getInputStream(), Paths.get(filePath)); 
	  d1.setFsaiiPhoto(uniqName); 
	   
	  name = hotelfile.getOriginalFilename(); 
	   uniqName = "hotelPhoto"+username.concat(name.substring(name.lastIndexOf("."))); 
	   filePath = path + uniqName; 
	   
	   f = new File(path); 
	  if(!f.exists()) 
	   f.mkdir(); 
	  Files.copy(hotelfile.getInputStream(), Paths.get(filePath)); 
	   
	  d1.setHotelPhoto(uniqName); 
	   
	  Documents document=documentdao.save(d1); 
	   
	  h1.setDocuments(document); 
	   
	   
	   
	   
	  hoteldao.save(h1); 
	   
	   
	   
	  } 
	   
	  catch(Exception e) 
	  { 
	  System.out.println(e.getMessage()); 
	  System.out.println("Error in registry of document of hotel"); 
	  return "Document Registration Unsuccessful....."; 
	   
	  } 
	   
	  return "Document Registration Successful....."; 
	   
	   
	   
	   
	 }	
	@Override
	public HotelManager validate(HotelManager hotelmanager) {
//		

		HotelManager manager=hoteldao.findByUsernameAndPassword(hotelmanager.getUsername(),hotelmanager.getPassword()); 
		  System.out.println("User is as follow "+hotelmanager); 
		  return manager;
	}


	
	


	@Override
	public HotelManager forgotCustomerPassword(HotelManager newHotel) {
		// TODO Auto-generated method stub
		HotelManager hotel=hoteldao.findByUsername(newHotel.getUsername());
		hotel.setPassword(newHotel.getPassword());
		hoteldao.save(hotel);
		//System.out.println("customer is as follow "+customer);
		return null;
		
	}
	
	
	public HotelManagerDto HotelManagerDtoBuilder(HotelManager mgr)
	{
		HotelManagerDto mgrDto = new HotelManagerDto();
		mgrDto.setDescription(mgr.getDescription());
		mgrDto.setHotelphoto(mgr.getDocuments().getHotelPhoto());
		mgrDto.setHotelName(mgr.getHotelName());
		mgrDto.setHotelType(mgr.getHotelType());
		mgrDto.setRating(mgr.getRating());
		mgrDto.setId(mgr.getId());
		return mgrDto;
	}
	
	@Override
	public List<HotelManagerDto> getHomepage(String city) {
		Address adrr = new Address();
		adrr.setCity(city);
		List<HotelManager> mgr = hoteldao.findByAddressCity(city);
		System.out.println("Selected hotel list ");
		System.out.println(mgr);
		List<HotelManagerDto> resultList=new ArrayList<HotelManagerDto>();
		mgr.forEach((ele)->{
			if(ele.getHotelstatus().equals(hotelStatus.APPROVED))
			resultList.add(HotelManagerDtoBuilder(ele));
		});
		
		return resultList;
	}


	@Override
	public String addMenu(Menu menu, Long hotelId, MultipartFile file) {
		// TODO Auto-generated method stub
		try {
			HotelManager hotel=hoteldao.findById(hotelId).orElseThrow();
			String name = file.getOriginalFilename();
			String uniqName = menu.getDishName()+hotel.getUsername().concat(name.substring(name.lastIndexOf(".")));
			String filePath = path + uniqName;
			
			File f = new File(path);
			if(!f.exists())
				f.mkdir();
			Files.copy(file.getInputStream(), Paths.get(filePath));
			menu.setDishPhoto(uniqName);
			menudao.save(menu);
			
			hotel.addMenu(menu);
			hoteldao.save(hotel);
			return "Dish added Successfully";
			}
			catch (Exception e) {
				return "Error occured in adding menu";
				
			}
			
		
	}


	@Override
	public List<String> getAllCities() {
		
		return hoteldao.getAllCities();
	}


	@Override
	public List<HotelManagerDto> getSearchResult(String hotelName) {
		
		List<HotelManager> list1 =  hoteldao.findBymenuListDishName(hotelName);
		List<HotelManager> list2 =  hoteldao.findByhotelName(hotelName);
		List<HotelManager> list3 = new ArrayList<HotelManager>();
		try {

			list3 =  hoteldao.findBymenuListCusineCategory(CuisineCategory.valueOf(hotelName));
			
		}
		catch(Exception e)
		{
			System.out.println("not part of enum");
		}
		System.out.println(list1);
		System.out.println(list2);
		System.out.println(list3);
		
		List<HotelManagerDto> resultList = new ArrayList<>();
		if(list1 != null)
		{
			
			list1.forEach(ele->{
				HotelManagerDto dto = HotelManagerDtoBuilder(ele);
				boolean flag = false;
				for(int i=0; i<resultList.size(); i++)
				{
					HotelManagerDto res = resultList.get(i);
					if(res.getHotelName().equals(dto.getHotelName()))
					{
						flag = true;
						break;
					}
				}
				if(!flag)
					resultList.add(dto);
								
			});
		}
		
		if(list2 != null)
		{
			list2.forEach(ele->{
				HotelManagerDto dto = HotelManagerDtoBuilder(ele);
				boolean flag = false;
				for(int i=0; i<resultList.size(); i++)
				{
					HotelManagerDto res = resultList.get(i);
					if(res.getHotelName().equals(dto.getHotelName()))
					{
						flag = true;
						break;
					}
				}
				if(!flag)
					resultList.add(dto);

			});
		}
		
		if(list3 != null)
		{
			list3.forEach(ele->{
				HotelManagerDto dto = HotelManagerDtoBuilder(ele);
				boolean flag = false;
				for(int i=0; i<resultList.size(); i++)
				{
					HotelManagerDto res = resultList.get(i);
					if(res.getHotelName().equals(dto.getHotelName()))
					{
						flag = true;
						break;
					}
				}
				if(!flag)
					resultList.add(dto);
 
			});
		}
		System.out.println(resultList);
		return resultList;
	}


	@Override
	public List<String> getSearch(String input) {
		//List<HotelManager> resultlist = hoteldao.findByhotelNameContains(input);
		//System.out.println(hoteldao.getSearchString(input));
		//System.out.println(resultlist);
		
		return null;
	}
	
	public List<String> getHotelNameSuggestionsService(String input)
	{
		return hoteldao.getMatchingSearchString(input);
	}

	@Override 
	 public Documents registerhotelDocumentsNo(Documents docs) { 
	  // TODO Auto-generated method stub 
	  Documents doc=documentdao.save(docs); 
	  return doc; 
	 }
	
	@Override 
	 public Menu addMenudata(Menu menu, Long hotelId) { 
	  // TODO Auto-generated method stub 
	  Menu mu= menudao.save(menu); 
	  HotelManager hm=hoteldao.findById(hotelId).orElseThrow(); 
	  hm.addMenu(menu); 
	  hoteldao.save(hm); 
	  
	   
	  return mu; 
	 } 
	 
	 
	 @Override 
	 public String addMenuPhoto(MultipartFile file, Long dishId) { 
	  // TODO Auto-generated method stub 
	  Menu menu=null; 
	  try { 
	    
	  String name = file.getOriginalFilename(); 
	   menu=menudao.findById(dishId).orElseThrow(); 
	  String hotelname=menu.getHotelManager().getUsername(); 
	  String uniqName = menu.getDishName()+hotelname.concat(name.substring(name.lastIndexOf("."))); 
	  String filePath = path + uniqName; 
	   
	  File f = new File(path); 
	  if(!f.exists()) 
	   f.mkdir(); 
	  Files.copy(file.getInputStream(), Paths.get(filePath)); 
	  menu.setDishPhoto(uniqName); 
	  menudao.save(menu); 
	   
	  } 
	  catch (Exception e) { 
	   // TODO: handle exception 
	   menudao.deleteById(dishId); 
	   System.out.println("Error in adding menu photo"); 
	   return "error"; 
	  } 
	  return "success"; 
	   
	 }

}
