# Dialog 对话框

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<ClientOnly>
  <div>
    <BuigButton @onClick="show=true">打开Dialog</BuigButton>
    <BuigDialog v-model="show" title="标题">
      这里是对话框内容
      <template #footer>
        <BuigButton @onClick="show=false">关闭</BuigButton>
      </template>
    </BuigDialog>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>

<template>
    <BuigButton @onClick="show = true">打开Dialog</BuigButton>
    <BuigDialog v-model="show" title="标题">
        这里是对话框内容
        <template #footer>
            <BuigButton @onClick="show = false">关闭</BuigButton>
        </template>
    </BuigDialog>
</template>
```
