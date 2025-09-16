<template>
    <span class="yii-tag" :class="[`yii-tag--${$Prop.variant}`]">
        <slot />
    </span>
</template>

<script setup>
defineOptions({ name: 'YiiTag' });
const $Prop = defineProps({ variant: { type: String, default: 'default' } });
</script>

<style>
.yii-tag {
    display: inline-flex;
    padding: 0 8px;
    height: 22px;
    border-radius: 4px;
    font-size: 12px;
    align-items: center;
    border: 1px solid #d9d9d9;
    color: #444;
    background: #fff;
}
.yii-tag--primary {
    color: var(--ui-color-primary, #1677ff);
    border-color: currentColor;
}
.yii-tag--success {
    color: var(--ui-color-success, #52c41a);
    border-color: currentColor;
}
.yii-tag--warning {
    color: var(--ui-color-warning, #faad14);
    border-color: currentColor;
}
.yii-tag--danger {
    color: var(--ui-color-danger, #ff4d4f);
    border-color: currentColor;
}
</style>
