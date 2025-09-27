---
title: 仅图标 / 图标按钮
order: 2
---

### 仅图标 / 图标按钮

<div class="demo-row" style="display:flex; gap:12px;">
  <BuigButton :icon="Icon" aria-label="设置" />
  <BuigButton buttonType="primary" shape="circle" :icon="Icon" />
  <BuigButton buttonType="outline" :icon="Icon" />
</div>

<script setup lang="ts">
import { Settings as Icon } from 'lucide-vue-next';
</script>

```vue
<template>
    <div style="display:flex; gap:12px;">
        <BuigButton :icon="Icon" aria-label="设置" />
        <BuigButton buttonType="primary" shape="circle" :icon="Icon" />
        <BuigButton buttonType="outline" :icon="Icon" />
    </div>
</template>
<script setup lang="ts">
import { Settings as Icon } from 'lucide-vue-next';
</script>
```
