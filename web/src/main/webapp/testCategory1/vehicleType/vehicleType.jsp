<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="netui-tags-databinding.tld" prefix="netui-data"%>
<%@ taglib uri="netui-tags-html.tld" prefix="netui"%>
<%@ taglib uri="netui-tags-template.tld" prefix="netui-template"%>
<%@ taglib uri="i18n.tld" prefix="i18n" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
    String language= (String)session.getAttribute("language");
    language = (language==null)?"en":language;
%>

<i18n:localize language="<%= language%>" bundleName="testCategory1/properties/vehicleType/vehicleType" />

<link href="DSAWeb/framework/markup/shell/support/css/style.css" rel="stylesheet" type="text/css">
<table width="100%" ><tr><td class="bea-portal-window-titlebar" align="left"><i18n:getMessage messageName="HEADER_VEHICLE_TYPE" /></td></tr></table>

<netui:form  action="getVT">
    <netui-data:getData resultId="createFlag" value="{pageFlow.strCreatePermission}"/>
    <netui-data:getData resultId="readFlag" value="{pageFlow.strReadPermission}"/>
    <netui-data:getData resultId="updateFlag" value="{pageFlow.strUpdatePermission}"/>
    <netui-data:getData resultId="deleteFlag" value="{pageFlow.strDeletePermission}"/>
    <netui-data:getData resultId="allPermissionFlag" value="{pageFlow.strAllPermission}"/>
    
    <%
        String createPermissionFlag = (String)pageContext.getAttribute("createFlag");
        String readPermissionFlag = (String)pageContext.getAttribute("readFlag");
        String updatePermissionFlag = (String)pageContext.getAttribute("updateFlag");
        String deletePermissionFlag = (String)pageContext.getAttribute("deleteFlag");
        String allPermissionPermissionFlag = (String)pageContext.getAttribute("allPermissionFlag");
    
        String[] arrMessage = (String[]) request.getAttribute("messageArray");
        String strMessage = null;
    %>
    
    
    <netui-data:callMethod object="${pageFlow}" method="getSearchResultFlag" failOnError="true" resultId="searchResult">
    </netui-data:callMethod>
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
        </table>
        <table width="80%" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td colspan="2" >&nbsp;</td>
                            <td width="100%" align="center">
                                 <netui:anchor action ="getVT" formSubmit="true">
                                    <netui:parameter name="startRec" value="${pageFlow.prevBuff.startRec}" />
                                    <netui:parameter name="endRec" value="${pageFlow.prevBuff.endRec}" />
                                    <netui:label value="${pageFlow.prevBuff.displayText}" style="display:inline-block"></netui:label>
                                 </netui:anchor>
                                 &nbsp;&nbsp;
                                <netui-data:repeater dataSource="pageFlow.pageBuff">
                                    <netui-data:repeaterItem>
                                        <%-- <netui-data:choiceMethod object="{pageFlow}" method="hasLabel">
                                             <netui-data:methodParameter value="{container.item}"/>
                                         </netui-data:choiceMethod>
                                        <netui-data:choice value="NO"> --%>
                                        
                                        <netui-data:getData resultId="labelVal" value="${container.item.isLabel}" />                                    	                                   	                                    	
                                    	<c:if test="${labelVal == 'NO'}">
                                            <netui:anchor action ="getVT" formSubmit="true">
                                                <netui:parameter name="startRec" value="${container.item.startRec}" />
                                                <netui:parameter name="endRec" value="${container.item.endRec}" />
                                                <netui:label value="${container.item.displayText}" style="display:inline-block"/>
                                            </netui:anchor>
                                        </c:if>
                                        <%-- </netui-data:choice>
                                        <netui-data:choice value="YES"> --%>
                                        <c:if test="${labelVal =='YES'}">
                                                <netui:label value="${container.item.displayText}" style="display:inline-block"/>
                                        </c:if>
                                        <%-- </netui-data:choice> --%>
                                    </netui-data:repeaterItem>
                                </netui-data:repeater>
                                &nbsp;&nbsp;
                                <netui:anchor action ="getVT" formSubmit="true">
                                    <netui:parameter name="startRec" value="${pageFlow.nextBuff.startRec}" />
                                    <netui:parameter name="endRec" value="${pageFlow.nextBuff.endRec}" />
                                    <netui:label value="${pageFlow.nextBuff.displayText}" style="display:inline-block"/>
                                 </netui:anchor>
                            </td>
                        </tr>                        
                    </table>
                </td>
            </tr>
        </table>
        <table border="0">
            <tr>
                <td> 
                    <%
                        String searchResult = (String)pageContext.getAttribute("searchResult");
                        if(searchResult.equalsIgnoreCase("Y")) {                
                    %>
                        <%-- <netui-data:repeater dataSource="{pageFlow.pgfArrVehicleTypeVO}">      
                            <netui-data:repeaterHeader> 
                            <table width="100%" cellpadding="2" cellspacing="2" border="0">
                        --%>
                        <netui-data:dataGrid dataSource="pageFlow.pgfArrVehicleTypeVO" name="vehicleGrid" styleClassPrefix="veh" width="100%" cellpadding="2" cellspacing="2" border="0">
						<netui-data:configurePager disableDefaultPager="true"/>
						<%-- <netui-data:configurePager pageSize="2" pagerFormat="firstPrevNextLast" disableDefaultPager="true"  pageAction="getVT.do" defaultPageSize="2" />
						  --%>	
					    					
					        <netui-data:header>
                                <tr class="table-header"> 
                                <td ><span><i18n:getMessage messageName="LBL_SELECT" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_CODE_LABEL" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_DESCRIPTION" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_MAX_ALL_TB%" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_MAX_SINGLE_TB%" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_EXAM_SKILL_THRESHOLD" /> <i18n:getMessage messageName="LBL_EXAM_SKILL_THRESHOLD_UNITS" /></span></td>
                                <td ><span><i18n:getMessage messageName="LBL_DEFAULT_TYPE" /></span></td>
								<td ><span><i18n:getMessage messageName="LBL_FORWARD_TB_WEEKS" /></span></td>
								</tr>
                            <%-- </netui-data:repeaterHeader>
                            <netui-data:repeaterItem> --%>
                            </netui-data:header>					    
					    	<netui-data:rows>
                                <tr>
                                <td><netui:radioButtonGroup dataSource="pageFlow.pgfSelectedVehicleType"  styleClass="user-input">
                                    <netui:radioButtonOption value="${container.item.codeLabel}">&nbsp;</netui:radioButtonOption>
                                </netui:radioButtonGroup></td>
                                <td><netui:label value="${container.item.codeLabel}"  styleClass="user-input"/></td>
                                <td align="left"><netui:label value="${container.item.description}"  styleClass="user-input"/></td>
                                <td><netui:label value="${container.item.maxAllTBPct}"  styleClass="user-input"/></td>
                                <td><netui:label value="${container.item.maxSingleTBPct}"  styleClass="user-input"/></td>
                                <td><netui:label value="${container.item.examSkillThreshold}"  styleClass="user-input"/></td>
                                <td><netui:label value="${container.item.defaultTypeDesc}"  styleClass="user-input"/></td>
								<td><netui:label value="${container.item.forwardTbWeeks}"  styleClass="user-input"/></td>
                                </tr>
                            <%-- </netui-data:repeaterItem>
                            <netui-data:repeaterFooter>
                                </table>
                            </netui-data:repeaterFooter>
                        </netui-data:repeater> --%>
                         	</netui-data:rows>
						</netui-data:dataGrid>
                    <%
                       }                
                    %> 
                </td>
            </tr>
            <tr>
                <td colspan="2" >
                    <i18n:getMessage id="strAcessDetailsBtn" messageName="BTN_ACCESS_DETAILS"/>
                    <i18n:getMessage id="strUpdateBtn" messageName="BTN_UPDATE"/>
                    <i18n:getMessage id="strAddBtn" messageName="BTN_ADD"/>
                    <%
                 		// PP Added dummy permission for POC
                   		createPermissionFlag = "1";
                    	if (createPermissionFlag.equals("1")) {
                    %>                
                        <netui:button value='<%=strAddBtn%>' type="submit" action="showAddVT" styleClass="LoginBtn"/>
                    <%
                        }
                    	// PP Added dummy permission for POC
                       	updatePermissionFlag = "1";
                    	if (updatePermissionFlag.equals("1") && searchResult.equalsIgnoreCase("Y")) {
                    %>                
                        <netui:button value='<%=strUpdateBtn%>' type="submit" action="showUpdateVT" styleClass="LoginBtn"/>
                    <%
                        }
                    %>
                    &nbsp;<netui:button value='<%=strAcessDetailsBtn%>' type="submit" action="showAcessDetails" styleClass="LoginBtn"/>                    
                </td>
            </tr>
        </table>
        <netui-data:callMethod object="${pageFlow}" method="resetErrorMessage" failOnError="true" resultId="searchResult">
        </netui-data:callMethod>            
</netui:form>