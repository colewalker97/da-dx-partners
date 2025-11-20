import { processPrimaryContact, processSalesAccess } from './personalizationUtils.js';
import {
  hasSalesCenterAccess,
  isAdminUser,
  isPartnerNewlyRegistered,
  isMember,
  partnerIsSignedIn,
  signedInNonMember,
  getPartnerDataCookieValue, partnerHasSpecialState, lockedPartnerHasComplianceStatus
} from './utils.js';
import {DX_COMPLIANCE_STATUS, DX_SPECIAL_STATE, PARTNER_LEVEL} from '../blocks/utils/dxConstants.js';

export const PERSONALIZATION_PLACEHOLDERS = {
  'firstName': '//*[contains(text(), "$firstName")]',
  'level': '//*[contains(text(), "$level")]',
  'primaryJobRole': '//*[contains(text(), "$primaryJobRole")]',
  'accountName': '//*[contains(text(), "$accountName")]',
  'company': '//*[contains(text(), "$company")]',
};

export const PERSONALIZATION_IMS_PLACEHOLDERS = {
  'email': '//*[contains(text(), "$email")]'
}

export const LEVEL_CONDITION = 'partner-level';
export const PERSONALIZATION_MARKER = 'partner-personalization';
export const PROCESSED_MARKER = '-processed';

export const PERSONALIZATION_CONDITIONS = {
  'partner-not-member': signedInNonMember(),
  'partner-not-signed-in': !partnerIsSignedIn(),
  'partner-member': isMember(),
  'partner-sales-access': hasSalesCenterAccess(),
  'partner-level': (level) => PARTNER_LEVEL === level,
  'partner-admin': isAdminUser(),
  'partner-non-admin': !isAdminUser(),
  'partner-primary': getPartnerDataCookieValue('primarycontact'),
  'partner-newly-registered': isPartnerNewlyRegistered(),
  'locked-compliance': () => lockedPartnerHasComplianceStatus(DX_COMPLIANCE_STATUS.NOT_COMPLETED),
  'locked-payment': () => lockedPartnerHasComplianceStatus(DX_COMPLIANCE_STATUS.COMPLETED),
  'locked-compliance-past': () => partnerHasSpecialState(DX_SPECIAL_STATE.LOCKED_COMPLIANCE_PAST),
  'locked-payment-future': () => partnerHasSpecialState(DX_SPECIAL_STATE.LOCKED_PAYMENT_FUTURE),
  'submitted-in-review': () => partnerHasSpecialState(DX_SPECIAL_STATE.SUBMITTED_IN_REVIEW),
};

export const PROFILE_PERSONALIZATION_ACTIONS = {
  'partner-primary': processPrimaryContact,
  'partner-sales-access': processSalesAccess,
};
