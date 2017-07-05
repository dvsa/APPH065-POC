package testCategory1.vehicleType;

import java.util.HashMap;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;






import com.DSA.common.commonServices.valueobject.AuditVO;
//PP Changed import location of the VehicleTypeVO for POC
import com.DSA.common.valueobject.VehicleTypeVO;
import com.DSA.common.DSAConstants;
import com.DSA.common.TarsPageFlowController;

//PP Commented out service classes
/*
import com.DSA.common.commonServices.webservice.CommonServicesWSControl.AuditVO;
import com.DSA.common.service.ServiceLocation;
import com.DSA.common.services.DSACache;
*/

import com.DSA.common.valueobject.VOPaging;

//PP Original pageflow imports replaced with Beehive equivalents
/*
import com.bea.wlw.netui.pageflow.FormData;
import com.bea.wlw.netui.pageflow.Forward;
import com.bea.wlw.netui.pageflow.scoping.ScopedServletUtils;
*/






//PP Note - FormData was used in wlm, now deprecated in Beehive
import org.apache.beehive.netui.pageflow.FormData;
import org.apache.beehive.netui.pageflow.Forward;
import org.apache.beehive.netui.pageflow.scoping.ScopedServletUtils;

//PP add import for beehive annotations processing
import org.apache.beehive.netui.pageflow.annotations.Jpf;

import paging.PagingImpl;

//PP Replaced wlw comment based annotations with Beehive annotations
@Jpf.Controller(
		tilesDefinitionsConfigs = { "/WEB-INF/tiles-defs.xml" },
		loginRequired = false
)
@Jpf.ViewProperties(
	value = {
	 " <!-- This data is auto-generated. Hand-editing this section is not recommended. -->",
	 " <view-properties>",
	 " <pageflow-object id='pageflow:/testCategory1/vehicleType/VehicleTypeController.jpf'/>",
	 " <pageflow-object id='action:addVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm'>",
	 "   <property value='580' name='x'/>",
	 "   <property value='40' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:begin.do'>",
	 "   <property value='20' name='x'/>",
	 "   <property value='180' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:getVT.do'>",
	 "   <property value='120' name='x'/>",
	 "   <property value='180' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:showAcessDetails.do#testCategory1.vehicleType.VehicleTypeController.VTForm'>",
	 "   <property value='200' name='x'/>",
	 "   <property value='80' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:showAddVT.do'>",
	 "   <property value='320' name='x'/>",
	 "   <property value='20' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:showUpdateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm'>",
	 "   <property value='390' name='x'/>",
	 "   <property value='250' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:showVT.do'>",
	 "   <property value='440' name='x'/>",
	 "   <property value='180' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action:updateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm'>",
	 "   <property value='560' name='x'/>",
	 "   <property value='340' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:vehicleType.jsp@#@action:getVT.do@'>",
	 "   <property value='204,180,180,156' name='elbowsX'/>",
	 "   <property value='172,172,172,172' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:vehicleType.jsp@#@action:showAddVT.do@'>",
	 "   <property value='276,280,280,284' name='elbowsX'/>",
	 "   <property value='161,161,12,12' name='elbowsY'/>",
	 "   <property value='East_0' name='fromPort'/>",
	 "   <property value='West_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:vehicleType.jsp@#@action:showAcessDetails.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='204,200,200,200' name='elbowsX'/>",
	 "   <property value='161,161,142,124' name='elbowsY'/>",
	 "   <property value='West_0' name='fromPort'/>",
	 "   <property value='South_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:vehicleType.jsp@#@action:showUpdateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='276,315,315,354' name='elbowsX'/>",
	 "   <property value='183,183,231,231' name='elbowsY'/>",
	 "   <property value='East_2' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='page:vehicleType.jsp'>",
	 "   <property value='240' name='x'/>",
	 "   <property value='180' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:addVT.jsp@#@action:showVT.do@'>",
	 "   <property value='440,440,440,440' name='elbowsX'/>",
	 "   <property value='84,110,110,136' name='elbowsY'/>",
	 "   <property value='South_1' name='fromPort'/>",
	 "   <property value='North_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:addVT.jsp@#@action:addVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='476,510,510,544' name='elbowsX'/>",
	 "   <property value='32,32,21,21' name='elbowsY'/>",
	 "   <property value='East_1' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='page:addVT.jsp'>",
	 "   <property value='440' name='x'/>",
	 "   <property value='40' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:acessDtls.jsp@#@action:showVT.do@'>",
	 "   <property value='380,380,404,404' name='elbowsX'/>",
	 "   <property value='164,164,164,161' name='elbowsY'/>",
	 "   <property value='South_1' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:acessDtls.jsp@#@action:showAcessDetails.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='344,290,290,236' name='elbowsX'/>",
	 "   <property value='112,112,72,72' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='page:acessDtls.jsp'>",
	 "   <property value='380' name='x'/>",
	 "   <property value='120' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:updateVT.jsp@#@action:updateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='476,500,500,524' name='elbowsX'/>",
	 "   <property value='332,332,321,321' name='elbowsY'/>",
	 "   <property value='East_1' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='action-call:@page:updateVT.jsp@#@action:showVT.do@'>",
	 "   <property value='440,440,440,440' name='elbowsX'/>",
	 "   <property value='296,260,260,224' name='elbowsY'/>",
	 "   <property value='North_1' name='fromPort'/>",
	 "   <property value='South_1' name='toPort'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='page:updateVT.jsp'>",
	 "   <property value='440' name='x'/>",
	 "   <property value='340' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#success#vehicleType.jsp#@action:addVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='544,410,410,276' name='elbowsX'/>",
	 "   <property value='43,43,161,161' name='elbowsY'/>",
	 "   <property value='West_2' name='fromPort'/>",
	 "   <property value='East_0' name='toPort'/>",
	 "   <property value='success' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#fail#addVT.jsp#@action:addVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='544,510,510,476' name='elbowsX'/>",
	 "   <property value='32,32,21,21' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_0' name='toPort'/>",
	 "   <property value='fail' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#showVT#getVT.do#@action:begin.do@'>",
	 "   <property value='56,70,70,84' name='elbowsX'/>",
	 "   <property value='172,172,172,172' name='elbowsY'/>",
	 "   <property value='East_1' name='fromPort'/>",
	 "   <property value='West_1' name='toPort'/>",
	 "   <property value='showVT' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#showVT#vehicleType.jsp#@action:getVT.do@'>",
	 "   <property value='156,180,180,204' name='elbowsX'/>",
	 "   <property value='161,161,161,161' name='elbowsY'/>",
	 "   <property value='East_0' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 "   <property value='showVT' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#fail#vehicleType.jsp#@action:showAcessDetails.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='200,200,202,204' name='elbowsX'/>",
	 "   <property value='124,161,161,161' name='elbowsY'/>",
	 "   <property value='South_1' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 "   <property value='fail' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#showAcessDtls#acessDtls.jsp#@action:showAcessDetails.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='236,290,290,344' name='elbowsX'/>",
	 "   <property value='72,72,101,101' name='elbowsY'/>",
	 "   <property value='East_1' name='fromPort'/>",
	 "   <property value='West_0' name='toPort'/>",
	 "   <property value='showAcessDtls' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#success#addVT.jsp#@action:showAddVT.do@'>",
	 "   <property value='356,380,380,404' name='elbowsX'/>",
	 "   <property value='12,12,32,32' name='elbowsY'/>",
	 "   <property value='East_1' name='fromPort'/>",
	 "   <property value='West_1' name='toPort'/>",
	 "   <property value='success' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#updateVT#updateVT.jsp#@action:showUpdateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='390,390,397,404' name='elbowsX'/>",
	 "   <property value='294,332,332,332' name='elbowsY'/>",
	 "   <property value='South_1' name='fromPort'/>",
	 "   <property value='West_1' name='toPort'/>",
	 "   <property value='updateVT' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#fail#vehicleType.jsp#@action:showUpdateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='354,315,315,276' name='elbowsX'/>",
	 "   <property value='242,242,183,183' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_2' name='toPort'/>",
	 "   <property value='fail' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#showVT#vehicleType.jsp#@action:showVT.do@'>",
	 "   <property value='404,340,340,276' name='elbowsX'/>",
	 "   <property value='172,172,172,172' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_1' name='toPort'/>",
	 "   <property value='showVT' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#UpdateSuccess#vehicleType.jsp#@action:updateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='524,400,400,276' name='elbowsX'/>",
	 "   <property value='332,332,183,183' name='elbowsY'/>",
	 "   <property value='West_1' name='fromPort'/>",
	 "   <property value='East_2' name='toPort'/>",
	 "   <property value='UpdateSuccess' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='forward:path#fail#updateVT.jsp#@action:updateVT.do#testCategory1.vehicleType.VehicleTypeController.VTForm@'>",
	 "   <property value='524,500,500,476' name='elbowsX'/>",
	 "   <property value='321,321,321,321' name='elbowsY'/>",
	 "   <property value='West_0' name='fromPort'/>",
	 "   <property value='East_0' name='toPort'/>",
	 "   <property value='fail' name='label'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='control:paging.Paging#paging'>",
	 "   <property value='26' name='x'/>",
	 "   <property value='34' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='control:com.DSA.IRDT.docprod.webservice.DocumentBatchWSControl#batchCntrl'>",
	 "   <property value='28' name='x'/>",
	 "   <property value='34' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='control:com.DSA.common.commonServices.webservice.CommonServicesWSControl#commServiceWSControl'>",
	 "   <property value='67' name='x'/>",
	 "   <property value='34' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='control:com.DSA.DTCS.testCategory.webservice.TestCategoryWSControl#testCatWSControl'>",
	 "   <property value='49' name='x'/>",
	 "   <property value='34' name='y'/>",
	 " </pageflow-object>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#codeLabel#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#createdBy#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#createdDate#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#defaultType#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#description#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#maxAllTBPct#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#maxSingleTBPct#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#examSkillThreshold#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#tbWeeks#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#updatedBy#java.lang.String'/>",
	 " <pageflow-object id='formbeanprop:testCategory1.vehicleType.VehicleTypeController.VTForm#updatedDate#java.lang.String'/>",
	 " <pageflow-object id='formbean:testCategory1.vehicleType.VehicleTypeController.VTForm'/>",
	 " </view-properties>"
	})
