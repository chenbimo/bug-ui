<template>
    <ol class="yii-steps">
        <li v-for="(s, i) in $Prop.steps" :key="i" class="yii-steps__item" :class="[i < $Prop.current && 'yii-steps__item--done', i === $Prop.current && 'yii-steps__item--active']">
            <span class="yii-steps__index">{{ i + 1 }}</span>
            <span class="yii-steps__label">{{ s.label }}</span>
        </li>
    </ol>
</template>

<script setup>
defineOptions({ name: 'YiiSteps' });
const $Prop = defineProps({ current: { type: Number, default: 0 }, steps: { type: Array, default: () => [] } });
</script>

<style>
.yii-steps {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.yii-steps__item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #999;
}
.yii-steps__item--active {
    color: var(--ui-color-primary, #1677ff);
}
.yii-steps__item--done {
    color: #52c41a;
}
.yii-steps__index {
    display: inline-flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: #eee;
    font-size: 12px;
}
</style>
