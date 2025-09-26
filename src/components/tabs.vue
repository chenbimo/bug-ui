<template>
    <div class="buig-tabs">
        <div class="buig-tabs__nav">
            <button v-for="t in $Prop.tabs" :key="t.key" class="buig-tabs__tab" :class="[$Prop.modelValue === t.key && 'buig-tabs__tab--active']" @click="$Method.onSelect(t.key)">{{ t.label }}</button>
        </div>
        <div class="buig-tabs__panel"><slot /></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigTabs' });
interface TabItem {
    key: string | number;
    label: string;
}
const $Prop = defineProps<{ modelValue?: string | number; tabs?: TabItem[] }>();
const $Emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void; (e: 'change', v: string | number): void }>();
const $Method = {
    onSelect(key: string | number) {
        $Emit('update:modelValue', key);
        $Emit('change', key);
    }
};
</script>

<style>
.buig-tabs {
    border: 1px solid var(--ui-color-border-subtle, #e5e7eb);
    border-radius: 8px;
}
.buig-tabs__nav {
    display: flex;
    gap: 4px;
    padding: 8px;
    border-bottom: 1px solid var(--ui-color-border-subtle, #e5e7eb);
}
.buig-tabs__tab {
    border: none;
    background: transparent;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
}
.buig-tabs__tab--active {
    background: var(--ui-color-bg-muted, #f0f5ff);
    color: var(--ui-color-primary, #1677ff);
}
.buig-tabs__panel {
    padding: 12px;
}
</style>
