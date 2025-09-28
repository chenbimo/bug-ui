## Button 按钮（极简版）

当前为“重构阶段极简版本”，仅保留一个属性：`type` 用于控制主题风格。

属性：
| 名称 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| type | 主题风格，可选 primary / secondary / outline / text | string | secondary |

### 基础使用

<Demo title="基础类型" :code="`<BuigButton type='primary'>主要按钮</BuigButton>`">
<BuigButton type="primary">Primary</BuigButton>
<BuigButton type="secondary">Secondary</BuigButton>
<BuigButton type="outline">Outline</BuigButton>
<BuigButton type="text">Text</BuigButton>
</Demo>

### 默认按钮

<Demo title="默认风格 (secondary)" :code="`<BuigButton>默认按钮</BuigButton>`">
<BuigButton>默认按钮</BuigButton>
</Demo>

> 提示：其余（尺寸/形状/状态/loading/链接等）已暂时移除，将在后续阶段按需回归。
