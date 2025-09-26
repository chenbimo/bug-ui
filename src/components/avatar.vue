<template>
    <span class="buig-avatar" :style="{ width: $Prop.size + 'px', height: $Prop.size + 'px', fontSize: $Prop.size / 2 + 'px' }">
        <img v-if="$Prop.src" class="buig-avatar__img" :src="$Prop.src" :alt="$Prop.alt" />
        <span v-else class="buig-avatar__text"
            ><slot>{{ $Prop.alt?.charAt(0) ?? 'A' }}</slot></span
        >
    </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'BuigAvatar' });
const $Prop = defineProps<{ src?: string; alt?: string; size?: number }>();
</script>

<style>
.buig-avatar {
    display: inline-flex;
    border-radius: 50%;
    overflow: hidden;
    background: #eee;
    color: #666;
    justify-content: center;
    align-items: center;
}
.buig-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.buig-avatar__text {
    line-height: 1;
}
</style>
