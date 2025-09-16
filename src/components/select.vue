<template>
    <select class="yii-select" :disabled="$Prop.disabled" :value="$Prop.modelValue" @change="$Method.onChange">
        <option v-for="opt in $Prop.options" :key="String(opt.value)" :value="opt.value">{{ opt.label }}</option>
    </select>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiSelect' });
const $Prop = defineProps({ modelValue: { type: [String, Number], default: '' }, options: { type: Array, default: () => [] }, disabled: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange(e) {
        if (!$Computed.interactive.value) return;
        const v = e?.target?.value;
        $Emit('update:modelValue', v);
        $Emit('onChange', v);
    }
};
</script>

<style>
.yii-select {
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 0 8px;
    background: #fff;
}
.yii-select:disabled {
    background: #f5f5f5;
    color: #999;
}
</style>
