export const company = {
  intro: {
    eyebrow: 'Company',
    heading: 'Arivo Global',
    standfirst:
      'Arivo Global Private Limited supplies refractory ceramic fibre products and foundry consumables to industrial buyers in Europe, the Gulf and Southeast Asia.',
  },
  sections: [
    {
      id: 'about',
      nav: 'About',
      eyebrow: 'About',
      heading: 'A specialist supplier for thermal and foundry duty',
      body: [
        'We supply ten product lines across three families — foundry consumables, hot gas filtration and thermal insulation — to foundries, furnace operators, filtration system builders and distributors.',
        'The work starts with the application. Buyers send a drawing, a sample or a failed part, together with the duty it has to meet, and we recommend the grade and form before we quote. Where a product in our range is the wrong answer, we say so.',
        'Our customers are procurement teams, process engineers and maintenance departments, and the distributors who serve them. Most of what we supply is made to a customer geometry and supplied repeatedly against held patterns.',
      ],
    },
    {
      id: 'quality',
      nav: 'Quality',
      eyebrow: 'Quality',
      heading: 'Inspection and documentation',
      body: [
        'Every consignment is checked against the order before dispatch: dimensions against the drawing or the agreed tolerance, visual condition, grade identification and packing. [CONFIRM: inspection scope and sampling plan]',
        'Each order ships with its documentation set, so goods can be received and cleared without follow-up requests.',
      ],
      list: {
        heading: 'Supplied with an order',
        items: [
          'Commercial invoice and packing list, item by item',
          'Certificate of conformity against the order [CONFIRM]',
          'Material test data where the order requires it [CONFIRM]',
          'Safety data sheet for each fibre grade',
          'Handling and installation guidance where relevant',
        ],
      },
    },
    {
      id: 'compliance',
      nav: 'Compliance',
      eyebrow: 'Compliance',
      heading: 'Fibre chemistry, REACH and CLP',
      body: [
        'Two fibre chemistries run through the range. Alumino-silicate refractory ceramic fibre carries the higher temperature capability. Alkaline earth silicate (AES) fibre is a low bio-persistence alternative that some operators prefer for handling and regulatory reasons.',
        'In the European Union, alumino-silicate refractory ceramic fibre is classified under CLP as a Category 1B carcinogen and is on the REACH Candidate List of substances of very high concern. AES fibre is exonerated from carcinogen classification under Note Q of CLP. Buyers in the EU receive the information required by REACH Article 33 with every supply. [CONFIRM: legal review of REACH and CLP position]',
        'Safe handling is straightforward and well established: minimise dust when cutting, use local extraction or wet methods where practical, and wear the protective equipment set out in the safety data sheet.',
      ],
      downloads: {
        heading: 'Safety data sheets',
        note: '[CONFIRM: SDS files to publish]',
        items: [
          { label: 'Alumino-silicate fibre products — SDS', href: '/downloads/sds-alumino-silicate.pdf' },
          { label: 'AES fibre products — SDS', href: '/downloads/sds-aes.pdf' },
        ],
      },
    },
    {
      id: 'markets',
      nav: 'Markets',
      eyebrow: 'Markets',
      heading: 'Markets and logistics',
      body: [
        'We supply buyers in Europe, the Gulf and Southeast Asia, by sea freight for production orders and by air for urgent replacements.',
        'Goods are export-packed for the voyage — crated or palletised, protected against moisture, and marked to the packing list so each item can be identified on arrival. Commercial terms and freight are agreed per order and stated on the quotation.',
      ],
      list: {
        heading: 'Regions served',
        items: ['Europe', 'The Gulf', 'Southeast Asia'],
      },
    },
  ],
};
