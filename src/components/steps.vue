<template>
    <ol class="buig-steps">
        <li v-for="(s, i) in $Prop.steps" :key="i" class="buig-steps__item" :class="[i < $Prop.current && 'buig-steps__item--done', i === $Prop.current && 'buig-steps__item--active']">
            <span class="buig-steps__index">{{ i + 1 }}</span>
            <span class="buig-steps__label">{{ s.label }}</span>
        </li>
    </ol>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigSteps' });
interface Step {
    label: string;
}
const $Prop = defineProps<{ current?: number; steps?: Step[] }>();
</script>

<style>
.buig-steps {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.buig-steps__item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ui-color-text-secondary, #666);
}
.buig-steps__item--active {
    color: var(--ui-color-primary, #1677ff);
}
.buig-steps__item--done {
    color: var(--ui-color-success, #16a34a);
}
.buig-steps__index {
    display: inline-flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: var(--ui-color-bg-muted, #eee);
    font-size: 12px;
}
</style>
