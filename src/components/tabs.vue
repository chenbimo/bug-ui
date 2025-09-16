<template>
    <div class="yii-tabs">
        <div class="yii-tabs__nav">
            <button v-for="t in $Prop.tabs" :key="t.key" class="yii-tabs__tab" :class="[$Prop.modelValue === t.key && 'yii-tabs__tab--active']" @click="$Method.onSelect(t.key)">{{ t.label }}</button>
        </div>
        <div class="yii-tabs__panel"><slot /></div>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiTabs' });
const $Prop = defineProps({ modelValue: { type: [String, Number], default: '' }, tabs: { type: Array, default: () => [] } });
const $Emit = defineEmits(['update:modelValue', 'onChange']);
const $Method = {
    onSelect(key) {
        $Emit('update:modelValue', key);
        $Emit('onChange', key);
    }
};
</script>

<style>
.yii-tabs {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
}
.yii-tabs__nav {
    display: flex;
    gap: 4px;
    padding: 8px;
    border-bottom: 1px solid #e5e7eb;
}
.yii-tabs__tab {
    border: none;
    background: transparent;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
}
.yii-tabs__tab--active {
    background: #f0f5ff;
    color: var(--ui-color-primary, #1677ff);
}
.yii-tabs__panel {
    padding: 12px;
}
</style>
