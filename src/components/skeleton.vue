<template>
    <div class="buig-skeleton" :class="[$Prop.animated && 'buig-skeleton--animated']" :style="{ width: $Prop.width, height: $Prop.height }"></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigSkeleton' });
const $Prop = defineProps<{ width?: string; height?: string; animated?: boolean }>();
</script>

<style>
.buig-skeleton {
    background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200% 100%;
    border-radius: 4px;
}
.buig-skeleton--animated {
    animation: buig-skeleton 1.2s infinite;
}
@keyframes buig-skeleton {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
