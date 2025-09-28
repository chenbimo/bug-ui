<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface Props {
    code: string;
    raw: string;
    lang?: string;
    meta?: string;
}

const $Prop = defineProps<Props>();

const $Data = {
    showCode: ref(false),
    copied: ref(false)
};

function copy() {
    if ($Data.copied.value) return;
    navigator.clipboard.writeText($Prop.raw).then(() => {
        $Data.copied.value = true;
        setTimeout(() => ($Data.copied.value = false), 1400);
    });
}

const Comp = ref<any>(null);
watchEffect(() => {
    try {
        let source = $Prop.code.trim();
        const tplMatch = source.match(/<template>([\s\S]*?)<\/template>/);
        if (tplMatch) source = tplMatch[1];
        Comp.value = {
            name: 'InlineDemo',
            template: `<div class=\"vp-demo-fragment\">${source.replace(/`/g, '\\`')}</div>`
        };
    } catch (e) {
        Comp.value = {
            name: 'InlineDemoError',
            template: `<pre style='color:red'>${(e as Error).message}</pre>`
        };
    }
});
</script>

<template>
    <div
        class="vp-demo-preview"
        :class="{ 'vp-demo-preview--collapsed': !$Data.showCode }"
    >
        <div class="vp-demo-preview__toolbar">
            <button
                class="vp-demo-preview__btn"
                @click="$Data.showCode = !$Data.showCode"
            >
                {{ $Data.showCode ? '隐藏代码' : '显示代码' }}
            </button>
            <button class="vp-demo-preview__btn" @click="copy()">
                {{ $Data.copied ? '已复制' : '复制代码' }}
            </button>
        </div>
        <div class="vp-demo-preview__content">
            <component :is="Comp" />
        </div>
        <div class="vp-demo-preview__code">
            <slot />
        </div>
    </div>
</template>
