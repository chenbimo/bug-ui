<template>
    <div class="buig-pagination">
        <button class="buig-pagination__btn" :disabled="$Prop.page! <= 1" @click="$Method.to(($Prop.page || 1) - 1)">上一页</button>
        <span class="buig-pagination__info">{{ $Prop.page }} / {{ $Computed.pages }}</span>
        <button class="buig-pagination__btn" :disabled="$Prop.page! >= $Computed.pages" @click="$Method.to(($Prop.page || 1) + 1)">下一页</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
defineOptions({ name: 'BuigPagination' });
const $Prop = defineProps<{ page?: number; total?: number; pageSize?: number }>();
const $Emit = defineEmits<{ (e: 'update:page', v: number): void; (e: 'change', v: number): void }>();
const $Computed = { pages: computed(() => Math.max(1, Math.ceil(Number($Prop.total || 0) / Number($Prop.pageSize || 10) || 1))) };
const $Method = {
    to(p: number) {
        const np = Math.max(1, Math.min($Computed.pages.value, p));
        if (np === $Prop.page) return;
        $Emit('update:page', np);
        $Emit('change', np);
    }
};
</script>

<style>
.buig-pagination {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}
.buig-pagination__btn {
    height: 28px;
    border-radius: 6px;
    border: 1px solid var(--ui-color-border, #d9d9d9);
    background: var(--ui-color-bg, #fff);
    padding: 0 10px;
    cursor: pointer;
    color: var(--ui-color-text, #444);
}
.buig-pagination__info {
    color: var(--ui-color-text-secondary, #666);
    font-size: 12px;
}
</style>
