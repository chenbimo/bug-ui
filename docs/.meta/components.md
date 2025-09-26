# 组件 API 元数据

## 总览

| 组件 | Props | Emits | Slots |
|------|-------|-------|-------|
| BuigAlert | 0 | 1 | 1 |
| BuigAvatar | 0 | 0 | 1 |
| BuigBadge | 0 | 0 | 1 |
| BuigBreadcrumb | 1 | 0 | 0 |
| BuigButton | 5 | 1 | 1 |
| BuigCard | 0 | 0 | 3 |
| BuigCheckbox | 0 | 2 | 1 |
| BuigDialog | 0 | 2 | 3 |
| BuigDivider | 1 | 0 | 1 |
| BuigDrawer | 0 | 2 | 2 |
| BuigIcon | 0 | 0 | 1 |
| BuigInput | 7 | 5 | 0 |
| BuigPagination | 0 | 2 | 0 |
| BuigPopover | 1 | 0 | 2 |
| BuigProgress | 1 | 0 | 0 |
| BuigRadio | 0 | 2 | 1 |
| BuigSelect | 0 | 2 | 0 |
| BuigSkeleton | 0 | 0 | 0 |
| BuigSlider | 0 | 2 | 0 |
| BuigSpinner | 0 | 0 | 0 |
| BuigSteps | 0 | 0 | 0 |
| BuigSwitch | 0 | 2 | 0 |
| BuigTabs | 0 | 2 | 1 |
| BuigTag | 0 | 0 | 1 |
| BuigTextarea | 0 | 2 | 0 |
| BuigToast | 0 | 1 | 1 |
| BuigTooltip | 1 | 0 | 1 |

> 版本: buig@0.0.6  生成时间: 2025-09-26T16:59:08.151Z

### BuigAlert

源文件: `src/components/alert.vue`

#### Emits

- `close`

#### Slots

- `default`

### BuigAvatar

源文件: `src/components/avatar.vue`

#### Slots

- `default`

### BuigBadge

源文件: `src/components/badge.vue`

#### Slots

- `default`

### BuigBreadcrumb

源文件: `src/components/breadcrumb.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| items | `Crumb[]` | Y |

### BuigButton

源文件: `src/components/button.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| variant | `'primary'  \|  'success'  \|  'warning'  \|  'danger'  \|  'neutral'` | Y |
| size | `'xs'  \|  'sm'  \|  'md'  \|  'lg'` | Y |
| disabled | `boolean` | Y |
| loading | `boolean` | Y |
| type | `'button'  \|  'submit'  \|  'reset'` | Y |

#### Emits

- `click`

#### Slots

- `default`

### BuigCard

源文件: `src/components/card.vue`

#### Slots

- `header`
- `default`
- `footer`

### BuigCheckbox

源文件: `src/components/checkbox.vue`

#### Emits

- `update:modelValue`
- `change`

#### Slots

- `default`

### BuigDialog

源文件: `src/components/dialog.vue`

#### Emits

- `update:modelValue`
- `close`

#### Slots

- `header`
- `default`
- `footer`

### BuigDivider

源文件: `src/components/divider.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| direction | `Direction` | Y |

#### Slots

- `default`

### BuigDrawer

源文件: `src/components/drawer.vue`

#### Emits

- `update:modelValue`
- `close`

#### Slots

- `header`
- `default`

### BuigIcon

源文件: `src/components/icon.vue`

#### Slots

- `default`

### BuigInput

源文件: `src/components/input.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| modelValue | `string  \|  number` | Y |
| placeholder | `string` | Y |
| disabled | `boolean` | Y |
| readonly | `boolean` | Y |
| type | `string` | Y |
| size | `'xs'  \|  'sm'  \|  'md'  \|  'lg'` | Y |
| variant | `'primary'  \|  'success'  \|  'warning'  \|  'danger'  \|  'neutral'` | Y |

#### Emits

- `update:modelValue`
- `input`
- `change`
- `focus`
- `blur`

### BuigPagination

源文件: `src/components/pagination.vue`

#### Emits

- `update:page`
- `change`

### BuigPopover

源文件: `src/components/popover.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| content | `string` | Y |

#### Slots

- `default`
- `content`

### BuigProgress

源文件: `src/components/progress.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| value | `number  \|  string` | Y |

### BuigRadio

源文件: `src/components/radio.vue`

#### Emits

- `update:modelValue`
- `change`

#### Slots

- `default`

### BuigSelect

源文件: `src/components/select.vue`

#### Emits

- `update:modelValue`
- `change`

### BuigSkeleton

源文件: `src/components/skeleton.vue`

### BuigSlider

源文件: `src/components/slider.vue`

#### Emits

- `update:modelValue`
- `change`

### BuigSpinner

源文件: `src/components/spinner.vue`

### BuigSteps

源文件: `src/components/steps.vue`

### BuigSwitch

源文件: `src/components/switch.vue`

#### Emits

- `update:modelValue`
- `change`

### BuigTabs

源文件: `src/components/tabs.vue`

#### Emits

- `update:modelValue`
- `change`

#### Slots

- `default`

### BuigTag

源文件: `src/components/tag.vue`

#### Slots

- `default`

### BuigTextarea

源文件: `src/components/textarea.vue`

#### Emits

- `update:modelValue`
- `input`

### BuigToast

源文件: `src/components/toast.vue`

#### Emits

- `close`

#### Slots

- `default`

### BuigTooltip

源文件: `src/components/tooltip.vue`

#### Props

| 名称 | 类型 | 可选 |
|------|------|------|
| text | `string` | Y |

#### Slots

- `default`

