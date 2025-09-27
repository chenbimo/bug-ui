// interface.ts - Button 类型定义（集中 Props / Emits / Slots / Expose）
// 说明：已移除旧兼容字段（variant / legacySize），未来所有文档/自动化仅解析本文件。

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'dashed'
    | 'outline'
    | 'text';
export type ButtonStatus = 'normal' | 'warning' | 'success' | 'danger';
export type ButtonShape = 'square' | 'round' | 'circle';
export type ButtonSize = 'mini' | 'small' | 'medium' | 'large';

export interface ButtonProps {
    buttonType?: ButtonType;
    status?: ButtonStatus;
    shape?: ButtonShape;
    size?: ButtonSize;
    long?: boolean;
    loading?: boolean;
    loadingDelay?: number;
    disabled?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    autofocus?: boolean;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    icon?: any;
}

export interface ButtonEmits {
    (e: 'click', ev: MouseEvent): void;
}

export interface ButtonSlots {
    default?: any;
    icon?: any;
}

export interface ButtonExpose {
    focus: () => void;
}

export {}; // 模块作用域占位
