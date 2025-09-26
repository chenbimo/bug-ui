<template>
    <span class="buig-popover">
        <span class="buig-popover__ref"><slot /></span>
        <span class="buig-popover__content"
            ><slot name="content">{{ $Prop.content }}</slot></span
        >
    </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigPopover' });
const $Prop = defineProps<{ content?: string }>();
</script>

<style>
.buig-popover {
    position: relative;
    display: inline-block;
}
.buig-popover__content {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 8px 10px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
    margin-top: 6px;
    z-index: 100;
}
.buig-popover:hover .buig-popover__content {
    opacity: 1;
}
</style>
