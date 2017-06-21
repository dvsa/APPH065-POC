package test.ejb;

import javax.ejb.Stateless;

@Stateless
public class TestEJBImpl {
	public String sayHello(String message) {
		return "TestEJBImpl saying '" + message + "'";
	}
}
