<script setup lang="ts">
import { ref, watchEffect, computed, useSlots } from 'vue';

// 统一组件：
// 1. fence 模式（插件注入）: 传入 props: code/raw -> 解析预览, slot 为高亮代码
// 2. 手写模式: 使用 <Demo title code> 默认 slot 为预览, code 文本显示在代码区

interface Props {
    title?: string;
    code?: string; // 手写模式源码
    raw?: string; // fence 模式原始源码（与 code 一样）
    lang?: string;
    meta?: string;
    defaultExpand?: boolean;
}

const $Prop = defineProps<Props>();
const $Slots = useSlots();

const $Data = {
    showCode: ref($Prop.defaultExpand ?? false),
    copied: ref(false)
};

// fence 模式判断：插件注入时会同时提供 raw 与 code；手写模式一般只提供 code
const $Computed = {
    fenceMode: computed(() => !!$Prop.raw),
    displayCode: computed(() => ($Prop.raw || $Prop.code || '').trim()),
    hasCode: computed(() => $Computed.displayCode.value.length > 0)
};

const Comp = ref<any>(null);
watchEffect(() => {
    // fence 模式编译 code -> 预览；非 fence 模式直接使用 slot
    if (!$Computed.fenceMode.value) {
        Comp.value = null;
        return;
    }
    try {
        // fence: 使用 code; 手写: 预览用 slot 不动态编译
        if ($Computed.fenceMode.value) {
            let source = ($Prop.code || '').trim();
            const tplMatch = source.match(/<template>([\s\S]*?)<\/template>/);
            if (tplMatch) source = tplMatch[1];
            Comp.value = {
                name: 'InlineDemo',
                template: `<div class=\"vp-demo-fragment\">${source.replace(/`/g, '\\`')}</div>`
            };
        } else {
            Comp.value = null; // 直接渲染 slot
        }
    } catch (e) {
        Comp.value = {
            name: 'InlineDemoError',
            template: `<pre style='color:red'>${(e as Error).message}</pre>`
        };
    }
});

function onToggle() {
    if (!$Computed.hasCode.value) return;
    $Data.showCode.value = !$Data.showCode.value;
}
function onCopy() {
    if (!$Computed.hasCode.value || $Data.copied.value) return;
    navigator.clipboard.writeText($Computed.displayCode.value).then(() => {
        $Data.copied.value = true;
        setTimeout(() => ($Data.copied.value = false), 1400);
    });
}
</script>

<template>
    <div
        class="vp-demo"
        :class="{
            'vp-demo--no-code': !$Computed.hasCode,
            'is-open': $Data.showCode
        }"
    >
        <component v-if="$Computed.fenceMode" :is="Comp" />
        <slot v-else />
        <div v-if="$Computed.hasCode" class="vp-demo__toolbar">
            <div class="vp-demo__info">
                <span class="vp-demo__title" v-if="$Prop.title">{{
                    $Prop.title
                }}</span>
            </div>
            <div class="vp-demo__actions">
                <button class="vp-demo__btn" @click="onToggle">
                    {{ $Data.showCode ? '隐藏代码' : '显示代码' }}
                </button>
                <button class="vp-demo__btn" @click="onCopy">
                    {{ $Data.copied ? '已复制' : '复制代码' }}
                </button>
            </div>
        </div>
        <div v-show="$Data.showCode" class="vp-demo__code">
            <pre><code><slot v-if="$Computed.fenceMode" />
<template v-else>{{ $Computed.displayCode }}</template></code></pre>
        </div>
    </div>
</template>
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
