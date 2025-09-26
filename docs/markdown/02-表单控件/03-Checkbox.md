# Checkbox 复选框

<script setup>
import { ref } from 'vue'
const ck1 = ref(false)
const ck2 = ref(true)
</script>

<ClientOnly>
  <div class="demo-line">
    <BuigCheckbox v-model="ck1">选项 A</BuigCheckbox>
    <BuigCheckbox v-model="ck2" style="margin-inline-start:12px">选项 B</BuigCheckbox>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const ck1 = ref(false);
const ck2 = ref(true);
</script>

<template>
    <BuigCheckbox v-model="ck1">选项 A</BuigCheckbox>
    <BuigCheckbox v-model="ck2">选项 B</BuigCheckbox>
</template>
```
