package com.app.sec;

import java.time.LocalDate;
//import java.util.Collection;
import java.util.Collection;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.sec.Credentials;


@RestController
@CrossOrigin("*")
public class AuthController {
//	@Autowired
//	private AuthenticationManager authManager;
//	@Autowired
//	private JwtUtil jwtUtils;
//
////	@Autowired
////	private UserDao userDao;
//	
//	@PostMapping("/authenticate")
//	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody Credentials cred,HttpServletResponse response) {
//		System.out.println("Authenticating: " + cred);
//		try {
//			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getusername(), cred.getPassword());
//			System.out.println("BEFORE: " + auth);
//			auth = authManager.authenticate(auth);
//			System.out.println("AFTER: " + auth);
//			
//			com.app.sec.User user1 = new com.app.sec.User("omkar@gmail.com", "omkar");
//			ShopUser user = (ShopUser)auth.getPrincipal();
//			//com.app.pojos.User u= userDao.findByEmail(user.getUsername());
//			//System.out.println(user.getPassword()+" "+user.getUsername());
//			String token = jwtUtils.generateToken(user.getUsername());
//			
//			//response.addCookie(new Cookie("token", token));
//			response.setHeader("token", token);
//			
//	//Long id,String firstName, String lastName, String email, String password, Role userRole,LocalDate createdAt)
////		UserDto userDto=new UserDto(u.getId(),u.getFirstName(),u.getLastName(),u.getEmail()
////					,u.getPassword(),u.getUserRole(),u.getCreatedAt());
//		
//		return ResponseEntity.ok(new AuthenticationResponse(token,user1,true));
//		}catch (BadCredentialsException e) {
//			e.printStackTrace();
//			return ResponseEntity.notFound().build();
//		}
//	}
	
	@Autowired
	AuthenticationManager authManager;
	
	@Autowired
	JwtUtil jwtUtils;
	
	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody Credentials cred)
	{
		
		try {
			Authentication auth = new UsernamePasswordAuthenticationToken(cred.getUsername(), cred.getPassword());
			System.out.println("BEFORE: " + auth);
			auth = authManager.authenticate(auth);
			System.out.println("AFTER: " + auth);
			//User user = (User)auth.getPrincipal();
			ShopUser user = (ShopUser)auth.getPrincipal();
			String Role = null;
			Collection<GrantedAuthority> authorities = user.getAuthorities();
			for (GrantedAuthority grantedAuthority : authorities) {
				Role = grantedAuthority.getAuthority();
			}
			String token = jwtUtils.generateToken(user.getUsername(), Role);
			return ResponseEntity.ok(token);
		}catch (BadCredentialsException e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	
}
