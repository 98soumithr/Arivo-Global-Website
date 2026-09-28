/** Sitewide data: identity, navigation and contact.
 *  Anything that commits Arivo to a fact is a [CONFIRM] marker until signed off.
 *  By decision, the site publishes no registration numbers (CIN, GSTIN, IEC), no registered
 *  address, no phone or WhatsApp number and no market counts — enquiries go through the form
 *  and the enquiries mailbox. */

export const site = {
  name: 'Arivo Global',
  legalName: 'Arivo Global Private Limited',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.arivoglobal.com',
  tagline: 'Sourced to specification, shipped worldwide',
  description:
    'Arivo Global is a sourcing and export company serving buyers across Europe, the USA, the Gulf, Southeast Asia and beyond. We handle sourcing, quality inspection, export packing, documentation and shipping — one point of contact from requirement to delivery.',
  /** Response-time commitment, stated on the form, the confirmation and the acknowledgement email. */
  responseCommitment: 'We reply to every enquiry within one working day.',
  responseCommitmentConfirm: '[CONFIRM: one working day response commitment]',
} as const;

export const contact = {
  email: 'soumith@arivoglobal.com',
  officeHours: 'Monday to Saturday, 09:30–18:30',
  officeHoursConfirm: '[CONFIRM: office hours]',
  timezone: 'IST, UTC+05:30',
  timezoneConfirm: '[CONFIRM: timezone]',
};

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}