public class VehicleTypeController extends TarsPageFlowController {

	/**
     * FormData get and set methods may be overwritten by the Form Bean editor.
     */
    @Jpf.FormBean()
	public static class VTForm extends FormData {

        /**
         * variable for storing code label.
         */
        private String codeLabel;

        /**
         * variable for storing createdBy.
         */
        private String createdBy;

        /**
         * variable for storing code label.
         */
        private String createdDate;

        /**
         * variable for storing defaultType.
         */
        private String defaultType;

        /**
         * variable for storing description.
         */
        private String description;

        /**
         * variable for storing maxAllTBPct.
         */
        private String maxAllTBPct;

        /**
         * variable for storing maxSingleTBPct.
         */
        private String maxSingleTBPct;

        /**
         * variable for storing examSkillThreshold.
         */
        private String examSkillThreshold;

        /**
         * variable for storing forwardTbWeeks.
         */
        private String tbWeeks;
        
        /** Contingency. */
        private String tbContingency;
        
        /**
         * variable for storing updatedBy.
         */
        private String updatedBy;

        /**
         * variable for storing updatedDate.
         */
        private String updatedDate;

        /**
         * get method for code label.
         * @return String code label.
         */
        public String getCodeLabel() {
            if (this.codeLabel != null) {
                return this.codeLabel.trim();
            }
            return this.codeLabel;
        }

        /**
         * get method for created By.
         * @return String createdBy.
         */
        public String getCreatedBy() {
            if (this.createdBy != null) {
                return this.createdBy.trim();
            }
            return this.createdBy;
        }

        /**
         * get method for Created Date.
         * @return String createdDate.
         */
        public String getCreatedDate() {
            if (this.createdDate != null) {
                return this.createdDate.trim();
            }
            return this.createdDate;
        }

        /**
         * get method for default type.
         * @return String defaultType.
         */
        public String getDefaultType() {
            if (this.defaultType != null) {
                return this.defaultType.trim();
            }
            return this.defaultType;
        }

        /**
         * get method for code label.
         * @return String description.
         */
        public String getDescription() {
            if (this.description != null) {
                return this.description.trim();
            }
            return this.description;
        }

        /**
         * get method for Max All TB Pct.
         * @return String maxAllTBPct.
         */
        public String getMaxAllTBPct() {
            if (this.maxAllTBPct != null) {
                return this.maxAllTBPct.trim();
            }
            return this.maxAllTBPct;
        }

        /**
         * get method for maxSingleTBPct.
         * @return String maxSingleTBPct.
         */
        public String getMaxSingleTBPct() {
            if (this.maxSingleTBPct != null) {
                return this.maxSingleTBPct.trim();
            }
            return this.maxSingleTBPct;
        }

        /**
         * get method for examSkillThreshold.
         * @return String examSkillThreshold.
         */
        public String getExamSkillThreshold() {
            if (this.examSkillThreshold != null) {
                return this.examSkillThreshold.trim();
            }
            return this.examSkillThreshold;
        }
        
