<template>
    <div class="yii-alert" :class="[`yii-alert--${$Prop.type}`]">
        <span class="yii-alert__content"
            ><slot>{{ $Prop.message }}</slot></span
        >
        <button v-if="$Prop.closable" class="yii-alert__close" @click="$Emit('onClose')">×</button>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiAlert' });
const $Prop = defineProps({ type: { type: String, default: 'info' }, message: { type: String, default: '' }, closable: { type: Boolean, default: false } });
const $Emit = defineEmits(['onClose']);
</script>

<style>
.yii-alert {
    padding: 8px 12px;
    border-radius: 6px;
    background: #f6ffed;
    color: #333;
    border: 1px solid #d9f7be;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}
.yii-alert--info {
    background: #e6f4ff;
    border-color: #bae0ff;
}
.yii-alert--success {
    background: #f6ffed;
    border-color: #b7eb8f;
}
.yii-alert--warning {
    background: #fffbe6;
    border-color: #ffe58f;
}
.yii-alert--danger {
    background: #fff2f0;
    border-color: #ffccc7;
}
.yii-alert__close {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
}
</style>
