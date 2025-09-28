import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import '../../../src/styles/all.scss';
import { registerDemo } from '../../plugins/demo';
import BuigInstall from '../../../src/install';

const theme: Theme = {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(BuigInstall);

        registerDemo(app);
    }
};

export default theme;
