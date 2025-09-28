import type { App } from 'vue';
import DemoPreview from './index.vue';
import './style.scss';

export function registerDemo(app: App) {
    app.component('DemoPreview', DemoPreview);
}

export { createDemoPreviewPlugin } from './plugin';
