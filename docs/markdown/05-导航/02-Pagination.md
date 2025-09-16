# Pagination 分页

<script setup>
import { ref } from 'vue'
const page = ref(1)
</script>

<ClientOnly>
  <YiiPagination v-model:page="page" :total="55" :pageSize="10" />
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const page = ref(1);
</script>

<template>
    <YiiPagination v-model:page="page" :total="55" :pageSize="10" />
</template>
```
