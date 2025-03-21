import { e as createComponent, k as renderHead, r as renderTemplate } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Debug = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>デバッグページ</title>${renderHead()}</head> <body> <h1>デバッグページ</h1> <p>このページが表示されればルーティングの基本は機能しています。</p> <p>現在の時刻: ${(/* @__PURE__ */ new Date()).toLocaleString("ja-JP")}</p> <h2>環境変数チェック</h2> <pre>PUBLIC_FIREBASE_PROJECT_ID: ${"test-87192"}</pre> </body></html>`;
}, "/Users/tat/Dev/indivi/src/pages/debug.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/debug.astro";
const $$url = "/debug";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Debug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