        /**
         * get method for forwardTbWeeks.
         * @return String tbWeeks.
         */
        public String getTbWeeks() {
            if (this.tbWeeks != null) {
                return this.tbWeeks.trim();
            }
            return this.tbWeeks;
        }

        /**
         * get method for Updated By.
         * @return String updatedBy.
         */
        public String getUpdatedBy() {
            if (this.updatedBy != null) {
                return this.updatedBy.trim();
            }
            return this.updatedBy;
        }

        /**
         * get method for Updated Date.
         * @return String updatedDate.
         */
        public String getUpdatedDate() {
            if (this.updatedDate != null) {
                return this.updatedDate.trim();
            }
            return this.updatedDate;
        }

        /**
         * sets the code label.
         * @param codeLabel vehicle type code.
         */
        public void setCodeLabel(String codeLabel) {
            this.codeLabel = codeLabel.trim();
        }

        /**
         * sets the created by.
         * @param createdBy created by.
         */
        public void setCreatedBy(String createdBy) {
            this.createdBy = createdBy.trim();
        }

        /**
         * sets the created date.
         * @param createdDate created date.
         */
        public void setCreatedDate(String createdDate) {
            this.createdDate = createdDate.trim();
        }

        /**
         * sets the Default Type.
         * @param defaultType default Type.
         */
        public void setDefaultType(String defaultType) {
            this.defaultType = defaultType.trim();
        }

        /**
         * sets the Description.
         * @param description description.
         */
        public void setDescription(String description) {
            this.description = description.trim();
        }

        /**
         * sets the maxAllTBPct.
         * @param maxAllTBPct max All TB Pct.
         */
        public void setMaxAllTBPct(String maxAllTBPct) {
            this.maxAllTBPct = maxAllTBPct.trim();
        }

        /**
         * sets the maxSingleTBPct.
         * @param maxSingleTBPct maxSingleTBPct.
         */
        public void setMaxSingleTBPct(String maxSingleTBPct) {
            this.maxSingleTBPct = maxSingleTBPct.trim();
        }

        /**
         * sets the examSkillThreshold.
         * @param examSkillThreshold examSkillThreshold.
         */
        public void setExamSkillThreshold(String examSkillThreshold) {
            this.examSkillThreshold = examSkillThreshold.trim();
        }
        
        /**
         * sets the forwardTbWeeks.
         * @param tbWeeks forwardTbWeeks.
         */
        public void setTbWeeks(String tbWeeks) {
            this.tbWeeks = tbWeeks.trim();
        }

        /**
         * @param tbContingency the tbContingency to set
         */
        public void setTbContingency(String tbContingency) {
            this.tbContingency = tbContingency;
        }

        /**
         * @return the tbContingency
         */
        public String getTbContingency() {
            return tbContingency;
        }

        /**
         * sets the updated By.
         * @param updatedBy updated By.
         */
        public void setUpdatedBy(String updatedBy) {
            this.updatedBy = updatedBy.trim();
        }

        /**
         * sets the updated Date.
         * @param updatedDate updated Date.
         */
        public void setUpdatedDate(String updatedDate) {
            this.updatedDate = updatedDate.trim();
        }
    }

    /**
     * Pageflow variable for strFalse.
     */
    private static final String STR_FALSE = "false";

    /**
     * Pageflow variable for STR_MESSAGE_ARRAY.
     */
    private static final String STR_MESSAGE_ARRAY = "messageArray";

    /**
     * Pageflow variable for strTrue.
     */
    private static final String STR_TRUE = "true";

    /**
     * Variable for log.
     */
    public static Logger log = Logger.getLogger(DSAConstants.LOGGER);

    /**
     * strEmptyString.
     */
    private static String strEmptyString = "";

    /**
     * Error message.
     */
    public String[] arrMessage = null;

    /**
     * Pageflow variable fot Vehicle TypesData.
     */
    public VehicleTypeVO[] pgfArrVehicleTypeVO = null;

    /**
     * Pageflow variable fot Vehicle TypesData.
     */
    public String pgfSelectedVehicleType = null;

    /**
     * Pagination next buffer.
     */
    public VOPaging nextBuff = new VOPaging();

    /**
     * Pagination previous buffer.
     */
    public VOPaging prevBuff = new VOPaging();

    /**
     * Pagination page buffer.
     */
    public VOPaging[] pageBuff = null;

    /**
     * Total no of pages.
     */
    public String strTotalPages = null;

    /**
     * Total no of records.
     */
    public int iTotalRec = 0;

    /**
     * Comment for startRec represents the startRec param of the page.
     */
    public String startRec = "";

    /**
     * Comment for endRec represents the endRec Param of the page.
     */
    public String endRec = "";

    /**
     * Comment for strBack.
     */
    public String strBack = "";

    /**
     * Comment for sizeSelect is the select size.
     */
    public int sizeSelect = 0;

    /**
     * Comment for totalPages represents the total page.
     */
    public String totalPages = "";

    /**
     * Comment for pageSize represents the page size.
     */
    // PP - Modified pageSize for POC
    private int pageSize = 8;

    /**
     * @common:control
     */
    private paging.Paging paging;

    //PP Remove reference for POC
    /**
     * @common:control
     */
    //private com.DSA.IRDT.docprod.webservice.DocumentBatchWSControl batchCntrl;

    /**
     * @common:control
     */
    //private com.DSA.common.commonServices.webservice.CommonServicesWSControl commServiceWSControl;

    /**
     * Search result flag.
     */
    private String searchResultFlag = "N";

    /**
     * @common:control
     */
    //private com.DSA.DTCS.testCategory.webservice.TestCategoryWSControl testCatWSControl;

    /**
     * This method returns the search result flag indicating whether more than one search results are present or not.
     * @return returns the search result flag
     */
    public String getSearchResultFlag() {
        return searchResultFlag;
    }

    /**
     * This method returns the ArrVehicleTypeVO.
     * @return returns the ArrVehicleTypeVO
     */
    public VehicleTypeVO[] getPgfArrVehicleTypeVO() {
        return pgfArrVehicleTypeVO;
    }
    
    /**
     * This method returns the SelectedVehicleType.
     * @return returns the search result flag
     */
    public String getPgfSelectedVehicleType() {
        return pgfSelectedVehicleType;
    }
    
    public void setPgfSelectedVehicleType(String pgfSelectedVehicleType) {
        this.pgfSelectedVehicleType = pgfSelectedVehicleType;
    }

    /**
     * This method returns the label field of the paging buffer. *
     * @param page Paging buffer
     * @return returns the label field of the paging buffer
     */
    public String hasLabel(VOPaging page) {
        return page.getIsLabel();
    }

