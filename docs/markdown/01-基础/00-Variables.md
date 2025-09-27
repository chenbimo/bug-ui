# 变量参考

总计 170 个变量（不含 dark.scss 覆盖层）。

> 分层文件：foundation.scss（基础原子）、semantic.scss（语义映射）、component.scss（组件级）。dark.scss 为主题覆盖层，core.scss 为明亮聚合入口，all.scss 包含 core + dark。

### foundation.scss

| 变量名 | 值 |
| ------ | --- |
| `--ui-palette-neutral-1` | `#ffffff` |
| `--ui-palette-neutral-2` | `#f7f9fa` |
| `--ui-palette-neutral-3` | `#f2f4f6` |
| `--ui-palette-neutral-4` | `#e5e7eb` |
| `--ui-palette-neutral-5` | `#d1d5db` |
| `--ui-palette-neutral-6` | `#9ca3af` |
| `--ui-palette-neutral-7` | `#6b7280` |
| `--ui-palette-neutral-8` | `#4b5563` |
| `--ui-palette-neutral-9` | `#374151` |
| `--ui-palette-neutral-10` | `#111827` |
| `--ui-palette-primary-1` | `#eff6ff` |
| `--ui-palette-primary-2` | `#dbeafe` |
| `--ui-palette-primary-3` | `#bfdbfe` |
| `--ui-palette-primary-4` | `#93c5fd` |
| `--ui-palette-primary-5` | `#60a5fa` |
| `--ui-palette-primary-6` | `#3b82f6` |
| `--ui-palette-primary-7` | `#2563eb` |
| `--ui-palette-primary-8` | `#1d4ed8` |
| `--ui-palette-primary-9` | `#1e40af` |
| `--ui-palette-primary-10` | `#1e3a8a` |
| `--ui-palette-success-5` | `#16a34a` |
| `--ui-palette-success-6` | `#15803d` |
| `--ui-palette-success-7` | `#166534` |
| `--ui-palette-warning-5` | `#f59e0b` |
| `--ui-palette-warning-6` | `#d97706` |
| `--ui-palette-warning-7` | `#b45309` |
| `--ui-palette-danger-5` | `#dc2626` |
| `--ui-palette-danger-6` | `#b91c1c` |
| `--ui-palette-danger-7` | `#991b1b` |
| `--ui-palette-info-5` | `#0ea5e9` |
| `--ui-palette-info-6` | `#0284c7` |
| `--ui-palette-info-7` | `#0369a1` |
| `--ui-radius-sm` | `4px` |
| `--ui-radius-md` | `6px` |
| `--ui-radius-lg` | `8px` |
| `--ui-radius-xl` | `12px` |
| `--ui-font-size-xs` | `12px` |
| `--ui-font-size-sm` | `13px` |
| `--ui-font-size-md` | `14px` |
| `--ui-font-size-lg` | `16px` |
| `--ui-line-height` | `1.4` |
| `--ui-spacing-1` | `2px` |
| `--ui-spacing-2` | `4px` |
| `--ui-spacing-3` | `6px` |
| `--ui-spacing-4` | `8px` |
| `--ui-spacing-5` | `10px` |
| `--ui-spacing-6` | `12px` |
| `--ui-spacing-7` | `14px` |
| `--ui-spacing-8` | `16px` |
| `--ui-spacing-9` | `20px` |
| `--ui-spacing-10` | `24px` |
| `--ui-shadow-pop` | `0 6px 20px rgba(0, 0, 0, 0.15)` |
| `--ui-shadow-overlay` | `0 10px 30px rgba(0, 0, 0, 0.2)` |
| `--ui-motion-fast` | `80ms` |
| `--ui-motion-base` | `160ms` |
| `--ui-motion-slow` | `240ms` |
| `--ui-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ui-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ui-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ui-z-base` | `0` |
| `--ui-z-dropdown` | `1000` |
| `--ui-z-sticky` | `1100` |
| `--ui-z-fixed` | `1200` |
| `--ui-z-popup` | `1300` |
| `--ui-z-modal` | `1400` |
| `--ui-z-toast` | `1500` |

