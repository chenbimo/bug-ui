<template>
    <label class="yii-radio" :class="[$Prop.disabled && 'yii-radio--disabled']">
        <input class="yii-radio__native" type="radio" :name="$Prop.name" :disabled="$Prop.disabled" :checked="$Prop.modelValue === $Prop.value" @change="$Method.onChange" />
        <span class="yii-radio__label"><slot /></span>
    </label>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiRadio' });
const $Prop = defineProps({ modelValue: { type: [String, Number, Boolean], default: '' }, value: { type: [String, Number, Boolean], required: true }, name: { type: String, default: '' }, disabled: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onChange() {
        if (!$Computed.interactive.value) return;
        $Emit('update:modelValue', $Prop.value);
        $Emit('onChange', $Prop.value);
    }
};
</script>

<style>
.yii-radio {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}
.yii-radio__native {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.yii-radio--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
