<template>
    <button class="yii-switch" :class="[$Prop.modelValue && 'yii-switch--on', $Prop.disabled && 'yii-switch--disabled']" :disabled="$Prop.disabled" @click="$Method.toggle">
        <span class="yii-switch__thumb" />
    </button>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiSwitch' });
const $Prop = defineProps({ modelValue: { type: Boolean, default: false }, disabled: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    toggle() {
        if (!$Computed.interactive.value) return;
        const v = !$Prop.modelValue;
        $Emit('update:modelValue', v);
        $Emit('onChange', v);
    }
};
</script>

<style>
.yii-switch {
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: #ddd;
    position: relative;
    border: none;
    cursor: pointer;
}
.yii-switch__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s;
}
.yii-switch--on {
    background: var(--ui-color-primary);
}
.yii-switch--on .yii-switch__thumb {
    left: 20px;
}
.yii-switch--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
