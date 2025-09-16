<template>
    <i class="yii-icon" :style="$Computed.style"><slot /></i>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiIcon' });

const $Prop = defineProps({ size: { type: [String, Number], default: 16 }, color: { type: String, default: 'currentColor' } });
const $Emit = defineEmits([]);
const $Computed = {
    style: computed(() => ({ fontSize: typeof $Prop.size === 'number' ? `${$Prop.size}px` : $Prop.size, color: $Prop.color }))
};
const $Method = {};
</script>

<style>
.yii-icon {
    display: inline-flex;
    line-height: 0;
    vertical-align: middle;
}
</style>
