<template>
    <span class="yii-avatar" :style="{ width: $Prop.size + 'px', height: $Prop.size + 'px', fontSize: $Prop.size / 2 + 'px' }">
        <img v-if="$Prop.src" class="yii-avatar__img" :src="$Prop.src" :alt="$Prop.alt" />
        <span v-else class="yii-avatar__text"
            ><slot>{{ $Prop.alt?.charAt(0) ?? 'A' }}</slot></span
        >
    </span>
</template>

<script setup>
defineOptions({ name: 'YiiAvatar' });
const $Prop = defineProps({ src: { type: String, default: '' }, alt: { type: String, default: '' }, size: { type: Number, default: 32 } });
</script>

<style>
.yii-avatar {
    display: inline-flex;
    border-radius: 50%;
    overflow: hidden;
    background: #eee;
    color: #666;
    justify-content: center;
    align-items: center;
}
.yii-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.yii-avatar__text {
    line-height: 1;
}
</style>
