<template>
    <div class="buig-input" :class="[$Prop.disabled && 'buig-input--disabled', $Prop.readonly && 'buig-input--readonly', `buig-input--size-${size}`, `buig-input--variant-${variant}`]">
        <input ref="$RefInput" class="buig-input__native" :type="$Prop.type" :placeholder="$Prop.placeholder" :disabled="$Prop.disabled" :readonly="$Prop.readonly" :value="$Prop.modelValue ?? ''" @input="$Method.onInput" @change="$Method.onChange" @focus="$Method.onFocus" @blur="$Method.onBlur" />
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
defineOptions({ name: 'BuigInput' });

const $Prop = defineProps<{
    modelValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    type?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}>();

const size = $Prop.size ?? 'md';
const variant = $Prop.variant ?? 'neutral';

const $Emit = defineEmits<{
    (e: 'update:modelValue', v: string | number | undefined): void;
    (e: 'input', v: string | number | undefined): void;
    (e: 'change', v: string | number | undefined): void;
    (e: 'focus', ev: FocusEvent): void;
    (e: 'blur', ev: FocusEvent): void;
}>();

const $Data = reactive({ focusing: false });
const $RefInput = ref<HTMLInputElement | null>(null);

const $Computed = {
    interactive: computed(() => !$Prop.disabled && !$Prop.readonly)
};

const $Method = {
    onInput(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = (e.target as HTMLInputElement)?.value;
        $Emit('update:modelValue', v);
        $Emit('input', v);
    },
    onChange(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = (e.target as HTMLInputElement)?.value;
        $Emit('change', v);
    },
    onFocus(e: FocusEvent) {
        $Data.focusing = true;
        $Emit('focus', e);
    },
    onBlur(e: FocusEvent) {
        $Data.focusing = false;
        $Emit('blur', e);
    },
    focus() {
        $RefInput.value?.focus();
    },
    blur() {
        $RefInput.value?.blur();
    }
};

defineExpose({ focus: $Method.focus, blur: $Method.blur });
</script>

<style>
.buig-input {
    display: inline-flex;
    align-items: center;
}
.buig-input__native {
    width: 200px;
    border: 1px solid var(--ui-color-border);
    border-radius: var(--ui-control-radius-md);
    padding: var(--ui-control-padding-y-md) var(--ui-control-padding-x-md);
    font-size: var(--ui-control-font-size-md);
    line-height: 1.2;
    outline: none;
    background: var(--ui-color-bg);
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}
.buig-input__native:focus {
    border-color: var(--ui-color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-primary) 25%, transparent);
}

/* Size modifiers */
.buig-input--size-xs .buig-input__native {
    height: var(--ui-control-height-xs);
    font-size: var(--ui-control-font-size-xs);
    padding: var(--ui-control-padding-y-xs) var(--ui-control-padding-x-xs);
    border-radius: var(--ui-control-radius-xs);
}
.buig-input--size-sm .buig-input__native {
    height: var(--ui-control-height-sm);
    font-size: var(--ui-control-font-size-sm);
    padding: var(--ui-control-padding-y-sm) var(--ui-control-padding-x-sm);
    border-radius: var(--ui-control-radius-sm);
}
.buig-input--size-md .buig-input__native {
    height: var(--ui-control-height-md);
    font-size: var(--ui-control-font-size-md);
    padding: var(--ui-control-padding-y-md) var(--ui-control-padding-x-md);
    border-radius: var(--ui-control-radius-md);
}
.buig-input--size-lg .buig-input__native {
    height: var(--ui-control-height-lg);
    font-size: var(--ui-control-font-size-lg);
    padding: var(--ui-control-padding-y-lg) var(--ui-control-padding-x-lg);
    border-radius: var(--ui-control-radius-lg);
}

/* Variant (border/focus color influences) */
.buig-input--variant-primary .buig-input__native:focus {
    border-color: var(--ui-color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-primary) 25%, transparent);
}
.buig-input--variant-success .buig-input__native:focus {
    border-color: var(--ui-color-success);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-success) 25%, transparent);
}
.buig-input--variant-warning .buig-input__native:focus {
    border-color: var(--ui-color-warning);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-warning) 25%, transparent);
}
.buig-input--variant-danger .buig-input__native:focus {
    border-color: var(--ui-color-danger);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-danger) 25%, transparent);
}
.buig-input--variant-neutral .buig-input__native:focus {
    border-color: var(--ui-color-neutral-active);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-color-neutral-active) 25%, transparent);
}
.buig-input--disabled .buig-input__native {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.03);
}
.buig-input--readonly .buig-input__native {
    background: rgba(0, 0, 0, 0.02);
}
</style>
