export type TInputAttributes = {
  name?: string // required
  accept?: string
  alt?: string
  autocomplete?: 'on' | 'off' | string
  autofocus?: boolean
  capture?: boolean | 'user' | 'environment'
  checked?: boolean
  dirname?: string
  disabled?: boolean
  form?: string
  formaction?: string
  formenctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
  formmethod?: 'post' | 'get' | 'dialog'
  formnovalidate?: boolean
  formtarget?: '_self' | '_blank' | '_parent' | '_top' | string
  height?: number | string
  width?: number | string
  list?: string
  max?: number | string
  maxlength?: number
  min?: number | string
  minlength?: number
  multiple?: boolean
  pattern?: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number | string
  type?:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  value?: string | number | readonly string[]
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  ismap?: boolean
  tabindex?: number
  title?: string
  accesskey?: string
  contenteditable?: boolean | 'true' | 'false'
  contextmenu?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  draggable?: boolean | 'true' | 'false'
  hidden?: boolean
  lang?: string
  spellcheck?: boolean | 'true' | 'false'
  translate?: 'yes' | 'no'
  style?: string | { [key: string]: string }
  class?: string | { [key: string]: boolean }
  id?: string
  // Event attributes
  onBlur?: (event: FocusEvent) => void
  onChange?: (event: Event) => void
  onClick?: (event: MouseEvent) => void
  onDblClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onInput?: (event: Event) => void
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyPress?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent) => void
  onMouseDown?: (event: MouseEvent) => void
  onMouseMove?: (event: MouseEvent) => void
  onMouseOut?: (event: MouseEvent) => void
  onMouseOver?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onWheel?: (event: WheelEvent) => void
  // Vue-specific attributes
  'v-model'?: any
  'v-if'?: boolean
  'v-else'?: boolean
  'v-else-if'?: boolean
  'v-for'?: string | { [key: string]: any }
  'v-show'?: boolean
  'v-bind'?: { [key: string]: any }
  'v-on'?: { [key: string]: (event: Event) => void }
  'v-pre'?: boolean
  'v-cloak'?: boolean
  'v-once'?: boolean
}
