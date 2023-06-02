package packageForTesting;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddressDto;
import com.app.dto.DeliveryBoyDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormDataWrapper {
	
	MultipartFile file;
	String jsonData;
	//AddressDto addto;

}
