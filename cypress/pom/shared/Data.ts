/// <reference types="cypress"/>
export const data = {
    variantGermline: {
      dataRowKey: '*',
      variant: 'chr1:g.11846011A>G',
      type: 'SNV',
      sources: 'WGS',
      dbsnp: 'rs5065',
      gene: 'NPPA',
      consequence: 'Stop lost',
      aa_change: 'p.Ter152ArgextTer2',
      consequenceImpact: 'highImpact',
      maneC: true,
      maneM: true,
      omim: ['AD', 'AR'],
      omimID: '108780',
      clinvar: ['B'],
      clinvarID: '226855',
      gnomad: '2.07e-1',
      gnomad_alt: 31395,
      partN: 2,
      partF: 'e-1',
      studies: 1,
      frequency: '1.67e-1',
      cadd: '11.75',
      revel: '-',
      alt: 2,
      homozygotes: 0
    },
  };

export const variantMinMax = {
  variant: {
    min: 'chr1:g.100000723G>A',
    max: 'chr1:g.99999849A>G',
  },
  type: {
    min: 'SNV',
    max: 'Ins',
  },
  gnomad: {
    min: '-',
    max: '1.00e+0',
  },
  gnomad_alt: {
    min: '0',
    max: '152K',
  },
  participants: {
    min: '1',
    max: '6',
  },
  frequency: {
    min: '8.33e-2',
    max: '1.00e+0',
  },
  alt: {
    min: '1',
    max: '12',
  },
  homozygotes: {
    min: '0',
    max: '6',
  },
};