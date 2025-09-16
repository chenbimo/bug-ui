# Progress 进度条

<script setup>
import { ref } from 'vue'
const val = ref(30)
</script>

<ClientOnly>
  <div>
    <YiiProgress :value="val" />
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const val = ref(30);
</script>

<template>
    <YiiProgress :value="val" />
</template>
```
