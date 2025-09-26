<template>
    <input class="buig-slider" type="range" :min="$Prop.min" :max="$Prop.max" :step="$Prop.step" :disabled="$Prop.disabled" :value="$Prop.modelValue" @input="$Method.onInput" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigSlider' });
const $Prop = defineProps<{ modelValue?: number | string; min?: number | string; max?: number | string; step?: number | string; disabled?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: number): void; (e: 'change', v: number): void }>();
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onInput(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = Number((e.target as HTMLInputElement)?.value);
        $Emit('update:modelValue', v);
        $Emit('change', v);
    }
};
</script>

<style>
.buig-slider {
    width: 200px;
}
</style>
