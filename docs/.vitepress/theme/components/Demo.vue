<script setup lang="ts">
import { ref } from 'vue';
import { loadDemo, loadDemoSource } from '../demos';

interface Props {
    id: string; // componentName/demoName
    title?: string;
    desc?: string;
    showCode?: boolean;
}
const props = defineProps<Props>();

const Comp = ref<any>(null);
const source = ref<string>('');
const expanded = ref(false);
const loading = ref(true);
const codeLoading = ref(false);
const error = ref<string>('');

async function ensureDemo() {
    try {
        const mod = await loadDemo(props.id);
        if (!mod) {
            error.value = 'Demo not found';
            return;
        }
        Comp.value = mod.default;
    } catch (e) {
        error.value = (e as Error).message;
    } finally {
        loading.value = false;
    }
}
ensureDemo();

async function toggleCode() {
    if (!props.showCode && props.showCode !== undefined) return;
    expanded.value = !expanded.value;
    if (expanded.value && !source.value) {
        codeLoading.value = true;
        try {
            source.value = await loadDemoSource(props.id);
        } catch (e) {
            source.value = '// 源码加载失败';
        } finally {
            codeLoading.value = false;
        }
    }
}

function copyCode() {
    if (!source.value) return;
    navigator.clipboard.writeText(source.value);
}
</script>

<template>
    <section class="demo-block" :data-id="props.id">
        <header v-if="title || desc" class="demo-block__header">
            <h4 class="demo-block__title" v-if="title">{{ title }}</h4>
            <p class="demo-block__desc" v-if="desc">{{ desc }}</p>
        </header>
        <div class="demo-block__preview">
            <div v-if="loading" class="demo-block__loading">Loading...</div>
            <div v-else-if="error" class="demo-block__error">{{ error }}</div>
            <component :is="Comp" v-else />
        </div>
        <footer v-if="showCode !== false" class="demo-block__footer">
            <button class="demo-block__action" @click="toggleCode">
                {{ expanded ? '隐藏代码' : '查看代码' }}
            </button>
            <button
                class="demo-block__action"
                @click="copyCode"
                :disabled="!source"
            >
                复制
            </button>
        </footer>
        <transition name="demo-code">
            <div v-show="expanded" class="demo-block__code">
                <div v-if="codeLoading" class="demo-block__loading">
                    Loading code...
                </div>
                <pre v-else><code class="language-vue">{{ source }}</code></pre>
            </div>
        </transition>
    </section>
</template>

<style>
@import '../demo.css';
</style>
