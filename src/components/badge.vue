<template>
    <span class="yii-badge" :class="[`yii-badge--${$Prop.variant}`]">
        <slot />
        <template v-if="$Prop.value !== undefined">{{ $Prop.value }}</template>
    </span>
</template>

<script setup>
defineOptions({ name: 'YiiBadge' });
const $Prop = defineProps({ value: { type: [String, Number], default: undefined }, variant: { type: String, default: 'primary' } });
</script>

<style>
.yii-badge {
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    height: 18px;
    border-radius: 9px;
    font-size: 12px;
    line-height: 18px;
    background: var(--ui-color-primary, #1677ff);
    color: #fff;
}
.yii-badge--success {
    background: var(--ui-color-success, #52c41a);
}
.yii-badge--warning {
    background: var(--ui-color-warning, #faad14);
}
.yii-badge--danger {
    background: var(--ui-color-danger, #ff4d4f);
}
</style>
