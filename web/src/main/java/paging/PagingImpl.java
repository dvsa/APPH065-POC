/**
 * 
 */
package paging;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import com.DSA.common.valueobject.VOPaging;

//PP Commented for POC
//import com.bea.control.ControlSource;

public class PagingImpl implements Paging
{   
    /**
     * serial version id.
     */
    static final long serialVersionUID = 1L;


    /**
     * start record.
     */
    private String startRec = "";

    /**
     * end record.
     */
    private String endRec = "";

    /**
     * num of records.
     */
    private int totalRec = 0;

    /**
     * page siaze.
     */
    private int pageSize = 0;

    /**
     * add param flag.
     */
    private HashMap addParam = null;

    /**
     * action method.
     */
    private String actionMethod = "";


    /**
     * generate next page.
     * @common:operation
     * @param param String.
     * @return VOPaging.
     */
    public VOPaging genNextPrev(String param) {
        int newStartRec = 0;
        int newEndRec = 0;
        boolean hasRec = false;

        StringBuffer retBuff = new StringBuffer();

        if (startRec == null || endRec == null) {
            startRec = "1";
            endRec = String.valueOf(pageSize);
        }

        if (param.equals("Next")) {
            newStartRec = Integer.parseInt(startRec) + pageSize;
            newEndRec = Integer.parseInt(endRec) + pageSize;
        } else {
            newStartRec = Integer.parseInt(startRec) - pageSize;
            newEndRec = Integer.parseInt(startRec) - 1;
        }


        if (newStartRec <= totalRec && param.equals("Next")) { hasRec = true; }
        if (newStartRec > 0 && param.equals("Previous")) { hasRec = true; }
        VOPaging retVO = new VOPaging();
        if (hasRec) {
            retVO.setStartRec(String.valueOf(newStartRec));
            retVO.setEndRec(String.valueOf(newEndRec));
            if (param.equals("Next")) {
                retVO.setDisplayText(param + " >>");
            } else {
                retVO.setDisplayText("<< " + param);
            }
        }
        return retVO;
    }

    /**
     * set total pages.
     * @common:operation
     * @return String.
     */
    public String getTotalPages() {
        int totalPages = (int) Math.ceil((double) totalRec / pageSize);
        return String.valueOf(totalPages);
    }

    /**
     * generate paqge.
     * @common:operation
     * @return VOPaging Array.
     */
    public VOPaging[] genPage() {
    	
    	int intStartRec = Integer.parseInt(startRec);
        ArrayList arrList = new ArrayList();
        VOPaging retVO = null;
        int maxPages = 10;
        int currPage = (intStartRec / pageSize) + 1;
        int totalPages = (int) Math.ceil((double) totalRec / pageSize);
        int newStartRec = 1;
        int newEndRec = pageSize;
        int startPage = 1;
        /* CHECKSTYLE-OFF */
        int endPage = (totalPages > maxPages) ? maxPages : totalPages;
        /* CHECKSTYLE-ON */
        
        if (totalPages > maxPages && currPage > (pageSize / 2)) {
        	startPage = currPage - ((pageSize / 2) - 1);
            endPage =  startPage + maxPages - 1;
            /* CHECKSTYLE-OFF */
            endPage = (endPage >= totalPages) ? totalPages : endPage;
            /* CHECKSTYLE-ON */
            int diff = (endPage - startPage) + 1;
            if (diff < 10) { startPage -= 10 - diff; }
            newStartRec = ((startPage - 1) * pageSize) + 1;
            newEndRec = newStartRec + pageSize - 1;
        }
        
        if (totalPages > 1) {
            for (int i = startPage; i <= endPage; i++) {
                retVO = new VOPaging();
                if (i == currPage) {
                	retVO.setIsLabel("YES");
                    retVO.setDisplayText(String.valueOf(i));
                } else {
                	retVO.setDisplayText(String.valueOf(i));
                    retVO.setStartRec(String.valueOf(newStartRec));
                    retVO.setEndRec(String.valueOf(newEndRec));
                }
                arrList.add(retVO);
                newStartRec += pageSize;
                newEndRec += pageSize;
                /* CHECKSTYLE-OFF */
                newEndRec = (newEndRec > totalRec) ? totalRec : newEndRec;
                /* CHECKSTYLE-ON */
            }
        }
        VOPaging[] retArr = new VOPaging[arrList.size()];
        arrList.toArray(retArr);
        return retArr;
    }

    /**
     * set Action method.
     * @common:operation
     * @param actionMethod String.
     */
    public void setActionMethod(String actionMethod) {
        this.actionMethod = actionMethod;
    }

    /**
     * set start record.
     * @common:operation
     * @param startRec String.
     */
    public void setStartRec(String startRec) {
        this.startRec = startRec;
    }

    /**
     * set End Record.
     * @common:operation
     * @param endRec String.
     */
    public void setEndRec(String endRec) {
        this.endRec = endRec;
    }

    /**
     * set Page size.
     * @common:operation
     * @param pageSize int.
     */
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    /**
     * set total records.
     * @common:operation
     * @param totalRec int.
     */
    public void setTotalRec(int totalRec) {
        this.totalRec = totalRec;
    }

    /**
     * set Parameteres.
     * @common:operation
     * @param addParam HashMap.
     */
    public void setAddParam(HashMap addParam) {
        this.addParam = addParam;
    }

    /**
     * add parameters.
     * @param retBuff StringBuffer.
     * @return StringBuffer.
     */
    public StringBuffer genAddParam(StringBuffer retBuff) {
        int len = addParam.size();
        Set set = null;
        Iterator iter = null;
        String key = "";
        for (int i = 0; i < len; i++) {
            set = addParam.keySet();
            iter = set.iterator();
            while (iter.hasNext()) {
                key = (String) iter.next();
                retBuff.append("&" + key + "=" + addParam.get(key));
            }
        }
        return retBuff;
    }

}
