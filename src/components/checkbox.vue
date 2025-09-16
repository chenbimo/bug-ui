<template>
    <label class="yii-checkbox" :class="[$Prop.disabled && 'yii-checkbox--disabled']">
        <input class="yii-checkbox__native" type="checkbox" :disabled="$Prop.disabled" :checked="$Prop.modelValue" @change="$Method.onChange" />
        <span class="yii-checkbox__label"><slot /></span>
    </label>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiCheckbox' });
const $Prop = defineProps({ modelValue: { type: Boolean, default: false }, disabled: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange(e) {
        if (!$Computed.interactive.value) return;
        const v = e?.target?.checked;
        $Emit('update:modelValue', v);
        $Emit('onChange', v);
    }
};
</script>

<style>
.yii-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.yii-checkbox__native {
    width: 16px;
    height: 16px;
}
.yii-checkbox--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
