<template>
    <div v-if="$Prop.modelValue" class="yii-drawer">
        <div class="yii-drawer__mask" @click="$Method.close"></div>
        <div class="yii-drawer__panel" :class="[`yii-drawer__panel--${$Prop.placement}`]">
            <div class="yii-drawer__header">
                <slot name="header">{{ $Prop.title }}</slot>
                <button class="yii-drawer__close" @click="$Method.close">×</button>
            </div>
            <div class="yii-drawer__body"><slot /></div>
        </div>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiDrawer' });
const $Prop = defineProps({ modelValue: { type: Boolean, default: false }, title: { type: String, default: '' }, placement: { type: String, default: 'right' } });
const $Emit = defineEmits(['update:modelValue', 'onClose']);
const $Method = {
    close() {
        $Emit('update:modelValue', false);
        $Emit('onClose');
    }
};
</script>

<style>
.yii-drawer {
    position: fixed;
    inset: 0;
    z-index: 1000;
}
.yii-drawer__mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
}
.yii-drawer__panel {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 360px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.yii-drawer__panel--right {
    right: 0;
}
.yii-drawer__panel--left {
    left: 0;
}
.yii-drawer__header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.yii-drawer__body {
    padding: 16px;
    overflow: auto;
    height: 100%;
}
.yii-drawer__close {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}
</style>
