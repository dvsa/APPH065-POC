package test.ws;

import javax.ejb.EJB;
import javax.jws.WebMethod;
import javax.jws.WebService;

import test.ejb.TestEJBImpl;

@WebService(name="Test", serviceName="TestService")
public class TestWSImpl implements TestWS {
    @EJB
    TestEJBImpl testEJB;
	
    @WebMethod
    public String sayHello(String message) {
        return "TestWSImpl saying '" + testEJB.sayHello(message) + "'";
    }
}
