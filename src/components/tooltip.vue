<template>
    <span class="yii-tooltip" :data-tip="$Prop.text"><slot /></span>
</template>

<script setup>
defineOptions({ name: 'YiiTooltip' });
const $Prop = defineProps({ text: { type: String, default: '' } });
</script>

<style>
.yii-tooltip {
    position: relative;
    display: inline-block;
}
.yii-tooltip::after {
    content: attr(data-tip);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
    margin-top: 6px;
}
.yii-tooltip:hover::after {
    opacity: 1;
}
</style>
