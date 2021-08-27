import { IConfig } from 'src/components/models'

export function NewConfig (): IConfig {
  return {
    id: 1,
    current: '',
    index: [],
    edit: true
  }
}
