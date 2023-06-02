package com.app.controller;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
@CrossOrigin("http://localhost:3000")
public class imageController {
	
	@Value("${project.image}")
	private String path;
	
//	@GetMapping(value="/{name}", produces=MediaType.IMAGE_JPEG_VALUE)
//	public void getImage(@PathVariable String name, HttpServletResponse response) throws IOException
//	{
//		System.out.println("In image controller");
//		String fullpath = path + name;
//		InputStream in = new FileInputStream(fullpath);
//		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//		StreamUtils.copy(in, response.getOutputStream());
//		
//	}
	@GetMapping(value="/{nam}", produces=MediaType.IMAGE_JPEG_VALUE)
	public void getImage2(@PathVariable String nam, HttpServletResponse response) throws IOException
	{
		System.out.println("In image controller");
		String fullpath = path + nam;
		InputStream in = new FileInputStream(fullpath);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(in, response.getOutputStream());
		
	}
}
