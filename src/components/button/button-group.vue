<template>
    <div class="buig-button-group" :class="$Computed.classList.value">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { provide, computed } from 'vue';
import type { ButtonGroupProps } from './interface';
import { buttonGroupInjectionKey } from './interface';

defineOptions({ name: 'BuigButtonGroup' });

// 属性集
const $Prop = defineProps<ButtonGroupProps>();

// 计算集
const $Computed = {
    classList: computed(() => [$Prop.size && `buig-button-group--size-${$Prop.size}`, $Prop.type && `buig-button-group--type-${$Prop.type}`, $Prop.status && `buig-button-group--status-${$Prop.status}`, $Prop.shape && `buig-button-group--shape-${$Prop.shape}`, $Prop.disabled && 'buig-button-group--disabled'])
};

// provide
provide(buttonGroupInjectionKey, $Prop);
</script>
<style scoped lang="scss">
.buig-button-group {
    display: inline-flex;
    vertical-align: middle;
    > .buig-button {
        border-radius: 0;
    }
    > .buig-button:first-child {
        border-top-left-radius: var(--buig-button-radius, 6px);
        border-bottom-left-radius: var(--buig-button-radius, 6px);
    }
    > .buig-button:last-child {
        border-top-right-radius: var(--buig-button-radius, 6px);
        border-bottom-right-radius: var(--buig-button-radius, 6px);
    }
    > .buig-button + .buig-button {
        margin-left: -1px;
    }
    &--disabled {
        opacity: 0.7;
    }
}
</style>
