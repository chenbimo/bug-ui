<template>
    <div v-if="$Prop.visible" class="yii-toast" :class="[`yii-toast--${$Prop.type}`]">
        <span
            ><slot>{{ $Prop.message }}</slot></span
        >
        <button class="yii-toast__close" @click="$Emit('onClose')">×</button>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiToast' });
const $Prop = defineProps({ visible: { type: Boolean, default: false }, type: { type: String, default: 'info' }, message: { type: String, default: '' } });
const $Emit = defineEmits(['onClose']);
</script>

<style>
.yii-toast {
    position: fixed;
    right: 16px;
    top: 16px;
    padding: 10px 12px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    gap: 8px;
    align-items: center;
    z-index: 1100;
}
.yii-toast--info {
    border-color: #bae0ff;
}
.yii-toast--success {
    border-color: #b7eb8f;
}
.yii-toast--warning {
    border-color: #ffe58f;
}
.yii-toast--danger {
    border-color: #ffccc7;
}
.yii-toast__close {
    border: none;
    background: transparent;
    cursor: pointer;
}
</style>
