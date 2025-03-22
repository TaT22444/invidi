import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_hHH9pSXR.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/blogs.astro.mjs');
const _page2 = () => import('./pages/api/deleteblog.astro.mjs');
const _page3 = () => import('./pages/api/deletenotice.astro.mjs');
const _page4 = () => import('./pages/api/updateproject.astro.mjs');
const _page5 = () => import('./pages/dashboard/form.astro.mjs');
const _page6 = () => import('./pages/dashboard/profile.astro.mjs');
const _page7 = () => import('./pages/dashboard.astro.mjs');
const _page8 = () => import('./pages/debug.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/projects/_projectid_/cms.astro.mjs');
const _page11 = () => import('./pages/projects/_projectid_/form.astro.mjs');
const _page12 = () => import('./pages/projects/_projectid_/profile.astro.mjs');
const _page13 = () => import('./pages/projects/_projectid_.astro.mjs');
const _page14 = () => import('./pages/_userid_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const _page16 = () => import('./pages/_---catchall_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/blogs.ts", _page1],
    ["src/pages/api/deleteBlog.ts", _page2],
    ["src/pages/api/deleteNotice.ts", _page3],
    ["src/pages/api/updateProject.ts", _page4],
    ["src/pages/dashboard/form.astro", _page5],
    ["src/pages/dashboard/profile.astro", _page6],
    ["src/pages/dashboard/index.astro", _page7],
    ["src/pages/debug.astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/projects/[projectId]/cms.astro", _page10],
    ["src/pages/projects/[projectId]/form.astro", _page11],
    ["src/pages/projects/[projectId]/profile.astro", _page12],
    ["src/pages/projects/[projectId]/index.astro", _page13],
    ["src/pages/[userId]/index.astro", _page14],
    ["src/pages/index.astro", _page15],
    ["src/pages/[...catchall].astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3890b222-a8a9-46d3-8359-46b2d0434fb7"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
