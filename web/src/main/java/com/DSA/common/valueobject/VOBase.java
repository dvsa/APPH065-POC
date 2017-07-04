/**
 * ----------------------------------------------------------------------.
 * Class Name:VOBase Description: This is a Value Object.
 * Date of Creation:05/05/2005
 * Extends: VOBase
 * Implements: Serializable
 * Author: Default
 * -------------------------------------------------------------------------
 * Update Log: Date: By: Details:
 * ------------------------------------------------------------------------
 */
package com.DSA.common.valueobject;

import java.io.Serializable;

import com.DSA.common.DSAConstants;
import org.apache.log4j.Logger;

/**
 * This is the Value Object super class.
 */
public abstract class VOBase implements Serializable {
    /**
     * Logger instance for logging purpose.
     */
    private static final Logger LOG = Logger.getLogger(VOBase.class);

    /**
     * The Mode.
     */
    private String mode;

    /**
     * The start Record.
     */
    private String startRec;

    /**
     * The end Record.
     */
    private String endRec;

    /**
     * The total number of Records.
     */
    private String totalRec;

    /**
     * The Creator of the Record.
     */
    private String createdBy;

    /**
     * The date of record creation.
     */
    private String createdDate;

    /**
     * The identity of teh client updating a record.
     */
    private String updatedBy;

    /**
     * The date the record is being updated.
     */
    private String updatedDate;

    /**
     * An vo value changed (dirty) indicator..
     */
    //private boolean dirtyFlag;

    /**
     * An Error indicator..
     */
    private boolean errorFlag;

    /**
     * The error message.
     */
    private String errorMessage;

    /**
     * VBBase Constructor.
     */
    public VOBase() {
        super();
        mode = DSAConstants.INSERT_MODE;
        startRec = null;
        endRec = null;
        totalRec = null;
        createdBy = null;
        createdDate = null;
        updatedBy = null;
        errorMessage = null;
        updatedDate = null;
        //dirtyFlag = false;
        errorFlag = false;
    }

    /**
     * Sets the value of mode.
     * @param amode Mode
     */
    public final void setMode(final String amode) {
        mode = amode;
    }

    /**
     * Gets the value of mode.
     * @return mode
     */
    public final String getMode() {
        return mode;
    }

    /**
     * Sets the value of startRec.
     * @param astartRec Start Record
     */
    public final void setStartRec(final String astartRec) {
        startRec = astartRec;
    }

    /**
     * Gets the value of startRec.
     * @return startRec Start Record
     */
    public final String getStartRec() {
        return startRec;
    }

    /**
     * Sets the value of endRec.
     * @param aendRec End Record
     */
    public final void setEndRec(final String aendRec) {
        endRec = aendRec;
    }

    /**
     * Gets the value of endRec.
     * @return endRec End Record
     */
    public final String getEndRec() {
        return endRec;
    }

    /**
     * Sets the value of totalRec.
     * @param atotalRec Total Records
     */
    public final void setTotalRec(final String atotalRec) {
        totalRec = atotalRec;
    }

    /**
     * Gets the value of totalRec.
     * @return totalRec Total Records
     */
    public final String getTotalRec() {
        return totalRec;
    }

    /**
     * Sets the value of createdBy.
     * @param aCreatedBy Created By
     */
    public final void setCreatedBy(final String aCreatedBy) {
        createdBy = aCreatedBy;
    }

    /**
     * Gets the value of createdBy.
     *
     * @return createdBy Created By
     */
    public final String getCreatedBy() {
        return createdBy;
    }

    /**
     * Sets the value of createdDate.
     * @param aCreatedDate Create Date
     */
    public final void setCreatedDate(final String aCreatedDate) {
        createdDate = aCreatedDate;
    }

    /**
     * Gets the value of CreatedDate.
     * @return createdDate Creation Date
     */
    public final String getCreatedDate() {
        return createdDate;
    }

    /**
     * Sets the value of updatedBy.
     * @param aUpdatedBy Update By
     */
    public final void setUpdatedBy(final String aUpdatedBy) {
        updatedBy = aUpdatedBy;
    }

    /**
     * Gets the value of UpdatedBy.
     * @return updatedBy Updated By
     */
    public final String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * Sets the value of errorMessage.
     * @param aErrorMessage Error Message
     */
    public final void setErrorMessage(final String aErrorMessage) {
        errorMessage = aErrorMessage;
    }

    /**
     * Gets the value of ErrorMessage.
     *
     * @return errorMessage Error Message
     */
    public final String getErrorMessage() {
        return errorMessage;
    }

    /**
     * Sets the value of updatedDate.
     * @param aUpdatedDate Update Date
     */
    public final void setUpdatedDate(final String aUpdatedDate) {
        updatedDate = aUpdatedDate;
    }

    /**
     * Gets the value of UpdatedDate.
     * @return updatedDate Update Date
     */
    public final String getUpdatedDate() {
        return updatedDate;
    }

