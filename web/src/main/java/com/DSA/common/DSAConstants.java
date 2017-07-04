package com.DSA.common;

import java.util.Calendar;
import java.util.Date;

/**
 * Common constants file.
 */
public class DSAConstants {

    private DSAConstants() {
        // Not instantiable
    }

    /**
     * Logger name.
     */
    public static final String LOGGER = "dsaLogging";

    /**
     * Common "success" String Literal.
     */
    public static final String SUCCESS = "success";

    /**
     * Common "" String Literal.
     */
    public static final String EMPTY_STRING = "";

    /**
     * Common "dd/mm/yyyy" String Literal.
     */
    public static final String STANDARD_DATE_FORMAT = "dd/MM/yyyy";

    /**
     * External Date format. The format in which IBS dates are sent.
     */
    public static final String EXTERNAL_DATE_FORMAT = "dd-MMM-yyyy";

    /**
     * External Date format with time. The format in which IBS dates are sent.
     */
    public static final String EXTERNAL_DATE_WITH_TIME_FORMAT = "dd-MMM-yyyy HH:mm";

    /**
     * Date format with Time - excluding seconds.
     */
    public static final String STANDARD_DATE_WITH_TIME_FORMAT = "dd/MM/yyyy HH:mm";

    /**
     * Date format with Time - including seconds.
     */
    public static final String STANDARD_DATE_WITH_TIME_FORMAT_SEC = "dd/MM/yyyy HH:mm:ss";

    /**
     * Date format for timestamp including nanos precision.
     */
    public static final String TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss:SSSSSS";

    /** Card date format for issue and expiry dates. */
    public static final String CARD_DATE_FORMAT = "MM/yy";

    /**
     * Date format with Time only.
     */
    public static final String TIME_ONLY_FORMAT = "HH:mm";

    /**
     * Common UPDATE_MODE String Literal.
     */
    public static final String UPDATE_MODE = "UPDATE_MODE";
    
    /**
     * View Mode string literal.
     */
    public static final String VIEW_MODE = "VIEW";

    /**
     * Common INSERT_MODE String Literal.
     */
    public static final String INSERT_MODE = "INSERT_MODE";

    /**
     * Common DELETE_MODE String Literal.
     */
    public static final String DELETE_MODE = "DELETE_MODE";

    /**
     * Common "Y" String Literal.
     */
    public static final String Y = "Y";

    /**
     * Common "Y" String Literal.
     */
    public static final String N = "N";

    /**
     * Common "," String Literal.
     */
    public static final String COMMA = ",";

    /**
     * Common "0" String Literal.
     */
    public static final String ZERO = "0";

    /**
     * Common "0" String Literal.
     */
    public static final String ONE = "1";

    /**
     * Common "','" String Literal.
     */
    public static final String SQL_SEPERATOR = "','";

    /**
     * Common "','" String Literal.
     */
    public static final String SINGLE_QUOTE = "'";

    /**
     * Common "n/a" String Literal.
     */
    public static final String NOT_APPLICABLE = "n/a";

    /**
     * Common "NULL" String Literal.
     */
    public static final String NULL = "NULL";

    /**
     * Common "/n" String Literal.
     */
    public static final String CARRIAGE_RETURN = "/n";

    /**
     * ERROR - Encryption/Decryption Failure.
     */
    public static final String MSG_ERROR_ENCRYPT_DECRYPT = "MSG_ERROR_ENCRYPT_DECRYPT";

    /**
     * ERROR - Encryption/Decryption Failure.
     */
    public static final String MSG_PAN_VALIDATION = "MSG_PAN_VALIDATION";

    /**
     * Common " " String Literal.
     */
    public static final String SPACE = " ";

    /**
     * Encryption flag.
     */
    public static final String ENCRYPTION = "Y";

    /**
     * Flag for bypassing LGV print requests.
     */
    public static final String BYPASS_LGV_PRINTS = "Y";

    /**
     * TRAINEE_LICENCE.
     */
    public static final String ADI_TRAINEE_LICENCE = "A610";

    /**
     * ADI_REGISTRATION.
     * TODO - Constant not used anymore due to removal of registration payment (QC-TARS-11728)
     */
    //public static final String ADI_REGISTRATION = "A610";

    /**
     * ADI_RENEWAL.
     */
    public static final String ADI_RENEWAL = "A610";

