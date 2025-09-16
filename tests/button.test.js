import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { YiiButton } from '../src/components/index.js';

describe('YiiButton', () => {
    it('renders slot content', () => {
        const wrapper = mount(YiiButton, { slots: { default: '按钮' } });
        expect(wrapper.text()).toContain('按钮');
    });
    it('emits onClick when interactive', async () => {
        const onClick = vi.fn();
        const wrapper = mount(YiiButton, { attrs: { onOnClick: onClick } });
        await wrapper.trigger('click');
        expect(onClick).toHaveBeenCalled();
    });
    it('does not emit when disabled', async () => {
        const onClick = vi.fn();
        const wrapper = mount(YiiButton, { props: { disabled: true }, attrs: { onOnClick: onClick } });
        await wrapper.trigger('click');
        expect(onClick).not.toHaveBeenCalled();
    });
});
