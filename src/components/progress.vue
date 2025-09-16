<template>
    <div class="yii-progress">
        <div class="yii-progress__bar" :style="{ width: Math.max(0, Math.min(100, Number($Prop.value))) + '%' }"></div>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiProgress' });
const $Prop = defineProps({ value: { type: [Number, String], default: 0 } });
</script>

<style>
.yii-progress {
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}
.yii-progress__bar {
    height: 100%;
    background: var(--ui-color-primary, #1677ff);
    transition: width 0.2s;
}
</style>
