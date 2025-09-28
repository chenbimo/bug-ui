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
