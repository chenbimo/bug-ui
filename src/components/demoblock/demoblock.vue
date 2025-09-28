<template>
    <div class="buig-demoblock" :class="demoBlockClasses">
        <div class="buig-demoblock__preview">
            <slot />
        </div>
        <div v-if="$Prop.title || $slots.desc" class="buig-demoblock__meta">
            <div v-if="$Prop.title" class="buig-demoblock__title">
                {{ $Prop.title }}
            </div>
            <div v-if="$slots.desc" class="buig-demoblock__desc">
                <slot name="desc" />
            </div>
        </div>
        <div v-if="$Prop.code" class="buig-demoblock__code">
            <pre><code>{{ $Prop.code }}</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
// 外部集
import { computed } from 'vue';

// 定义组件名称，便于全量 install 时按 name 注册以及文档中直接使用 <DemoBlock>
defineOptions({ name: 'DemoBlock' });

// 常量集
const $Const = { BLOCK: 'buig-demoblock' };

// 属性集
const $Prop = defineProps({
    title: { type: String, default: '' },
    code: { type: String, default: '' },
    compact: { type: Boolean, default: false },
    bordered: { type: Boolean, default: true }
});

// 事件集（暂无）
const $Emit = defineEmits([]);

// 数据集（暂无复杂状态）

// 计算集
const $Computed = {
    classes: computed(() => ({
        [`${$Const.BLOCK}--compact`]: $Prop.compact,
        [`${$Const.BLOCK}--bordered`]: $Prop.bordered
    }))
};

// 方法集
const $Method = {};

// 暴露集（暂不暴露方法）

// 组合到模板使用的 class（保持语义清晰）
const demoBlockClasses = $Computed.classes;
</script>
