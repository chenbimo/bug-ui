# Textarea 多行文本

<script setup>
import { ref } from 'vue'
const text = ref('Hello')
</script>

<ClientOnly>
  <YiiTextarea v-model="text" :rows="3" style="width:260px" />
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const text = ref('Hello');
</script>

<template>
    <YiiTextarea v-model="text" :rows="3" />
</template>
```
