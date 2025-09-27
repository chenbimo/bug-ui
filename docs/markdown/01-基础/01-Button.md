# Button 按钮

> 以下 Demo 来自 `src/components/button/demo` 目录，按需新增文件即可被引用。

<ClientOnly>
  <Demo id="button/basic" title="基础用法" desc="最简单的按钮示例" />
  <DemoAll component="button" title="全部示例" />
</ClientOnly>

下面是（迁移前）旧的内联演示方式示例，后续可删除：

<ClientOnly>
  <div style="display:flex; gap:12px; align-items:center;">
    <BuigButton @onClick="onClick">默认按钮</BuigButton>
    <BuigButton :loading="loading" @onClick="toggle">
      {{ loading ? '加载中' : '点我加载' }}
    </BuigButton>
    <BuigButton :disabled="true">禁用</BuigButton>
  </div>
  <p>日志：{{ log }}</p>

  <script setup>
  import { ref } from 'vue'
  const loading = ref(false)
  const log = ref('')
  function onClick(){ log.value = 'clicked!' }
  function toggle(){ loading.value = !loading.value }
  </script>
</ClientOnly>

## 代码示例（旧 inline 方式 / 计划移除）

```vue
<template>
    <div style="display:flex; gap:12px; align-items:center;">
        <BuigButton @onClick="onClick">默认按钮</BuigButton>
        <BuigButton :loading="loading" @onClick="toggle">
            {{ loading ? '加载中' : '点我加载' }}
        </BuigButton>
        <BuigButton :disabled="true">禁用</BuigButton>
    </div>
    <p>日志：{{ log }}</p>
</template>

<script setup>
import { ref } from 'vue';
const loading = ref(false);
const log = ref('');
function onClick() {
    log.value = 'clicked!';
}
function toggle() {
    loading.value = !loading.value;
}
</script>
```

## API

:::api Button
:::
