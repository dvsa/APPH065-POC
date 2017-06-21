package test.ws;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface TestWS {
    
    @WebMethod
    public String sayHello(String name);
}
