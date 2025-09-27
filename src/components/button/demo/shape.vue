<template>
    <div style="display: flex; gap: 12px">
        <BuigButton shape="square" buttonType="primary">Square</BuigButton>
        <BuigButton shape="round" buttonType="primary">Round</BuigButton>
        <BuigButton shape="circle" buttonType="primary" :icon="Icon" />
    </div>
</template>
<script setup lang="ts">
import { Aperture as Icon } from 'lucide-vue-next';
</script>
