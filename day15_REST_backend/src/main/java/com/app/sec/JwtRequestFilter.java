package com.app.sec;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

//import com.app.dao.UserDao;
//import com.app.dao.UserDao;
import com.app.sec.User;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	MyUserDetailsService userDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");
		System.out.println("Header : "+authHeader);
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		if(validHeader)
		{
			String token = authHeader.replace("Bearer", "").trim();
			System.out.println("Token: " + token);
			String username = jwtUtil.getTokenUsername(token);
			if(username != null && SecurityContextHolder.getContext().getAuthentication() == null)
			{
				//com.app.sec.User user = new User("omkar@gmail.com", "omkar");
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				if(jwtUtil.validateToken(token, userDetails.getUsername()))
				{
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					auth.setDetails(userDetails);
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
				else
				{
					response.sendError(HttpStatus.UNAUTHORIZED.value());
				}
			}
		}
		filterChain.doFilter(request, response);
	}

	
}

//@Autowired
//private UserDao userDao;

//@Override
//protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//		throws ServletException, IOException {
//	// pre-processing
//	//String authHeader = request.getHeader("Authorization");
//System.out.println("hfajnvavaj");
//	
//	String token = null;
//	if(request.getCookies()!=null) {
//		
//	Cookie[] allCookies = request.getCookies();		
//	
//	for(Cookie c:allCookies)
//	{
//		//System.out.println(c.getName()+" :"+c.getValue());
//		if(c.getName().equals("token"))
//		{
//			token = c.getValue();
//		}
//	}
//	System.out.println("Token : "+token);
//	}
//	else
//	{
//		System.out.println("hello");
//	}
//	ShopUser principal = null;
//	if(token!=null) {
//	
////	boolean validHeader = token != null 
////	ShopUser principal = null;
////	if(validHeader) {
//		
//	 //token = token.replace("Bearer", "").trim();
//		System.out.println("Token: " + token);
//		String email = jwtUtil.getTokenUsername(token);
//		System.out.println("Email: " + email);
//		User user = new User("omkar@gmail.com", "omkar");
//		
//		//User user = userDao.findByEmail(email);
//		if(email.equals(user.getEmail())) {
//			principal = user.toUser();
//			System.out.println("Principal: " + principal);
//			if(!jwtUtil.validateToken(token, principal.getUsername()))
//				principal = null;
//		}
//	}
//	
//	if(principal != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
//		SecurityContextHolder.getContext().setAuthentication(auth);
//		// call next filter in the chain
//		filterChain.doFilter(request, response);
//		return;
//	}
//	
//	if(token!=null) // token given, but not valid, then return error
//		response.sendError(HttpStatus.UNAUTHORIZED.value());
//	else // if no token, let authorization filter decide
//	{
//		filterChain.doFilter(request, response);
//		System.out.println("reached here");
//	}
//	// post-processing
//}
