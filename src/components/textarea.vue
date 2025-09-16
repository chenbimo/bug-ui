<template>
    <div class="yii-textarea" :class="[$Prop.disabled && 'yii-textarea--disabled']">
        <textarea ref="$Ref" class="yii-textarea__native" :placeholder="$Prop.placeholder" :disabled="$Prop.disabled" :readonly="$Prop.readonly" :rows="$Prop.rows" :value="$Prop.modelValue ?? ''" @input="$Method.onInput" />
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
defineOptions({ name: 'YiiTextarea' });

const $Prop = defineProps({ modelValue: { type: String, default: '' }, placeholder: { type: String, default: '' }, rows: { type: Number, default: 3 }, disabled: { type: Boolean, default: false }, readonly: { type: Boolean, default: false } });
const $Emit = defineEmits(['update:modelValue', 'onInput']);
const $Data = reactive({});
const $Ref = ref(null);
const $Computed = { interactive: computed(() => !$Prop.disabled && !$Prop.readonly) };
const $Method = {
    onInput(e) {
        if (!$Computed.interactive.value) return;
        const v = e?.target?.value;
        $Emit('update:modelValue', v);
        $Emit('onInput', v);
    }
};
defineExpose({
    focus() {
        $Ref.value?.focus();
    }
});
</script>

<style>
.yii-textarea__native {
    width: 280px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    font-size: 14px;
    outline: none;
}
.yii-textarea__native:focus {
    border-color: var(--ui-color-primary);
}
.yii-textarea--disabled .yii-textarea__native {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.03);
}
</style>
