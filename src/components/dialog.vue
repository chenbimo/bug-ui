<template>
    <div v-if="$Prop.modelValue" class="yii-dialog">
        <div class="yii-dialog__mask" @click="$Method.close"></div>
        <div class="yii-dialog__box">
            <div class="yii-dialog__header">
                <slot name="header">{{ $Prop.title }}</slot>
                <button class="yii-dialog__close" @click="$Method.close">×</button>
            </div>
            <div class="yii-dialog__body"><slot /></div>
            <div v-if="$slots.footer" class="yii-dialog__footer"><slot name="footer" /></div>
        </div>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiDialog' });
const $Prop = defineProps({ modelValue: { type: Boolean, default: false }, title: { type: String, default: '' } });
const $Emit = defineEmits(['update:modelValue', 'onClose']);
const $Method = {
    close() {
        $Emit('update:modelValue', false);
        $Emit('onClose');
    }
};
</script>

<style>
.yii-dialog {
    position: fixed;
    inset: 0;
    z-index: 1000;
}
.yii-dialog__mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
}
.yii-dialog__box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 8px;
    width: 480px;
    max-width: 90vw;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.yii-dialog__header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.yii-dialog__body {
    padding: 16px;
}
.yii-dialog__footer {
    padding: 12px 16px;
    border-top: 1px solid #eee;
    text-align: right;
}
.yii-dialog__close {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}
</style>
