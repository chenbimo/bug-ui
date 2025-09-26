<template>
    <label class="buig-radio" :class="[$Prop.disabled && 'buig-radio--disabled']">
        <input class="buig-radio__native" type="radio" :name="$Prop.name" :disabled="$Prop.disabled" :checked="$Prop.modelValue === $Prop.value" @change="$Method.onChange" />
        <span class="buig-radio__label"><slot /></span>
    </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigRadio' });
const $Prop = defineProps<{ modelValue?: string | number | boolean; value: string | number | boolean; name?: string; disabled?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: string | number | boolean): void; (e: 'change', v: string | number | boolean): void }>();
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange() {
        if (!$Computed.interactive.value) return;
        $Emit('update:modelValue', $Prop.value);
        $Emit('change', $Prop.value);
    }
};
</script>

<style>
.buig-radio {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.buig-radio__native {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.buig-radio--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
