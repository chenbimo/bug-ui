<template>
    <div v-if="$Prop.modelValue" class="buig-dialog">
        <div class="buig-dialog__mask" @click="$Method.close"></div>
        <div class="buig-dialog__box">
            <div class="buig-dialog__header">
                <slot name="header">{{ $Prop.title }}</slot>
                <button class="buig-dialog__close" @click="$Method.close">×</button>
            </div>
            <div class="buig-dialog__body"><slot /></div>
            <div v-if="$slots.footer" class="buig-dialog__footer"><slot name="footer" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigDialog' });
const $Prop = defineProps<{ modelValue?: boolean; title?: string }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'close'): void }>();
const $Method = {
    close() {
        $Emit('update:modelValue', false);
        $Emit('close');
    }
};
</script>

<style>
.buig-dialog {
    position: fixed;
    inset: 0;
    z-index: 1000;
}
.buig-dialog__mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
}
.buig-dialog__box {
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
.buig-dialog__header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.buig-dialog__body {
    padding: 16px;
}
.buig-dialog__footer {
    padding: 12px 16px;
    border-top: 1px solid #eee;
    text-align: right;
}
.buig-dialog__close {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}
</style>
