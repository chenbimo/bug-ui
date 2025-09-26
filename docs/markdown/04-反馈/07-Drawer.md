# Drawer 抽屉

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<ClientOnly>
  <div>
    <BuigButton @onClick="open=true">打开Drawer</BuigButton>
    <BuigDrawer v-model="open" title="标题" placement="right">内容</BuigDrawer>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
    <BuigButton @onClick="open = true">打开Drawer</BuigButton>
    <BuigDrawer v-model="open" title="标题" placement="right">内容</BuigDrawer>
</template>
```
