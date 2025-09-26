<template>
    <div class="buig-alert" :class="[`buig-alert--${$Prop.type}`]">
        <span class="buig-alert__content"
            ><slot>{{ $Prop.message }}</slot></span
        >
        <button v-if="$Prop.closable" class="buig-alert__close" @click="$Emit('close')">×</button>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigAlert' });
const $Prop = defineProps<{ type?: 'info' | 'success' | 'warning' | 'danger'; message?: string; closable?: boolean }>();
const $Emit = defineEmits<{ (e: 'close'): void }>();
</script>

<style>
.buig-alert {
    padding: 8px 12px;
    border-radius: var(--ui-radius);
    background: #f6ffed;
    color: #333;
    border: 1px solid #d9f7be;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: var(--ui-font-size, 14px);
}
.buig-alert--info {
    background: #e6f4ff;
    border-color: #bae0ff;
}
.buig-alert--success {
    background: #f6ffed;
    border-color: #b7eb8f;
}
.buig-alert--warning {
    background: #fffbe6;
    border-color: #ffe58f;
}
.buig-alert--danger {
    background: #fff2f0;
    border-color: #ffccc7;
}
.buig-alert__close {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
}
</style>
