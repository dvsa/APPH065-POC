<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%--
<%@ taglib uri="netui-tags-databinding.tld" prefix="netui-data"%>
<%@ taglib uri="netui-tags-html.tld" prefix="netui"%>
<%@ taglib uri="netui-tags-template.tld" prefix="netui-template"%>
--%>    

<%@ taglib uri="http://beehive.apache.org/netui/tags-databinding-1.0" prefix="netui-data"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-template-1.0" prefix="netui-template"%>
<%@ taglib uri="i18n.tld" prefix="i18n" %>
    
<%
    String language= (String)session.getAttribute("language");
    language = (language==null)?"en":language;
    
    String[] arrMessage = (String[]) request.getAttribute("messageArray");
    String strMessage = null;
%>
<i18n:localize language="<%= language%>" bundleName="testCategory1/properties/vehicleType/vehicleType" />
<link href="DSAWeb/framework/markup/shell/support/css/style.css" rel="stylesheet" type="text/css">
<table width="100%" ><tr><td class="bea-portal-window-titlebar" align="left">Audit Details<!-- <i18n:getMessage messageName="HEADER_AUDIT_DETAILS" /> --></td></tr></table>

<netui:form action="showAcessDetails">
    <table border="0">
        <tr>
            <td>
                <%
                    if (arrMessage != null && arrMessage.length > 0) {
                        for (int i =0; i < arrMessage.length; i++) {
                            strMessage = (arrMessage[i] == null)?"":arrMessage[i];
                            if (strMessage != null) {
                %>
                    <p class="message" align="center"><i18n:getMessage messageName='<%=strMessage%>'/> </p>
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
                        <%
                            String strUpdatedDate = (String)request.getAttribute("UpdatedDate");
                            String strUpdatedBy = (String)request.getAttribute("UpdatedBy");
                            String strCreatedDate = (String)request.getAttribute("CreatedDate");
                            String strCreatedBy = (String)request.getAttribute("CreatedBy");
                        %>
                        <td align="left" valign="top" class="field-label">      
                            <i18n:getMessage messageName="LBL_CREATED_BY"/>                           
                        </td>
                        <td align="left" valign="top" class="user-input">
                            &nbsp;<netui:label value='<%=strCreatedBy%>'  style="display:inline-block"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            <i18n:getMessage messageName="LBL_CREATION_DATE"/>                        
                        </td>
                        <td align="left" valign="top" class="user-input">
                            &nbsp;<netui:label value='<%=strCreatedDate%>'  style="display:inline-block"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            <i18n:getMessage messageName="LBL_MODIFIED_BY"/>                          
                        </td>
                        <td align="left" valign="top" class="user-input">
                            &nbsp;<netui:label value='<%=strUpdatedBy%>'  style="display:inline-block"/>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td  align="left" valign="top" class="field-label">      
                            <i18n:getMessage messageName="LBL_MODIFIED_DATE"/>                        
                        </td>
                        <td align="left" valign="top" class="user-input">
                            &nbsp;<netui:label value='<%=strUpdatedDate%>'  style="display:inline-block"/>
                        </td>
                    </tr>                    
                </table>
            </td>
        </tr>
        <tr>
            <i18n:getMessage id="strBackBtn" messageName="BTN_BACK"/>
            <td colspan="1" align="center" valign="top">
                &nbsp;<netui:button value='<%=strBackBtn%>' type="submit" action="showVT" styleClass="LoginBtn"/>
            </td>
        </tr>
    </table>
    <netui-data:callMethod object="${pageFlow}" method="resetErrorMessage" failOnError="true" resultId="searchResult">
    </netui-data:callMethod>
</netui:form>
