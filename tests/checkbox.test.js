import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YiiCheckbox from '../src/components/checkbox.vue';

describe('YiiCheckbox', () => {
    it('toggles when clicked (v-model)', async () => {
        const wrapper = mount(YiiCheckbox, { props: { modelValue: false } });
        await wrapper.find('input').setChecked(true);
        const emits = wrapper.emitted('update:modelValue');
        expect(emits?.[0]?.[0]).toBe(true);
    });

    it('disabled blocks click', async () => {
        const wrapper = mount(YiiCheckbox, { props: { modelValue: false, disabled: true } });
        await wrapper.find('input').setChecked(true);
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
});
