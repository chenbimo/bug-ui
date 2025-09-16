# Toast 轻提示

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<ClientOnly>
  <div>
    <YiiButton @onClick="visible=true">显示Toast</YiiButton>
    <YiiToast :visible="visible" type="success" message="保存成功" @onClose="visible=false" />
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
    <YiiButton @onClick="visible = true">显示Toast</YiiButton>
    <YiiToast :visible="visible" type="success" message="保存成功" @onClose="visible = false" />
</template>
```
