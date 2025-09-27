export type ButtonVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface ButtonEmits {
    (e: 'click', ev: MouseEvent): void;
}

// 未来可能扩展暴露方法
// export interface ButtonExpose { focus: () => void }

export {}; // 保持模块化