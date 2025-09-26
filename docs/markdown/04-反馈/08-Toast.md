# Toast 轻提示

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<ClientOnly>
  <div>
    <BuigButton @onClick="visible=true">显示Toast</BuigButton>
    <BuigToast :visible="visible" type="success" message="保存成功" @onClose="visible=false" />
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>

<template>
    <BuigButton @onClick="visible = true">显示Toast</BuigButton>
    <BuigToast :visible="visible" type="success" message="保存成功" @onClose="visible = false" />
</template>
```
