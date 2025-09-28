<template>
    <div class="buig-button" :class="`buig-button--${$Computed.type.value}`" @click="$Emit('click', $event)" role="button" tabindex="0">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './interface';

defineOptions({ name: 'BuigButton' });

// 属性集
const $Prop = defineProps<ButtonProps>();
// 事件集
const $Emit = defineEmits<ButtonEmits>();

// 计算集
const $Computed = {
    type: computed(() => $Prop.type || 'secondary')
};
</script>
<style lang="scss" scoped>
.buig-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
    min-height: 32px;
    font-size: 14px;
    line-height: 1;
    border-radius: var(--buig-radius-sm, 4px);
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
    transition:
        background 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease,
        opacity 0.15s ease;
    background: var(--buig-color-bg-elevated, #fff);
    color: var(--buig-color-text, #222);

    &--primary {
        background: var(--buig-color-primary, #2563eb);
        color: var(--buig-color-primary-foreground, #fff);
        &:hover {
            filter: brightness(1.05);
        }
        &:active {
            filter: brightness(0.92);
        }
    }
    &--secondary {
        background: var(--buig-color-bg-elevated, #fff);
        color: var(--buig-color-text, #222);
        border-color: var(--buig-color-border, #d0d7de);
        &:hover {
            background: var(--buig-color-bg-hover, #f5f7fa);
        }
        &:active {
            background: var(--buig-color-bg-active, #eceff3);
        }
    }
    &--outline {
        background: transparent;
        border-color: var(--buig-color-border-strong, var(--buig-color-primary, #2563eb));
        color: var(--buig-color-text, #222);
        &:hover {
            background: rgba(0, 0, 0, 0.03);
        }
        &:active {
            background: rgba(0, 0, 0, 0.06);
        }
    }
    &--text {
        background: transparent;
        border-color: transparent;
        color: var(--buig-color-primary, #2563eb);
        &:hover {
            background: rgba(0, 0, 0, 0.03);
        }
        &:active {
            background: rgba(0, 0, 0, 0.06);
        }
    }

    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--buig-color-focus-ring, rgba(64, 140, 255, 0.35));
    }
}
</style>
