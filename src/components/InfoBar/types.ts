import { TSelectOption } from '../Forms/Fields/FieldMapper'
import { TCharacter, TConcept, TLocation } from '../../types'

export type TFields = {
  name: string,
  label: string,
  type: string,
  options?: TSelectOption[],
  search?: (term: string) => Promise<TSelectOption[]>
  link?: (id: number|string) => string
}

export type TInfoBarProps<T> = {
  loading: boolean;
  onChange: (key: string, value: any) => void;
  data: T;
  fields: TFields[]
}