import type { App } from 'vue';
import Demo from './index.vue';
import './style.scss';

export function registerDemo(app: App) {
    app.component('Demo', Demo);
}

export { createDemoPreviewPlugin } from './plugin';