    /**
     * This method resets the error message.
     */
    public void resetErrorMessage() {
        arrMessage = null;
    }

    /**
     * This method reset Selected Vehicle Type.
     */
    public void resetSelectedVehicleType() {
        pgfSelectedVehicleType = null;
    }

    /**
     * This method resets the search result flag.
     */
    public void resetSearchResultFlag() {
        searchResultFlag = "N";
    }

    /**
     * @return start record.
     */
    public String getStartRec() {
        return this.startRec;
    }

    /**
     * @param startRec sets the start record.
     */
    public void setStartRec(String startRec) {
        this.startRec = startRec.trim();
    }

    /**
     * @return end record.
     */
    public String getEndRec() {
        return this.endRec;
    }

    /**
     * @param endRec sets the end record.
     */
    public void setEndRec(String endRec) {
        this.endRec = endRec.trim();
    }
    
    /**
     * Getter for nextBuff
     * @return nextBuff
     */
    public VOPaging getNextBuff() 
    {
		return nextBuff;
	}

	/**
	 * Getter for prevBuff
	 * @return prevBuff
	 */
    public VOPaging getPrevBuff() 
	{
		return prevBuff;
	}

	/**
	 * Getter for pageBuff
	 * @return pageBuff
	 */
    public VOPaging[] getPageBuff() 
	{
		return pageBuff;
	}

    /**
     * validates the form fields.
     * @param vehTypeVO vehTypeVO object.
     * @return Vector containing the error message.
     */
    public Vector validateVtForm(VehicleTypeVO vehTypeVO) {
        int i = 0;
        boolean bAllTbValid = true;
        int iMaxAllTb = 0;
        Vector vecErrorMsg = new Vector(1, 1);
        if (vehTypeVO.CodeLabel == null || vehTypeVO.CodeLabel.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_CODE");
            i++;
        } else if (vehTypeVO.CodeLabel.length() > 2) {
            vecErrorMsg.add("MSG_LONG_CODE");
            i++;
        }
        if (vehTypeVO.Description == null || vehTypeVO.Description.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_DESC");
            i++;
        } else if (vehTypeVO.Description.length() > 50) {
            vecErrorMsg.add("MSG_LONG_DESC");
            i++;
        }
        if (vehTypeVO.MaxAllTBPct == null || vehTypeVO.MaxAllTBPct.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_MAXALLTB");
            bAllTbValid = false;
            i++;
        } else if (vehTypeVO.MaxAllTBPct.length() > 3) {
            vecErrorMsg.add("MSG_LONG_MAXALLTB");
            bAllTbValid = false;
            i++;
        } else {
            try {
                iMaxAllTb = Integer.parseInt(vehTypeVO.MaxAllTBPct);
                if (iMaxAllTb > 100) {
                    vecErrorMsg.add("MSG_SIZE_MAXALLTB");
                    bAllTbValid = false;
                    i++;
                } else if (iMaxAllTb < 0) {
                    vecErrorMsg.add("MSG_NEGATIVE_MAXALLTB");
                    bAllTbValid = false;
                    i++;
                }
            //PP - Removed for POC, iffy dependency on wl-specific exception
/*                
            } catch (com.bea.p13n.exceptions.SystemException e) {
                vecErrorMsg.add("MSG_INVALID_MAXALLTB");
                bAllTbValid = false;
                i++;
*/                
            } catch (java.lang.NumberFormatException e) {
                vecErrorMsg.add("MSG_INVALID_MAXALLTB");
                bAllTbValid = false;
                i++;
            }
        }
        if (vehTypeVO.MaxSingleTBPct == null || vehTypeVO.MaxSingleTBPct.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_MAXSINGLETB");
            i++;
        } else if (vehTypeVO.MaxSingleTBPct.length() > 3) {
            vecErrorMsg.add("MSG_LONG_MAXSINGLETB");
            i++;
        } else {
            try {
                int iMaxSingleTb = Integer.parseInt(vehTypeVO.MaxSingleTBPct);
                if (iMaxSingleTb > 100) {
                    vecErrorMsg.add("MSG_SIZE_MAXSINGLETB");
                    i++;
                } else if (iMaxSingleTb < 0) {
                    vecErrorMsg.add("MSG_NEGATIVE_MAXSINGLETB");
                    i++;
                } else if (iMaxSingleTb > iMaxAllTb) {
                    vecErrorMsg.add("MSG_MIN_SINGLE_TB_GREATER_THAN_ALL_TB");
                    bAllTbValid = false;
                    i++;
                }
            //PP - Removed for POC, iffy dependency on wl-specific exception
/*                
            } catch (com.bea.p13n.exceptions.SystemException e) {
                vecErrorMsg.add("MSG_INVALID_MAXSINGLETB");
                i++;
*/                
            } catch (java.lang.NumberFormatException e) {
                vecErrorMsg.add("MSG_INVALID_MAXSINGLETB");
                i++;
            }
        }
        if (vehTypeVO.ForwardTbWeeks == null || vehTypeVO.ForwardTbWeeks.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_FORWARDTBWEEKS");
            i++;
        } else {
        	try {
                int iForwardTbWeeks = Integer.parseInt(vehTypeVO.ForwardTbWeeks);
                if (iForwardTbWeeks > 99) {
                    vecErrorMsg.add("MSG_SIZE_FORWARDTBWEEKS");
                    i++;
                } else if (iForwardTbWeeks < 0) {
                    vecErrorMsg.add("MSG_NEGATIVE_FORWARDTBWEEKS");
                    i++;
                }
        	//PP - Removed for POC, iffy dependency on wl-specific exception
/*                
        	} catch (com.bea.p13n.exceptions.SystemException e) {
                vecErrorMsg.add("MSG_INVALID_FORWARDTBWEEKS");
                i++;
*/                
            } catch (java.lang.NumberFormatException e) {
                vecErrorMsg.add("MSG_INVALID_FORWARDTBWEEKS");
                i++;
            }   
        }
        if (vehTypeVO.ExamSkillThreshold == null || vehTypeVO.ExamSkillThreshold.trim().equals(strEmptyString)) {
        	vehTypeVO.ExamSkillThreshold = null;
        } else if (vehTypeVO.ExamSkillThreshold.length() > 6) {
            vecErrorMsg.add("MSG_LONG_EXAMSKILLTHRESHOLD");
            i++;
        } else {
            try {
                int iExamSkillThreshold = Integer.parseInt(vehTypeVO.ExamSkillThreshold);
                if (iExamSkillThreshold < 0) {
                    vecErrorMsg.add("MSG_NEGATIVE_EXAMSKILLTHRESHOLD");
                    i++;
                }
            //PP - Removed for POC, iffy dependency on wl-specific exception
/*                
            } catch (com.bea.p13n.exceptions.SystemException e) {
                vecErrorMsg.add("MSG_INVALID_EXAMSKILLTHRESHOLD");
                i++;
*/                
            } catch (java.lang.NumberFormatException e) {
                vecErrorMsg.add("MSG_INVALID_EXAMSKILLTHRESHOLD");
                i++;
            }
        }
        if (vehTypeVO.DefaultType == null || vehTypeVO.DefaultType.trim().equals(strEmptyString)) {
            vecErrorMsg.add("MSG_EMPTY_DEFAULTTYPE");
            i++;
        }
        return vecErrorMsg;
    }

