<template>
    <div class="yii-pagination">
        <button class="yii-pagination__btn" :disabled="$Prop.page <= 1" @click="$Method.to($Prop.page - 1)">上一页</button>
        <span class="yii-pagination__info">{{ $Prop.page }} / {{ $Computed.pages }}</span>
        <button class="yii-pagination__btn" :disabled="$Prop.page >= $Computed.pages" @click="$Method.to($Prop.page + 1)">下一页</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({ name: 'YiiPagination' });
const $Prop = defineProps({ page: { type: Number, default: 1 }, total: { type: Number, default: 0 }, pageSize: { type: Number, default: 10 } });
const $Emit = defineEmits(['update:page', 'onChange']);
const $Computed = { pages: computed(() => Math.max(1, Math.ceil(Number($Prop.total) / Number($Prop.pageSize) || 1))) };
const $Method = {
    to(p) {
        const np = Math.max(1, Math.min($Computed.pages.value, p));
        if (np === $Prop.page) return;
        $Emit('update:page', np);
        $Emit('onChange', np);
    }
};
</script>

<style>
.yii-pagination {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}
.yii-pagination__btn {
    height: 28px;
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    background: #fff;
    padding: 0 10px;
    cursor: pointer;
}
.yii-pagination__info {
    color: #666;
    font-size: 12px;
}
</style>
