<template>
    <button class="buig-button" :class="[`buig-button--variant-${variant}`, `buig-button--size-${size}`, disabled && 'buig-button--disabled', loading && 'buig-button--loading']" :type="type" :disabled="disabled || loading" @click="$Method.onClick">
        <span class="buig-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './types';

defineOptions({ name: 'BuigButton' });

const $Const = { DEFAULT_VARIANT: 'primary' as const, DEFAULT_SIZE: 'md' as const };

const $Prop = defineProps<ButtonProps>();
const $Emit = defineEmits<ButtonEmits>();

const variant = $Prop.variant ?? $Const.DEFAULT_VARIANT;
const size = $Prop.size ?? $Const.DEFAULT_SIZE;
const disabled = $Prop.disabled ?? false;
const loading = $Prop.loading ?? false;
const type = $Prop.type ?? 'button';

const $Data = reactive({});
const $Computed = {
    interactive: computed(() => !disabled && !loading)
};
const $Method = {
    onClick(e: MouseEvent) {
        if (!$Computed.interactive.value) return;
        $Emit('click', e);
    }
};
</script>

