<template>
    <div v-if="$Prop.modelValue" class="buig-drawer">
        <div class="buig-drawer__mask" @click="$Method.close"></div>
        <div class="buig-drawer__panel" :class="[`buig-drawer__panel--${$Prop.placement}`]">
            <div class="buig-drawer__header">
                <slot name="header">{{ $Prop.title }}</slot>
                <button class="buig-drawer__close" @click="$Method.close">×</button>
            </div>
            <div class="buig-drawer__body"><slot /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigDrawer' });
type Placement = 'right' | 'left';
const $Prop = defineProps<{ modelValue?: boolean; title?: string; placement?: Placement }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'close'): void }>();
const $Method = {
    close() {
        $Emit('update:modelValue', false);
        $Emit('close');
    }
};
</script>

<style>
.buig-drawer {
    position: fixed;
    inset: 0;
    z-index: 1000;
}
.buig-drawer__mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
}
.buig-drawer__panel {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 360px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.buig-drawer__panel--right {
    right: 0;
}
.buig-drawer__panel--left {
    left: 0;
}
.buig-drawer__header {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.buig-drawer__body {
    padding: 16px;
    overflow: auto;
    height: 100%;
}
.buig-drawer__close {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
}
</style>
