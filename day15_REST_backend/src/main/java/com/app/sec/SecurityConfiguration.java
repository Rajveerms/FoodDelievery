package com.app.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@SuppressWarnings("deprecation")
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

	
		auth.userDetailsService(userDetailsService);
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable()
		.authorizeRequests()
		//.antMatchers("/**").permitAll()
//		.antMatchers("/cart/**").hasRole("ADMIN")			// highest privilege 	
//		.antMatchers("/customers/**").permitAll()
//		.antMatchers("/common/**").authenticated()
//		.antMatchers("/customers/register").permitAll()
		
		.antMatchers("/", "/authenticate").permitAll()		// lowest privilege
		.antMatchers("/deliveryPartner/register/image").permitAll()
		.antMatchers("/deliveryPartner/register/data").permitAll()
		.antMatchers("/deliveryPartner/home/{city}").permitAll()
		.antMatchers("/deliveryPartner/login").permitAll()
		.antMatchers("/deliveryPartner/forgotpassword").permitAll()
		.antMatchers("/deliveryPartner/allcities").permitAll()
		.antMatchers("/deliveryPartner/search/{searchParameter}").permitAll()
		.antMatchers("/deliveryPartner/hotelSuggestion/{searchParameter}").permitAll()
		.antMatchers("/AdminLogin/{name}/{pass}").permitAll() // Admin login
		.antMatchers("/hotelowner/forgotPassword").permitAll() // Hotel Owner
		.antMatchers("/hotelowner/login").permitAll()
		.antMatchers("/hotelowner/register").permitAll()
		.antMatchers("/hotelowner/forgotPassword").permitAll()
		.antMatchers("/hotelowner/registerdocumnets/{hotel_Id}/{doc_Id}").permitAll()
		.antMatchers("/hotelowner/registerdocumnets").permitAll()
		.antMatchers("/hotelowner/addDish/{hotelId}").permitAll()
		.antMatchers("/hotelowner/addmenuPhoto/{dishId}").permitAll()
		.antMatchers("/image/**").permitAll()
		
		.antMatchers("/customer/forgotPassword").permitAll()
		.antMatchers("/customer/register").permitAll()
		.antMatchers("/customer/login").permitAll()
		.antMatchers("/customer/registerCustomerData").permitAll()
		.antMatchers("/customer/registercustomerphoto/{cust_id}").permitAll()
		.antMatchers("/customer/registerdebitcards/{cust_Id}").permitAll()
		.antMatchers("/customer/registerAddress/{cust_Id}").permitAll()
		.antMatchers("/showMenu/{hotelId}").permitAll()
		.antMatchers("/showBrkOrLunchOrDinnerMenu/{millid}").hasRole("ADMIN")
		.antMatchers("/showCuisineMenu/{cuisineId}").hasRole("ADMIN")
		.antMatchers("/showVegNonVegMenu/{vegnonveg}").hasRole("ADMIN")
		.antMatchers("/showApprovedHotels/{status}").hasRole("ADMIN")
		.antMatchers("/showRejectedHotels/{status}").hasRole("ADMIN")
		.antMatchers("/showDocs/{hotelId}").hasRole("ADMIN")
		.antMatchers("/ApproveStatus/{hotelId}").hasRole("ADMIN")
		.antMatchers("/RejectStatus/{hotelId}").hasRole("ADMIN")
		
		//.antMatchers("/order/**").hasRole("CUSTOMER") ask Sharad
		.antMatchers("/cart/**").hasRole("CUSTOMER")
		.antMatchers("/customer/**").hasRole("CUSTOMER")
		.antMatchers("/deliveryboy/**").hasRole("DELIVERYPARTNER")
		.antMatchers("/deliveryPartner/**").hasRole("DELIVERYPARTNER")
		.antMatchers("/feedback/**").hasRole("CUSTOMER")
		.antMatchers("/hotelowner/**").hasRole("HOTELMANAGER")
		
		.anyRequest().authenticated()
		.and()
		.cors()		// enable CORS i.e. allow to create "Access-Control-Allow-Origin" = "*" header by @CrossOrigin
		.and()
	//	.formLogin()
	//	.and()
		.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // because REST services are stateless (so no HttpSession)
		
//		http.authorizeRequests()
//		.antMatchers("/cart").hasRole("ADMIN")
//		.antMatchers("/customers").hasRole("CUSTOMER")
//		.antMatchers("/").permitAll()
//		.and()
		
	}
}

