import { e as createComponent, f as createAstro, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, l as Fragment, h as addAttribute } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_B090UaZe.mjs';
import { g as getFirebaseAdmin } from '../chunks/firebase-admin_CZ8IQ3yZ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  console.log("環境変数チェック:", {
    apiKey: "AIzaSyB_uLvLR9crDz-oIcRM6h27BiAFIUB2rdg"?.substring(0, 5) + "...",
    projectId: "test-87192",
    hasPrivateKey: false                                    
  });
  let adminAuth;
  let db;
  try {
    const { auth, db: firestore } = getFirebaseAdmin();
    adminAuth = auth;
    db = firestore;
  } catch (error) {
    console.error("Firebase Admin initialization failed:", error);
  }
  let token = "";
  try {
    const cookieHeader = Astro2.request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").filter(Boolean).map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    token = cookies["token"] || "";
  } catch (error) {
    console.error("Cookie parsing failed:", error);
  }
  let postError = "";
  let defaultFormMode = "login";
  let authUser = null;
  const method = Astro2.request.method.toUpperCase();
  if (method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const action = formData.get("action")?.toString() || "";
      if (action === "logout") {
        return new Response(null, {
          status: 303,
          headers: {
            "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
            Location: "/"
          }
        });
      }
      if (action === "login") {
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        const apiKey = "AIzaSyB_uLvLR9crDz-oIcRM6h27BiAFIUB2rdg";
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true
            })
          }
        );
        const data = await res.json();
        if (data.error) {
          console.error("[Login Error]", data.error);
          postError = "ログインに失敗しました";
        } else {
          const userId2 = data.localId;
          return new Response(null, {
            status: 303,
            headers: {
              "Set-Cookie": `token=${data.idToken}; Path=/; HttpOnly`,
              Location: `/${userId2}`
            }
          });
        }
      } else if (action === "register") {
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        const confirmPassword = formData.get("confirmPassword")?.toString() || "";
        const displayName = formData.get("displayName")?.toString() || "";
        if (password !== confirmPassword) {
          postError = "パスワードが一致しません";
          defaultFormMode = "register";
        } else {
          try {
            const userRecord = await adminAuth.createUser({
              email,
              password,
              displayName
            });
            await db.collection("users").doc(userRecord.uid).set({
              displayName,
              email,
              plan: "free",
              projects: []
            });
            const apiKey = "AIzaSyB_uLvLR9crDz-oIcRM6h27BiAFIUB2rdg";
            const signInRes = await fetch(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  password,
                  returnSecureToken: true
                })
              }
            );
            const signInData = await signInRes.json();
            if (signInData.error) {
              console.error("[Register->Login Error]", signInData.error);
              postError = "登録後の自動ログインに失敗しました";
            } else {
              const userId2 = signInData.localId;
              return new Response(null, {
                status: 303,
                headers: {
                  "Set-Cookie": `token=${signInData.idToken}; Path=/; HttpOnly`,
                  Location: `/${userId2}`
                }
              });
            }
          } catch (err) {
            console.error("[Register Error]", err);
            postError = "登録に失敗しました";
          }
        }
      }
    } catch (error) {
      console.error("POST request handling failed:", error);
      postError = "リクエスト処理中にエラーが発生しました";
    }
  }
  try {
    if (token && adminAuth) {
      const decodedToken = await adminAuth.verifyIdToken(token);
      authUser = {
        uid: decodedToken.uid,
        email: decodedToken.email
      };
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return new Response(null, {
      status: 303,
      headers: {
        "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        Location: "/"
      }
    });
  }
  const userId = authUser?.uid || "";
  const accountName = authUser ? "ログアウト" : "ログイン";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "App Title", "userId": userId, "accountName": accountName, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${postError && renderTemplate`${maybeRenderHead()}<p style="color:red;" data-astro-cid-j7pv25f6>${postError}</p>`}${!authUser && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` <div id="auth_box_login"${addAttribute(`auth_box ${defaultFormMode === "register" ? "dis-none" : ""}`, "class")} data-astro-cid-j7pv25f6> <h2 class="auth_box_title" data-astro-cid-j7pv25f6>ログイン</h2> <form class="form" method="POST" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="login" data-astro-cid-j7pv25f6> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="email" data-astro-cid-j7pv25f6>メールアドレス</label> <input class="form_input" placeholder="メールアドレス" type="email" name="email" required data-astro-cid-j7pv25f6> </div> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="password" data-astro-cid-j7pv25f6>パスワード</label> <input class="form_input" placeholder="半角英数字8文字以上" type="password" name="password" required data-astro-cid-j7pv25f6> </div> <div class="form_btn-wrapper" data-astro-cid-j7pv25f6> <button class="form_btn" type="submit" data-astro-cid-j7pv25f6>ログイン</button> <button class="auth_box_change" id="auth_box_change_to_register" type="button" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>新規登録</span> <span class="auth_box_change_right" data-astro-cid-j7pv25f6>
アカウントをお持ちでない方
</span> </button> </div> </form> </div> <div id="auth_box_register"${addAttribute(`auth_box ${defaultFormMode === "login" ? "dis-none" : ""}`, "class")} data-astro-cid-j7pv25f6> <h2 class="auth_box_title" data-astro-cid-j7pv25f6>新規登録</h2> <form class="form" method="POST" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="register" data-astro-cid-j7pv25f6> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="displayName" data-astro-cid-j7pv25f6>アカウント名</label> <input class="form_input" placeholder="もち" type="text" name="displayName" required data-astro-cid-j7pv25f6> </div> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="email" data-astro-cid-j7pv25f6>メールアドレス</label> <input class="form_input" placeholder="メールアドレス" type="email" name="email" required data-astro-cid-j7pv25f6> </div> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="password" data-astro-cid-j7pv25f6>パスワード</label> <input class="form_input" placeholder="半角英数字8文字以上" type="password" name="password" required data-astro-cid-j7pv25f6> </div> <div class="form_wrapper" data-astro-cid-j7pv25f6> <label class="form_label" for="confirmPassword" data-astro-cid-j7pv25f6>
パスワード(確認用)
</label> <input class="form_input" placeholder="半角英数字8文字以上" type="password" name="confirmPassword" required data-astro-cid-j7pv25f6> </div> <div class="form_btn-wrapper" data-astro-cid-j7pv25f6> <button class="form_btn" type="submit" data-astro-cid-j7pv25f6>新規登録</button> <button class="auth_box_change" id="auth_box_change_to_login" type="button" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>ログイン</span> <span class="auth_box_change_right" data-astro-cid-j7pv25f6>
アカウントをお持ちの方
</span> </button> </div> </form> </div> ` })}`}${authUser && renderTemplate`<form method="POST" data-astro-cid-j7pv25f6> <input type="hidden" name="action" value="logout" data-astro-cid-j7pv25f6> <button type="submit" data-astro-cid-j7pv25f6>ログアウト</button> </form>`}` })}  ${renderScript($$result, "/Users/tat/Dev/indivi/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tat/Dev/indivi/src/pages/index.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
