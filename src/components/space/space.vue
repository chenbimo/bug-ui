<template>
    <div :class="$Computed.classList" :style="$Computed.styleVars">
        <template v-for="(item, index) in $Computed.items" :key="item.key">
            <component :is="item.node" />
            <template v-if="item.hasSplit">
                <span class="buig-space__split">
                    <component v-for="(s, si) in $Computed.splitNodes" :is="s" :key="si" />
                </span>
            </template>
        </template>
    </div>
</template>
<script setup lang="ts">
// 外部集
import { computed, useSlots, VNode, h, Comment, Text, Fragment } from 'vue';
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

function resolveSizeValue(v: BuigSpaceSize): number {
    if (typeof v === 'number') return v;
    return SIZE_MAP[v] ?? 0;
}

function resolveGap(size: BuigSpaceSizeLike): { gx: number; gy: number } {
    if (Array.isArray(size)) {
        return { gx: resolveSizeValue(size[0]), gy: resolveSizeValue(size[1]) };
    }
    const val = resolveSizeValue(size as BuigSpaceSize);
    return { gx: val, gy: val };
}

function flatChildren(nodes: VNode[] | undefined, out: VNode[] = []): VNode[] {
    if (!nodes) return out;
    for (const n of nodes) {
        if (!n) continue;
        if (n.type === Comment) continue; // 忽略注释
        if (n.type === Text) {
            // 过滤纯空白文本
            const text = String(n.children ?? '').trim();
            if (!text) continue;
        }
        if (n.type === Fragment && Array.isArray(n.children)) {
            flatChildren(n.children as VNode[], out);
        } else {
            out.push(n);
        }
    }
    return out;
}

const $Computed = {
    gaps: computed(() => resolveGap($Prop.size)),
    styleVars: computed(() => {
        const { gx, gy } = $Computed.gaps.value;
        return {
            '--buig-space-gap-x': gx + 'px',
            '--buig-space-gap-y': gy + 'px',
            gap: gy + 'px ' + gx + 'px'
        } as any;
    }),
    alignFinal: computed(() => {
        if ($Prop.align) return $Prop.align;
        // 默认水平 center，对齐 Arco 默认
        return $Prop.direction === 'horizontal' ? 'center' : undefined;
    }),
    classList: computed(() => {
        const cls: string[] = ['buig-space'];
        if ($Prop.direction === 'vertical') cls.push('buig-space--vertical');
        if ($Prop.wrap) cls.push('buig-space--wrap');
        if ($Prop.fill) cls.push('buig-space--fill');
        if ($Computed.alignFinal.value) cls.push('buig-space--align-' + $Computed.alignFinal.value);
        if ($Prop.justify) cls.push('buig-space--justify-' + $Prop.justify);
        return cls;
    }),
    rawChildren: computed(() => flatChildren($Slots.default ? $Slots.default() : [])),
    splitNodes: computed(() => {
        if (!$Slots.split) return [] as VNode[];
        const r = $Slots.split();
        return Array.isArray(r) ? r : r ? [r] : [];
    }),
    items: computed(() => {
        const ch = $Computed.rawChildren.value;
        const hasSplit = $Computed.splitNodes.value.length > 0;
        return ch.map((node, idx) => ({
            key: (node.key ?? 'idx-' + idx) as any,
            node,
            hasSplit: hasSplit && idx < ch.length - 1
        }));
    })
};

// 方法集（当前无需）
const $Method = {};

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
}
</style>
