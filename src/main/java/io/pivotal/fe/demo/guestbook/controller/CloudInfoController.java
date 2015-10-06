package io.pivotal.fe.demo.guestbook.controller;

import org.springframework.cloud.Cloud;
import org.springframework.cloud.CloudFactory;
import org.springframework.cloud.app.ApplicationInstanceInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class CloudInfoController {

	private Cloud cloud;

	@RequestMapping(value = "/cloudinfo")
	public String getCloudInfo() {
		cloud = new CloudFactory().getCloud();
		ApplicationInstanceInfo cloudInfo = cloud.getApplicationInstanceInfo();
		String properties = "";
		
		/*cloudInfo.getProperties().get("name");
		cloudInfo.getProperties().get("host");
		cloudInfo.getProperties().get("port");
		cloudInfo.getProperties().get("instance_index");*/

		ObjectMapper mapper = new ObjectMapper();
		try {
			properties = mapper.writeValueAsString(cloudInfo);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return properties;

	}

}
