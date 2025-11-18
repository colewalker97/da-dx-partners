import {
    getCurrentProgramType,
    getMetadataContent,
    getPartnerDataCookieValue, isMember,
    lockedPartnerHasComplianceStatus,
    partnerHasSpecialState
} from "./utils.js";
import {PERSONALIZATION_PLACEHOLDERS} from "./personalizationConfigDX.js";
import {personalizeImsPlaceholders, personalizePage, personalizePlaceholders} from "./personalization.js";
import {DX_COMPLIANCE_STATUS, DX_SPECIAL_STATE} from "../blocks/utils/dxConstants.js";

async function loadPopupFragment(popupFragment) {
    const response = await fetch(popupFragment);
    if (!response.ok) {
        console.error(`Fetching partner agreement metadata failed, status ${response.status}`);
        return null;
    }
    const text = await response.text();
    const {body} = new DOMParser().parseFromString(text, 'text/html');
    if (!body) return null;

    const main = body.querySelector('main');
    personalizePlaceholders(PERSONALIZATION_PLACEHOLDERS, main, getCurrentProgramType());
    personalizePage(main);
    await personalizeImsPlaceholders(main)
    return main.firstElementChild;
}

export async function portalMessaging(miloLibs, partnerAgreementDisplayed) {
    if (partnerAgreementDisplayed) return;
    if (!isMember()) return;

    const modalClosed = localStorage.getItem('portal-messaging-popup-closed')
    if (modalClosed === 'true') return;

    const specialStateCookie = getPartnerDataCookieValue('specialstate');
    if (!specialStateCookie) return;

    let popupType;
    if (partnerHasSpecialState(DX_SPECIAL_STATE.SUBMITTED_IN_REVIEW)) {
        popupType = 'submitted-in-review-popup';
    }
    if (partnerHasSpecialState(DX_SPECIAL_STATE.LOCKED_COMPLIANCE_PAST) &&
        (lockedPartnerHasComplianceStatus(DX_COMPLIANCE_STATUS.COMPLETED) || (lockedPartnerHasComplianceStatus(DX_COMPLIANCE_STATUS.NOT_COMPLETED)))) {
        popupType = 'locked-compliance-popup'
    }
    if (partnerHasSpecialState(DX_SPECIAL_STATE.LOCKED_PAYMENT_FUTURE)) {
        popupType = 'locked-payment-popup';
    }
    if (!popupType) return;

    const popupFragmentPath = getMetadataContent(popupType);
    if (!popupFragmentPath) {
        console.warn(`${popupType} should be displayed but popup fragment path is not found`);
        return;
    }

    const popupContent = await loadPopupFragment(popupFragmentPath);
    if (!popupContent) {
        console.warn(`Popup fragment for ${popupFragmentPath} not found`);
        return;
    }

    const {getModal} = await import(`${miloLibs}/blocks/modal/modal.js`);
    getModal(
        null,
        {
            id: 'portal-messaging-modal',
            class: 's-size',
            content: popupContent,
            closeCallback: () => {
                localStorage.setItem("portal-messaging-popup-closed", "true");
            }
        },
    );
}
