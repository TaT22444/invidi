import { e as createComponent, r as renderTemplate, i as renderComponent, k as renderHead } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_Dfj0wdIZ.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_b || (_b = __template([`<html lang="ja"> <head><meta charset="UTF-8"><title>\u30ED\u30B0\u30A4\u30F3</title><script type="module">
      // firebase.ts \u304B\u3089\u8A8D\u8A3C\u72B6\u614B\u306E\u76E3\u8996\u95A2\u6570\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u3066\u3001\u30ED\u30B0\u30A4\u30F3\u6E08\u307F\u306A\u3089\u30C8\u30C3\u30D7\u3078
      import { onAuthChange } from '../lib/firebase.ts';
      onAuthChange((user) => {
        if (user) {
          window.location.assign('/'); // \u65E2\u306B\u30ED\u30B0\u30A4\u30F3\u6E08\u307F\u306E\u5834\u5408\u306F\u30C8\u30C3\u30D7\u30DA\u30FC\u30B8\u3078
        }
      });
    <\/script>`, "</head> <body> ", " </body> </html>"])), renderHead(), renderComponent($$result, "Layout", $$Layout, { "title": "\u30ED\u30B0\u30A4\u30F3" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([` <h1>\u30ED\u30B0\u30A4\u30F3</h1> <form id="login-form"> <label>
\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9:
<input type="email" id="email" required> </label> <br> <label>
\u30D1\u30B9\u30EF\u30FC\u30C9:
<input type="password" id="password" required> </label> <br> <button type="submit">\u30ED\u30B0\u30A4\u30F3</button> </form> <script type="module">
        import { loginWithEmail } from '../library/firebase.js';
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
          loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = (document.getElementById('email')).value;
            const password = (document.getElementById('password')).value;
            try {
              // \u30E1\u30FC\u30EB\uFF0F\u30D1\u30B9\u30EF\u30FC\u30C9\u3067\u30ED\u30B0\u30A4\u30F3
              const user = await loginWithEmail(email, password);
              if (user) {
                // \u30ED\u30B0\u30A4\u30F3\u6210\u529F\u306A\u3089\u30C8\u30C3\u30D7\u30DA\u30FC\u30B8\u3078\u30EA\u30C0\u30A4\u30EC\u30AF\u30C8
                window.location.assign('/');
              }
            } catch (error) {
              console.error('\u30ED\u30B0\u30A4\u30F3\u30A8\u30E9\u30FC:', error);
              alert('\u30ED\u30B0\u30A4\u30F3\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002');
            }
          });
        }
      <\/script> `]))) }));
}, "/Users/tat/Dev/indivi/src/pages/login.astro", void 0);

const $$file = "/Users/tat/Dev/indivi/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
