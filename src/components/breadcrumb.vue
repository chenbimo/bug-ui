<template>
    <nav class="yii-breadcrumb">
        <span v-for="(item, idx) in $Prop.items" :key="idx" class="yii-breadcrumb__item">
            <a v-if="item.to" :href="item.to" @click.prevent>{{ item.label }}</a>
            <span v-else>{{ item.label }}</span>
            <span v-if="idx < $Prop.items.length - 1" class="yii-breadcrumb__sep">/</span>
        </span>
    </nav>
</template>

<script setup>
defineOptions({ name: 'YiiBreadcrumb' });
const $Prop = defineProps({ items: { type: Array, default: () => [] } });
</script>

<style>
.yii-breadcrumb {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #666;
}
.yii-breadcrumb__sep {
    margin: 0 4px;
    color: #999;
}
.yii-breadcrumb a {
    color: var(--ui-color-primary, #1677ff);
    text-decoration: none;
}
</style>
