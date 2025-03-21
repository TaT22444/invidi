import { e as createComponent, f as createAstro } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const url = new URL(Astro2.request.url);
  const path = url.pathname;
  console.log(`404\u30A8\u30E9\u30FC: \u30D1\u30B9 "${path}" \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093`);
  return Astro2.redirect("/");
}, "/Users/tat/Dev/indivi/src/pages/[...catchall].astro", void 0);

const $$file = "/Users/tat/Dev/indivi/src/pages/[...catchall].astro";
const $$url = "/[...catchall]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
