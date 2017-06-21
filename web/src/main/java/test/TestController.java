package test;

import java.net.URL;

import javax.servlet.http.HttpSession;

import org.apache.beehive.netui.pageflow.Forward;
import org.apache.beehive.netui.pageflow.PageFlowController;
import org.apache.beehive.netui.pageflow.annotations.Jpf;

@Jpf.Controller(
		tilesDefinitionsConfigs = { "/WEB-INF/tiles-defs.xml" },
		simpleActions = { @Jpf.SimpleAction(name = "begin", tilesDefinition="test/page1") })
public class TestController extends PageFlowController {
	private static final long serialVersionUID = 1L;

	private String message;

	@Jpf.Action(
		forwards= {
				@Jpf.Forward(name="success", tilesDefinition="test/page2")
		}
	)
	public Forward processSubmit(TestForm testForm) throws Exception {
		URL url = new URL("http://localhost:8080/APPH065-service-0.1/TestService?WSDL");
		TestWS service = new TestService(url).getPort(TestWS.class);

		this.message = service.sayHello(testForm.getText());

		return new Forward("success");
	}

	public String getMessage() {
		return this.message;
	}

	/**
	 * Callback that is invoked when this controller instance is created.
	 */
	@Override
	protected void onCreate() {
	}

	/**
	 * Callback that is invoked when this controller instance is destroyed.
	 */
	@Override
	protected void onDestroy(HttpSession session) {
	}

    @Jpf.FormBean()
    public static class TestForm implements java.io.Serializable {
		private static final long serialVersionUID = 3157690667091648073L;
		private String text;
		
		public void setText(String text) {
			this.text = text;
		}
		public String getText()	{
			return this.text;
		}
	}
}