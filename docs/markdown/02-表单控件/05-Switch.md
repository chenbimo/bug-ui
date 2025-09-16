# Switch 开关

<script setup>
import { ref } from 'vue'
const on = ref(false)
</script>

<ClientOnly>
  <div class="demo-line">
    <YiiSwitch v-model="on" />
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const on = ref(false);
</script>

<template>
    <YiiSwitch v-model="on" />
</template>
```