    /**
     * Sets the URL of the Web Service Control.
     */
    private void setURL() {
        //PP Stub it out for beehive trial
/*    	
    	try {
            if (log.isDebugEnabled()) {

                log.debug("Setting Vehicle Type WSDL URL as: " + ServiceLocation.getTestCategoryServiceURL());

                log.debug("Setting Vehicle Type Service Timeout as: " + ServiceLocation.getTestCategoryServiceTimeout() + " millisec");
            }
            testCatWSControl.setEndPoint(new java.net.URL(ServiceLocation.getTestCategoryServiceURL()));
            testCatWSControl.setTimeout(ServiceLocation.getTestCategoryServiceTimeout());
            commServiceWSControl.setEndPoint(new java.net.URL(ServiceLocation.getCommonServiceURL()));
            commServiceWSControl.setTimeout(ServiceLocation.getCommonServiceTimeout());
            batchCntrl.setEndPoint(new java.net.URL(ServiceLocation.getDocumentProductionBatchServiceURL()));
            batchCntrl.setTimeout(ServiceLocation.getDocumentProductionBatchServiceTimeout());
        } catch (java.net.MalformedURLException e) {
            log.fatal("Malformed Service URL [" + ServiceLocation.getTestCategoryServiceURL() + "]. Using default URL.");
        }
*/        
    }

    /**
     * @jpf:action
     * @jpf:forward name="success" path="vehicleType.jsp"
     * @jpf:forward name="fail" path="addVT.jsp"
     * @param form VTForm object
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="success", tilesDefinition="testCategory1/vehicleType/vehicleType"),
    				@Jpf.Forward(name="fail", tilesDefinition="testCategory1/vehicleType/addVT")
    		}
    	)
    protected Forward addVT(VTForm form) {
        VehicleTypeVO vehTypeVO = new VehicleTypeVO();
        vehTypeVO.CodeLabel = form.codeLabel;
        vehTypeVO.Description = form.description;
        vehTypeVO.MaxAllTBPct = form.maxAllTBPct;
        vehTypeVO.MaxSingleTBPct = form.maxSingleTBPct;
        vehTypeVO.ExamSkillThreshold = form.examSkillThreshold;
        vehTypeVO.ForwardTbWeeks = form.tbWeeks;
        vehTypeVO.DefaultType = form.defaultType;
        
        //PP modified the code for the purpose of POC
        /*
        vehTypeVO.Mode = DSAConstants.INSERT_MODE;
        vehTypeVO.CreatedBy = (String) getSession().getAttribute("UserId");
        vehTypeVO.UpdatedBy = (String) getSession().getAttribute("UserId");
        */
        vehTypeVO.setMode(DSAConstants.INSERT_MODE);
        vehTypeVO.setCreatedBy((String) getSession().getAttribute("UserId"));
        vehTypeVO.setUpdatedBy((String) getSession().getAttribute("UserId"));

        Vector vecErrorMsg = new Vector(1, 1);
        vecErrorMsg = validateVtForm(vehTypeVO);
        
        if (StringUtils.isNotBlank(form.tbContingency)) {
            try {
                vehTypeVO.TbContingency = Integer.valueOf(form.tbContingency);
                if (vehTypeVO.TbContingency.intValue() < 0) {
                    vecErrorMsg.add("MSG_TB_CONTINGENCY_LESS_ZERO");
                }
            } catch (NumberFormatException nfe) {
                vecErrorMsg.add("MSG_TB_CONTINGENCY_NAN");
            }
        }
        
        int isize = vecErrorMsg.size();
        if (isize > 0) {
            arrMessage = new String[isize];
            vecErrorMsg.toArray(arrMessage);
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail", form);
        }
        //setting pagination parameters read from pageflow
        if (startRec == null || endRec == null) {
            startRec = "1";
            endRec = String.valueOf(pageSize);
        }
        //PP Modified for POC ******** START
        //vehTypeVO.StartRec = startRec;
        startRec = "1";
        endRec = "1";
        vehTypeVO.setStartRec(startRec);
        //PP Modified for POC ******** END
        
        int iVal = Integer.parseInt(endRec) + 1;
        if (iVal % pageSize > 0) {
            iVal += 1;
        }
        //PP Modified for POC
        //vehTypeVO.EndRec = String.valueOf(iVal);
        vehTypeVO.setEndRec(String.valueOf(iVal));

