<template>
    <input class="yii-slider" type="range" :min="$Prop.min" :max="$Prop.max" :step="$Prop.step" :disabled="$Prop.disabled" :value="$Prop.modelValue" @input="$Method.onInput" />
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiSlider' });
const $Prop = defineProps({ modelValue: { type: [Number, String], default: 0 }, min: { type: [Number, String], default: 0 }, max: { type: [Number, String], default: 100 }, step: { type: [Number, String], default: 1 }, disabled: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Computed = { interactive: computed(() => !$Prop.disabled) };
const $Method = {
    onInput(e) {
        if (!$Computed.interactive.value) return;
        const v = Number(e?.target?.value);
        $Emit('update:modelValue', v);
        $Emit('onChange', v);
    }
};
</script>

<style>
.yii-slider {
    width: 200px;
}
</style>