### semantic.scss

| 变量名 | 值 |
| ------ | --- |
| `--ui-color-bg` | `var(--ui-palette-neutral-1)` |
| `--ui-color-bg-subtle` | `var(--ui-palette-neutral-2)` |
| `--ui-color-bg-muted` | `var(--ui-palette-neutral-3)` |
| `--ui-color-border` | `var(--ui-palette-neutral-4)` |
| `--ui-color-border-subtle` | `var(--ui-palette-neutral-3)` |
| `--ui-color-text` | `var(--ui-palette-neutral-9)` |
| `--ui-color-text-secondary` | `var(--ui-palette-neutral-7)` |
| `--ui-color-primary` | `var(--ui-palette-primary-6)` |
| `--ui-color-primary-hover` | `var(--ui-palette-primary-7)` |
| `--ui-color-primary-active` | `var(--ui-palette-primary-8)` |
| `--ui-color-primary-disabled` | `var(--ui-palette-primary-3)` |
| `--ui-color-primary-foreground` | `#ffffff` |
| `--ui-color-success` | `var(--ui-palette-success-5)` |
| `--ui-color-success-hover` | `var(--ui-palette-success-6)` |
| `--ui-color-success-active` | `var(--ui-palette-success-7)` |
| `--ui-color-success-foreground` | `#ffffff` |
| `--ui-color-warning` | `var(--ui-palette-warning-5)` |
| `--ui-color-warning-hover` | `var(--ui-palette-warning-6)` |
| `--ui-color-warning-active` | `var(--ui-palette-warning-7)` |
| `--ui-color-warning-foreground` | `#ffffff` |
| `--ui-color-danger` | `var(--ui-palette-danger-5)` |
| `--ui-color-danger-hover` | `var(--ui-palette-danger-6)` |
| `--ui-color-danger-active` | `var(--ui-palette-danger-7)` |
| `--ui-color-danger-foreground` | `#ffffff` |
| `--ui-color-neutral` | `var(--ui-palette-neutral-3)` |
| `--ui-color-neutral-hover` | `var(--ui-palette-neutral-4)` |
| `--ui-color-neutral-active` | `var(--ui-palette-neutral-5)` |
| `--ui-color-neutral-foreground` | `var(--ui-palette-neutral-8)` |
| `--ui-control-font-size-xs` | `var(--ui-font-size-xs)` |
| `--ui-control-font-size-sm` | `13px` |
| `--ui-control-font-size-md` | `var(--ui-font-size-md)` |
| `--ui-control-font-size-lg` | `15px` |
| `--ui-control-height-xs` | `24px` |
| `--ui-control-height-sm` | `28px` |
| `--ui-control-height-md` | `34px` |
| `--ui-control-height-lg` | `40px` |
| `--ui-control-padding-x-xs` | `8px` |
| `--ui-control-padding-x-sm` | `10px` |
| `--ui-control-padding-x-md` | `14px` |
| `--ui-control-padding-x-lg` | `16px` |
| `--ui-control-padding-y-xs` | `4px` |
| `--ui-control-padding-y-sm` | `6px` |
| `--ui-control-padding-y-md` | `8px` |
| `--ui-control-padding-y-lg` | `10px` |
| `--ui-control-radius-xs` | `6px` |
| `--ui-control-radius-sm` | `6px` |
| `--ui-control-radius-md` | `8px` |
| `--ui-control-radius-lg` | `10px` |

### component.scss

