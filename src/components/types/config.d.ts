import type { TFormAttributes } from '@/components/types/form'
import type { TInputAttributes } from '@/components/types/input'

// @todo: need to fix Config type
export type TConfig = TFormAttributes & {
  items?: TConfigItem[]
}
export type TConfigItem = TInputAttributes & {}

export type TFormItem = TConfigItem
