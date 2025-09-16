import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { YiiInput } from '../src/components/index.js';

describe('YiiInput', () => {
    it('v-model works', async () => {
        const wrapper = mount(YiiInput, { props: { modelValue: '' } });
        const input = wrapper.find('input');
        await input.setValue('abc');
        const events = wrapper.emitted('update:modelValue');
        expect(events?.[0]?.[0]).toBe('abc');
    });
    it('disabled blocks input', async () => {
        const wrapper = mount(YiiInput, { props: { modelValue: '', disabled: true } });
        const input = wrapper.find('input');
        await input.setValue('abc');
        const events = wrapper.emitted('update:modelValue');
        expect(events).toBeUndefined();
    });
});
