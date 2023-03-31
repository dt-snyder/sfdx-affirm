import { AffirmOpenLocations } from './affirm_interfaces';
const openLocations: AffirmOpenLocations = {
    "home": {
        "displayName": "Setup Home",
        "classic": "setup/forcecomHomepage.apexp",
        "lightning": "lightning/setup/SetupOneHome/home",
        "supportsId": false
    },
    "network": {
        "displayName": "Digital Experiences Home",
        "classic": "_ui/networks/setup/SetupNetworksPage",
        "lightning": "lightning/setup/SetupNetworks/home",
        "supportsId": false
    },
    "deployment": {
        "displayName": "Deployment Status Home",
        "classic": "changemgmt/monitorDeployment.apexp",
        "lightning": "lightning/setup/DeployStatus/home",
        "supportsId": true,
        "lightningIdPath": "lightning/setup/DeployStatus/page?address=%2Fchangemgmt%2FmonitorDeploymentsDetails.apexp%3FasyncId%3D",
        "classicIdPath": "changemgmt/monitorDeploymentsDetails.apexp?asyncId="
    },
    "profile": {
        "displayName": "Profile List Views",
        "classic": "00e",
        "lightning": "lightning/setup/EnhancedProfiles/home",
        "supportsId": true,
        "lightningIdPath": "lightning/setup/EnhancedProfiles/page?address=%2F",
        "classicIdPath": ""
    },
    "email": {
        "displayName": "Email Deliverability Settings",
        "classic": "email-admin/editOrgEmailSettings.apexp",
        "lightning": "lightning/setup/OrgEmailSettings/home",
        "supportsId": false
    }
};
export { openLocations };
