const getExperimentalStrategiesTag = (value: string) => {
  switch (value) {
    //Targeted sequencing green
    case 'TARS':
      return 'green';
    //DNA Genome Sequencing blue
    case 'WGS':
      return 'blue';
    //DNA Exome Sequencing cyan
    case 'WXS':
      return 'cyan';
    //RNA Sequencing purple
    case 'RNAS':
      return 'purple';
    //Chromatin gold
    case 'CHIPS':
    case 'ATACS':
    case 'HIC':
      return 'gold';
    //DNA Methylation geekblue
    case 'BIS':
    case 'TMS':
    case 'MRES':
    case 'MDIPS':
    case 'MCCS':
    case 'MBDS':
    case 'EMS':
    case 'DMS':
      return 'geekblue';
    default:
      return '';
  }
};

export default getExperimentalStrategiesTag;
