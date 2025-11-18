import { getPartnerDataCookieValue} from '../../scripts/utils.js';

export const RT_SEARCH_ACTION_PATH = '/api/v1/web/dx-partners-runtime/search-dxp?';

export const DX_PROGRAM_TYPE = 'dxp';

export const PARTNER_LEVEL = getPartnerDataCookieValue('level', DX_PROGRAM_TYPE);

export const DIGITALEXPERIENCE_PREVIEW_PATH = '/digitalexperience/preview/';
export const DIGITALEXPERIENCE_ASSETS_PATH = '/digitalexperience-assets/';
export const PX_ASSETS_PREVIEW_PATH = '/digitalexperience-assets/preview/';

export const DX_COMPLIANCE_STATUS = {
    COMPLETED: 'Completed',
    NOT_COMPLETED: 'Not Completed'
}

export const DX_SPECIAL_STATE = {
    LOCKED: 'locked',
    LOCKED_COMPLIANCE_PAST: 'locked-compliance-past',
    LOCKED_PAYMENT_FUTURE: 'locked-payment-future',
    SUBMITTED_IN_REVIEW: 'submitted-in-review',
}
