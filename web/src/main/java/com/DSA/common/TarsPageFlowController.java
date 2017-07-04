/**
 * 
 */
package com.DSA.common;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

//PP Removed imports not required - referenced by crippled code
/*
import authentication.AuthenticationController.Permission;
import com.DSA.common.exception.AccessDeniedException;
import common.PortletPermissionHelper;
*/

//PP Original pageflow imports replaced with Beehive equivalents
/*
import com.bea.wlw.netui.pageflow.PageFlowController;
import com.bea.wlw.netui.util.exception.LocalizedIllegalStateException;
*/
import org.apache.beehive.netui.pageflow.PageFlowController;
import org.apache.beehive.netui.util.exception.LocalizedIllegalStateException;

/**
 * Abstract class to be implemented by all PageFlowController implementations.
 * @author gouldp
 *
 */
public abstract class TarsPageFlowController extends PageFlowController {
	
	private final static Logger log = Logger.getLogger(TarsPageFlowController.class);

    /**
     * String to represent whether the user has create permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strCreatePermission = "";
    /**
     * String to represent whether the user has read permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strReadPermission = "";
    /**
     * String to represent whether the user has update permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strUpdatePermission = "";
    /**
     * String to represent whether the user has delete permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strDeletePermission = "";
    /**
     * String to represent whether the user has all permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strAllPermission = "";
    /**
     * String to represent whether the user has view only permissions on the Page Flow. 
     * A value of "1" means permission granted, any other value means permission denied.
     */
    public String strViewOnlyPermission = "";

	/**
	 * Check that the user is authorised to access the controller, for any action method.
	 * @see com.bea.wlw.netui.pageflow.FlowController#beforeAction()
     * @throws AccessDeniedException if the user does not have read permission
	 */
	protected synchronized void beforeAction() throws Exception {
		super.beforeAction();

		// Check authorisation, make sure we have a session first
        try {
            if (getSession() == null) {
            	log.info("beforeAction called with no HttpSession");
            } else {
            	// Check authorisation
        		doAuthorisation();
            }
        } catch (LocalizedIllegalStateException e) {
        	log.info("beforeAction called outside a valid context, no HttpSession");
        }
	}

    /**
     * Check that the user has permission to access the portlet of the controller.
     * Set the user's CRUD permission values for the portlet.
     * @throws AccessDeniedException if the user does not have read permission
     */
    protected void doAuthorisation() {
        final HttpSession session = getSession();
        if (session == null) {
        	log.info("doAuthorisation called with no HttpSession");
        	return;
        }
        
		//PP Commented code not required
/*        
        Permission permission = null;
		try {
			permission = PortletPermissionHelper.getJpfPermission(session, this.getClass());
		} catch (IllegalArgumentException e) {
			// No portlet name defined for JSP, no authorisation required.
			return;
		}

        if (permission != null) {
            strCreatePermission = permission.strCreateFlag;
            if (strCreatePermission == null) { 
                strCreatePermission = DSAConstants.ZERO; 
            }
            strReadPermission = permission.strReadFlag;
            if (strReadPermission == null) { 
                strReadPermission = DSAConstants.ZERO; 
            }
            strUpdatePermission = permission.strUpdateFlag;
            if (strUpdatePermission == null) { 
                strUpdatePermission = DSAConstants.ZERO; 
            }
            strDeletePermission = permission.strDeleteFlag;
            if (strDeletePermission == null) { 
                strDeletePermission = DSAConstants.ZERO; 
            }
        }
        boolean createAllowed = strCreatePermission.equals("1");
		boolean readAllowed = strReadPermission.equals("1");
		boolean updateAllowed = strUpdatePermission.equals("1");
		boolean deleteAllowed = strDeletePermission.equals("1");
		if (createAllowed && readAllowed && updateAllowed && deleteAllowed) {
            strAllPermission = "1";
        } else {
            strAllPermission = "0";
        }
        if (!createAllowed && readAllowed && !updateAllowed && !deleteAllowed) {
            strViewOnlyPermission = "1";
        } else {
            strViewOnlyPermission = "0";
        }
        
        // If not allowed access from the portlet name, try with the title
        if (!readAllowed) {
        	try {
        		readAllowed = PortletPermissionHelper.isPortletAccessible(session, this.getClass());
    		} catch (IllegalArgumentException e) {
    			// No portlet title defined for JSP, no further authorisation defined.
    		}
        }
        
        // If the user does not have view access to this resource, then they should not be here.
        // This check covers the case where a user manually enters a url
        if (!readAllowed) {
        	String msg = "User doesn't have permission for " + this.getClass().getName();
        	log.warn(msg);
            throw new AccessDeniedException(msg);
        }
*/        
    }
}