        //PP Modified for POC ***** Start
        //VehicleTypeVO[] arrVehicleTypeVO = (VehicleTypeVO[]) testCatWSControl.processVehicleType(vehTypeVO);
        //if (arrVehicleTypeVO[0] != null && !arrVehicleTypeVO[0].ErrorFlag()) {
        VehicleTypeVO[] arrVehicleTypeVO = getVehicleTypeVOList(form);
        if (arrVehicleTypeVO[0] != null && !arrVehicleTypeVO[0].getErrorFlag()) {
        	//PP Modified for POC ****** End
            searchResultFlag = "Y";
            pgfArrVehicleTypeVO = arrVehicleTypeVO;
            int iLength = pgfArrVehicleTypeVO.length;
            for (int i = 0; i < iLength; i++) {
                //to be visble in the table with desc value.
                if (pgfArrVehicleTypeVO[i].DefaultType.equals("1")) {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "Yes";
                } else {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "No";
                }
            }
        } else {
            arrMessage = new String[1];
            //PP Modified for POC
            arrMessage[0] = arrVehicleTypeVO[0].getErrorMessage();
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }
        arrMessage = new String[1];
        resetSelectedVehicleType();
        arrMessage[0] = "MSG_VT_SAVE_SUCESS";
        getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
        //Clearing the Vehicle Type from cache
        //PP Remove caching invalidation code for trial
/*        
        DSACache dsaCache = new DSACache();
        dsaCache.removeKeyFromCache("VEHICLE_TYPE_ARRAY");
*/        
        setVtPaginationParam();
        return new Forward("success", form);
    }

	/**
     * This method represents the point of entry into the pageflow.
     * @jpf:action login-required="true"
     * @jpf:forward name="showVT" path="getVT.do"
     * @jpf:forward name="success" path="welcome.jsp"
     * @return Froward forward.
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="success", tilesDefinition="testCategory1/vehicleType/index"),
    				@Jpf.Forward(name="showVT", path="getVT.do")
    		}
    	)
    protected Forward begin() {
    	
    	setURL();
        //PP Commented for POC
/*    	
    	HttpServletRequest outerRequest = ScopedServletUtils.getOuterRequest(getRequest());
        String strScreenMode = outerRequest.getParameter("mode");
        if (strScreenMode != null && !strScreenMode.equals(""))
        	return new Forward("showVT");
        else return new Forward("success");
*/        
    	return new Forward("success");
     }

    /**
     * @jpf:action
     * @jpf:forward name="showVT" path="vehicleType.jsp"
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="showVT", tilesDefinition="testCategory1/vehicleType/vehicleType")
    		}
    	)
    protected Forward getVT() {
        int totalRec = 0;
        HashMap addParam = new HashMap();
        String[] arrPagination = new String[3];
        startRec = (String) getRequest().getParameter("startRec");
        endRec = (String) getRequest().getParameter("endRec");
        if (startRec == null || endRec == null) {
            startRec = "1";
            endRec = String.valueOf(pageSize);
        }
        arrPagination[0] = startRec;
        arrPagination[1] = endRec;
        arrPagination[2] = String.valueOf(totalRec);

        //PP Modified for POC
        //pgfArrVehicleTypeVO = testCatWSControl.fetchVehicleTypes(arrPagination);
        pgfArrVehicleTypeVO = fetchVehicleTypes(arrPagination);
        if (pgfArrVehicleTypeVO[0] != null && !pgfArrVehicleTypeVO[0].getErrorFlag()) {
            searchResultFlag = "Y";
            int iLength = pgfArrVehicleTypeVO.length;
            for (int i = 0; i < iLength; i++) {
                //to be visble in the table with desc value.
                if (pgfArrVehicleTypeVO[i].DefaultType.equals("1")) {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "Yes";
                } else {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "No";
                }
            }
        } else {
            searchResultFlag = "N";
            arrMessage = new String[1];
            arrMessage[0] = pgfArrVehicleTypeVO[0].getErrorMessage();
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }
        setVtPaginationParam();
        return new Forward("showVT");
    }

	/**
     * This method sets the pagination parameters for vehicle Type. used in get and save.
     * @return void
     */
    private void setVtPaginationParam() {
    	
    	//PP - Paging instantiated for POC
    	paging = new PagingImpl();
    	
    	HashMap addParam = new HashMap();
        //FOR PAGINATION:
        if (searchResultFlag.equalsIgnoreCase("Y")) {
            iTotalRec = Integer.parseInt(pgfArrVehicleTypeVO[0].getTotalRec());            
        } else {
            iTotalRec = 0;
        }
        paging.setActionMethod("getVT.do");
        paging.setStartRec(startRec);
        paging.setEndRec(endRec);
        paging.setPageSize(pageSize);
        paging.setTotalRec(iTotalRec);
        paging.setAddParam(addParam);
        if (log.isDebugEnabled()) {
            log.debug(startRec);
        }
        nextBuff = paging.genNextPrev("Next");
        prevBuff = paging.genNextPrev("Previous");
        pageBuff = paging.genPage();

        totalPages = paging.getTotalPages();
        if (log.isDebugEnabled()) {
            log.debug("pgfArrVehicleTypeVO" + pgfArrVehicleTypeVO.length);
        }
    }

    /**
     * @jpf:action
     * @jpf:forward name="fail" path="vehicleType.jsp"
     * @jpf:forward name="showAcessDtls" path="acessDtls.jsp"
     * @param form VTForm object
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="showAcessDtls", tilesDefinition="testCategory1/vehicleType/acessDtls"),
    				@Jpf.Forward(name="fail", tilesDefinition="testCategory1/vehicleType/vehicleType")
    		}
    	)
    protected Forward showAcessDetails(VTForm form) {
        VehicleTypeVO selectedVO = new VehicleTypeVO();
        if (pgfSelectedVehicleType != null) {
            int iLength = pgfArrVehicleTypeVO.length;
            for (int i = 0; i < iLength; i++) {
                if (pgfArrVehicleTypeVO[i].CodeLabel.equals(pgfSelectedVehicleType)) {
                    selectedVO = pgfArrVehicleTypeVO[i];
                    break;
                }
            }
        } else {
            arrMessage = new String[1];
            arrMessage[0] = "MSG_SELECT_ANY_ROW";
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }

        //PP Modified for POC
        //AuditVO auditVO = commServiceWSControl.fetchAuditDetails("VEHICLE_TYPE", new String[] {"VEHICLE_TYPE_CODE", }, new String[] {selectedVO.CodeLabel, });
        AuditVO auditVO = fetchAuditDetails(selectedVO);
        if (auditVO != null && !auditVO.getErrorFlag()) {
            getRequest().setAttribute("UpdatedDate", auditVO.getUpdatedDate());
            getRequest().setAttribute("UpdatedBy", auditVO.getUpdatedBy());
            getRequest().setAttribute("CreatedDate", auditVO.getCreatedDate());
            getRequest().setAttribute("CreatedBy", auditVO.getCreatedBy());
            return new Forward("showAcessDtls");
        } else {
            arrMessage = new String[1];
            arrMessage[0] = auditVO.getErrorMessage();
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }
    }

	/**
     * @jpf:action
     * @jpf:forward name="success" path="addVT.jsp"
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="success", tilesDefinition="testCategory1/vehicleType/addVT")
    		}
    	)
    protected Forward showAddVT() {
        return new Forward("success");
    }

    /**
     * @jpf:action
     * @jpf:forward name="updateVT" path="updateVT.jsp"
     * @jpf:forward name="fail" path="vehicleType.jsp"
     * @param form VTForm object
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="updateVT", tilesDefinition="testCategory1/vehicleType/updateVT"),
    				@Jpf.Forward(name="fail", tilesDefinition="testCategory1/vehicleType/vehicleType")
    		}
    	)
    protected Forward showUpdateVT(VTForm form) {
        VehicleTypeVO selectedVO = null;
        if (pgfSelectedVehicleType != null) {
            int iLength = pgfArrVehicleTypeVO.length;
            for (int i = 0; i < iLength; i++) {
            	if (pgfArrVehicleTypeVO[i].CodeLabel.equals(pgfSelectedVehicleType)) {
                    selectedVO = new VehicleTypeVO();
                    selectedVO = pgfArrVehicleTypeVO[i];
                    break;
                }
            }
        } else {
            arrMessage = new String[1];
            arrMessage[0] = "MSG_SELECT_ANY_ROW";
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }

        if (selectedVO != null) {
            form.codeLabel = selectedVO.CodeLabel;
            form.description = selectedVO.Description;
            form.maxAllTBPct = selectedVO.MaxAllTBPct;
            form.maxSingleTBPct = selectedVO.MaxSingleTBPct;
            form.examSkillThreshold = selectedVO.ExamSkillThreshold;
            form.tbWeeks = selectedVO.ForwardTbWeeks;
            form.defaultType = selectedVO.DefaultType;
            if (selectedVO.TbContingency != null) {
                form.tbContingency = selectedVO.TbContingency.toString();
            }
            //PP Modified for POC
            form.updatedBy = selectedVO.getUpdatedBy();
            form.updatedDate = selectedVO.getUpdatedDate();
/*            
            DSACache dsaCache = new DSACache();
            dsaCache.removeKeyFromCache("VEHICLE_TYPE_ARRAY");
*/            
            return new Forward("updateVT", form);
        } else {
            arrMessage = new String[1];
            arrMessage[0] = "MSG_GENERAL_ERROR";
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }

    }

    /**
     * @jpf:action
     * @jpf:forward name="showVT" path="vehicleType.jsp"
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="showVT", tilesDefinition="testCategory1/vehicleType/vehicleType")
    		}
    	)
    protected Forward showVT() {
        resetSelectedVehicleType();
        return new Forward("showVT");
    }

    /**
     * @jpf:action
     * @jpf:forward name="UpdateSuccess" path="vehicleType.jsp"
     * @jpf:forward name="fail" path="updateVT.jsp"
     * @param form VTForm object
     * @return Forward object
     */
    @Jpf.Action(
    		forwards= {
    				@Jpf.Forward(name="UpdateSuccess", tilesDefinition="testCategory1/vehicleType/vehicleType"),
    				@Jpf.Forward(name="fail", tilesDefinition="testCategory1/vehicleType/updateVT")
    		}
    	)
    protected Forward updateVT(VTForm form) {
        VehicleTypeVO vehTypeVO = new VehicleTypeVO();
        vehTypeVO.CodeLabel = form.codeLabel;
        vehTypeVO.Description = form.description;
        vehTypeVO.MaxAllTBPct = form.maxAllTBPct;
        vehTypeVO.MaxSingleTBPct = form.maxSingleTBPct;
        vehTypeVO.DefaultType = form.defaultType;
        vehTypeVO.ExamSkillThreshold = form.examSkillThreshold;
        vehTypeVO.ForwardTbWeeks = form.tbWeeks;
        //PP Modified for POC
        vehTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehTypeVO.setUpdatedBy((String) getSession().getAttribute("UserId"));
        vehTypeVO.setUpdatedDate(form.getUpdatedDate());

        Vector vecErrorMsg = new Vector(1, 1);
        vecErrorMsg = validateVtForm(vehTypeVO);
        
        if (StringUtils.isNotBlank(form.tbContingency)) {
            try {
                vehTypeVO.TbContingency = Integer.valueOf(form.tbContingency);
                if (vehTypeVO.TbContingency.intValue() < 0) {
                    vecErrorMsg.add("MSG_TB_CONTINGENCY_LESS_ZERO");
                }
            } catch (NumberFormatException nfe) {
                vecErrorMsg.add("MSG_TB_CONTINGENCY_NAN");
            }
        }
        
        int isize = vecErrorMsg.size();
        if (isize > 0) {
            arrMessage = new String[isize];
            vecErrorMsg.toArray(arrMessage);
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail", form);
        }

        //setting pagination parameters read from page flow values.
        if (startRec == null || endRec == null) {
            startRec = "1";
            endRec = String.valueOf(pageSize);
        }
        //PP Modified for POC
        vehTypeVO.setStartRec(startRec);
        int iVal = Integer.parseInt(endRec) + 1;
        if (iVal % pageSize > 0) {
            iVal += 1;
        }
        //PP Modified for POC
        vehTypeVO.setEndRec(String.valueOf(iVal));

        //PP Modified for POC
        //VehicleTypeVO[] arrVehicleTypeVO = (VehicleTypeVO[]) testCatWSControl.processVehicleType(vehTypeVO);
        VehicleTypeVO[] arrVehicleTypeVO = processVehicleType(vehTypeVO);
        if (arrVehicleTypeVO[0] != null && !arrVehicleTypeVO[0].getErrorFlag()) {
            searchResultFlag = "Y";
            pgfArrVehicleTypeVO = arrVehicleTypeVO;
            iTotalRec = Integer.parseInt(pgfArrVehicleTypeVO[0].getTotalRec());
            int iLength = pgfArrVehicleTypeVO.length;
            for (int i = 0; i < iLength; i++) {
                //to be visble in the table with desc value.
                if (pgfArrVehicleTypeVO[i].DefaultType.equals("1")) {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "Yes";
                } else {
                    pgfArrVehicleTypeVO[i].DefaultTypeDesc = "No";
                }
            }
        } else {
            arrMessage = new String[1];
            arrMessage[0] = arrVehicleTypeVO[0].getErrorMessage();
            getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
            return new Forward("fail");
        }
        arrMessage = new String[1];
        resetSelectedVehicleType();
        arrMessage[0] = "MSG_VT_SAVE_SUCESS";
        getRequest().setAttribute(STR_MESSAGE_ARRAY, arrMessage);
        setVtPaginationParam();
        return new Forward("UpdateSuccess", form);
    }

    
    // PP - MOCK objects to bypass the WS call for POC
    private VehicleTypeVO[] fetchVehicleTypes(String[] arrPagination) {
    	return getVehicleTypeVO(arrPagination);
	}

    private VehicleTypeVO[] processVehicleType(VehicleTypeVO vehTypeVO) {
		
    	VehicleTypeVO vehicleTypeVO = null;
        VehicleTypeVO[] arrVehicleTypeVO = null;
        Vector vecVehicleTypes = new Vector(1, 1);
        
        vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec(""+pgfArrVehicleTypeVO.length);
        vehicleTypeVO.setCodeLabel(vehTypeVO.getCodeLabel());
        vehicleTypeVO.setDescription(vehTypeVO.getDescription());
        vehicleTypeVO.setMaxSingleTBPct(vehTypeVO.getMaxSingleTBPct());
        vehicleTypeVO.setMaxAllTBPct(vehTypeVO.getMaxAllTBPct());
        vehicleTypeVO.setDefaultType(vehTypeVO.getDefaultType());
        vehicleTypeVO.setExamSkillThreshold(vehTypeVO.getExamSkillThreshold());
        vehicleTypeVO.setForwardTbWeeks(vehTypeVO.getForwardTbWeeks());
        vehicleTypeVO.setTbContingency(Integer.valueOf(vehTypeVO.getTbContingency()));

        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        
        for (int i = 0; i < pgfArrVehicleTypeVO.length; i++) 
        {
        	if (pgfArrVehicleTypeVO[i].CodeLabel.equals(vehTypeVO.getCodeLabel())) 
        	{
        		pgfArrVehicleTypeVO[i] = vehicleTypeVO;
        		vecVehicleTypes.add(vehicleTypeVO);
            }
        	else
        	{
        		vecVehicleTypes.add((VehicleTypeVO)pgfArrVehicleTypeVO[i]);
        	}
        }
        
        arrVehicleTypeVO = new VehicleTypeVO[vecVehicleTypes.size()];
        vecVehicleTypes.toArray(arrVehicleTypeVO);
        return arrVehicleTypeVO;
	}

    private VehicleTypeVO[] getVehicleTypeVOList(VTForm form) {
		
    	VehicleTypeVO vehicleTypeVO = null;
        VehicleTypeVO[] arrVehicleTypeVO = null;
        Vector vecVehicleTypes = new Vector(1, 1);
        
        vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec(""+pgfArrVehicleTypeVO.length);
        vehicleTypeVO.setCodeLabel(form.getCodeLabel());
        vehicleTypeVO.setDescription(form.getDescription());
        vehicleTypeVO.setMaxSingleTBPct(form.getMaxSingleTBPct());
        vehicleTypeVO.setMaxAllTBPct(form.getMaxAllTBPct());
        vehicleTypeVO.setDefaultType(form.getDefaultType());
        vehicleTypeVO.setExamSkillThreshold(form.getExamSkillThreshold());
        vehicleTypeVO.setForwardTbWeeks(form.getTbWeeks());
        vehicleTypeVO.setTbContingency(Integer.valueOf(form.getTbContingency()));
        
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vecVehicleTypes.add(vehicleTypeVO);

        for (int i = 0; i < pgfArrVehicleTypeVO.length; i++) 
        {
        	vecVehicleTypes.add((VehicleTypeVO)pgfArrVehicleTypeVO[i]);
        }
        
        arrVehicleTypeVO = new VehicleTypeVO[vecVehicleTypes.size()];
        vecVehicleTypes.toArray(arrVehicleTypeVO);
        return arrVehicleTypeVO;
	}

    private AuditVO fetchAuditDetails(VehicleTypeVO selectedVO) {
    	AuditVO auditVO = new AuditVO();
    	auditVO.setCreatedBy(selectedVO.getCreatedBy());
        auditVO.setCreatedDate(selectedVO.getCreatedDate());
        auditVO.setUpdatedBy(selectedVO.getUpdatedBy());
        auditVO.setUpdatedDate(selectedVO.getUpdatedDate());
		return auditVO;
	}
    
    private VehicleTypeVO[] getVehicleTypeVO(String[] arrPagination) {
    	VehicleTypeVO vehicleTypeVO = new VehicleTypeVO();
        VehicleTypeVO[] arrVehicleTypeVO = null;
        java.util.List<VehicleTypeVO> vecVehicleTypes = new java.util.ArrayList<VehicleTypeVO>();
        
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("A2");
        vehicleTypeVO.setDescription("ADI2");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);
       
    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("A3");
        vehicleTypeVO.setDescription("ADI3");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("B");
        vehicleTypeVO.setDescription("Bike");
        vehicleTypeVO.setMaxAllTBPct("90");
        vehicleTypeVO.setMaxSingleTBPct("40");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("B1");
        vehicleTypeVO.setDescription("M1 Bike");
        vehicleTypeVO.setMaxAllTBPct("90");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("B2");
        vehicleTypeVO.setDescription("M2 Bike");
        vehicleTypeVO.setMaxAllTBPct("90");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("BE");
        vehicleTypeVO.setDescription("B+E");
        vehicleTypeVO.setMaxAllTBPct("85");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("C");
        vehicleTypeVO.setDescription("Car");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("1");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("CP");
        vehicleTypeVO.setDescription("CPC");
        vehicleTypeVO.setMaxAllTBPct("85");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("DE");
        vehicleTypeVO.setDescription("Del");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("L");
        vehicleTypeVO.setDescription("Voc");
        vehicleTypeVO.setMaxAllTBPct("85");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("O");
        vehicleTypeVO.setDescription("Off Road Training");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("4");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("T");
        vehicleTypeVO.setDescription("Taxi");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("TC");
        vehicleTypeVO.setDescription("Trial Car");
        vehicleTypeVO.setMaxAllTBPct("0");
        vehicleTypeVO.setMaxSingleTBPct("0");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("0");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);

    	vehicleTypeVO = new VehicleTypeVO();
        vehicleTypeVO.setTotalRec("14");        
        vehicleTypeVO.setCodeLabel("V4");
        vehicleTypeVO.setDescription("V4");
        vehicleTypeVO.setMaxAllTBPct("90");
        vehicleTypeVO.setMaxSingleTBPct("50");
        vehicleTypeVO.setForwardTbWeeks("10");
        vehicleTypeVO.setExamSkillThreshold("120");
        vehicleTypeVO.setTbContingency(0);      
        vehicleTypeVO.setDefaultType("1");
        vehicleTypeVO.setCreatedBy("U1");
        vehicleTypeVO.setCreatedDate("12/06/16");
        vehicleTypeVO.setUpdatedBy("U1");
        vehicleTypeVO.setUpdatedDate("12/06/16");
        vehicleTypeVO.setMode(DSAConstants.UPDATE_MODE);
        vehicleTypeVO.setStartRec(null);
        vehicleTypeVO.setEndRec(null);
        vecVehicleTypes.add(vehicleTypeVO);
        
        int startRec = Integer.parseInt(arrPagination[0]);
        int endRec = Integer.parseInt(arrPagination[1]);
        if (endRec > vecVehicleTypes.size()) {
        	endRec = vecVehicleTypes.size();
        }
        
        vecVehicleTypes = vecVehicleTypes.subList(startRec - 1, endRec);

        arrVehicleTypeVO = new VehicleTypeVO[vecVehicleTypes.size()];
        vecVehicleTypes.toArray(arrVehicleTypeVO);
        return arrVehicleTypeVO;
    }

} // end of class
