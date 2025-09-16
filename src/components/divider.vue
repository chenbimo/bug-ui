<template>
    <div class="yii-divider" :class="[`yii-divider--${$Prop.direction}`]">
        <span v-if="$slots.default && $Prop.direction === 'horizontal'" class="yii-divider__text"><slot /></span>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiDivider' });
const $Prop = defineProps({ direction: { type: String, default: 'horizontal' } });
</script>

<style>
.yii-divider {
    margin: 12px 0;
    position: relative;
}
.yii-divider--horizontal {
    height: 1px;
    background: #e5e7eb;
}
.yii-divider--horizontal .yii-divider__text {
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    color: #999;
}
.yii-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    background: #e5e7eb;
    margin: 0 8px;
}
</style>
