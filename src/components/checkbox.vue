<template>
    <label class="buig-checkbox" :class="[$Prop.disabled && 'buig-checkbox--disabled']">
        <input class="buig-checkbox__native" type="checkbox" :disabled="$Prop.disabled" :checked="$Prop.modelValue" @change="$Method.onChange" />
        <span class="buig-checkbox__label"><slot /></span>
    </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigCheckbox' });
const $Prop = defineProps<{ modelValue?: boolean; disabled?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void; (e: 'change', v: boolean): void }>();
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = (e.target as HTMLInputElement)?.checked;
        $Emit('update:modelValue', v);
        $Emit('change', v);
    }
};
</script>

<style>
.buig-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.buig-checkbox__native {
    width: 16px;
    height: 16px;
}
.buig-checkbox--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
