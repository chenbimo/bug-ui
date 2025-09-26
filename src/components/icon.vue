<template>
    <i class="buig-icon" :style="$Computed.style"><slot /></i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigIcon' });
const $Prop = defineProps<{ size?: string | number; color?: string }>();
const $Computed = { style: computed(() => ({ fontSize: typeof $Prop.size === 'number' ? `${$Prop.size}px` : $Prop.size || '16px', color: $Prop.color || 'currentColor' })) };
</script>

<style>
.buig-icon {
    display: inline-flex;
    line-height: 0;
    vertical-align: middle;
}
</style>
