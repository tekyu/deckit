import cloneDeep from 'clone-deep';

export default function(options: any) {
  const newOptions = cloneDeep(options);
  newOptions.myCard = null;
  newOptions.choosedCard = null;
  return newOptions;
}
