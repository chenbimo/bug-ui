import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YiiRadio from '../src/components/radio.vue';

describe('YiiRadio', () => {
    it('selects when clicked', async () => {
        const wrapper = mount(YiiRadio, { props: { modelValue: 'A', value: 'B', name: 'g' } });
        // emulate selecting the radio input
        const input = wrapper.find('input');
        await input.setValue(true);
        const emits = wrapper.emitted('update:modelValue');
        expect(emits?.[0]?.[0]).toBe('B');
    });

    it('disabled blocks click', async () => {
        const wrapper = mount(YiiRadio, { props: { modelValue: 'A', value: 'B', name: 'g', disabled: true } });
        const input = wrapper.find('input');
        await input.setValue(true);
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
});
