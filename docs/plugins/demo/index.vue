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

const $Computed = {
    fenceMode: computed(() => !!$Prop.raw && !!$Prop.code),
    displayCode: computed(() => $Prop.raw || $Prop.code || ''),
    hasCode: computed(() => !!$Computed.displayCode.value)
};

const Comp = ref<any>(null);
watchEffect(() => {
    if (!$Computed.fenceMode.value && !$Slots.default) {
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
    if ($Computed.hasCode.value) $Data.showCode.value = !$Data.showCode.value;
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
    <div class="vp-demo" :class="{ 'vp-demo--no-code': !$Computed.hasCode }">
        <div class="vp-demo__preview">
            <component v-if="$Computed.fenceMode" :is="Comp" />
            <slot v-else />
        </div>
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
        <transition name="vp-demo-code-fade">
            <div v-show="$Data.showCode" class="vp-demo__code">
                <pre><code><slot v-if="$Computed.fenceMode" />
<template v-else>{{ $Computed.displayCode }}</template></code></pre>
            </div>
        </transition>
    </div>
</template>
