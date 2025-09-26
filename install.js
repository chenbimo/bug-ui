import * as components from './src/components/index.js';

export const componentsList = components;

export function install(app) {
    Object.entries(components).forEach(([name, comp]) => {
        if (comp && comp.name) {
            app.component(comp.name, comp);
        }
    });
}

export default { install };