    /**
     * Sets the value of dirtyFlag.
     * @param aDirtyFlag Dirty Flag
     */
    /*public final void setDirtyFlag(boolean aDirtyFlag) {
        dirtyFlag = aDirtyFlag;
    }*/

    /**
     * Gets the value of DirtyFlag.
     * @return dirtyFlag The Dirty Flag
     */
    /*public final boolean getDirtyFlag() {
        return dirtyFlag;
    }*/

    /**
     * Sets the value of errorFlag.
     *
     * @param aErrorFlag Error Flag
     */
    public final void setErrorFlag(boolean aErrorFlag) {
        errorFlag = aErrorFlag;
    }

    /**
     * Gets the value of ErrorFlag.
     * @return errorFlag The Error Flag
     */
    public final boolean getErrorFlag() {
        return errorFlag;
    }

    /**
     * Compares twp VOBase Objects tp determine if they are equivalent.
     * @param pVOBase The Object to which a compariosn is made.
     * @return true/false
     */
    public boolean isEquals(VOBase pVOBase) {
        /* CHECKSTYLE-OFF */
        if (this == pVOBase) {
            return true;
        }
        if (!this.mode.equals(pVOBase.getMode())) {
            return false;
        }
        if (!this.startRec.equals(pVOBase.getStartRec())) {
            return false;
        }
        if (!this.endRec.equals(pVOBase.getEndRec())) {
            return false;
        }
        if (!this.totalRec.equals(pVOBase.getTotalRec())) {
            return false;
        }
        if (!this.createdBy.equals(pVOBase.getCreatedBy())) {
            return false;
        }
        if (!this.createdDate.equals(pVOBase.getCreatedDate())) {
            return false;
        }
        if (!this.updatedBy.equals(pVOBase.getUpdatedBy())) {
            return false;
        }
        if (!this.errorMessage.equals(pVOBase.getErrorMessage())) {
            return false;
        }
        if (!this.updatedDate.equals(pVOBase.getUpdatedDate())) {
            return false;
        }
        //if (this.dirtyFlag != (pVOBase.getDirtyFlag())) {
        //    return false;
        //}
        if (this.errorFlag != (pVOBase.getErrorFlag())) {
            return false;
        }
        /* CHECKSTYLE-ON */
        return true;
    }

    /**
     * Copys the contents of the parameter VOBase Object.
     *
     * @param newVO Source VOBase Object
     */
    public void copyVariables(VOBase newVO) {
        this.setMode(newVO.getMode());
        this.setStartRec(newVO.getStartRec());
        this.setEndRec(newVO.getEndRec());
        this.setTotalRec(newVO.getTotalRec());
        this.setCreatedBy(newVO.getCreatedBy());
        this.setCreatedDate(newVO.getCreatedDate());
        this.setUpdatedBy(newVO.getUpdatedBy());
        this.setErrorMessage(newVO.getErrorMessage());
        this.setUpdatedDate(newVO.getUpdatedDate());
        //this.setDirtyFlag(newVO.getDirtyFlag());
        this.setErrorFlag(newVO.getErrorFlag());
    }

    /**
     * Outputs the COntents of VOBase as a String.
     *
     * @return VOBase as a String
     */
    public String toString() {
        String sNULL = "null";
        StringBuffer sbuff = new StringBuffer();
        sbuff.append("The value of VOBase is ");
        /* CHECKSTYLE-OFF */
        sbuff.append("\n  mode = " + (mode != null ? mode : sNULL));
        sbuff.append("\n  startRec = " + (startRec != null ? startRec : sNULL));
        sbuff.append("\n  endRec = " + (endRec != null ? endRec : sNULL));
        sbuff.append("\n  totalRec = " + (totalRec != null ? totalRec : sNULL));
        sbuff.append("\n  createdBy = " + (createdBy != null ? createdBy : sNULL));
        sbuff.append("\n  createdDate = " + (createdDate != null ? createdDate : sNULL));
        sbuff.append("\n  updatedBy = " + (updatedBy != null ? updatedBy : sNULL));
        sbuff.append("\n  errorMessage = " + (errorMessage != null ? errorMessage : sNULL));
        sbuff.append("\n  updatedDate = " + (updatedDate != null ? updatedDate : sNULL));
        /* CHECKSTYLE-OFF */
        //sbuff.append("\n  dirtyFlag = " + dirtyFlag);
        sbuff.append("\n  errorFlag = " + errorFlag);
        return sbuff.toString();
    }
    
    /**
     * Get a default value to use for createdBy / lastUpdatedBy values
     * The fact that we have to do this is an error, hence this method 
     * logs a warning and associated stack trace when invoked.
     * The root cause should be found and fixed on a case by case basis.
     * The default user id used must still exist as a genuine row in DSAUser table
     * @return default User id to use
     */
    public String defaultUserId() {
    	Exception ex = new Exception("WARNING - Using default userId");
    	LOG.warn("Using default userId", ex);
    	return "1";
    }
}
