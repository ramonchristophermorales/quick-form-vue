export type FormAttributes = {
  acceptCharset?: string
  action?: string
  autocomplete?: 'on' | 'off' | string
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
  method?: 'post' | 'get' | 'dialog'
  name?: string
  novalidate?: boolean
  target?: '_self' | '_blank' | '_parent' | '_top' | string
  rel?: string
  // Global attributes
  accesskey?: string
  class?: string | { [key: string]: boolean }
  contenteditable?: boolean | 'true' | 'false'
  contextmenu?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  draggable?: boolean | 'true' | 'false'
  hidden?: boolean
  id?: string
  lang?: string
  spellcheck?: boolean | 'true' | 'false'
  style?: string | { [key: string]: string }
  tabindex?: number
  title?: string
  translate?: 'yes' | 'no'
  // Event attributes
  onSubmit?: (event: Event) => void
  onReset?: (event: Event) => void
  onBlur?: (event: FocusEvent) => void
  onChange?: (event: Event) => void
  onClick?: (event: MouseEvent) => void
  onDblClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onInput?: (event: Event) => void
  onInvalid?: (event: Event) => void
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyPress?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent) => void
  onMouseDown?: (event: MouseEvent) => void
  onMouseMove?: (event: MouseEvent) => void
  onMouseOut?: (event: MouseEvent) => void
  onMouseOver?: (event: MouseEvent) => void
  onMouseUp?: (event: MouseEvent) => void
  onWheel?: (event: WheelEvent) => void
  // Vue specific attributes
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
