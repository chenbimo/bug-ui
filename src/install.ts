import type { App } from 'vue';
import * as components from './components/index.js';
import type { BuigInstallOptions, BuigComponentWithName } from '../types';

export const componentsList = components;

export function install(app: App, options: BuigInstallOptions = {}): void {
    const prefix = options.prefix ?? '';
    Object.entries(components).forEach(([name, comp]) => {
        const c = comp as unknown as BuigComponentWithName | undefined;
        if (c && c.name) {
            const registeredName = prefix ? prefix + c.name : c.name;
            app.component(registeredName, c as any);
        }
    });
}

export default { install };
