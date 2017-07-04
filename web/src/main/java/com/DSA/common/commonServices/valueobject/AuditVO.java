package com.DSA.common.commonServices.valueobject;

import java.io.Serializable;

/**
 * The AuditVo is the VO for storing and displaying audit information.
 */
public class AuditVO implements Serializable {
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
    public AuditVO() {
        super();
        createdBy = null;
        createdDate = null;
        updatedBy = null;
        errorMessage = null;
        updatedDate = null;
        errorFlag = false;
    }

    /**
     * Sets the value of createdBy.
     *
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
     *
     * @param aCreatedDate Create Date
     */
    public final void setCreatedDate(final String aCreatedDate) {
        createdDate = aCreatedDate;
    }

    /**
     * Gets the value of CreatedDate.
     *
     * @return createdDate Creation Date
     */
    public final String getCreatedDate() {
        return createdDate;
    }

    /**
     * Sets the value of updatedBy.
     *
     * @param aUpdatedBy Update By
     */
    public final void setUpdatedBy(final String aUpdatedBy) {
        updatedBy = aUpdatedBy;
    }

    /**
     * Gets the value of UpdatedBy.
     *
     * @return updatedBy Updated By
     */
    public final String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * Sets the value of errorMessage.
     *
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
     *
     * @param aUpdatedDate Update Date
     */
    public final void setUpdatedDate(final String aUpdatedDate) {
        updatedDate = aUpdatedDate;
    }

    /**
     * Gets the value of UpdatedDate.
     *
     * @return updatedDate Update Date
     */
    public final String getUpdatedDate() {
        return updatedDate;
    }

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
     *
     * @return errorFlag The Error Flag
     */
    public final boolean getErrorFlag() {
        return errorFlag;
    }

    /**
     * Compares twp AuditVO Objects tp determine if they are equivalent.
     *
     * @param pAuditVO The Object to which a compariosn is made.
     * @return true/false
     */
    public boolean isEquals(AuditVO pAuditVO) {
        /* CHECKSTYLE-OFF */
        if (this == pAuditVO) {
            return true;
        }
        if (!this.createdBy.equals(pAuditVO.getCreatedBy())) {
            return false;
        }
        if (!this.createdDate.equals(pAuditVO.getCreatedDate())) {
            return false;
        }
        if (!this.updatedBy.equals(pAuditVO.getUpdatedBy())) {
            return false;
        }
        if (!this.errorMessage.equals(pAuditVO.getErrorMessage())) {
            return false;
        }
        if (!this.updatedDate.equals(pAuditVO.getUpdatedDate())) {
            return false;
        }
        if (this.errorFlag != (pAuditVO.getErrorFlag())) {
            return false;
        }
        /* CHECKSTYLE-ON */
        return true;
    }

    /**
     * Copys the contents of the parameter AuditVO Object.
     *
     * @param newVO Source AuditVO Object
     */
    public void copyVariables(AuditVO newVO) {
        this.setCreatedBy(newVO.getCreatedBy());
        this.setCreatedDate(newVO.getCreatedDate());
        this.setUpdatedBy(newVO.getUpdatedBy());
        this.setErrorMessage(newVO.getErrorMessage());
        this.setUpdatedDate(newVO.getUpdatedDate());
        this.setErrorFlag(newVO.getErrorFlag());
    }

    /**
     * Outputs the COntents of AuditVO as a String.
     *
     * @return AuditVO as a String
     */
    public String toString() {
        String sNULL = "null";
        StringBuffer sbuff = new StringBuffer();
        sbuff.append("The value of AuditVO is ");
        /* CHECKSTYLE-OFF */
        sbuff.append("\n  createdBy = " + (createdBy != null ? createdBy : sNULL));
        sbuff.append("\n  createdDate = " + (createdDate != null ? createdDate : sNULL));
        sbuff.append("\n  updatedBy = " + (updatedBy != null ? updatedBy : sNULL));
        sbuff.append("\n  errorMessage = " + (errorMessage != null ? errorMessage : sNULL));
        sbuff.append("\n  updatedDate = " + (updatedDate != null ? updatedDate : sNULL));
        /* CHECKSTYLE-OFF */
        sbuff.append("\n  errorFlag = " + errorFlag);
        return sbuff.toString();
    }
}

