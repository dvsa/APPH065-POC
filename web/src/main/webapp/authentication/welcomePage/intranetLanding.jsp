<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%--
<%@ page import="com.DSA.IRDT.authentication.webservice.AuthenticationWSControl.AuthResponseVO"%>
<%@ taglib uri="netui-tags-databinding.tld" prefix="netui-data"%>
<%@ taglib uri="netui-tags-html.tld" prefix="netui"%>
<%@ taglib uri="netui-tags-template.tld" prefix="netui-template"%>
--%>
<%@ taglib uri="i18n.tld" prefix="i18n" %>
<%--
<%@ taglib uri="http://www.bea.com/servers/portal/tags/netuix/render" prefix="render"%>
--%>

<%
String language= (String)session.getAttribute("language");
language = (language==null)?"en":language;
%>


<i18n:localize language="<%= language%>" bundleName="authentication/properties/authentication" />

<link href="/DSAWeb/framework/markup/shell/support/css/style.css" rel="stylesheet" type="text/css">


        <div id="content">	
		<div id="breadcrumbs"><a href="#" title="Home Page">Home Page</a> &gt; About DSA</div>
<br />
	 	<h1><strong></strong></h1>
    <h1>Driving Standards Agency</h1>
    <h2>Testing and Registration System (TARS)</h2>
    <br/>
    <h3>Access to TARS</h3>
    <p>All users must receive formal training by a member of the Central Operations Training Team before access is given to TARS.  The National Systems Administrator (NSA) and Area Systems Administrators (ASA) are responsible for managing user access.  When training has taken place, confirmation should be sent to the ASA of what formal training has been provided.  This will determine what roles & permissions are set up by the ASA for the role profile for the user.  If access is no longer required by a user then the line manager must inform the ASA so that the profile can be amended.<p/>
    <div align="center"><hr align="center" width="100%" size="2"/></div>
    
    <h3>System Fault Reporting</h3>
    <p>Any system problem which is seen as an incorrect function of the system should be logged through the Capita helpdesk and the details recorded on the Fault Log.  The NSA must be kept informed of all problems with the system.</p>
    <div align="center"><hr align="center" width="100%" size="2"/></div>
    
    <h3>System Security</h3>
    <p>A password is required to access TARS, this should be different to your Network password.  The password needs to be at least 9 characters long and should incorporate upper case characters (A, B, C, etc.), lower case characters (a, b, c etc.), numeric digits (1, 2, 3 etc.), and special characters (£, %, & etc.)To set up a password you will be required to enter a ‘Memorable phrase’, e.g. a hobby or your favourite pet’s name.  If a password is forgotten then there is a ‘Forgot Password’ option that will generate an email to your DSA email account containing a new password.  The system will then prompt you to change your password.</p>
    <p>Do not share or disclose your password to anyone else, or attempt to gain access to someone else’s.  Users will be held accountable for their activities whilst using DSA systems.  Any misuse of passwords or systems could result in disciplinary action.</p>
    <div align="center"><hr align="center" width="100%" size="2"/></div>
    
    <h3>Data Protection</h3>
    <p>All staff must comply with the provisions of the Data Protection Act 1998.  The act gives rights to individuals to find out what information is held about them, and places obligations on data users that information is only given to those entitled to receive it.  If you are ever in doubt about any request for information then please seek advice from your line manager.</p>
    <p>More information on the Data Protection Act can be found on Dashboard.</p>
    <!-- END Footer-->	
</div>