<template>
    <span class="yii-spinner" :style="{ width: $Prop.size + 'px', height: $Prop.size + 'px', borderTopColor: $Prop.color }"></span>
</template>

<script setup>
defineOptions({ name: 'YiiSpinner' });
const $Prop = defineProps({ size: { type: Number, default: 20 }, color: { type: String, default: 'var(--ui-color-primary, #1677ff)' } });
</script>

<style>
.yii-spinner {
    display: inline-block;
    border: 2px solid #eee;
    border-top-color: #1677ff;
    border-radius: 50%;
    animation: yii-spin 1s linear infinite;
}
@keyframes yii-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
