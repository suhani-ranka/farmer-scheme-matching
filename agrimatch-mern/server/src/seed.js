import 'dotenv/config';
import mongoose from 'mongoose';
import Scheme from './models/Scheme.js';

const checkedAt = new Date('2026-11-22T00:00:00.000Z');
const schemes = [
  {
    schemeCode: 'CENTRAL-PMKISAN',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortName: 'PM-KISAN',
    summary: 'Income-support scheme for eligible landholding farmer families across India.',
    benefit: '₹6,000 per eligible farmer family per year in three equal instalments, subject to current scheme rules and exclusions.',
    governmentLevel: 'Central', applicableStates: ['All India'], department: 'Department of Agriculture & Farmers Welfare, Government of India',
    category: 'Income support', tags: ['income support', 'landholding farmer', 'direct benefit transfer'],
    eligibilitySummary: 'For eligible landholding farmer families; State/UT authorities identify beneficiaries under the scheme guidelines.',
    eligibilityCaveats: ['Institutional landholders and specified higher-economic-status categories are excluded.', 'Land-record seeding and e-KYC requirements apply; check the current portal for status and exact rules.'],
    applicationProcess: 'Use the official PM-KISAN portal for registration/status and follow the State/UT land-record and e-KYC process.',
    requiredDocuments: ['Landholding records', 'Bank account details as required by the official portal', 'Identity/e-KYC as specified by the official portal'],
    officialUrl: 'https://www.pmkisan.gov.in/', sourceName: 'PM-KISAN official portal', sourceUrl: 'https://www.pmkisan.gov.in/',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'CENTRAL-PMFBY',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY',
    summary: 'Crop insurance scheme intended to provide financial protection against notified crop losses and specified risks.',
    benefit: 'Crop insurance cover under notified terms; premium, crop, season, area and enrolment cut-off are determined by current notifications.',
    governmentLevel: 'Central', applicableStates: ['All India'], department: 'Ministry of Agriculture & Farmers Welfare, Government of India',
    category: 'Crop insurance', tags: ['crop insurance', 'crop loss', 'weather risk', 'seasonal crop'],
    cropTags: ['wheat', 'soybean', 'rice', 'cotton', 'pulses', 'maize'],
    eligibilitySummary: 'Farmers with insurable interest in a notified crop in an area notified for the relevant season may be able to enrol under current operational guidelines.',
    eligibilityCaveats: ['Not every crop or district is notified in every season.', 'Tenant/sharecropper documentation and enrolment deadlines must be checked in the current notification.', 'Do not infer cover from this catalogue; use the portal premium calculator and enrolment information.'],
    applicationProcess: 'Check the current season, notified crop and area on the official portal; use the Farmer Corner or the authorised channel listed there.',
    requiredDocuments: ['Land/tenancy or insurable-interest proof as required', 'Sowing/crop details', 'Bank and identity details as required by official enrolment channel'],
    officialUrl: 'https://pmfby.gov.in/', sourceName: 'PMFBY official portal', sourceUrl: 'https://pmfby.gov.in/',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'CENTRAL-SHC',
    name: 'Soil Health Card (SHC) Scheme',
    shortName: 'Soil Health Card',
    summary: 'Provides soil nutrient-status information and recommendations to help farmers manage soil nutrients and fertiliser use.',
    benefit: 'Soil test report and crop-specific nutrient/fertiliser recommendations; this is an advisory service, not a cash grant.',
    governmentLevel: 'Central', applicableStates: ['All India'], department: 'Department of Agriculture & Farmers Welfare, Government of India',
    category: 'Soil health', tags: ['soil testing', 'soil health', 'fertiliser advice', 'crop planning'],
    eligibilitySummary: 'The scheme is intended for farmers across India; local implementation and sampling schedules are handled through state/district agriculture systems.',
    eligibilityCaveats: ['Contact the local Agriculture Officer/Block Agriculture Office for the current sampling schedule and process.'],
    applicationProcess: 'Contact the District or Block Agriculture Officer / local agriculture department to ask about soil sampling and Soil Health Card generation.',
    requiredDocuments: ['Basic farmer and land details requested by the local agriculture office'],
    officialUrl: 'https://soilhealth.dac.gov.in/', sourceName: 'Soil Health Card portal / Ministry information', sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2104403',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'CENTRAL-PDMC',
    name: 'Per Drop More Crop (PDMC) — Micro Irrigation',
    shortName: 'PDMC',
    summary: 'Promotes water-use efficiency through micro-irrigation systems such as drip and sprinkler irrigation.',
    benefit: 'Government financial assistance may be available for eligible micro-irrigation installation; assistance rates and caps depend on current guidelines and state implementation.',
    governmentLevel: 'Central', applicableStates: ['All India'], department: 'Department of Agriculture & Farmers Welfare, Government of India',
    category: 'Irrigation', tags: ['irrigation', 'drip', 'sprinkler', 'water efficiency', 'micro irrigation'],
    irrigationTags: ['yes', 'partial', 'no'],
    eligibilitySummary: 'Farmers in participating state implementation programmes may apply for approved micro-irrigation support, subject to state targets and current guidelines.',
    eligibilityCaveats: ['PDMC is implemented through state systems and current scheme architecture; verify the live state component and application window.', 'Do not treat historic subsidy percentages as a guaranteed current benefit.'],
    applicationProcess: 'Contact the State Agriculture/Horticulture Department or the official state micro-irrigation portal for current targets and application instructions.',
    requiredDocuments: ['Land details', 'Farmer registration details', 'Quotation/technical details if required by the state portal'],
    officialUrl: 'https://agriwelfare.gov.in/', sourceName: 'PIB / Ministry of Agriculture & Farmers Welfare', sourceUrl: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=159757&lang=1&reg=48',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'CENTRAL-ATMA',
    name: 'Support to State Extension Programmes for Extension Reforms (ATMA)',
    shortName: 'ATMA',
    summary: 'Agricultural extension programme supporting farmer training, demonstrations and dissemination of agricultural practices through state and district systems.',
    benefit: 'Training, demonstrations and extension support as organised by the local ATMA/district agriculture system; benefits and schedules vary by district.',
    governmentLevel: 'Central', applicableStates: ['All India'], department: 'Department of Agriculture & Farmers Welfare, Government of India / State Agriculture Departments',
    category: 'Training and extension', tags: ['farmer training', 'extension', 'demonstration', 'farm advisory'],
    eligibilitySummary: 'Farmers can enquire about local training and extension activities through their district ATMA or agriculture office.',
    eligibilityCaveats: ['Training topics, selection and available seats are local and time-dependent.'],
    applicationProcess: 'Contact the District Agriculture Office / ATMA office for upcoming farmer training and demonstration programmes.',
    requiredDocuments: ['Basic farmer details requested by the district office'],
    officialUrl: 'https://agriwelfare.gov.in/', sourceName: 'Madhya Pradesh Government scheme directory / ATMA listing', sourceUrl: 'https://cmhelpline.mp.gov.in/KnowYourEntitleGrid.aspx?pointvalue=0&status=BySchemeFor',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'MP-CMKISANKALYAN',
    name: 'Mukhyamantri Kisan Kalyan Yojana',
    shortName: 'MP Kisan Kalyan',
    summary: 'Madhya Pradesh state scheme providing additional income support to eligible landholding farmers who meet PM-KISAN-linked eligibility conditions.',
    benefit: 'The MP Government scheme page describes ₹6,000 per year in three instalments, in addition to PM-KISAN support; confirm the latest state order and beneficiary status before relying on this amount.',
    governmentLevel: 'State', stateName: 'Madhya Pradesh', applicableStates: ['Madhya Pradesh'],
    department: 'Revenue Department, Government of Madhya Pradesh',
    category: 'Income support', tags: ['income support', 'landholding farmer', 'PM-KISAN linked'],
    eligibilitySummary: 'The Madhya Pradesh scheme page states that PM-KISAN eligibility conditions apply and the beneficiary class is landholding farmers.',
    eligibilityCaveats: ['The state scheme page lists exclusions similar to PM-KISAN.', 'The page shows an update date of 28 August 2024; verify whether later government orders changed the details.', 'Use the SAARA/CM Helpline official status service or the local Patwari/Tehsil office.'],
    applicationProcess: 'The state scheme page says eligible PM-KISAN beneficiaries can submit an application through the Patwari/Tehsil process; check current instructions on SAARA or with the Tehsil office.',
    requiredDocuments: ['Land records', 'PM-KISAN beneficiary/status details', 'Other records requested by the Tehsil office'],
    officialUrl: 'https://saara.mp.gov.in/', sourceName: 'MP CM Helpline Scheme Dashboard', sourceUrl: 'https://cmhelpline.mp.gov.in/Schmedetail.aspx?Schemeid=606',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'MP-EKRISHIYANTRA',
    name: 'e-Krishi Yantra Anudan / Agricultural Mechanisation Support',
    shortName: 'e-Krishi Yantra Anudan',
    summary: 'Madhya Pradesh Directorate of Agricultural Engineering portal for farmer applications and information relating to agricultural machinery assistance programmes.',
    benefit: 'Machinery assistance/subsidy may be offered under specific schemes, equipment categories, district targets and application rounds; no fixed subsidy is promised in this catalogue.',
    governmentLevel: 'State', stateName: 'Madhya Pradesh', applicableStates: ['Madhya Pradesh'],
    department: 'Directorate of Agricultural Engineering, Government of Madhya Pradesh',
    category: 'Farm machinery', tags: ['farm machinery', 'mechanisation', 'equipment', 'tractor implements'],
    eligibilitySummary: 'Madhya Pradesh farmers may check the portal for currently open equipment categories, targets, application conditions and selection process.',
    eligibilityCaveats: ['Availability depends on scheme, equipment, district target, application round and current portal notices.', 'The portal lists both state and centrally supported components; check the individual component before applying.'],
    applicationProcess: 'Visit the official Directorate of Agricultural Engineering / e-Krishi Yantra portal and read the current notice and user instructions before applying.',
    requiredDocuments: ['Farmer registration/profile details', 'Land and equipment details', 'Other documents specified in the current portal notice'],
    officialUrl: 'https://farmer.mpdage.mp.gov.in/', sourceName: 'Directorate of Agricultural Engineering, Madhya Pradesh', sourceUrl: 'https://mpdage.mp.gov.in/',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  },
  {
    schemeCode: 'MP-ATMA-TRAINING',
    name: 'Farmer Training and Exposure Visits (ATMA — Madhya Pradesh)',
    shortName: 'MP ATMA Training',
    summary: 'Madhya Pradesh Government directory lists ATMA as a farmer extension programme; district offices publish training and extension activities.',
    benefit: 'Possible access to agricultural training, demonstrations and exposure activities; local schedules and selection are determined by district implementation.',
    governmentLevel: 'State', stateName: 'Madhya Pradesh', applicableStates: ['Madhya Pradesh'],
    department: 'Farmer Welfare and Agriculture Development Department, Government of Madhya Pradesh',
    category: 'Training and extension', tags: ['farmer training', 'extension', 'demonstration', 'exposure visit'],
    eligibilitySummary: 'Farmers can contact the district agriculture/ATMA office to ask about available training activities.',
    eligibilityCaveats: ['This is a local programme listing; dates, topics, participant selection and availability vary by district.'],
    applicationProcess: 'Contact the District Agriculture Office or local ATMA office for the current training calendar.',
    requiredDocuments: ['Basic farmer details requested by the district office'],
    officialUrl: 'https://cmhelpline.mp.gov.in/KnowYourEntitleGrid.aspx?pointvalue=0&status=BySchemeFor',
    sourceName: 'Madhya Pradesh Government scheme directory', sourceUrl: 'https://cmhelpline.mp.gov.in/KnowYourEntitleGrid.aspx?pointvalue=0&status=BySchemeFor',
    lastVerifiedAt: checkedAt, verificationStatus: 'official-source-checked'
  }
];

try {
  if (!process.env.MONGO_URI) throw new Error('Set MONGO_URI in server/.env first.');
  await mongoose.connect(process.env.MONGO_URI);
  // Remove only legacy illustrative demo records from the previous starter version.
  await Scheme.deleteMany({ demoData: true });
  const operations = schemes.map(scheme => ({
    updateOne: { filter: { schemeCode: scheme.schemeCode }, update: { $set: scheme }, upsert: true }
  }));
  await Scheme.bulkWrite(operations);
  console.log(`Upserted ${schemes.length} official-source-checked scheme records.`);
  console.log('Existing non-demo records not included in this seed are left untouched.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
