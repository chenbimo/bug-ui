<template>
    <button class="yii-button" :class="[`yii-button--${variant}`, disabled && 'yii-button--disabled', loading && 'yii-button--loading']" :disabled="disabled || loading" @click="$Method.onClick">
        <span class="yii-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup>
// 外部集
import { reactive, computed /*, onMounted */ } from 'vue';

// 组件名
defineOptions({ name: 'YiiButton' });

// 属性集
const $Prop = defineProps({
    variant: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
});

// 事件集
const $Emit = defineEmits(['onClick']);

// 数据集（占位）
const $Data = reactive({});

// 计算集（对象组织）
const $Computed = {
    interactive: computed(() => !$Prop.disabled && !$Prop.loading)
};

// 方法集
const $Method = {
    onClick(e) {
        if (!$Computed.interactive.value) return;
        $Emit('onClick', e);
    }
};

// 生命周期（当前无需初始化）
// onMounted(() => { /* $Method.initData?.() */ })
</script>

<style>
/* 注意：仅使用全局 tokens（src/styles/tokens.css），组件内不重复定义 :root 变量 */
.yii-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid transparent;
    border-radius: var(--ui-radius);
    padding: var(--ui-padding-y) var(--ui-padding-x);
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    background: var(--ui-color-primary);
    color: var(--ui-color-primary-foreground);
}
.yii-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.yii-button--loading {
    opacity: 0.85;
}
</style>
