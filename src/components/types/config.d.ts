import type { FormAttributes } from '@/components/types/form'
import type { InputAttributes } from '@/components/types/input'

// @todo: need to fix Config type
export type Config = FormAttributes & {
  items?: ConfigItem[]
}
export type ConfigItem = InputAttributes & {}

export type FormItem = ConfigItem
