<template>
    <span class="buig-tag" :class="[`buig-tag--variant-${variant}`, `buig-tag--size-${size}`]">
        <slot />
    </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigTag' });
type TagVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
const $Prop = defineProps<{ variant?: TagVariant; size?: 'xs' | 'sm' | 'md' | 'lg' }>();
const variant = $Prop.variant ?? 'neutral';
const size = $Prop.size ?? 'sm';
</script>

<style>
.buig-tag {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--ui-color-border);
    background: var(--ui-color-bg);
    color: var(--ui-color-text);
    border-radius: var(--ui-control-radius-sm);
    line-height: 1;
    font-weight: 500;
    gap: 4px;
}
/* size */
.buig-tag--size-xs {
    height: var(--ui-control-height-xs);
    font-size: var(--ui-control-font-size-xs);
    padding: 0 var(--ui-control-padding-x-xs);
    border-radius: var(--ui-control-radius-xs);
}
.buig-tag--size-sm {
    height: var(--ui-control-height-sm);
    font-size: var(--ui-control-font-size-sm);
    padding: 0 var(--ui-control-padding-x-sm);
    border-radius: var(--ui-control-radius-sm);
}
.buig-tag--size-md {
    height: var(--ui-control-height-md);
    font-size: var(--ui-control-font-size-md);
    padding: 0 var(--ui-control-padding-x-md);
    border-radius: var(--ui-control-radius-md);
}
.buig-tag--size-lg {
    height: var(--ui-control-height-lg);
    font-size: var(--ui-control-font-size-lg);
    padding: 0 var(--ui-control-padding-x-lg);
    border-radius: var(--ui-control-radius-lg);
}
/* variants (outline style using color emphasis) */
.buig-tag--variant-primary {
    color: var(--ui-color-primary);
    border-color: var(--ui-color-primary);
    background: color-mix(in srgb, var(--ui-color-primary) 8%, var(--ui-color-bg));
}
.buig-tag--variant-success {
    color: var(--ui-color-success);
    border-color: var(--ui-color-success);
    background: color-mix(in srgb, var(--ui-color-success) 10%, var(--ui-color-bg));
}
.buig-tag--variant-warning {
    color: var(--ui-color-warning);
    border-color: var(--ui-color-warning);
    background: color-mix(in srgb, var(--ui-color-warning) 12%, var(--ui-color-bg));
}
.buig-tag--variant-danger {
    color: var(--ui-color-danger);
    border-color: var(--ui-color-danger);
    background: color-mix(in srgb, var(--ui-color-danger) 10%, var(--ui-color-bg));
}
.buig-tag--variant-neutral {
    color: var(--ui-color-text);
    border-color: var(--ui-color-neutral-active);
    background: var(--ui-color-neutral);
}
</style>
