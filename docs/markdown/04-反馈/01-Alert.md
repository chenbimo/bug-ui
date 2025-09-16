# Alert 警示条

<script setup>
import { ref } from 'vue'
const visible = ref(true)
</script>

<ClientOnly>
  <div>
    <YiiAlert v-if="visible" type="warning" closable @onClose="visible=false">注意：这是一条警示。</YiiAlert>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>

<template>
    <YiiAlert v-if="visible" type="warning" closable @onClose="visible = false">注意：这是一条警示。</YiiAlert>
</template>
```
