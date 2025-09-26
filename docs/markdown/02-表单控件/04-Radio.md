# Radio 单选框

<script setup>
import { ref } from 'vue'
const rv = ref('A')
</script>

<ClientOnly>
  <div class="demo-line">
    <BuigRadio name="g" v-model="rv" value="A">A</BuigRadio>
    <BuigRadio name="g" v-model="rv" value="B" style="margin-inline-start:12px">B</BuigRadio>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const rv = ref('A');
</script>

<template>
    <BuigRadio name="g" v-model="rv" value="A">A</BuigRadio>
    <BuigRadio name="g" v-model="rv" value="B">B</BuigRadio>
</template>
```
