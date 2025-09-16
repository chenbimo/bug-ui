# Select 选择器

<script setup>
import { ref } from 'vue'
const city = ref('')
const options = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' }
]
</script>

<ClientOnly>
  <YiiSelect v-model="city" :options="options" style="width:200px" />
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const city = ref('');
const options = [
    { label: '北京', value: 'bj' },
    { label: '上海', value: 'sh' }
];
</script>

<template>
    <YiiSelect v-model="city" :options="options" />
</template>
```
