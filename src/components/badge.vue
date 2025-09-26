<template>
    <span class="buig-badge" :class="[`buig-badge--${$Prop.variant}`]">
        <slot />
        <template v-if="$Prop.value !== undefined">{{ $Prop.value }}</template>
    </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigBadge' });
const $Prop = defineProps<{ value?: string | number; variant?: 'primary' | 'success' | 'warning' | 'danger' }>();
</script>

<style>
.buig-badge {
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    height: 18px;
    border-radius: 9px;
    font-size: 12px;
    line-height: 18px;
    background: var(--ui-color-primary, #1677ff);
    color: #fff;
}
.buig-badge--success {
    background: var(--ui-color-success, #52c41a);
}
.buig-badge--warning {
    background: var(--ui-color-warning, #faad14);
}
.buig-badge--danger {
    background: var(--ui-color-danger, #ff4d4f);
}
</style>
