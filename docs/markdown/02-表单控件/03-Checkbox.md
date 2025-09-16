# Checkbox 复选框

<script setup>
import { ref } from 'vue'
const ck1 = ref(false)
const ck2 = ref(true)
</script>

<ClientOnly>
  <div class="demo-line">
    <YiiCheckbox v-model="ck1">选项 A</YiiCheckbox>
    <YiiCheckbox v-model="ck2" style="margin-inline-start:12px">选项 B</YiiCheckbox>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const ck1 = ref(false);
const ck2 = ref(true);
</script>

<template>
    <YiiCheckbox v-model="ck1">选项 A</YiiCheckbox>
    <YiiCheckbox v-model="ck2">选项 B</YiiCheckbox>
</template>
```
