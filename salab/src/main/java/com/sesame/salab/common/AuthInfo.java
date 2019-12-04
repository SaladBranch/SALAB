package com.sesame.salab.common;

public class AuthInfo {
	private String clientId;
	private String clientSecret;
	
	public AuthInfo(String clientId, String clientSecret) {
		super();
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}
	
	public String getClientId() {
		return clientId;
	}
	
	public String getClientSecret() {
		return clientSecret;
	}
}
