<!DOCTYPE html>
<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-databinding-1.0" prefix="netui-data"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-template-1.0" prefix="netui-template"%>
<netui:html>
  <head>
    <title>Web Application Page</title>
    <netui:base/>
  </head>
  <netui:body>
	  <netui:form action="processSubmit" method="post">
	    <netui:textBox dataSource="actionForm.text" size="20"/>
	    <netui:button type="submit" value="Submit"/>
	  </netui:form>
  </netui:body>
</netui:html>
