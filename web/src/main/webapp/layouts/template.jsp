<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ taglib uri="http://jakarta.apache.org/struts/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui"%>

<html>





	<head>


<title ><tiles:getAsString name="title"/></title><meta  name="bea-portal-meta-skeleton" content="/framework/skeletons/DSA"/><meta  name="bea-portal-meta-skin" content="/framework/skins/DSA"/><meta  name="bea-portal-meta-skin-images" content="/framework/skins/DSA/images"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/body.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/window.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/top/css/forms.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/portlet.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/book.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/top/css/global.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/datepicker/smoothness/overrides.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/button.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/top/css/divpositions.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/datepicker/smoothness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/form.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/topmods/overrides.css" rel="stylesheet" type="text/css"/><link  href="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/layout.css" rel="stylesheet" type="text/css"/><script  type="text/javascript" src="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/js/jquery-1.9.1.min.js"></script><script  type="text/javascript" src="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/js/script.js"></script><script  type="text/javascript" src="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/datepicker/jquery-ui-1.10.3.custom.min.js"></script><script  type="text/javascript" src="${pageContext.request.contextPath}/DSAWeb/framework/skins/DSA/cpc/datepicker/plugins/jquery.maskedinput-1.3.1.min.js"></script>



	<meta http-equiv="cache-control" content="max-age=0, must-revalidate, no-cache, no-store, private">
	<meta http-equiv="expires" content="-1">
	<meta http-equiv="pragma" content="no-cache">
	</head>








    
    
    <body
        
        class="bea-portal-body"
        
        
        
    >
        <table width="100%" align="center" cellpadding="0" cellspacing="0">
        <tr><td>
        
        <div id=container>









    
    <div>



<LINK media=screen href="${pageContext.request.contextPath}/DSAWeb/framework/markup/shell/support/css/dsa.css" type=text/css rel=stylesheet>
<LINK media=print href="${pageContext.request.contextPath}/DSAWeb/framework/markup/shell/support/css/print.css" type=text/css rel=stylesheet>
<LINK media=screen href="${pageContext.request.contextPath}/DSAWeb/framework/markup/shell/support/css/header-home.css" type=text/css rel=stylesheet>

<DIV id=header><!-- Accesibility-->
<DIV id=accessibilitynav>
<!-- <UL id=accessibilitynavlist>
  <LI><A title="About this site" 
  href="#">About this site</A> 
  <LI><A title="Print this website" 
  href="#">Print</A> </LI></UL>--></DIV> <!--END Accessibility --><!--Header Logos-->


<DIV id=header-logos> </DIV><!--END Header logos--><!-- Primary Navigation -->

<!-- <DIV id=primarynav>
<UL id=primarynavlist>
  <LI><A title=Home href="#">Home</A> 
  <LI><A title="Online booking" 
  href="#" >Online 
  booking</A> 
  <LI><A title="FAQ's" href="#">FAQs</A> 
  <LI><A title="AtoZ Search" href="#">A-Z</A> 
  <LI><A title="Contact Us" 
  href="#">Contact 
  Us</A>   

 </div> -->
</DIV><!--END Header-->







    </div>
    

<table  style="vertical-align: top; width: 100%; margin: 0px; padding: 0px; spacing: 0px; background-color: #ffffff;"><tr ><td  style="vertical-align: top; width: 1%;" valign="top">
















<script type="text/javascript" src="${pageContext.request.contextPath}/DSAWeb/framework/scripts/log4javascript.js"></script>
<script language="JavaScript1.1" src="${pageContext.request.contextPath}/DSAWeb/framework/scripts/DSAFunctions.js" type="text/javascript"></script>
<script language="JavaScript1.1" src="${pageContext.request.contextPath}/DSAWeb/framework/scripts/common-script.js" type="text/javascript"></script>


<!--Sidebar-->
<DIV id=sidebar-a><!--Left Navigation-->
<DIV id=leftnav>
<UL id=leftnavlist>
    <li><a href="#">Logout</a>
    <li><a href="#">Change Password</a>
    <li><a href="#">Test Category</a>
    <li><a href="${pageContext.request.contextPath}/testCategory1/vehicleType/getVT.do">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vehicle Types</a></li>
</ul>

</div>
</div>
<form name="leftpane" method="get">
<input type="hidden" name="urlRequestDispatcher" value="${pageContext.request.contextPath}/DSAWeb/requestDispatcher/requestDispatcherController.jpf">
<input type="hidden" name="bookingWindowOpen" value="false">
<input type="hidden" name="bookingWindowBusy" value="false">
</form>
       
      

</td><td  style="background-color:#a08dc3; width: 1%; " valign="top"></td><td  style="vertical-align: top; width: 98%;" valign="top">







    
    <div
        
    >
        
















        
        <div
            
        >










    
    <div
        
        class="bea-portal-book-primary-page"
        
    >










    <table border="0"
        
        class="bea-portal-layout-grid"
        
        cellspacing="0"
    >
    
        <tr>
    
            <td class="bea-portal-layout-placeholder-container">
                

<div
        
        class="bea-portal-layout-placeholder"
        
>








    
    <div
        
        class="bea-portal-window"
        
        width="100%"
    >
        








        
<div
            class="bea-portal-window-content"
            
        >












<link href="${pageContext.request.contextPath}/DSAWeb/framework/markup/shell/support/css/style.css" rel="stylesheet" type="text/css">

<tiles:insert attribute="body" />





</div>
    </div>
    



</div>

            </td>
    
        </tr>
    
    </table>



















   
    </div>
    








        </div>
        
    </div>
    


</td></tr></table>






    
    <div
        
    >


<DIV id=footer>
<DIV class=footer-date>
<P>Updated: 8-June-2017</P></DIV>
<DIV class=footer-credits>
<P><A title="Driver and Vehicle Standards Agency &copy; Crown copyright" 
href="#">Driver and Vehicle Standards Agency &copy; Crown copyright 2006</A> | <A 
title="Back to top" tabIndex=29 
href="#">Back to top</A></P></DIV></DIV><!-- END Footer--></DIV>







    </div>
    









        </div>
        </td></tr></table>
        
    </body>
    





</html>