    /**
     * ADI_RE_REGISTRATION.
     */
    public static final String ADI_RE_REGISTRATION = "A610";

    /**
     * ADI_FIRST_FULL_CERTIFICATE.
     */
    public static final String ADI_FIRST_FULL_CERTIFICATE = "A610";

    /**
     * ADI_FIRST_FULL_CERTIFICATE.
     */
    public static final String ADI_DUPLICATE_CERTIFICATE = "A610";

    /**
     * LGV_REGISTRATION.
     * TODO - Constant not used anymore due to removal of registration payment (QC-TARS-11728)
     */
    //public static final String LGV_REGISTRATION = "A811";

    /**
     * LGV_RE_REGISTRATION.
     */
    public static final String LGV_RE_REGISTRATION = "A811";

    /**
     * LGV_RENEWAL.
     */
    public static final String LGV_RENEWAL = "A811";

    /**
     * LGV_FIRST_FULL_CERTIFICATE.
     */
    public static final String LGV_FIRST_FULL_CERTIFICATE = "A811";

    /**
     * LGV_DUPLICATE_CERTIFICATE.
     */
    public static final String LGV_DUPLICATE_CERTIFICATE = "A811";

    /**
     * FLEET_PROCESSING_FEE.
     */
    public static final String FLEET_PROCESSING_FEE = "A812";

    /**
     * FLEET_REGISTRATION.
     * @deprecated Constant not used anymore due to removal of registration payment (QC-TARS-11728)
     */
    public static final String FLEET_REGISTRATION = "A812";

    /**
     * FLEET_RE_REGISTRATION.
     */
    public static final String FLEET_RE_REGISTRATION = "A812";

    /**
     * FLEET_RENEWAL.
     */
    public static final String FLEET_RENEWAL = "A812";

    /**
     * FLEET_FULL_CERTIFICATE.
     */
    public static final String FLEET_FULL_CERTIFICATE = "A812";

    /**
     * FLEET_DUPLICATE_CERTIFICATE.
     */
    public static final String FLEET_DUPLICATE_CERTIFICATE = "A812";

    /**
     * ORDIT_TRAINER_INSPECTION_FEE.
     */
    public static final String ORDIT_TRAINER_INSPECTION_FEE = "A813";

    /**
     * ORDIT_PREMISES_INSPECTION_FEE.
     */
    public static final String ORDIT_PREMISES_INSPECTION_FEE = "A813";

    /**
     * ORDIT_RE_REGISTRATION_FEE.
     */
    public static final String ORDIT_RE_REGISTRATION_FEE = "A813";

    /**
     * ORDIT_FIRST_FULL_CERTIFICATE.
     */
    public static final String ORDIT_FIRST_FULL_CERTIFICATE = "A813";

    /**
     * ORDIT_DUPLICATE_CERTIFICATE.
     */
    public static final String ORDIT_DUPLICATE_CERTIFICATE = "A813";

    /**
     * ORDIT_RENEWAL.
     */
    public static final String ORDIT_RENEWAL = "A813";

    /**
     * PASSPLUS_STARTER_PACK.
     */
    public static final String PASSPLUS_STARTER_PACK = "A616";

    /**
     * PASSPLUS_REFILL_PACK.
     */
    public static final String PASSPLUS_REFILL_PACK = "A616";

    /**
     * DAYS_OF_WEEK.
     */
    public static final short DAYS_OF_WEEK = 7;

    /**
     * SUNDAY.
     */
    public static final short SUNDAY = 0;

    /**
     * MONDAY.
     */
    public static final short MONDAY = 1;

    /**
     * TUESDAY.
     */
    public static final short TUESDAY = 2;

    /**
     * WEDNESDAY.
     */
    public static final short WEDNESDAY = 3;

    /**
     * THURSDAY.
     */
    public static final short THURSDAY = 4;

    /**
     * FRIDAY.
     */
    public static final short FRIDAY = 5;

    /**
     * SATURDAY.
     */
    public static final short SATURDAY = 6;

    /**
     * Maximum date for system.
     */
    public static final String MAXIMUM_SYSTEM_DATE = "01/01/4000";

    /**
     * Same max date just as a Date
     */
    public static final Date MAXIMUM_SYSTEM_DATE_DATE;
    static {
        final Calendar cal = Calendar.getInstance();
        cal.set(4000, 0, 1, 0, 0, 0);
        cal.set(Calendar.MILLISECOND, 0);
        MAXIMUM_SYSTEM_DATE_DATE = cal.getTime();
    }

