// interface.ts - Button 类型定义（集中 Props / Emits / Slots / Expose）
// 方案4：完整对标 Arco Button 的核心 Props 与 Group 共享能力（裁剪非必要全局配置）。
// 注意：样式变量统一使用 --buig-* 前缀（不使用 --ui-*）。

// 类型枚举
export type ButtonType = 'secondary' | 'primary' | 'dashed' | 'outline' | 'text';
export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';
export type ButtonShape = 'square' | 'round' | 'circle';

// Props 定义
export interface ButtonProps {
    type?: ButtonType; // 主题类型
    status?: ButtonStatus; // 语义状态
    size?: ButtonSize; // 尺寸
    shape?: ButtonShape; // 形状
    long?: boolean; // 宽度 100%
    loading?: boolean; // 加载中
    disabled?: boolean; // 禁用
    htmlType?: string; // 原生 button type
    autofocus?: boolean; // 自动聚焦
    href?: string; // 链接模式（渲染为 <a>）
}

// Group Props（用于 provide 注入）
export interface ButtonGroupProps {
    type?: ButtonType;
    status?: ButtonStatus;
    size?: ButtonSize;
    shape?: ButtonShape;
    disabled?: boolean;
}

// Emits
export interface ButtonEmits {
    (e: 'click', ev: MouseEvent): void;
}

// Slots
export interface ButtonSlots {
    default?: any;
    icon?: any;
}

// 暴露 API（后续可加入 focus 等方法）
export interface ButtonExpose {}

// Group Expose（保留占位）
export interface ButtonGroupExpose {}

export const buttonGroupInjectionKey = Symbol('BuigButtonGroup');

export {}; // 模块作用域占位
