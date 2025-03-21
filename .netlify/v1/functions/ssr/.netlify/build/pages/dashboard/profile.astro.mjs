import { e as createComponent, f as createAstro, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_Dfj0wdIZ.mjs';
import admin from 'firebase-admin';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  if (!admin.apps.length) {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT || '{\n  "type": "service_account",\n  "project_id": "test-87192",\n  "private_key_id": "f8c752d50cc048bbfb09e05146c69dbd0b6cb1b6",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf8oB8fxG+EN3a\\ns2kqH+nNt6cr5yxKXEkY73y2PfBAiOOeo7lFhxJrwV51I0iVttuUeMmsxX+HkIaa\\nTKE21IKybYwrw1O66ov0TRZz5xGmcx9FZtS0FQ8m5Mnnqzb9sDBkRdDKMMrIlZdA\\nGbpW2u43KCo2XC+4ft40ZYox4aFGirf7ZTx5G+ElQh2TGE4x/gnvV0ykiP1cP3Xp\\nE1TPluLuAIvycNX5QBsZFt1IGist/tlzLHw1zRcf8C8PYNCVGcqcMb7fSercaj+A\\na2oVj8IH5ACGFf+XZzT09jbH9hT8mfaZXms7AZR4jhBhWco2tYOKwY1pmuXyVeri\\nthwLkHDzAgMBAAECggEAHMqVMFPbSMBWfyiudIO8HWjCsddyFIyaJ9/sLg3mMmex\\nuXu1PPu8aCMtsp5AUZrR2d8IRo5ij2+HmzzSBEGqqR2pDrOhXdMckERUF1bvyWuN\\npHuHLEdiK9khMw+R3Yaan2Il3E9+IS80Q7id30aXfNxBBPoBKQ/FRd9FSgdYdY73\\n0nTp3S2uOdmT6/xRAMGQz2uBS7Vt+IEbNeWRMco0mgqIlzIlgkvBArJt4Tzg/xc4\\nEzZwQAIAm1T5/tU5hbJg9vm9h0oqdf+URxZ5/RY/KvWNovYXPN4CAgzcglbeH5up\\nKPN5dccHySsDdv6mn9eVxsCJNNXHyPZyeb8oESwzWQKBgQDaOk3a5UCygS6aNdGi\\n4j69ZhwTEUYxCCmIrT+D4j2AGCkMKBnNfmaHdLlZQCxzayF0k6V9DDTHQe3kHGUN\\nOP/ZCbXbYoOysPwDAq+secoE2VFyph6tKMOogVG/SyMjYfNrBPdf7ELRMMkEE4B+\\nWBgfIYWFcQwiVj3kpR7ly10BFQKBgQC7ociJWjrOpf14b9Mi5qlTalhEKRCiOyZy\\naMCLTe3aGHWNKeoU55XHJirw8+Hzez+r9FOv1nSDvuZKx5l5YnvBPNa3N8YHjp9W\\noC1iWI+iYJ6mbbggQv50V16fY+zovXDoI/V0hwwRuR2M5pLuHO8UuEK8yuZ2uw4p\\nseQqarpb5wKBgQCT/4KZd2y/IrkWQHWh/8oI7N0RWV+/FQgF92jh6mdHHhuIcRG+\\nuYCTUOf6zXjX9cnEo/VRrxuEHwRU9aTaqNNqwBkjZdZnM3xWFlZJpHcLfs6r8FlR\\nmhnHh5yHHVABSQaqh720wig2ct2A9DDqfpgtVLCW5SoTh2WGUS15LsguWQKBgACJ\\nDqRtsHtEd/uu/gA8fkExrXzMTTLZTlvHNr1vBH250iQL+ZIDsya1UiwL1ho2wNDB\\nyrdWulBh7BBMj4CMKmQ7wzUUoKkG3CeIH3kHXamN8wXwjDTzW/yC/08fHt7vI3JW\\nH+4sMHmgeJgdVE//nyME/5PAVHYERJ8T1d3VHiEDAoGATVJVo/+ikTXJfHz1e3oe\\nqndDpXhQlj2VsNWBBBHgovSwH4iOd66EWKvTIRCIRzS6XDZ2w2cPKMxZ/6UbIfyf\\naDMpkMsCQE824Hg+HU6POn91XIuzPSV/snXJ9KtqHdXOAKOPe0W8CLiEFHmhArej\\nrrjFJp1QQG7U82o5YqnHg1Y=\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk-fbsvc@test-87192.iam.gserviceaccount.com",\n  "client_id": "110908066451240127621",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-87192.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}';
    console.log("Service Account:", serviceAccountStr);
    const serviceAccount = JSON.parse(serviceAccountStr);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  const adminAuth = admin.auth();
  const db = admin.firestore();
  const cookieHeader = Astro2.request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").filter(Boolean).map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );
  const token = cookies["token"] || "";
  let authUser = null;
  if (token) {
    try {
      authUser = await adminAuth.verifyIdToken(token);
    } catch (err) {
      console.error("IDトークンの検証に失敗しました", err);
    }
  }
  let userData = null;
  if (authUser) {
    const userSnap = await db.collection("users").doc(authUser.uid).get();
    if (userSnap.exists) {
      userData = userSnap.data();
    } else {
      console.error("ユーザーデータが存在しません", authUser.uid);
    }
  }
  const accountName = authUser && userData && userData.displayName ? userData.displayName : "ログイン";
  const projects = userData && userData.projects ? userData.projects : [];
  const method = Astro2.request.method.toUpperCase();
  if (method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action")?.toString() || "";
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
      } else {
        return new Response(null, {
          status: 303,
          headers: {
            "Set-Cookie": `token=${data.idToken}; Path=/; HttpOnly`,
            Location: "/"
          }
        });
      }
    } else if (action === "register") {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      const confirmPassword = formData.get("confirmPassword")?.toString() || "";
      const displayName = formData.get("displayName")?.toString() || "";
      const bio = formData.get("bio")?.toString() || "";
      if (password !== confirmPassword) ; else {
        try {
          const userRecord = await adminAuth.createUser({
            email,
            password,
            displayName
          });
          await db.collection("users").doc(userRecord.uid).set({
            displayName,
            email,
            bio,
            plan: "free",
            // デフォルトはフリープラン
            projects: []
            // 初期はプロジェクト未登録
          });
          const customToken = await adminAuth.createCustomToken(userRecord.uid);
          return new Response(null, {
            status: 303,
            headers: {
              "Set-Cookie": `token=${customToken}; Path=/; HttpOnly`,
              Location: "/"
            }
          });
        } catch (err) {
          console.error("[Register Error]", err);
        }
      }
    } else if (action === "logout") {
      return new Response(null, {
        status: 303,
        headers: {
          "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
          Location: "/"
        }
      });
    } else if (action === "create_project") {
      if (!authUser) ; else {
        const projectName = formData.get("projectName")?.toString() || "";
        const projectDescription = formData.get("projectDescription")?.toString() || "";
        const newProject = {
          name: projectName,
          description: projectDescription,
          followers: 0,
          currentPages: 0,
          maxPages: 3,
          createdAt: /* @__PURE__ */ new Date()
        };
        const userRef = db.collection("users").doc(authUser.uid);
        const userSnap = await userRef.get();
        if (userSnap.exists) {
          const currentProjects = userSnap.data().projects || [];
          currentProjects.push(newProject);
          await userRef.update({ projects: currentProjects });
          return new Response(null, {
            status: 303,
            headers: { Location: "/" }
          });
        }
      }
    }
  }
  return renderTemplate(_a || (_a = __template(["", '  <script type="module">\n  let projectName = document.getElementById("project-name");\n  let projectDescription = document.getElementById("project-description");\n  let saveButton = document.getElementById("save-btn");\n\n  // クリックで編集可能にする\n  function enableEditing(element) {\n    element.contentEditable = true;\n    element.focus();\n  }\n\n  // 編集完了後にエディットモードを終了\n  function disableEditing(element) {\n    element.contentEditable = false;\n  }\n\n  // クリック時に編集モード開始\n  projectName.addEventListener("click", () => enableEditing(projectName));\n  projectDescription.addEventListener("click", () => enableEditing(projectDescription));\n\n  // 保存ボタンがクリックされたとき\n  saveButton.addEventListener("click", async () => {\n    disableEditing(projectName);\n    disableEditing(projectDescription);\n\n    const updatedName = projectName.innerText.trim();\n    const updatedDescription = projectDescription.innerText.trim();\n\n    // Firestore に更新を送信\n    const response = await fetch("/api/updateProject", {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify({\n        name: updatedName,\n        description: updatedDescription\n      })\n    });\n\n    if (response.ok) {\n      alert("プロジェクトが保存されました！");\n    } else {\n      alert("保存に失敗しました。");\n    }\n  });\n</script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "App Title", "accountName": accountName, "projects": projects, "data-astro-cid-rxvxkuhm": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pan" data-astro-cid-rxvxkuhm> <p class="pan_item" data-astro-cid-rxvxkuhm> <a href="/" data-astro-cid-rxvxkuhm>トップ</a> <span data-astro-cid-rxvxkuhm> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> </svg> </span> <a href="/dashboard" data-astro-cid-rxvxkuhm>もっふる</a> <span data-astro-cid-rxvxkuhm> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> </svg> </span> <span data-astro-cid-rxvxkuhm>プロフィール</span> </p> </div> <nav class="nav" data-astro-cid-rxvxkuhm> <button class="nav_btn" data-astro-cid-rxvxkuhm> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <g clip-path="url(#clip0_623_115)" data-astro-cid-rxvxkuhm> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-rxvxkuhm></path> </g> <defs data-astro-cid-rxvxkuhm> <clipPath id="clip0_623_115" data-astro-cid-rxvxkuhm> <rect width="16" height="16" fill="white" data-astro-cid-rxvxkuhm></rect> </clipPath> </defs> </svg> </button> <ul class="nav_list" data-astro-cid-rxvxkuhm> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>サマリー</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/profile" class="nav_link active" id="switch-btn" data-astro-cid-rxvxkuhm>プロフィール</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>フォーム</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>CMS</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>アナリティクス</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>プレビュー</a> </li> <li class="nav_item" data-astro-cid-rxvxkuhm> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-rxvxkuhm>プレビュー</a> </li> </ul> </nav> <div class="container" id="switch" data-astro-cid-rxvxkuhm> <div class="box_btn_wrapper" data-astro-cid-rxvxkuhm> <button class="box_btn" data-astro-cid-rxvxkuhm>キャンセル</button> <button id="save-btn" class="box_btn save" data-astro-cid-rxvxkuhm>保存</button> </div> <section class="box" data-astro-cid-rxvxkuhm> <div class="inner" data-astro-cid-rxvxkuhm> <div class="hero" data-astro-cid-rxvxkuhm> <div class="hero_banner" data-astro-cid-rxvxkuhm> <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M27.902 13.32C19.0887 12.1093 11.4887 18.6533 11.9993 27.3333M8.66602 10.6667C8.66602 11.3739 8.94697 12.0522 9.44706 12.5523C9.94716 13.0524 10.6254 13.3333 11.3327 13.3333C12.0399 13.3333 12.7182 13.0524 13.2183 12.5523C13.7184 12.0522 13.9993 11.3739 13.9993 10.6667C13.9993 9.95942 13.7184 9.28115 13.2183 8.78105C12.7182 8.28095 12.0399 8 11.3327 8C10.6254 8 9.94716 8.28095 9.44706 8.78105C8.94697 9.28115 8.66602 9.95942 8.66602 10.6667Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> <path d="M4 17.4216C7.70667 16.9082 11.0333 18.6989 12.832 21.5549" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> <path d="M4 12.5333C4 9.54667 4 8.05333 4.58133 6.912C5.09265 5.90851 5.90851 5.09265 6.912 4.58133C8.05333 4 9.54667 4 12.5333 4H19.4667C22.4533 4 23.9467 4 25.088 4.58133C26.0915 5.09265 26.9073 5.90851 27.4187 6.912C28 8.05333 28 9.54667 28 12.5333V19.4667C28 22.4533 28 23.9467 27.4187 25.088C26.9073 26.0915 26.0915 26.9073 25.088 27.4187C23.9467 28 22.4533 28 19.4667 28H12.5333C9.54667 28 8.05333 28 6.912 27.4187C5.90851 26.9073 5.09265 26.0915 4.58133 25.088C4 23.9467 4 22.4533 4 19.4667V12.5333Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> </svg> </div> <div class="hero_body" data-astro-cid-rxvxkuhm> <div class="hero_body_prof" data-astro-cid-rxvxkuhm> <p class="hero_body_prof_p" data-astro-cid-rxvxkuhm> <span data-astro-cid-rxvxkuhm>フォロワー</span> <span class="slash" data-astro-cid-rxvxkuhm></span> <strong class="strong" data-astro-cid-rxvxkuhm>340人</strong> </p> <div class="hero_body_prof_title" data-astro-cid-rxvxkuhm> <h2 id="project-name" data-astro-cid-rxvxkuhm>プロジェクト名</h2> <span class="item_action_btns" data-astro-cid-rxvxkuhm> <button data-astro-cid-rxvxkuhm> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> </svg> </button> <button data-astro-cid-rxvxkuhm> <svg width="16" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M10.2499 4.33301L13.5833 7.66634M13.5833 4.33301L10.2499 7.66634M15.3291 11.4163H6.74825C6.31359 11.4163 5.89614 11.2464 5.58492 10.943L1.12658 6.59634C1.04696 6.5187 0.983675 6.42592 0.940467 6.32344C0.89726 6.22097 0.875 6.11088 0.875 5.99967C0.875 5.88846 0.89726 5.77838 0.940467 5.67591C0.983675 5.57343 1.04696 5.48064 1.12658 5.40301L5.58492 1.05634C5.89614 0.752902 6.31359 0.583051 6.74825 0.583008H15.3291C16.1207 0.583008 17.1816 1.03384 17.1816 1.93717V10.0622C17.1816 10.9655 16.1207 11.4163 15.3291 11.4163Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> </svg> </button> </span> </div> <div class="hero_body_prof_desc" data-astro-cid-rxvxkuhm> <p id="project-description" data-astro-cid-rxvxkuhm>プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。プロジェクトの説明が入ります。</p> <span class="item_action_btns" data-astro-cid-rxvxkuhm> <button data-astro-cid-rxvxkuhm> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-rxvxkuhm></path> </svg> </button> <button data-astro-cid-rxvxkuhm> <svg width="16" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M10.2499 4.33301L13.5833 7.66634M13.5833 4.33301L10.2499 7.66634M15.3291 11.4163H6.74825C6.31359 11.4163 5.89614 11.2464 5.58492 10.943L1.12658 6.59634C1.04696 6.5187 0.983675 6.42592 0.940467 6.32344C0.89726 6.22097 0.875 6.11088 0.875 5.99967C0.875 5.88846 0.89726 5.77838 0.940467 5.67591C0.983675 5.57343 1.04696 5.48064 1.12658 5.40301L5.58492 1.05634C5.89614 0.752902 6.31359 0.583051 6.74825 0.583008H15.3291C16.1207 0.583008 17.1816 1.03384 17.1816 1.93717V10.0622C17.1816 10.9655 16.1207 11.4163 15.3291 11.4163Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> </svg> </button> </span> </div> </div> <div class="hero_body_img" data-astro-cid-rxvxkuhm> <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M27.902 13.32C19.0887 12.1093 11.4887 18.6533 11.9993 27.3333M8.66602 10.6667C8.66602 11.3739 8.94697 12.0522 9.44706 12.5523C9.94716 13.0524 10.6254 13.3333 11.3327 13.3333C12.0399 13.3333 12.7182 13.0524 13.2183 12.5523C13.7184 12.0522 13.9993 11.3739 13.9993 10.6667C13.9993 9.95942 13.7184 9.28115 13.2183 8.78105C12.7182 8.28095 12.0399 8 11.3327 8C10.6254 8 9.94716 8.28095 9.44706 8.78105C8.94697 9.28115 8.66602 9.95942 8.66602 10.6667Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> <path d="M4 17.4216C7.70667 16.9082 11.0333 18.6989 12.832 21.5549" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> <path d="M4 12.5333C4 9.54667 4 8.05333 4.58133 6.912C5.09265 5.90851 5.90851 5.09265 6.912 4.58133C8.05333 4 9.54667 4 12.5333 4H19.4667C22.4533 4 23.9467 4 25.088 4.58133C26.0915 5.09265 26.9073 5.90851 27.4187 6.912C28 8.05333 28 9.54667 28 12.5333V19.4667C28 22.4533 28 23.9467 27.4187 25.088C26.9073 26.0915 26.0915 26.9073 25.088 27.4187C23.9467 28 22.4533 28 19.4667 28H12.5333C9.54667 28 8.05333 28 6.912 27.4187C5.90851 26.9073 5.09265 26.0915 4.58133 25.088C4 23.9467 4 22.4533 4 19.4667V12.5333Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> </svg> </div> </div> <ul class="hero_btn-list" data-astro-cid-rxvxkuhm> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <p class="hero_btn-label" data-astro-cid-rxvxkuhm>フォロー</p> </li> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <button class="delete_btn" data-astro-cid-rxvxkuhm> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M7.05273 12.9454L12.9461 7.05371M7.05273 7.05371L12.9461 12.9454" stroke="#C4C4C4" stroke-linecap="round" data-astro-cid-rxvxkuhm></path> </svg> </button> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="#c4c4c4" data-astro-cid-rxvxkuhm></path> </svg> </li> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <button class="delete_btn" data-astro-cid-rxvxkuhm> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M7.05273 12.9454L12.9461 7.05371M7.05273 7.05371L12.9461 12.9454" stroke="#C4C4C4" stroke-linecap="round" data-astro-cid-rxvxkuhm></path> </svg> </button> <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <g clip-path="url(#clip0_656_4826)" data-astro-cid-rxvxkuhm> <mask id="mask0_656_4826" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" data-astro-cid-rxvxkuhm> <path d="M0 0H14V14H0V0Z" fill="#c4c4c4" data-astro-cid-rxvxkuhm></path> </mask> <g mask="url(#mask0_656_4826)" data-astro-cid-rxvxkuhm> <path d="M11.025 0.65625H13.172L8.482 6.03025L14 13.3442H9.68L6.294 8.90925L2.424 13.3442H0.275L5.291 7.59425L0 0.65725H4.43L7.486 4.71025L11.025 0.65625ZM10.27 12.0562H11.46L3.78 1.87725H2.504L10.27 12.0562Z" fill="#fff" data-astro-cid-rxvxkuhm></path> </g> </g> <defs data-astro-cid-rxvxkuhm> <clipPath id="clip0_656_4826" data-astro-cid-rxvxkuhm> <rect width="14" height="14" fill="white" data-astro-cid-rxvxkuhm></rect> </clipPath> </defs> </svg> </li> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <button class="delete_btn" data-astro-cid-rxvxkuhm> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M7.05273 12.9454L12.9461 7.05371M7.05273 7.05371L12.9461 12.9454" stroke="#C4C4C4" stroke-linecap="round" data-astro-cid-rxvxkuhm></path> </svg> </button> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M16.6002 5.82C15.9167 5.03953 15.5401 4.0374 15.5402 3H12.4502V15.4C12.4268 16.0712 12.1437 16.7071 11.6605 17.1735C11.1773 17.6399 10.5318 17.9004 9.86016 17.9C8.44016 17.9 7.26016 16.74 7.26016 15.3C7.26016 13.58 8.92016 12.29 10.6302 12.82V9.66C7.18016 9.2 4.16016 11.88 4.16016 15.3C4.16016 18.63 6.92016 21 9.85016 21C12.9902 21 15.5402 18.45 15.5402 15.3V9.01C16.7932 9.90985 18.2975 10.3926 19.8402 10.39V7.3C19.8402 7.3 17.9602 7.39 16.6002 5.82Z" fill="#c4c4c4" data-astro-cid-rxvxkuhm></path> </svg> </li> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <button class="delete_btn" data-astro-cid-rxvxkuhm> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M7.05273 12.9454L12.9461 7.05371M7.05273 7.05371L12.9461 12.9454" stroke="#C4C4C4" stroke-linecap="round" data-astro-cid-rxvxkuhm></path> </svg> </button> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M22.54 6.42C22.4151 5.95228 22.1698 5.52547 21.8285 5.1821C21.4872 4.83873 21.0619 4.59079 20.595 4.463C18.88 4 12 4 12 4C12 4 5.12 4 3.405 4.463C2.93806 4.59079 2.51276 4.83873 2.1715 5.1821C1.83023 5.52547 1.58492 5.95228 1.46 6.42C1 8.148 1 11.75 1 11.75C1 11.75 1 15.352 1.46 17.08C1.58476 17.5479 1.83001 17.9749 2.17129 18.3185C2.51256 18.662 2.93794 18.9101 3.405 19.038C5.121 19.5 12 19.5 12 19.5C12 19.5 18.88 19.5 20.595 19.038C21.0621 18.9101 21.4874 18.662 21.8287 18.3185C22.17 17.9749 22.4152 17.5479 22.54 17.08C23 15.354 23 11.75 23 11.75C23 11.75 23 8.148 22.54 6.42ZM9.75 15.021V8.48L15.5 11.751L9.75 15.021Z" stroke="#c4c4c4" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" data-astro-cid-rxvxkuhm></path> </svg> </li> <li class="hero_btn-item" data-astro-cid-rxvxkuhm> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rxvxkuhm> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="#c4c4c4" data-astro-cid-rxvxkuhm></path> </svg> <p class="hero_btn-label" data-astro-cid-rxvxkuhm>追加</p> </li> </ul> </div> </div> </section> </div> ` }));
}, "/Users/tat/Dev/indivi/src/pages/dashboard/profile.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/dashboard/profile.astro";
const $$url = "/dashboard/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
