<template>
    <div class="buig-progress">
        <div class="buig-progress__bar" :style="{ width: Math.max(0, Math.min(100, Number($Prop.value ?? 0))) + '%' }"></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigProgress' });
const $Prop = defineProps<{ value?: number | string }>();
</script>

<style>
.buig-progress {
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}
.buig-progress__bar {
    height: 100%;
    background: var(--ui-color-primary, #1677ff);
    transition: width 0.2s;
}
</style>
