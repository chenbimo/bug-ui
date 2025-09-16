import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YiiSwitch from '../src/components/switch.vue';

describe('YiiSwitch', () => {
    it('toggles value on click', async () => {
        const wrapper = mount(YiiSwitch, { props: { modelValue: false } });
        await wrapper.trigger('click');
        const emits = wrapper.emitted('update:modelValue');
        expect(emits?.[0]?.[0]).toBe(true);
    });

    it('disabled blocks click', async () => {
        const wrapper = mount(YiiSwitch, { props: { modelValue: false, disabled: true } });
        await wrapper.trigger('click');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
});
