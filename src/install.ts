import type { App } from 'vue';
// 聚合入口已迁移到 src/components.ts（编译后为 dist/components.js）
import * as components from './components';
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
