const getExperimentalStrategiesTag = (value: string) => {
  switch (value) {
    case 'WGS':
      return 'magenta';
    case 'WXS':
      return 'green';
    case 'RNA-Seq':
      return 'orange';
    case 'Methyl-Seq':
      return 'cyan';
    default:
      return '';
  }
};

export default getExperimentalStrategiesTag;
