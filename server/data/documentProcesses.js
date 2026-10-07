const documentProcesses = {
  "PAN Card": {
    category: "Identity",

    actions: [
      "Apply for new PAN",
      "Correction or update of PAN details",
      "Request reprint of PAN card",
    ],

    renewalAvailable: false,

    processType: "Update / Correction / Reprint",

    generalProcess: [
      "Identify whether you need a new PAN, correction/update, or reprint.",
      "Use the official Income Tax Department or authorized PAN service portal.",
      "Provide the required personal and supporting information.",
      "Complete the applicable verification and payment steps.",
      "Download or receive the PAN document according to the selected service.",
    ],

    commonlyRequiredDocuments: [
      "Proof of identity",
      "Proof of address",
      "Proof of date of birth",
      "Existing PAN details, where applicable",
    ],

    officialAuthority:
      "Income Tax Department / authorized PAN service providers",

    officialWebsite:
      "https://www.incometax.gov.in/",
  },

  Aadhaar: {
    category: "Identity",

    actions: [
      "Update Aadhaar details",
      "Update address",
      "Update mobile number",
      "Update demographic information",
      "Biometric update",
    ],

    renewalAvailable: false,

    processType: "Update / Correction",

    generalProcess: [
      "Identify which Aadhaar information needs to be updated.",
      "Check whether the required update can be completed online or requires an Aadhaar centre visit.",
      "Provide the required supporting documents when applicable.",
      "Complete the verification process.",
      "Track the update status using the official UIDAI services.",
    ],

    commonlyRequiredDocuments: [
      "Valid identity/address supporting document depending on the update",
      "Existing Aadhaar details",
    ],

    officialAuthority: "Unique Identification Authority of India (UIDAI)",

    officialWebsite:
      "https://uidai.gov.in/",
  },

  Passport: {
    category: "Travel",

    actions: [
      "Apply for fresh passport",
      "Re-issue passport",
      "Re-issue due to expiry or upcoming expiry",
      "Re-issue due to change in personal particulars",
    ],

    renewalAvailable: true,

    processType: "Fresh Application / Re-issue",

    generalProcess: [
      "Register or log in to the official Passport Seva portal.",
      "Select the appropriate Fresh Passport or Re-issue service.",
      "Complete the application form with the required details.",
      "Submit the application.",
      "Pay the applicable passport service fee and schedule an appointment.",
      "Visit the selected Passport Seva Kendra or relevant passport office with the required original documents.",
      "Complete document verification and other required formalities.",
      "Track the passport application status through the official portal.",
    ],

    commonlyRequiredDocuments: [
      "Existing passport for re-issue cases",
      "Proof of present address",
      "Supporting documents relevant to the reason for re-issue",
      "Original documents with required photocopies",
    ],

    officialAuthority: "Ministry of External Affairs - Passport Seva",

    officialWebsite:
      "https://www.passportindia.gov.in/",
  },

  "Driving Licence": {
    category: "Identity",

    actions: [
      "Renew driving licence",
      "Apply for new driving licence",
      "Duplicate driving licence",
      "Change or correction of address/name",
    ],

    renewalAvailable: true,

    processType: "Renewal / New Licence / Update",

    generalProcess: [
      "Use the official Parivahan/Sarathi services for the applicable driving licence service.",
      "Select the appropriate driving licence service.",
      "Enter the required licence and applicant details.",
      "Submit the required application and documents.",
      "Pay the applicable fee.",
      "Complete any appointment, medical or verification requirement applicable to the case.",
      "Track or complete the service through the relevant transport authority.",
    ],

    commonlyRequiredDocuments: [
      "Existing driving licence for renewal cases",
      "Required application form",
      "Applicable fitness or medical certificate",
      "Other documents required by the transport authority",
    ],

    officialAuthority:
      "Ministry of Road Transport & Highways / State Transport Department",

    officialWebsite:
      "https://parivahan.gov.in/",
  },

  "Income Certificate": {
    category: "Other",

    actions: [
      "Apply for income certificate",
      "Renew/reapply when the certificate validity has ended",
      "Track application status",
    ],

    renewalAvailable: false,

    processType: "Fresh Application / Re-application",

    generalProcess: [
      "Use the relevant state government service portal.",
      "Select the Income Certificate service.",
      "Register or log in if required.",
      "Enter the applicant and income-related information.",
      "Upload or provide the required supporting documents.",
      "Submit the application.",
      "Pay any applicable service fee if required.",
      "Track the application and download the certificate after approval.",
    ],

    commonlyRequiredDocuments: [
      "Identity proof",
      "Address/residence proof",
      "Income-related supporting documents",
      "Other documents requested by the state authority",
    ],

    officialAuthority:
      "State Government / Revenue Department",

    officialWebsite:
      "https://aaplesarkar.mahaonline.gov.in/",
  },
};

export default documentProcesses;