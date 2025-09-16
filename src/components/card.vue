<template>
    <div class="yii-card">
        <div v-if="$slots.header" class="yii-card__header"><slot name="header" /></div>
        <div class="yii-card__body"><slot /></div>
        <div v-if="$slots.footer" class="yii-card__footer"><slot name="footer" /></div>
    </div>
</template>

<script setup>
defineOptions({ name: 'YiiCard' });
</script>

<style>
.yii-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
}
.yii-card__header {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    font-weight: 600;
}
.yii-card__body {
    padding: 16px;
}
.yii-card__footer {
    padding: 12px 16px;
    border-top: 1px solid #e5e7eb;
    text-align: right;
}
</style>
