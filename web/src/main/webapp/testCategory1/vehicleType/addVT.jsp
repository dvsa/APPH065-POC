<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%-- 
<%@ taglib uri="netui-tags-databinding.tld" prefix="netui-data"%>
<%@ taglib uri="netui-tags-html.tld" prefix="netui"%>
<%@ taglib uri="netui-tags-template.tld" prefix="netui-template"%>
<%@ taglib uri="i18n.tld" prefix="i18n" %>
--%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-databinding-1.0" prefix="netui-data"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-template-1.0" prefix="netui-template"%>


<netui-data:getData resultId="createFlag" value="{pageFlow.strCreatePermission}"/>
<netui-data:getData resultId="readFlag" value="{pageFlow.strReadPermission}"/>
<netui-data:getData resultId="updateFlag" value="{pageFlow.strUpdatePermission}"/>
<netui-data:getData resultId="deleteFlag" value="{pageFlow.strDeletePermission}"/>
<netui-data:getData resultId="allPermissionFlag" value="{pageFlow.strAllPermission}"/>

<%
    String language= (String)session.getAttribute("language");
    language = (language==null)?"en":language;
    
    String createPermissionFlag = (String)pageContext.getAttribute("createFlag");
    String readPermissionFlag = (String)pageContext.getAttribute("readFlag");
    String updatePermissionFlag = (String)pageContext.getAttribute("updateFlag");
    String deletePermissionFlag = (String)pageContext.getAttribute("deleteFlag");
    String allPermissionPermissionFlag = (String)pageContext.getAttribute("allPermissionFlag");
    String[] arrMessage = (String[]) request.getAttribute("messageArray");
    String strMessage = null;
%>
<%-- <i18n:localize language="<%= language%>" bundleName="../properties/vehicleType/vehicleType" /> --%>
<%-- <netui-data:declareBundle language="<%= language%>" name="vehicleType" bundlePath="vehicleType"/> --%>
<link href="DSAWeb/framework/markup/shell/support/css/style.css" rel="stylesheet" type="text/css">
            
<table width="100%" ><tr><td class="bea-portal-window-titlebar" align="left">
Add Vehicle Type
<%-- <netui:label value="${bundle.vehicleType.HEADER_ADD_VEHICLE_TYPE}"/> --%>
<%-- <i18n:getMessage messageName="HEADER_ADD_VEHICLE_TYPE" /> --%>
</td></tr></table>
<netui:form action="addVT">
    <table border="0">
        <tr>
            <td>
                <%
                    if (arrMessage != null && arrMessage.length > 0) {
                        for (int i =0; i < arrMessage.length; i++) {
                            strMessage = (arrMessage[i] == null)?"":arrMessage[i];
                            if (strMessage != null) {
                %>
                    <p class="message" align="center">
                    <%=strMessage%>
                    <%-- <i18n:getMessage messageName='<%=strMessage%>'/> --%> </p>
                <%
                            } //end of if msg not null
                        } //end of for loop
                    } //end of array not null
                %> 
            </td>
        </tr>
        <tr>
            <td>
                <table>
                    <tr valign="top">
                        <td align="left" valign="top" class="field-label">      
                            Code
                            <!-- <i18n:getMessage messageName="LBL_CODE_LABEL"/> -->
                            <netui:label value="*"  styleClass="message"/>                            
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.codeLabel" maxlength="2"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Description
                            <!-- <i18n:getMessage messageName="LBL_DESCRIPTION"/> -->
                            <netui:label value="*"  styleClass="message"/>                            
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.description" maxlength="50"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Max All TB%
                            <!-- <i18n:getMessage messageName="LBL_MAX_ALL_TB%"/> -->
                            <netui:label value="*"  styleClass="message"/>                            
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.maxAllTBPct" maxlength="3"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Max Single TB%
                            <!-- <i18n:getMessage messageName="LBL_MAX_SINGLE_TB%"/> -->
                            <netui:label value="*"  styleClass="message"/>                            
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.maxSingleTBPct" maxlength="3"/>
                        </td>
                    </tr>
					<tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Forward TB Weeks
                            <!-- <i18n:getMessage messageName="LBL_FORWARD_TB_WEEKS"/> -->
							<netui:label value="*"  styleClass="message"/>
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.tbWeeks" maxlength="2"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Exam Skill Threshold
                            <!-- <i18n:getMessage messageName="LBL_EXAM_SKILL_THRESHOLD"/> -->
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.examSkillThreshold" maxlength="6"/>
                            <span class="message">
				            <span class="field-instruction">
				            (Days)
				            <!-- <i18n:getMessage messageName="LBL_EXAM_SKILL_THRESHOLD_UNITS"/> --></span>
				            </span>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            Trainer booking contingency %
                            <!-- <i18n:getMessage messageName="LBL_TB_CONTINGENCY"/> -->
                        </td>
                        <td align="left">
                            <netui:textBox dataSource="actionForm.tbContingency" maxlength="3"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            DefaultType
                            <!-- <i18n:getMessage messageName="LBL_DEFAULT_TYPE"/> -->
                            <netui:label value="*"  styleClass="message"/>                            
                        </td>
                        <td>
                            <netui:radioButtonGroup dataSource="actionForm.defaultType"><%-- tagId="defaultType"> --%>
                                <netui:radioButtonOption value="1" tagId="nonMotorYes">
                                Yes
                                <!-- <i18n:getMessage messageName="LBL_YES"/> -->
                                </netui:radioButtonOption>
                                <netui:radioButtonOption value="0" tagId="nonMotorNo">
                                No
                                <!-- <i18n:getMessage messageName="LBL_NO"/> -->
                                </netui:radioButtonOption>
                            </netui:radioButtonGroup>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center" valign="top">
                <!-- <i18n:getMessage id="strBackBtn" messageName="BTN_BACK"/>
                <i18n:getMessage id="strAddBtn" messageName="BTN_ADD"/> -->
                <%
                   	// PP Added dummy permission for POC
                   	createPermissionFlag = "1";
                	if (createPermissionFlag.equals("1")) {
                %>
                &nbsp;<netui:button value="Add" type="submit" action="addVT" styleClass="LoginBtn"/>
                <%
                    }
                %>
                &nbsp;<netui:button value="Back" type="submit" action="showVT" styleClass="LoginBtn"/>
            </td>
        </tr>
    </table>
    <netui-data:callMethod object="${pageFlow}" method="resetErrorMessage" failOnError="true" resultId="searchResult">
    </netui-data:callMethod>
</netui:form>
