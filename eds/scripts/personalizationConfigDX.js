import { processPrimaryContact, processSalesAccess } from './personalizationUtils.js';
import {
  hasSalesCenterAccess,
  isAdminUser,
  isPartnerNewlyRegistered,
  isMember,
  partnerIsSignedIn,
  signedInNonMember,
  getPartnerDataCookieValue,
  partnerDataCookieContainsValue,
  isReturningUser
} from './utils.js';
import {
  DX_ACCESS_TYPE,
  DX_COMPLIANCE_STATUS, DX_DESIGNATION_TYPE,
  DX_PRIMARY_BUSINESS,
  DX_SPECIAL_STATE,
  PARTNER_LEVEL
} from '../blocks/utils/dxConstants.js';

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
  'partner-primary-business-solution': partnerDataCookieContainsValue('primarybusiness', DX_PRIMARY_BUSINESS.SOLUTION),
  'partner-primary-business-technology': partnerDataCookieContainsValue('primarybusiness', DX_PRIMARY_BUSINESS.TECHNOLOGY),
  'returning-user-60d': isReturningUser(60),
  'returning-user-90d': isReturningUser(90),
  'partner-billing-admin': partnerDataCookieContainsValue('accesstype', DX_ACCESS_TYPE.BILLING_ADMIN),
  'partner-salescenter-admin': partnerDataCookieContainsValue('accesstype', DX_ACCESS_TYPE.SALES_CENTER_ADMIN),
  'partner-user': partnerDataCookieContainsValue('accesstype', DX_ACCESS_TYPE.ADMIN),
  'designation-legal': partnerDataCookieContainsValue('designationtype', DX_DESIGNATION_TYPE.LEGAL_AND_COMPLIANCE),
  'designation-learning': partnerDataCookieContainsValue('designationtype', DX_DESIGNATION_TYPE.LEARNING_AND_DEVELOPMENT),
  'locked-compliance': getPartnerDataCookieValue('compliancestatus') === DX_COMPLIANCE_STATUS.NOT_COMPLETED,
  'locked-payment': getPartnerDataCookieValue('compliancestatus') === DX_COMPLIANCE_STATUS.COMPLETED,
  'locked-compliance-past': getPartnerDataCookieValue('specialstate') === DX_SPECIAL_STATE.LOCKED_COMPLIANCE_PAST,
  'locked-payment-future': getPartnerDataCookieValue('specialstate') === DX_SPECIAL_STATE.LOCKED_PAYMENT_FUTURE,
  'submitted-in-review': getPartnerDataCookieValue('specialstate') === DX_SPECIAL_STATE.SUBMITTED_IN_REVIEW,
};

export const PROFILE_PERSONALIZATION_ACTIONS = {
  'partner-primary': processPrimaryContact,
  'partner-sales-access': processSalesAccess,
};
