# Slider 滑块

<script setup>
import { ref } from 'vue'
const v = ref(30)
</script>

<ClientOnly>
  <div class="demo-line">
    <BuigSlider v-model="v" />
    <span style="margin-inline-start:8px">{{ v }}</span>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const v = ref(30);
</script>

<template>
    <BuigSlider v-model="v" />
    <span>{{ v }}</span>
</template>
```
