---
title: 链接按钮
order: 3
---

### 链接按钮

<div class="demo-row" style="display:flex; gap:12px;">
  <BuigButton href="https://example.com" target="_blank" buttonType="text">外部链接</BuigButton>
  <BuigButton href="https://example.com" :disabled="true" buttonType="text">禁用链接</BuigButton>
</div>

```vue
<template>
    <div style="display:flex; gap:12px;">
        <BuigButton href="https://example.com" target="_blank" buttonType="text"
            >外部链接</BuigButton
        >
        <BuigButton
            href="https://example.com"
            :disabled="true"
            buttonType="text"
            >禁用链接</BuigButton
        >
    </div>
</template>
```
