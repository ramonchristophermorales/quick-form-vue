import type { FormAttributes } from '@/components/types/form'
import type { InputAttributes } from '@/components/types/input'

export type Config = Partial<FormAttributes> & {
  items?: ConfigItem[]
}
export type ConfigItem = Partial<InputAttributes> & {}

export type FormItem = ConfigItem
