import { IConfig } from 'src/components/models';

export const NewConfig = (): IConfig => ({
  id: 1,
  current: {
    campaign: '',
    character: 0,
  },
  sector: 0,
  index: [],
  edit: true,
  saving: false,
  map: {
    height: 400,
    width: 800,
    hexSize: 20,
    animations: false,
    starfield: true,
  },
});
