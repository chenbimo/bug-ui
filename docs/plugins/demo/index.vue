<template>
    <div
        class="vp-demo"
        :class="{
            'vp-demo--no-code': !$Computed.hasCode,
            'is-open': $Data.showCode
        }"
    >
        <slot />
        <div v-if="$Computed.hasCode" class="vp-demo__toolbar">
            <div class="vp-demo__info">
                <span class="vp-demo__title" v-if="$Prop.title">{{
                    $Prop.title
                }}</span>
            </div>
            <div class="vp-demo__actions">
                <button class="vp-demo__btn" @click="$Method.onToggle()">
                    {{ $Data.showCode ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="vp-demo__btn" @click="$Method.onCopy()">
                    {{ $Data.copied ? '已复制' : '复制代码' }}
                </button>
            </div>
        </div>
        <div v-if="$Data.showCode" class="vp-demo__code">
            <pre><code>{{ $Computed.displayCode }}</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, useSlots } from 'vue';

// 统一组件：
// 1. fence 模式（插件注入）: 传入 props: code/raw -> 解析预览, slot 为高亮代码
// 2. 手写模式: 使用 <Demo title code> 默认 slot 为预览, code 文本显示在代码区

interface Props {
    title?: string;
    code?: string; // 手写模式源码（预览使用 slot；此字段仅用于代码区显示）
    lang?: string;
    meta?: string;
}

const $Prop = defineProps<Props>();
const $Slots = useSlots();

const $Data = reactive({ showCode: false, copied: false });
console.log('🔥[ $Prop ]-59', $Prop);

// 仅手写模式：如果传入 code 则显示；否则认为无代码区
const $Computed = {
    displayCode: computed(() => ($Prop.code || '').trim()),
    hasCode: computed(() => $Computed.displayCode.value.length > 0)
};

// 方法集
const $Method = {
    onToggle() {
        $Data.showCode = !$Data.showCode;
    },
    onCopy() {
        if (!$Computed.hasCode.value || $Data.copied) return;
        navigator.clipboard.writeText($Computed.displayCode.value).then(() => {
            $Data.copied = true;
            setTimeout(() => ($Data.copied = false), 1400);
        });
    }
};

// 暴露集（如外部需要控制展开可选择暴露）
// defineExpose({ toggle: $Method.onToggle })
</script>

<style lang="scss" scoped>
/* Demo styles (nested BEM, 方案1) */
.vp-demo {
    position: relative;
    margin: 20px 0 32px;
    border: 1px solid var(--vp-c-divider, #e2e2e3);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
    font-size: 14px;
    /* 预览包装与浮动操作区已在方案6中移除 */

    &__toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 10px;
        background: var(--vp-c-bg-alt);
        font-family: var(--vp-font-family-mono);
    }

    &__info {
        flex: 1;
        min-width: 0;
    }

    &__title {
        font-weight: 500;
        color: var(--vp-c-text-1);
    }

    &__actions {
        display: flex;
        gap: 8px;
    }

    &__btn {
        cursor: pointer;
        padding: 2px 8px;
        line-height: 1.4;
        border-radius: 4px;
        background: transparent;
        border: 1px solid transparent;
        font-size: 12px;
        color: var(--vp-c-text-2);
        &:hover {
            color: var(--vp-c-brand-1);
        }
    }

    &__code {
        border-top: 1px solid var(--vp-c-divider, #e2e2e3);
        padding: 10px;
        pre {
            margin: 0;
            border-radius: 0 0 8px 8px;
        }
    }
}

/* 空片段占位 */
.vp-demo-fragment:empty {
    min-height: 20px;
    display: block;
}
</style>
