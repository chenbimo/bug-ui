<template>
    <div :class="$Computed.classList" :style="$Computed.styleVars">
        <template v-if="$Slots.split">
            <template v-for="(child, index) in $Computed.childList" :key="index">
                <span v-if="index > 0" class="buig-space__split"><slot name="split" /></span>
                <span class="buig-space__item"><SpaceRender :node="child" /></span>
            </template>
        </template>
        <template v-else>
            <span v-for="(child, index) in $Computed.childList" :key="index" class="buig-space__item">
                <SpaceRender :node="child" />
            </span>
        </template>
    </div>
</template>
<script setup lang="ts">
// 外部集
import { computed, useSlots, VNode, Comment, Text, Fragment, defineComponent } from 'vue';
import type { BuigSpaceProps, BuigSpaceSlots, BuigSpaceSizeLiteral, BuigSpaceSizeLike, BuigSpaceSize } from './interface';

defineOptions({ name: 'BuigSpace' });

// 内部集（常量）
const SIZE_MAP: Record<BuigSpaceSizeLiteral, number> = { mini: 4, small: 8, medium: 12, large: 16 };

// 属性集
const $Prop = withDefaults(defineProps<BuigSpaceProps>(), {
    size: 'small',
    direction: 'horizontal',
    align: undefined,
    justify: undefined,
    wrap: false,
    fill: false
});

// 事件集（Space 无内置事件）
// const $Emit = defineEmits([]);

// 数据集（无复杂状态）
// const $Data = reactive({});

// 计算集
const $Slots = useSlots() as BuigSpaceSlots;

// 方法集（包含所有内部函数）
const $Method = {
    resolveSizeValue(v: BuigSpaceSize): number {
        if (typeof v === 'number') return v;
        return SIZE_MAP[v] ?? 0;
    },
    resolveGap(size: BuigSpaceSizeLike): { gx: number; gy: number } {
        if (Array.isArray(size)) {
            return { gx: $Method.resolveSizeValue(size[0]), gy: $Method.resolveSizeValue(size[1]) };
        }
        const val = $Method.resolveSizeValue(size as BuigSpaceSize);
        return { gx: val, gy: val };
    },
    flatChildren(nodes: VNode[] | undefined, out: VNode[] = []): VNode[] {
        if (!nodes || nodes.length === 0) return out;
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            if (!n) continue;
            const type = n.type as any;
            if (type === Comment) continue; // 忽略注释节点
            if (type === Text) {
                const raw = n.children;
                if (typeof raw === 'string') {
                    if (raw.trim() === '') continue; // 纯空白文本
                } else if (Array.isArray(raw)) {
                    // 文本片段数组（极少出现），递归扁平
                    $Method.flatChildren(raw as unknown as VNode[], out);
                    continue;
                }
            }
            if (type === Fragment) {
                const fragChildren = n.children;
                if (Array.isArray(fragChildren) && fragChildren.length) {
                    $Method.flatChildren(fragChildren as VNode[], out);
                }
                continue;
            }
            out.push(n);
        }
        return out;
    }
};

const $Computed = {
    gaps: computed(() => $Method.resolveGap($Prop.size)),
    styleVars: computed(() => {
        const { gx, gy } = $Computed.gaps.value;
        return {
            '--buig-space-gap-x': gx + 'px',
            '--buig-space-gap-y': gy + 'px',
            columnGap: gx + 'px',
            rowGap: gy + 'px'
        } as any;
    }),
    alignFinal: computed(() => ($Prop.align ? $Prop.align : $Prop.direction === 'horizontal' ? 'center' : undefined)),
    classList: computed(() => {
        const cls: string[] = ['buig-space'];
        if ($Prop.direction === 'vertical') cls.push('buig-space--vertical');
        if ($Prop.wrap) cls.push('buig-space--wrap');
        if ($Prop.fill) cls.push('buig-space--fill');
        if ($Computed.alignFinal.value) cls.push('buig-space--align-' + $Computed.alignFinal.value);
        if ($Prop.justify) cls.push('buig-space--justify-' + $Prop.justify);
        return cls;
    }),
    childList: computed(() => {
        const base = $Slots.default ? $Slots.default() : [];
        return $Method.flatChildren(base as VNode[]).filter(Boolean);
    })
};

// 暴露可选：defineExpose({ ...$Method })（暂不需要）

// 渲染包装：安全返回传入 vnode，避免误用 <component :is="vnode">
const SpaceRender = defineComponent<{ node: VNode }>({
    name: 'BuigSpaceRender',
    props: { node: { type: Object, required: true } },
    setup(props) {
        return () => props.node as any;
    }
});

// 暴露集
// defineExpose({});
</script>
<style lang="scss" scoped>
.buig-space {
    display: flex;
    flex-direction: row;
    &--vertical {
        flex-direction: column;
    }
    &--wrap {
        flex-wrap: wrap;
    }
    &--fill {
        &.buig-space--vertical > * {
            width: 100%;
        }
    }
    &--align-start {
        align-items: flex-start;
    }
    &--align-center {
        align-items: center;
    }
    &--align-end {
        align-items: flex-end;
    }
    &--align-baseline {
        align-items: baseline;
    }
    &--justify-start {
        justify-content: flex-start;
    }
    &--justify-center {
        justify-content: center;
    }
    &--justify-end {
        justify-content: flex-end;
    }
    &--justify-space-between {
        justify-content: space-between;
    }
    &--justify-space-around {
        justify-content: space-around;
    }
    &--justify-space-evenly {
        justify-content: space-evenly;
    }
    &__split {
        display: inline-flex;
        align-items: center;
    }
    &__item {
        display: inline-flex;
        align-items: center;
    }
}
</style>