    /**
     * minumum date for system.
     */
    public static final String MINIMUM_SYSTEM_DATE = "01/01/1900";

    /**
     * Same min date just as a Date
     */
    public static final Date MINIMUM_SYSTEM_DATE_DATE;
    static {
        final Calendar cal = Calendar.getInstance();
        cal.set(1900, 0, 1, 0, 0, 0);
        cal.set(Calendar.MILLISECOND, 0);
        MINIMUM_SYSTEM_DATE_DATE = cal.getTime();
    }

    /**
     * minumum time for system.
     */
    public static final String MINIMUM_SYSTEM_TIME = "00:00";

    /**
     * maximum date for system.
     */
    public static final String MAXIMUM_SYSTEM_TIME = "23:59";

    /**
     * System User Id.
     */
    public static final String SYSTEM_USER_ID = "1";

    /**
     * SYSTEM_USER name.
     */
    public static final String SYSTEM_USER_NAME = "System";

    /**
     * no data found MSG_NO_DATA_FOUND.
     */
    public static final String MSG_NO_DATA_FOUND = "MSG_NO_DATA_FOUND";

    /**
     * GENERAL ERROR - MSG_GENERAL_ERROR.
     */
    public static final String MSG_GENERAL_ERROR = "MSG_GENERAL_ERROR";

    /**
     * MSG_NO_ROWS_INSERTED.
     */
    public static final String MSG_NO_ROWS_INSERTED = "MSG_NO_ROWS_INSERTED";

    /**
     * MSG_NO_ROWS_UPDATED.
     */
    public static final String MSG_NO_ROWS_UPDATED = "MSG_NO_ROWS_UPDATED";

    /**
     * GENERAL ERROR - MSG_CONCURRENCY.
     */
    public static final String MSG_CONCURRENCY = "MSG_CONCURRENCY";

    /**
     * Constant that indicates some of the selected programme slots are in booked state.
     */
    public static final String BOOKED_SLOT_EXISTS = "BOOKED_SLOT_EXISTS";

    /**
     * REFUND_REQUEST_APP_TYPE_BOOKING.
     */
    public static final String REFUND_REQUEST_APP_TYPE_BOOKING = "BOOKING";

    /**
     * Flag to indicate whether the test date check on first full certificate needs to be relaxed
     */
    public static final String RELAX_CERTIFICATE_DATE_CHECK = "Y";

    /**
     * CCN55: Added to indentify that the user is locked by the System.
     */
    public static final String ROOT_USER_FOR_LOCKING_ACT = "1";

    /**
     * INSUFFICIENT_DVLA_IDS_AVAILABLE Used in Forward
     */
    public static final String INSUFFICIENT_DVLA_IDS_AVAILABLE = "unableToAddEntitlementCheck";

    /**
     * used for users using the delegated web services but do not have a dsa user login
     * <p>
     * In case a user of a webservice is not registered in the TARS system, code should perform data-changing operations
     * with this individual instead
     * @return DSAUser pk
     */
    public static final long DEFAULT_DELEGATED_DSA_INDIVIDUAL_ID = 999996;

    public static final String STANDARD_ADHOC_TEMPLATE = "StandardAdhocTemplate.rep";

    // User Id for Internet User
    public static final String IBS_CREATED_BY_USER = "999998";

    // DSATARS2-5300 Start
    /**
     * DSATARS2-5300 Hold state code.
     */
    public static final String HOLD_STATE_CODE = "11";
    /**
     * DSATARS2-5300 TheHold state description.
     */
    public static final String HOLD_STATE_DES = "Hold after Underpayment";
    // DSATARS2-5300 End

    /**
     * The maximum amount of Refund Results that can be returned
     */
    public static final Integer MAX_REFUND_RESULTS = new Integer(50);
    // VN500
    public static final String MINIMUM_DISCLOSURE_DATE = "12/03/2007";

    public static final String MALE = "M";

    public static final String FEMALE = "F";

    public static final String MALE_CODE = "879";

    public static final String FEMALE_CODE = "880";

    /** Message string for unsupported payment cards. */
    public static final String CARD_NOT_SUPPORTED_BY_DSA = "MSG_CARD_NOT_SUPPORTED_BY_DSA";
}
