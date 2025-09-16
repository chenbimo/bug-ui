<template>
    <div class="yii-skeleton" :class="[$Prop.animated && 'yii-skeleton--animated']" :style="{ width: $Prop.width, height: $Prop.height }"></div>
</template>

<script setup>
defineOptions({ name: 'YiiSkeleton' });
const $Prop = defineProps({ width: { type: String, default: '100%' }, height: { type: String, default: '16px' }, animated: { type: Boolean, default: true } });
</script>

<style>
.yii-skeleton {
    background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200% 100%;
    border-radius: 4px;
}
.yii-skeleton--animated {
    animation: yii-skeleton 1.2s infinite;
}
@keyframes yii-skeleton {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
