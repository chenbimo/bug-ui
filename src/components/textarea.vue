<template>
    <div class="buig-textarea" :class="[$Prop.disabled && 'buig-textarea--disabled']">
        <textarea ref="$Ref" class="buig-textarea__native" :placeholder="$Prop.placeholder" :disabled="$Prop.disabled" :readonly="$Prop.readonly" :rows="$Prop.rows" :value="$Prop.modelValue ?? ''" @input="$Method.onInput" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
defineOptions({ name: 'BuigTextarea' });
const $Prop = defineProps<{ modelValue?: string; placeholder?: string; rows?: number; disabled?: boolean; readonly?: boolean }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: string): void; (e: 'input', v: string): void }>();
const $Data = reactive({});
const $Ref = ref<HTMLTextAreaElement | null>(null);
const $Computed = { interactive: computed(() => !$Prop.disabled && !$Prop.readonly) };
const $Method = {
    onInput(e: Event) {
        if (!$Computed.interactive.value) return;
        const v = (e.target as HTMLTextAreaElement)?.value;
        $Emit('update:modelValue', v);
        $Emit('input', v);
    }
};
defineExpose({ focus: () => $Ref.value?.focus() });
</script>

<style>
.buig-textarea__native {
    width: 280px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    font-size: var(--ui-font-size, 14px);
    outline: none;
}
.buig-textarea__native:focus {
    border-color: var(--ui-color-primary);
}
.buig-textarea--disabled .buig-textarea__native {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.03);
}
</style>
