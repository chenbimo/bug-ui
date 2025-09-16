<template>
    <button class="yii-button" :class="[`yii-button--${variant}`, disabled && 'yii-button--disabled', loading && 'yii-button--loading']" :disabled="disabled || loading" @click="$MethodOnClick">
        <span class="yii-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup>
// 内部变量/方法命名前缀规范：$Data / $Method / $Computed / $Ref
import { computed } from 'vue';

defineOptions({ name: 'YiiButton' });

const props = defineProps({
    variant: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
});
const emit = defineEmits(['onClick']);

const $DataProps = props;
const $ComputedIsInteractive = computed(() => !$DataProps.disabled && !$DataProps.loading);
const $MethodOnClick = (e) => {
    if (!$ComputedIsInteractive.value) return;
    emit('onClick', e);
};
</script>

<style>
:root {
    --ui-color-primary: #3b82f6;
    --ui-color-primary-foreground: #ffffff;
    --ui-radius: 8px;
    --ui-padding-y: 0.5rem;
    --ui-padding-x: 0.875rem;
}

.yii-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid transparent;
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    background: var(--ui-color-primary);
    color: var(--ui-color-primary-foreground);
}
.yii-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.yii-button--loading {
    opacity: 0.85;
}
</style>
