export const boxIcon = (value: number): string => {
  switch (value) {
    case 0:
      return 'mdi-checkbox-blank-outline';
    case 1:
      return 'mdi-circle-small';
    case 2:
      return 'mdi-star-four-points';
    case 3:
      return 'mdi-hexagram';
    case 4:
      return 'mdi-flare';
    default:
      break;
  }

  return 'mdi-checkbox-blank-outline';
};
