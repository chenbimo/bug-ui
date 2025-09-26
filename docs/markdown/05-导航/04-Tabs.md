# Tabs 标签页

<script setup>
import { ref } from 'vue'
const key = ref('a')
const tabs = [ { key: 'a', label: 'A' }, { key: 'b', label: 'B' } ]
</script>

<ClientOnly>
  <div>
    <BuigTabs v-model="key" :tabs="tabs" />
    <div style="margin-top:8px">当前：{{ key }}</div>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const key = ref('a');
const tabs = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' }
];
</script>

<template>
    <BuigTabs v-model="key" :tabs="tabs" />
</template>
```
