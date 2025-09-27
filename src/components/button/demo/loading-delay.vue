<template>
    <div style="display: flex; gap: 12px; align-items: center">
        <BuigButton
            :loading="loading"
            :loading-delay="400"
            buttonType="primary"
            @click="toggle"
        >
            {{ loading ? '处理中' : '触发加载(延迟400ms)' }}
        </BuigButton>
        <BuigButton
            :loading="loadingImmediate"
            buttonType="primary"
            @click="toggleImmediate"
        >
            {{ loadingImmediate ? '处理中' : '立即加载' }}
        </BuigButton>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const loading = ref(false);
const loadingImmediate = ref(false);
function toggle() {
    loading.value = !loading.value;
    if (loading.value) {
        setTimeout(() => (loading.value = false), 1500);
    }
}
function toggleImmediate() {
    loadingImmediate.value = !loadingImmediate.value;
    if (loadingImmediate.value) {
        setTimeout(() => (loadingImmediate.value = false), 1500);
    }
}
</script>
