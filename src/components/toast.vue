<template>
    <div v-if="$Prop.visible" class="buig-toast" :class="[`buig-toast--${$Prop.type}`]">
        <span
            ><slot>{{ $Prop.message }}</slot></span
        >
        <button class="buig-toast__close" @click="$Emit('close')">×</button>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigToast' });
type ToastType = 'info' | 'success' | 'warning' | 'danger';
const $Prop = defineProps<{ visible?: boolean; type?: ToastType; message?: string }>();
const $Emit = defineEmits<{ (e: 'close'): void }>();
</script>

<style>
.buig-toast {
    position: fixed;
    right: 16px;
    top: 16px;
    padding: 10px 12px;
    background: var(--ui-color-bg, #fff);
    border-radius: 6px;
    border: 1px solid var(--ui-color-border-subtle, #e5e7eb);
    box-shadow: var(--ui-shadow-pop, 0 6px 20px rgba(0, 0, 0, 0.15));
    display: flex;
    gap: 8px;
    align-items: center;
    z-index: 1100;
}
.buig-toast--info {
    border-color: var(--ui-color-primary, #3b82f6);
}
.buig-toast--success {
    border-color: var(--ui-color-success, #16a34a);
}
.buig-toast--warning {
    border-color: var(--ui-color-warning, #f59e0b);
}
.buig-toast--danger {
    border-color: var(--ui-color-danger, #dc2626);
}
.buig-toast__close {
    border: none;
    background: transparent;
    cursor: pointer;
}
</style>
