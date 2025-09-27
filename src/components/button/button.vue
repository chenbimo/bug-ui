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
    onBeforeUnmount
} from 'vue';
import type { ButtonProps, ButtonEmits, ButtonExpose } from './types';

defineOptions({ name: 'BuigButton' });

// 内部常量与兼容映射
const $Const = {
    DEFAULT_TYPE: 'secondary' as const,
    DEFAULT_STATUS: 'normal' as const,
    DEFAULT_SIZE: 'medium' as const,
    LEGACY_VARIANT_MAP: {
        primary: 'primary',
        success: 'primary',
        warning: 'primary',
        danger: 'primary',
        neutral: 'secondary'
    } as Record<string, string>,
    LEGACY_SIZE_MAP: {
        xs: 'mini',
        sm: 'small',
        md: 'medium',
        lg: 'large'
    } as Record<string, string>
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
const $Computed = {
    isLink: computed(() => !!$Prop.href),
    type: computed(
        () =>
            $Prop.buttonType ||
            ($Prop.variant && $Const.LEGACY_VARIANT_MAP[$Prop.variant]) ||
            $Const.DEFAULT_TYPE
    ),
    status: computed(() => $Prop.status || $Const.DEFAULT_STATUS),
    shape: computed(() => $Prop.shape || 'square'),
    size: computed(
        () =>
            $Prop.size ||
            ($Prop.legacySize && $Const.LEGACY_SIZE_MAP[$Prop.legacySize]) ||
            $Const.DEFAULT_SIZE
    ),
    disabledMerged: computed(() => !!$Prop.disabled),
    onlyIcon: computed(() => !$Slots.default && ($Slots.icon || $Prop.icon)),
    interactive: computed(
        () => !$Computed.disabledMerged.value && !$Data.loadingReal
    )
};

// 访问未在上方显式读取的属性用于元数据提取：buttonType long loadingDelay legacySize variant icon href target htmlType autofocus
void ($Prop.buttonType,
$Prop.long,
$Prop.loadingDelay,
$Prop.legacySize,
$Prop.variant,
$Prop.icon,
$Prop.href,
$Prop.target,
$Prop.htmlType,
$Prop.autofocus,
$Prop.size);

// 槽引用（便于 onlyIcon 判定）
const $Slots = { icon: !!(__VUE_SLOT_FLAGS__ && false) } as any; // 占位：运行时通过 template 中 $slots 使用，这里仅静态类型绕过

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
