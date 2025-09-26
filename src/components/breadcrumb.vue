<template>
    <nav class="buig-breadcrumb">
        <span v-for="(item, idx) in $Prop.items" :key="idx" class="buig-breadcrumb__item">
            <a v-if="item.to" :href="item.to" @click.prevent>{{ item.label }}</a>
            <span v-else>{{ item.label }}</span>
            <span v-if="idx < $Prop.items.length - 1" class="buig-breadcrumb__sep">/</span>
        </span>
    </nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigBreadcrumb' });
interface Crumb {
    label: string;
    to?: string;
}
const $Prop = defineProps<{ items?: Crumb[] }>();
</script>

<style>
.buig-breadcrumb {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #666;
}
.buig-breadcrumb__sep {
    margin: 0 4px;
    color: #999;
}
.buig-breadcrumb a {
    color: var(--ui-color-primary, #1677ff);
    text-decoration: none;
}
</style>
