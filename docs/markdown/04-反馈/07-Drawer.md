# Drawer 抽屉

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<ClientOnly>
  <div>
    <YiiButton @onClick="open=true">打开Drawer</YiiButton>
    <YiiDrawer v-model="open" title="标题" placement="right">内容</YiiDrawer>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
    <YiiButton @onClick="open = true">打开Drawer</YiiButton>
    <YiiDrawer v-model="open" title="标题" placement="right">内容</YiiDrawer>
</template>
```
