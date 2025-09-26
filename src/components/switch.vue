<template>
    <button class="buig-switch" :class="[$Prop.modelValue && 'buig-switch--on', $Prop.disabled && 'buig-switch--disabled']" :disabled="$Prop.disabled" @click="$Method.toggle">
        <span class="buig-switch__thumb" />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigSwitch' });
const $Prop = defineProps<{ modelValue?: boolean; disabled?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'change', v: boolean): void }>();
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    toggle() {
        if (!$Computed.interactive.value) return;
        const v = !$Prop.modelValue;
        $Emit('update:modelValue', v);
        $Emit('change', v);
    }
};
</script>

<style>
.buig-switch {
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: var(--ui-color-border, #ddd);
    position: relative;
    border: none;
    cursor: pointer;
}
.buig-switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--ui-color-bg, #fff);
    transition: left 0.2s;
}
.buig-switch--on {
    background: var(--ui-color-primary);
}
.buig-switch--on .buig-switch__thumb {
    left: 20px;
}
.buig-switch--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
