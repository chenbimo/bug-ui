// 基于 Arco Button 能力的对标扩展，同时兼容旧 variant / size 语义。

// 旧 variant （保持暂存）
export type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

// Arco 类型：type（风格），这里使用更通用命名 buttonType 避免与 TS 中 type 关键词混淆
export type ButtonType = 'primary' | 'secondary' | 'dashed' | 'outline' | 'text';
export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';
export type ButtonShape = 'square' | 'round' | 'circle';
// 尺寸适配：Arco: mini / small / medium / large；旧：xs / sm / md / lg
export type ButtonLegacySize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';

export interface ButtonProps {
    // 新体系
    buttonType?: ButtonType; // 优先于旧 variant
    status?: ButtonStatus;
    shape?: ButtonShape;
    size?: ButtonSize; // 新尺寸体系
    long?: boolean; // 宽度占满
    loading?: boolean;
    loadingDelay?: number; // ms 延迟进入 loading
    disabled?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    autofocus?: boolean;
    href?: string; // 作为链接渲染
    target?: '_blank' | '_self' | '_parent' | '_top';
    // 兼容旧属性
    variant?: ButtonVariant; // 向新 buttonType 映射
    legacySize?: ButtonLegacySize; // 向新 size 映射
    // 图标支持
    icon?: any; // 允许直接传图标组件（备用于简化 slot 使用）
}

export interface ButtonEmits {
    (e: 'click', ev: MouseEvent): void;
}

export interface ButtonExpose {
    focus: () => void;
}

export {}; // 保持模块化
