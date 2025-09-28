<template>
    <component
        :is="$Computed.isLink ? 'a' : 'button'"
        ref="$RefRoot"
        class="buig-button"
        :class="[
            `buig-button--type-${$Computed.type}`,
            `buig-button--status-${$Computed.status}`,
            `buig-button--shape-${$Computed.shape}`,
            `buig-button--size-${$Computed.size}`,
            $Prop.long && 'buig-button--long',
            $Data.loadingReal && 'buig-button--loading',
            $Computed.disabledMerged && 'buig-button--disabled',
            $Computed.onlyIcon && 'buig-button--only-icon',
            $Computed.isLink && 'buig-button--link'
        ]"
        :type="!$Computed.isLink ? $Prop.htmlType || 'button' : undefined"
        :href="
            $Computed.isLink && !$Computed.disabledMerged && !$Data.loadingReal
                ? $Prop.href
                : undefined
        "
        :target="$Computed.isLink ? $Prop.target : undefined"
        :disabled="!$Computed.isLink && $Computed.disabledMerged"
        :autofocus="$Prop.autofocus"
        @click="$Method.onClick"
    >
        <span
            v-if="$Data.loadingReal || $Slots.icon || $Prop.icon"
            class="buig-button__icon"
        >
            <slot name="icon" v-if="!$Data.loadingReal && !$Prop.icon" />
            <component
                v-else-if="!$Data.loadingReal && $Prop.icon"
                :is="$Prop.icon"
            />
            <span v-else class="buig-button__spinner" />
        </span>
        <span class="buig-button__content"><slot /></span>
    </component>
</template>

<script setup lang="ts">
import {
    reactive,
    computed,
    ref,
    onMounted,
    watch,
    onBeforeUnmount,
    useSlots
} from 'vue';
import type { ButtonProps, ButtonEmits, ButtonExpose } from './interface';

defineOptions({ name: 'BuigButton' });

// 内部常量
const $Const = {
    DEFAULT_TYPE: 'secondary' as const,
    DEFAULT_STATUS: 'normal' as const,
    DEFAULT_SIZE: 'medium' as const
};

// 属性集
const $Prop = defineProps<ButtonProps>();
// 事件集
const $Emit = defineEmits(['click']);

// 引用
const $RefRoot = ref<HTMLElement | null>(null);

// 数据集
const $Data = reactive({
    loadingReal: false,
    loadingTimer: 0 as number | 0
});

// 计算集
// 先定义槽，再定义依赖槽的计算
const $SlotsRaw = useSlots();
const $Slots = {
    get default() {
        return !!$SlotsRaw.default;
    },
    get icon() {
        return !!$SlotsRaw.icon;
    }
};

const $Computed = {
    isLink: computed(() => !!$Prop.href),
    type: computed(() => $Prop.buttonType || $Const.DEFAULT_TYPE),
    status: computed(() => $Prop.status || $Const.DEFAULT_STATUS),
    shape: computed(() => $Prop.shape || 'square'),
    size: computed(() => $Prop.size || $Const.DEFAULT_SIZE),
    disabledMerged: computed(() => !!$Prop.disabled),
    onlyIcon: computed(() => !$Slots.default && ($Slots.icon || !!$Prop.icon)),
    interactive: computed(
        () => !$Computed.disabledMerged.value && !$Data.loadingReal
    )
};

// 访问未在上方显式读取的属性用于潜在生成脚本：buttonType long loadingDelay icon href target htmlType autofocus size
void ($Prop.buttonType,
$Prop.long,
$Prop.loadingDelay,
$Prop.icon,
$Prop.href,
$Prop.target,
$Prop.htmlType,
$Prop.autofocus,
$Prop.size);

// 已通过 useSlots 定义 $Slots

