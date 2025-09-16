# Radio 单选框

<script setup>
import { ref } from 'vue'
const rv = ref('A')
</script>

<ClientOnly>
  <div class="demo-line">
    <YiiRadio name="g" v-model="rv" value="A">A</YiiRadio>
    <YiiRadio name="g" v-model="rv" value="B" style="margin-inline-start:12px">B</YiiRadio>
  </div>
</ClientOnly>

```vue
<script setup>
import { ref } from 'vue';
const rv = ref('A');
</script>

<template>
    <YiiRadio name="g" v-model="rv" value="A">A</YiiRadio>
    <YiiRadio name="g" v-model="rv" value="B">B</YiiRadio>
</template>
```
