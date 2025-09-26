<template>
    <select class="buig-select" :disabled="$Prop.disabled" :value="$Prop.modelValue" @change="$Method.onChange">
        <option v-for="opt in $Prop.options" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
    </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigSelect' });
interface Opt {
    label: string;
    value: string | number;
}
const $Prop = defineProps<{ modelValue?: string | number; options?: Opt[]; disabled?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: string | number | undefined): void; (e: 'change', v: string | number | undefined): void }>();
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = (e.target as HTMLSelectElement)?.value;
        $Emit('update:modelValue', v);
        $Emit('change', v);
    }
};
</script>

<style>
.buig-select {
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 0 8px;
    background: #fff;
}
.buig-select:disabled {
    background: #f5f5f5;
    color: #999;
}
</style>
