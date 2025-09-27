<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { listComponentDemos } from '../demos';

interface Props {
    component: string;
    title?: string;
}
const props = defineProps<Props>();
const ids = ref<string[]>([]);
onMounted(() => {
    ids.value = listComponentDemos(props.component);
});
</script>

<template>
    <section class="demo-all" :data-component="props.component">
        <h3 v-if="title" class="demo-all__title">{{ title }}</h3>
        <Demo
            v-for="id in ids"
            :key="id"
            :id="id"
            :title="id.split('/').pop()"
        />
    </section>
</template>

<style scoped>
.demo-all {
    margin: 24px 0;
}
.demo-all__title {
    margin: 0 0 12px;
    font-size: 16px;
}
</style>
