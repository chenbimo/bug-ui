# Button 按钮

功能完整的按钮组件，参考 Arco Button 能力并结合本项目命名约定实现。支持多风格(type)、状态(status)、形状(shape)、尺寸(size)、占满(long)、链接模式、延迟 loading、图标插槽/属性等。

## 基础用法

<DemoBlock title="基础按钮类型" :code="`<BuigButton buttonType='primary'>...</BuigButton>`">
<BuigButton buttonType="primary">主要按钮</BuigButton>
<BuigButton buttonType="secondary">次级按钮</BuigButton>
<BuigButton buttonType="outline">描边按钮</BuigButton>
<BuigButton buttonType="text">文字按钮</BuigButton>
</DemoBlock>

## 状态 (status)

当 type=primary 时常与不同状态颜色结合：

<DemoBlock title="状态色（需 primary 组合）" :code="`<BuigButton buttonType='primary' status='success'>...</BuigButton>`">
<BuigButton buttonType="primary" status="success">成功</BuigButton>
<BuigButton buttonType="primary" status="warning">警告</BuigButton>
<BuigButton buttonType="primary" status="danger">危险</BuigButton>
</DemoBlock>

## 形状 (shape)

<DemoBlock title="形状" :code="`<BuigButton shape='round'>...</BuigButton>`">
<BuigButton shape="round" buttonType="primary">圆角</BuigButton>
<BuigButton shape="circle" buttonType="primary" icon="demo" />
</DemoBlock>

## 尺寸 (size)

支持：mini / small / medium / large

<DemoBlock title="尺寸" :code="`<BuigButton size='mini'>Mini</BuigButton>`">
<BuigButton size="mini">Mini</BuigButton>
<BuigButton size="small">Small</BuigButton>
<BuigButton size="medium">Medium</BuigButton>
<BuigButton size="large">Large</BuigButton>
</DemoBlock>

## 链接模式

设置 href 后自动渲染为 a 标签。

<DemoBlock title="链接模式" :code="`<BuigButton href='https://example.com'>跳转链接</BuigButton>`">
<BuigButton href="https://example.com" target="_blank" buttonType="text">跳转链接</BuigButton>
</DemoBlock>

## Loading 与延迟

loadingDelay 可避免闪烁：

<DemoBlock title="Loading 延迟" :code="`<BuigButton :loading='true'>提交中</BuigButton>`">
<BuigButton :loading="true">提交中</BuigButton>
</DemoBlock>

## 占满宽度

<DemoBlock title="占满宽度" :code="`<BuigButton long>提交</BuigButton>`">
<BuigButton long buttonType="primary">提交</BuigButton>
</DemoBlock>

## 图标

# Button 按钮 (暂时最小化用于调试退出问题)

本文件内容已临时精简，用于定位 VitePress 退出 code 1 根因。稍后还原示例。
