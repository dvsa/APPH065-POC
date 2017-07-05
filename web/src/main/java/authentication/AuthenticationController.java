package authentication;

import org.apache.beehive.netui.pageflow.annotations.Jpf;

import com.DSA.common.TarsPageFlowController;

@Jpf.Controller(
		tilesDefinitionsConfigs = { "/WEB-INF/tiles-defs.xml" },
		simpleActions = { @Jpf.SimpleAction(name = "begin", tilesDefinition="authentication/welcomePage/intranetLanding") })
public class AuthenticationController extends TarsPageFlowController {
	private static final long serialVersionUID = 1L;
}
