package com.DSA.common.valueobject;

/**
 * Paging VO.
 */
public class VOPaging extends VOBase {
    private static final long serialVersionUID = 7050692040917419977L;

    /**
     * Display Text.
     */
    private String displayText = "";

    /**
     * Label.
     */
    private String isLabel = "NO";

    /**
     * Get Display Text.
     * @return String Display Text.
     */
    public String getDisplayText() {
        return displayText;
    }

    /**
     * set Display Text.
     * @param displayText Display Text.
     */
    public void setDisplayText(String displayText) {
        this.displayText = displayText;
    }

    /**
     * Get Label.
     * @return String Label.
     */
    public String getIsLabel() {
        return isLabel;
    }

    /**
     * set Label.
     * @param isLabel String.
     */
    public void setIsLabel(String isLabel) {
        this.isLabel = isLabel;
    }
}
