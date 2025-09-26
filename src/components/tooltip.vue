<template>
    <span class="buig-tooltip" :data-tip="$Prop.text"><slot /></span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigTooltip' });
const $Prop = defineProps<{ text?: string }>();
</script>

<style>
.buig-tooltip {
    position: relative;
    display: inline-block;
}
.buig-tooltip::after {
    content: attr(data-tip);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--ui-color-text, #333);
    color: var(--ui-color-primary-foreground, #fff);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
    margin-top: 6px;
}
.buig-tooltip:hover::after {
    opacity: 1;
}
</style>