// 方法集
const $Method = {
    applyLoadingImmediate() {
        if ($Prop.loadingDelay && $Prop.loadingDelay > 0) {
            if ($Data.loadingTimer) window.clearTimeout($Data.loadingTimer);
            if ($Prop.loading) {
                $Data.loadingTimer = window.setTimeout(() => {
                    $Data.loadingReal = true;
                }, $Prop.loadingDelay);
            } else {
                $Data.loadingReal = false;
            }
        } else {
            $Data.loadingReal = !!$Prop.loading;
        }
    },
    onClick(e: MouseEvent) {
        if (!$Computed.interactive.value) {
            e.preventDefault();
            return;
        }
        $Emit('click', e);
    },
    focus() {
        $RefRoot.value && ($RefRoot.value as HTMLElement).focus();
    }
};

watch(
    () => $Prop.loading,
    () => $Method.applyLoadingImmediate(),
    { immediate: true }
);
onMounted(() => {
    if ($Prop.autofocus) $Method.focus();
});
onBeforeUnmount(() => {
    if ($Data.loadingTimer) window.clearTimeout($Data.loadingTimer);
});

defineExpose<ButtonExpose>({ focus: $Method.focus });
</script>
<style lang="scss" scoped>
// Button SCSS (BEM + nested)
// 引入集中工具（函数 / 混入 / map 数据）
@use '../../styles/tools' as ui;

.buig-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid transparent;
    padding: 0 14px;
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    background: var(--ui-button-bg, var(--ui-color-bg-elevated));
    color: var(--ui-button-fg, var(--ui-color-text));
    border-radius: var(--ui-button-radius, var(--ui-radius-sm));
    transition:
        background 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    text-decoration: none;

    // Type modifiers
    &--type-primary {
        background: var(--ui-color-primary);
        color: var(--ui-color-primary-foreground, #fff);
        @include ui.button-interactive-bg(
            var(--ui-color-primary-hover, var(--ui-color-primary)),
            var(--ui-color-primary-active, var(--ui-color-primary))
        );
        // Status coloring（限定 primary 下的语义状态）
        &.buig-button--status-success {
            background: var(--ui-color-success);
        }
        &.buig-button--status-danger {
            background: var(--ui-color-danger);
        }
        &.buig-button--status-warning {
            background: var(--ui-color-warning);
        }
        &.buig-button--status-info {
            background: var(--ui-color-info);
        }
    }
    &--type-secondary {
        background: var(--ui-color-bg-elevated);
        color: var(--ui-color-text);
        border-color: var(--ui-color-border);
        @include ui.button-interactive-bg(
            var(--ui-color-bg-hover, var(--ui-color-bg-elevated)),
            var(--ui-color-bg-active, var(--ui-color-bg-elevated))
        );
    }
    &--type-dashed {
        background: var(--ui-color-bg-elevated);
        border-style: dashed;
        border-color: var(--ui-color-border);
    }
    &--type-outline {
        background: transparent;
        color: var(--ui-color-text);
        border-color: var(--ui-color-border-strong, var(--ui-color-primary));
        @include ui.button-interactive-bg(
            var(--ui-color-bg-hover, rgba(0, 0, 0, 0.04))
        );
    }
    &--type-text {
        background: transparent;
        border-color: transparent;
        color: var(--ui-color-primary);
        @include ui.button-interactive-bg(
            var(--ui-color-bg-hover, rgba(0, 0, 0, 0.05))
        );
    }

    // （状态类已合并进上方 &--type-primary 中）

    // Shape
    &--shape-round {
        border-radius: 999px;
    }
    &--shape-circle {
        border-radius: 50%;
        padding: 0;
    }

    // Sizes (generated via mixin; also handles only-icon & circle width)
    @include ui.button-generate-sizes(ui.$button-sizes, '.buig-button');

    // Long
    &--long {
        width: 100%;
    }

    // Icon
    &__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    &--only-icon {
        padding: 0;
    }
    &--only-icon &__content {
        display: none;
    }

    // Disabled & Loading
    &--disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
    &--loading {
        cursor: progress;
    }

    // Spinner
    &__spinner {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: buig-btn-spin 0.6s linear infinite;
    }

    // Focus
    &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px
            var(--ui-color-focus-ring, rgba(64, 140, 255, 0.4));
    }
}

@keyframes buig-btn-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
