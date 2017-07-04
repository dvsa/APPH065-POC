package paging;

//PP Removed wlm Control, replace with flat interface for now
//import com.bea.control.Control;

/**
 * Paging Control.
 */
public interface Paging	{ 
//extends Control {

    /**
     * set total records.
     * @param totalRec int.
     */
    void setTotalRec(int totalRec);

    /**
     * set Page size.
     * @param pageSize int.
     */
    void setPageSize(int pageSize);

    /**
     * set End Record.
     * @param endRec String.
     */
    void setEndRec(java.lang.String endRec);

    /**
     * set start record.
     * @param startRec String.
     */
    void setStartRec(java.lang.String startRec);

    /**
     * set Action method.
     * @param actionMethod String.
     */
    void setActionMethod(java.lang.String actionMethod);

    /**
     * set total pages.
     * @return String.
     */
    java.lang.String getTotalPages();

    /**
     * set Parameteres.
     * @param addParam HashMap.
     */
    void setAddParam(java.util.HashMap addParam);

    /**
     * generate next page.
     * @param param String.
     * @return VOPaging.
     */
    com.DSA.common.valueobject.VOPaging genNextPrev(java.lang.String param);

    /**
     * generate paqge.
     * @return VOPaging Array.
     */
    com.DSA.common.valueobject.VOPaging[] genPage();
}
