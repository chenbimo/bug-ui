# Dialog 对话框

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<ClientOnly>
  <div>
    <YiiButton @onClick="show=true">打开Dialog</YiiButton>
    <YiiDialog v-model="show" title="标题">
      这里是对话框内容
      <template #footer>
        <YiiButton @onClick="show=false">关闭</YiiButton>
      </template>
    </YiiDialog>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>

<template>
    <YiiButton @onClick="show = true">打开Dialog</YiiButton>
    <YiiDialog v-model="show" title="标题">
        这里是对话框内容
        <template #footer>
            <YiiButton @onClick="show = false">关闭</YiiButton>
        </template>
    </YiiDialog>
</template>
```
