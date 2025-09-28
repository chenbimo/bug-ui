// Demo registry & helpers
// 约定：/src/components/<component>/demo/<name>.vue → id: <component>/<name>

const demoModules = import.meta.glob('/src/components/**/demo/*.vue');
const rawModules = import.meta.glob('/src/components/**/demo/*.vue', {
    as: 'raw'
});

interface DemoMod {
    default: any;
}

function normalizeId(full: string) {
    return full
        .replace(/\\/g, '/')
        .replace('/src/components/', '')
        .replace(/\/demo\//, '/')
        .replace(/\.vue$/, '');
}

const idMap: Record<string, () => Promise<DemoMod>> = {};
const rawMap: Record<string, () => Promise<string>> = {};
for (const p in demoModules) {
    const id = normalizeId(p);
    idMap[id] = demoModules[p] as any;
}
for (const p in rawModules) {
    const id = normalizeId(p);
    rawMap[id] = rawModules[p] as any;
}

export async function loadDemo(id: string) {
    if (!idMap[id]) throw new Error(`Demo not found: ${id}`);
    return idMap[id]();
}

export async function loadDemoSource(id: string) {
    if (!rawMap[id]) throw new Error(`Raw demo not found: ${id}`);
    return rawMap[id]();
}

export function listComponentDemos(component: string) {
    const prefix = component + '/';
    return Object.keys(idMap)
        .filter((k) => k.startsWith(prefix))
        .sort();
}

export {}; // module scope
