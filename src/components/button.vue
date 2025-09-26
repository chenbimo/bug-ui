<template>
    <button class="buig-button" :class="[`buig-button--variant-${variant}`, `buig-button--size-${size}`, disabled && 'buig-button--disabled', loading && 'buig-button--loading']" :type="type" :disabled="disabled || loading" @click="$Method.onClick">
        <span class="buig-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
// 外部集
import { reactive, computed } from 'vue';

// 组件名
defineOptions({ name: 'BuigButton' });

// 内部常量
const $Const = { DEFAULT_VARIANT: 'primary' as const, DEFAULT_SIZE: 'md' as const };

// 属性集
const $Prop = defineProps<{
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}>();

// 默认值合并（保持简单：利用计算而非修改 props）
const variant = $Prop.variant ?? $Const.DEFAULT_VARIANT;
const size = $Prop.size ?? $Const.DEFAULT_SIZE;
const disabled = $Prop.disabled ?? false;
const loading = $Prop.loading ?? false;
const type = $Prop.type ?? 'button';

// 事件集（内部名称使用原生语义 click，对外用户写 @onClick）
const $Emit = defineEmits<{
    (e: 'click', ev: MouseEvent): void;
}>();

// 数据集
const $Data = reactive({});

// 计算集
const $Computed = {
    interactive: computed(() => !disabled && !loading)
};

// 方法集
const $Method = {
    onClick(e: MouseEvent) {
        if (!$Computed.interactive.value) return;
        $Emit('click', e);
    }
};

// 暴露（若后续需要 focus 等方法，可添加）
// defineExpose({ focus: $Method.focus })
</script>

<style>
/* 使用全局 tokens；后续将添加 hover/active 变量 */
.buig-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid transparent;
    border-radius: var(--ui-radius);
    padding: var(--ui-control-padding-y-md) var(--ui-control-padding-x-md);
    font-size: var(--ui-control-font-size-md);
    line-height: 1.2;
    cursor: pointer;
    background: var(--ui-color-primary);
    color: var(--ui-color-primary-foreground);
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
/* Variant base (primary default) */
.buig-button--variant-primary {
    background: var(--ui-color-primary);
    color: var(--ui-color-primary-foreground);
}
.buig-button--variant-primary:hover:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-primary-hover);
}
.buig-button--variant-primary:active:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-primary-active);
}

.buig-button--variant-success {
    background: var(--ui-color-success);
    color: var(--ui-color-success-foreground);
}
.buig-button--variant-success:hover:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-success-hover);
}
.buig-button--variant-success:active:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-success-active);
}

.buig-button--variant-warning {
    background: var(--ui-color-warning);
    color: var(--ui-color-warning-foreground);
}
.buig-button--variant-warning:hover:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-warning-hover);
}
.buig-button--variant-warning:active:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-warning-active);
}

.buig-button--variant-danger {
    background: var(--ui-color-danger);
    color: var(--ui-color-danger-foreground);
}
.buig-button--variant-danger:hover:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-danger-hover);
}
.buig-button--variant-danger:active:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-danger-active);
}

.buig-button--variant-neutral {
    background: var(--ui-color-neutral);
    color: var(--ui-color-neutral-foreground);
}
.buig-button--variant-neutral:hover:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-neutral-hover);
}
.buig-button--variant-neutral:active:not(.buig-button--disabled):not(.buig-button--loading) {
    background: var(--ui-color-neutral-active);
}

/* Size modifiers */
.buig-button--size-xs {
    height: var(--ui-control-height-xs);
    font-size: var(--ui-control-font-size-xs);
    padding: var(--ui-control-padding-y-xs) var(--ui-control-padding-x-xs);
    border-radius: var(--ui-control-radius-xs);
}
.buig-button--size-sm {
    height: var(--ui-control-height-sm);
    font-size: var(--ui-control-font-size-sm);
    padding: var(--ui-control-padding-y-sm) var(--ui-control-padding-x-sm);
    border-radius: var(--ui-control-radius-sm);
}
.buig-button--size-md {
    height: var(--ui-control-height-md);
    font-size: var(--ui-control-font-size-md);
    padding: var(--ui-control-padding-y-md) var(--ui-control-padding-x-md);
    border-radius: var(--ui-control-radius-md);
}
.buig-button--size-lg {
    height: var(--ui-control-height-lg);
    font-size: var(--ui-control-font-size-lg);
    padding: var(--ui-control-padding-y-lg) var(--ui-control-padding-x-lg);
    border-radius: var(--ui-control-radius-lg);
}
.buig-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.buig-button--loading {
    opacity: 0.85;
}
</style>
