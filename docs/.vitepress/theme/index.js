import DefaultTheme from 'vitepress/theme';
import * as YiiUI from '../../../src/index.js';
import '../../../src/styles/tokens.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 全量注册组件库（开发文档预览）
        if (YiiUI && YiiUI.install) {
            app.use(YiiUI);
        } else {
            // 兜底：逐个注册命名导出的组件
            Object.values(YiiUI).forEach((c) => c && c.name && app.component(c.name, c));
        }
    }
};
