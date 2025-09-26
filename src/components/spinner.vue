<template>
    <span class="buig-spinner" :style="{ width: $Prop.size + 'px', height: $Prop.size + 'px', borderTopColor: $Prop.color }"></span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigSpinner' });
const $Prop = defineProps<{ size?: number; color?: string }>();
</script>

<style>
.buig-spinner {
    display: inline-block;
    border: 2px solid #eee;
    border-top-color: var(--ui-color-primary, #1677ff);
    border-radius: 50%;
    animation: buig-spin 1s linear infinite;
}
@keyframes buig-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