| 变量名 | 值 |
| ------ | --- |
| `--ui-button-height-md` | `var(--ui-control-height-md)` |
| `--ui-button-padding-x-md` | `var(--ui-control-padding-x-md)` |
| `--ui-button-radius` | `var(--ui-control-radius-md)` |
| `--ui-button-font-size` | `var(--ui-control-font-size-md)` |
| `--ui-button-bg` | `var(--ui-color-primary)` |
| `--ui-button-bg-hover` | `var(--ui-color-primary-hover)` |
| `--ui-button-bg-active` | `var(--ui-color-primary-active)` |
| `--ui-button-bg-disabled` | `var(--ui-color-primary-disabled)` |
| `--ui-button-fg` | `var(--ui-color-primary-foreground)` |
| `--ui-button-shadow-focus` | `0 0 0 3px rgba(59, 130, 246, 0.35)` |
| `--ui-input-height-md` | `var(--ui-control-height-md)` |
| `--ui-input-padding-x-md` | `var(--ui-control-padding-x-md)` |
| `--ui-input-radius` | `var(--ui-control-radius-md)` |
| `--ui-input-font-size` | `var(--ui-control-font-size-md)` |
| `--ui-input-bg` | `var(--ui-color-bg)` |
| `--ui-input-border` | `var(--ui-color-border)` |
| `--ui-input-border-hover` | `var(--ui-color-primary-hover)` |
| `--ui-input-border-focus` | `var(--ui-color-primary)` |
| `--ui-input-fg` | `var(--ui-color-text)` |
| `--ui-input-placeholder` | `var(--ui-color-text-secondary)` |
| `--ui-input-shadow-focus` | `0 0 0 2px rgba(59, 130, 246, 0.25)` |
| `--ui-card-bg` | `var(--ui-color-bg)` |
| `--ui-card-border` | `var(--ui-color-border-subtle)` |
| `--ui-card-radius` | `var(--ui-radius-lg, 8px)` |
| `--ui-card-padding-x` | `var(--ui-spacing-8)` |
| `--ui-card-padding-y` | `var(--ui-spacing-7)` |
| `--ui-card-shadow` | `var(--ui-shadow-pop)` |
| `--ui-select-height-md` | `var(--ui-control-height-md)` |
| `--ui-select-radius` | `var(--ui-control-radius-md)` |
| `--ui-select-font-size` | `var(--ui-control-font-size-md)` |
| `--ui-select-bg` | `var(--ui-color-bg)` |
| `--ui-select-border` | `var(--ui-color-border)` |
| `--ui-select-border-hover` | `var(--ui-color-primary-hover)` |
| `--ui-select-border-focus` | `var(--ui-color-primary)` |
| `--ui-select-dropdown-bg` | `var(--ui-color-bg)` |
| `--ui-select-dropdown-border` | `var(--ui-color-border-subtle)` |
| `--ui-select-option-hover-bg` | `var(--ui-color-neutral-hover)` |
| `--ui-select-option-active-bg` | `var(--ui-color-primary)` |
| `--ui-select-option-active-fg` | `var(--ui-color-primary-foreground)` |
| `--ui-tag-radius` | `var(--ui-radius-sm)` |
| `--ui-tag-font-size` | `var(--ui-font-size-sm)` |
| `--ui-tag-padding-x` | `var(--ui-spacing-4)` |
| `--ui-tag-padding-y` | `var(--ui-spacing-2)` |
| `--ui-tag-bg` | `var(--ui-color-neutral)` |
| `--ui-tag-bg-hover` | `var(--ui-color-neutral-hover)` |
| `--ui-tag-fg` | `var(--ui-color-neutral-foreground)` |
| `--ui-tag-border` | `var(--ui-color-border-subtle)` |
| `--ui-alert-radius` | `var(--ui-radius-md)` |
| `--ui-alert-padding-x` | `var(--ui-spacing-8)` |
| `--ui-alert-padding-y` | `var(--ui-spacing-6)` |
| `--ui-alert-bg-info` | `var(--ui-color-info, var(--ui-color-primary))` |
| `--ui-alert-bg-success` | `var(--ui-color-success)` |
| `--ui-alert-bg-warning` | `var(--ui-color-warning)` |
| `--ui-alert-bg-danger` | `var(--ui-color-danger)` |
| `--ui-alert-fg` | `#fff` |
| `--ui-alert-shadow` | `var(--ui-shadow-pop)` |

> 本文件由脚本 scripts/genVariables.ts 生成，如需新增变量请修改对应样式文件后重新运行脚本。