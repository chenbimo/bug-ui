// interface.ts - Button 类型定义（集中 Props / Emits / Slots / Expose）
// 说明：已移除旧兼容字段（variant / legacySize），未来所有文档/自动化仅解析本文件。

// 极简按钮：仅提供主题 type
export type ButtonType = 'primary' | 'secondary' | 'outline' | 'text';

export interface ButtonProps {
    type?: ButtonType; // 主题，默认 secondary
}

// 保留 click 事件（基础交互常用）
export interface ButtonEmits {
    (e: 'click', ev: MouseEvent): void;
}

export interface ButtonSlots {
    default?: any;
}

// 暂无暴露 API
export interface ButtonExpose {}

export {}; // 模块作用域占位
