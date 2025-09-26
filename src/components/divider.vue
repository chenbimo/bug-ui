<template>
    <div class="buig-divider" :class="[`buig-divider--${$Prop.direction}`]">
        <span v-if="$slots.default && $Prop.direction === 'horizontal'" class="buig-divider__text"><slot /></span>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigDivider' });
type Direction = 'horizontal' | 'vertical';
const $Prop = defineProps<{ direction?: Direction }>();
</script>

<style>
.buig-divider {
    margin: 12px 0;
    position: relative;
}
.buig-divider--horizontal {
    height: 1px;
    background: var(--ui-color-border-subtle, #e5e7eb);
}
.buig-divider--horizontal .buig-divider__text {
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    background: var(--ui-color-bg, #fff);
    padding: 0 8px;
    font-size: 12px;
    color: #999;
}
.buig-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    background: var(--ui-color-border-subtle, #e5e7eb);
    margin: 0 8px;
}
</style>
