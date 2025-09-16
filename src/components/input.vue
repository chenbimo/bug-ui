<template>
    <div class="yii-input" :class="[$Prop.disabled && 'yii-input--disabled', $Prop.readonly && 'yii-input--readonly']">
        <input ref="$RefInput" class="yii-input__native" :type="$Prop.type" :placeholder="$Prop.placeholder" :disabled="$Prop.disabled" :readonly="$Prop.readonly" :value="$Prop.modelValue ?? ''" @input="$Method.onInput" @change="$Method.onChange" @focus="$Method.onFocus" @blur="$Method.onBlur" />
    </div>
</template>

<script setup>
// 外部集
import { reactive, computed, ref } from 'vue';

// 组件名
defineOptions({ name: 'YiiInput' });

// 属性集
const $Prop = defineProps({
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    type: { type: String, default: 'text' }
});

// 事件集
const $Emit = defineEmits(['update:modelValue', 'onInput', 'onChange', 'onFocus', 'onBlur']);

// 数据集
const $Data = reactive({ focusing: false });
const $RefInput = ref(null);

// 计算集（对象组织）
const $Computed = {
    interactive: computed(() => !$Prop.disabled && !$Prop.readonly)
};

// 方法集
const $Method = {
    onInput(e) {
        if (!$Computed.interactive.value) return;
        const v = e?.target?.value;
        $Emit('update:modelValue', v);
        $Emit('onInput', v);
    },
    onChange(e) {
        if (!$Computed.interactive.value) return;
        const v = e?.target?.value;
        $Emit('onChange', v);
    },
    onFocus(e) {
        $Data.focusing = true;
        $Emit('onFocus', e);
    },
    onBlur(e) {
        $Data.focusing = false;
        $Emit('onBlur', e);
    },
    focus() {
        $RefInput.value && $RefInput.value.focus();
    },
    blur() {
        $RefInput.value && $RefInput.value.blur();
    }
};

// 暴露集
defineExpose({ focus: $Method.focus, blur: $Method.blur });
</script>

<style>
/* 样式依赖全局 tokens.css */
.yii-input {
    display: inline-flex;
    align-items: center;
}
.yii-input__native {
    width: 200px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    font-size: 14px;
    line-height: 1.2;
    outline: none;
}
.yii-input__native:focus {
    border-color: var(--ui-color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-primary) 25%, transparent);
}
.yii-input--disabled .yii-input__native {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.03);
}
.yii-input--readonly .yii-input__native {
    background: rgba(0, 0, 0, 0.02);
}
</style>
