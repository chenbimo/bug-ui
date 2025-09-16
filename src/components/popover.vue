<template>
    <span class="yii-popover">
        <span class="yii-popover__ref"><slot /></span>
        <span class="yii-popover__content"
            ><slot name="content">{{ $Prop.content }}</slot></span
        >
    </span>
</template>

<script setup>
defineOptions({ name: 'YiiPopover' });
const $Prop = defineProps({ content: { type: String, default: '' } });
</script>

<style>
.yii-popover {
    position: relative;
    display: inline-block;
}
.yii-popover__content {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 8px 10px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
    margin-top: 6px;
    z-index: 100;
}
.yii-popover:hover .yii-popover__content {
    opacity: 1;
}
</style>
