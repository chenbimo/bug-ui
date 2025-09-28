<template>
    <!-- 链接模式 -->
    <a v-if="$Computed.isLink.value" :href="$Computed.isInteractive.value ? $Prop.href : undefined" class="buig-button" :class="$Computed.classList.value" :aria-disabled="(!$Computed.isInteractive.value).toString()" @click="$Method.onClick">
        <span v-if="$Computed.showIconWrapper.value" class="buig-button__icon">
            <span v-if="$Prop.loading" class="buig-button__spinner" />
            <slot v-else name="icon" />
        </span>
        <slot />
    </a>
    <!-- 按钮模式 -->
    <button v-else class="buig-button" :class="$Computed.classList.value" :type="$Prop.htmlType || 'button'" :autofocus="$Prop.autofocus" :disabled="!$Computed.isInteractive.value" @click="$Method.onClick">
        <span v-if="$Computed.showIconWrapper.value" class="buig-button__icon">
            <span v-if="$Prop.loading" class="buig-button__spinner" />
            <slot v-else name="icon" />
        </span>
        <slot />
    </button>
</template>

<script setup lang="ts">
// 外部集
import { computed, inject, useSlots } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonSlots, ButtonExpose } from './interface';
import { buttonGroupInjectionKey } from './interface';

defineOptions({ name: 'BuigButton' });

// 属性集
const $Prop = defineProps<ButtonProps>();
// 事件集
const $Emit = defineEmits<ButtonEmits>();
// 插槽类型（仅提示作用）
defineSlots<ButtonSlots>();

// 注入 Group 上下文
const $Group = inject<any>(buttonGroupInjectionKey, null);
// 缓存插槽引用
const $Slots = useSlots();

// 计算集
const $Computed = {
    mergedType: computed(() => $Prop.type ?? $Group?.type ?? 'secondary'),
    mergedStatus: computed(() => $Prop.status ?? $Group?.status ?? 'normal'),
    mergedSize: computed(() => $Prop.size ?? $Group?.size ?? 'medium'),
    mergedShape: computed(() => $Prop.shape ?? $Group?.shape ?? 'square'),
    mergedDisabled: computed(() => !!($Prop.disabled || $Group?.disabled || false)),
    isLink: computed(() => !!$Prop.href),
    isInteractive: computed(() => !$Prop.loading && !$Computed.mergedDisabled.value),
    onlyIcon: computed(() => !!($Slots.icon && !$Slots.default)),
    showIconWrapper: computed(() => !!$Prop.loading || !!$Slots.icon),
    classList: computed(() => {
        return [
            `buig-button--type-${$Computed.mergedType.value}`,
            `buig-button--status-${$Computed.mergedStatus.value}`,
            `buig-button--size-${$Computed.mergedSize.value}`,
            `buig-button--shape-${$Computed.mergedShape.value}`,
            {
                'buig-button--long': !!$Prop.long,
                'buig-button--loading': !!$Prop.loading,
                'buig-button--disabled': $Computed.mergedDisabled.value,
                'buig-button--only-icon': $Computed.onlyIcon.value,
                'buig-button--link': !!$Prop.href,
                'buig-button--dashed': $Computed.mergedType.value === 'dashed'
            }
        ];
    })
};

// 方法集
const $Method = {
    onClick(ev: MouseEvent) {
        if (!$Computed.isInteractive.value) {
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }
        $Emit('click', ev);
    }
};

// 暴露
defineExpose<ButtonExpose>({});
</script>
<style lang="scss" scoped>
// 临时样式：完整方案将在 index.scss 中抽离；此处保留必要结构，避免构建失败。
.buig-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: var(--buig-button-radius, 6px);
    padding: 0 var(--buig-control-padding-x-md, 14px);
    min-height: var(--buig-control-height-md, 34px);
    font-size: var(--buig-control-font-size-md, 14px);
    background: var(--buig-color-neutral, #eceff3);
    color: var(--buig-color-text, #222);
    transition:
        background 0.15s,
        color 0.15s,
        border-color 0.15s,
        box-shadow 0.15s;
    text-decoration: none;

    &--type-primary {
        background: var(--buig-color-primary);
        color: var(--buig-color-primary-foreground);
    }
    &--type-secondary {
        background: var(--buig-color-bg);
        border-color: var(--buig-color-border);
    }
    &--type-outline {
        background: transparent;
        border-color: var(--buig-color-primary);
        color: var(--buig-color-primary);
    }
    &--type-text {
        background: transparent;
        color: var(--buig-color-primary);
    }
    &--type-dashed {
        background: transparent;
        border-style: dashed;
        border-color: var(--buig-color-border);
    }

    &--status-warning {
        --_status-bg: var(--buig-color-warning);
    }
    &--status-success {
        --_status-bg: var(--buig-color-success);
    }
    &--status-danger {
        --_status-bg: var(--buig-color-danger);
    }
    &--status-warning.buig-button--type-primary,
    &--status-success.buig-button--type-primary,
    &--status-danger.buig-button--type-primary {
        background: var(--_status-bg);
    }

    &--long {
        width: 100%;
    }
    &--disabled,
    &[disabled],
    &[aria-disabled='true'] {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &--loading {
        cursor: progress;
    }
    &--only-icon {
        padding-inline: 0;
        width: var(--buig-control-height-md, 34px);
    }
    &--shape-circle {
        border-radius: 50%;
        padding-inline: 0;
        width: var(--buig-control-height-md, 34px);
    }
    &--shape-round {
        border-radius: calc(var(--buig-button-radius, 6px) * 2);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--buig-button-shadow-focus, 0 0 0 3px rgba(59, 130, 246, 0.35));
    }

    .buig-button__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .buig-button__spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: buig-btn-spin 0.6s linear infinite;
    }

    /* 尺寸修饰符（合并自原 index.scss） */
    &--size-mini {
        min-height: var(--buig-control-height-xs);
        font-size: var(--buig-control-font-size-xs);
        padding: 0 var(--buig-control-padding-x-xs);
    }
    &--size-small {
        min-height: var(--buig-control-height-sm);
        font-size: var(--buig-control-font-size-sm);
        padding: 0 var(--buig-control-padding-x-sm);
    }
    &--size-large {
        min-height: var(--buig-control-height-lg);
        font-size: var(--buig-control-font-size-lg);
        padding: 0 var(--buig-control-padding-x-lg);
    }
}

/* group 占位（从 index.scss 合并） */
.buig-button-group {
    --_btn-group-placeholder: 0;
}

@keyframes buig-btn-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
