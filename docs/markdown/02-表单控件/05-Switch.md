# Switch 开关

<script setup>
import { ref } from 'vue'
const on = ref(false)
</script>

<ClientOnly>
  <div class="demo-line">
    <BuigSwitch v-model="on" />
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const on = ref(false);
</script>

<template>
    <BuigSwitch v-model="on" />
</template>
```
