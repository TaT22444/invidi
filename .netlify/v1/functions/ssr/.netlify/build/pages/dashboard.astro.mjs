import { e as createComponent, f as createAstro, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_Dfj0wdIZ.mjs';
import { M as MyLineChart } from '../chunks/MyLineChart_Bz0ADiRY.mjs';
import admin from 'firebase-admin';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pvLabels = ["2025/02/16", "2025/02/17", "2025/02/18", "2025/02/19", "2025/02/20", "2025/02/21", "2025/02/22"];
  const pvDatas = [10, 25, 15, 2, 10, 32, 18];
  const ecLabels = [
    "2025/02/16",
    "2025/02/17",
    "2025/02/18",
    "2025/02/19",
    "2025/02/20",
    "2025/02/21",
    "2025/02/22"
  ];
  const ecSalesData = [1800, 2e3, 1200, 900, 2200, 1800, 2500];
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "App Title", "accountName": accountName, "projects": projects, "data-astro-cid-y55gmoyq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pan" data-astro-cid-y55gmoyq> <p class="pan_item" data-astro-cid-y55gmoyq> <a href="/" data-astro-cid-y55gmoyq>トップ</a> <span data-astro-cid-y55gmoyq> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-y55gmoyq> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-y55gmoyq></path> </svg> </span> <span data-astro-cid-y55gmoyq>もっふる</span> </p> </div> <nav class="nav" data-astro-cid-y55gmoyq> <button class="nav_btn" data-astro-cid-y55gmoyq> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-y55gmoyq> <g clip-path="url(#clip0_623_115)" data-astro-cid-y55gmoyq> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-y55gmoyq></path> </g> <defs data-astro-cid-y55gmoyq> <clipPath id="clip0_623_115" data-astro-cid-y55gmoyq> <rect width="16" height="16" fill="white" data-astro-cid-y55gmoyq></rect> </clipPath> </defs> </svg> </button> <ul class="nav_list" data-astro-cid-y55gmoyq> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard" class="nav_link active" id="switch-btn" data-astro-cid-y55gmoyq>サマリー</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/profile" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>プロフィール</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>フォーム</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>CMS</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>アナリティクス</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>プレビュー</a> </li> <li class="nav_item" data-astro-cid-y55gmoyq> <a href="/dashboard/form" class="nav_link" id="switch-btn" data-astro-cid-y55gmoyq>プレビュー</a> </li> </ul> </nav> <div class="container" id="switch" data-astro-cid-y55gmoyq> <section class="box" data-astro-cid-y55gmoyq> <div class="inner" data-astro-cid-y55gmoyq> <div class="prof" data-astro-cid-y55gmoyq> <div class="prof_img" data-astro-cid-y55gmoyq></div> <div class="prof_title-wrapper" data-astro-cid-y55gmoyq> <h3 class="prof_title" data-astro-cid-y55gmoyq>プロジェクト名</h3> <a href="/" class="site_link" data-astro-cid-y55gmoyq>https://testsite/moffle.com</a> </div> <div class="prof_wrapper" data-astro-cid-y55gmoyq> <div class="prof_item" data-astro-cid-y55gmoyq> <p class="prof_item_label" data-astro-cid-y55gmoyq>フォロワー</p> <p class="prof_item_label label" data-astro-cid-y55gmoyq> <strong data-astro-cid-y55gmoyq>340</strong> <span data-astro-cid-y55gmoyq>人</span> </p> </div> <div class="prof_item" data-astro-cid-y55gmoyq> <p class="prof_item_label" data-astro-cid-y55gmoyq>テーマ</p> <button class="prof_item_label_wrapper" data-astro-cid-y55gmoyq> <p class="prof_item_label" data-astro-cid-y55gmoyq> <strong data-astro-cid-y55gmoyq>キューティープリティー</strong> </p> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-y55gmoyq> <g clip-path="url(#clip0_628_234)" data-astro-cid-y55gmoyq> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47121 10.9712C8.34619 11.0962 8.17666 11.1664 7.99988 11.1664C7.8231 11.1664 7.65356 11.0962 7.52855 10.9712L3.75721 7.1999C3.69354 7.13841 3.64275 7.06484 3.60781 6.98351C3.57287 6.90217 3.55448 6.81469 3.55371 6.72617C3.55294 6.63765 3.56981 6.54986 3.60333 6.46793C3.63685 6.386 3.68635 6.31157 3.74895 6.24897C3.81155 6.18638 3.88598 6.13688 3.96791 6.10336C4.04984 6.06983 4.13763 6.05297 4.22615 6.05374C4.31467 6.05451 4.40215 6.0729 4.48348 6.10784C4.56482 6.14277 4.63838 6.19356 4.69988 6.25724L7.99988 9.55724L11.2999 6.25724C11.4256 6.1358 11.594 6.0686 11.7688 6.07012C11.9436 6.07164 12.1108 6.14175 12.2344 6.26536C12.358 6.38896 12.4281 6.55617 12.4297 6.73097C12.4312 6.90577 12.364 7.07417 12.2425 7.1999L8.47121 10.9712Z" fill="white" data-astro-cid-y55gmoyq></path> </g> <defs data-astro-cid-y55gmoyq> <clipPath id="clip0_628_234" data-astro-cid-y55gmoyq> <rect width="16" height="16" fill="white" transform="matrix(0 1 -1 0 16 0.5)" data-astro-cid-y55gmoyq></rect> </clipPath> </defs> </svg> </button> </div> </div> <div class="box_btn_wrapper" data-astro-cid-y55gmoyq> <button class="box_btn_primary" data-astro-cid-y55gmoyq>公開中</button> <button class="box_btn_secondary" data-astro-cid-y55gmoyq>プレビュー</button> </div> </div> <div class="plan" data-astro-cid-y55gmoyq> <ul class="plan_list" data-astro-cid-y55gmoyq> <li class="plan_item" data-astro-cid-y55gmoyq> <p class="plan_label" data-astro-cid-y55gmoyq>料金</p> <div class="plan_contents" data-astro-cid-y55gmoyq> <p class="plan_text" data-astro-cid-y55gmoyq> <strong class="strong" data-astro-cid-y55gmoyq>無料</strong> </p> <div class="plan_bar" data-astro-cid-y55gmoyq> <span class="plan_bar_elem" data-astro-cid-y55gmoyq></span> </div> </div> </li> <li class="plan_item" data-astro-cid-y55gmoyq> <p class="plan_label" data-astro-cid-y55gmoyq>データ使用量</p> <div class="plan_contents" data-astro-cid-y55gmoyq> <p class="plan_text" data-astro-cid-y55gmoyq> <strong class="strong" data-astro-cid-y55gmoyq>12</strong> <span data-astro-cid-y55gmoyq>GB</span> </p> <div class="plan_bar" data-astro-cid-y55gmoyq> <span class="plan_bar_elem" data-astro-cid-y55gmoyq></span> </div> </div> </li> <li class="plan_item" data-astro-cid-y55gmoyq> <p class="plan_label" data-astro-cid-y55gmoyq>CMS</p> <div class="plan_contents" data-astro-cid-y55gmoyq> <p class="plan_text" data-astro-cid-y55gmoyq> <strong class="strong" data-astro-cid-y55gmoyq>1</strong> <span data-astro-cid-y55gmoyq>/</span> <span data-astro-cid-y55gmoyq>1</span> </p> </div> </li> <li class="plan_item" data-astro-cid-y55gmoyq> <p class="plan_label" data-astro-cid-y55gmoyq>アナリティクス</p> <div class="plan_contents" data-astro-cid-y55gmoyq> <p class="plan_text" data-astro-cid-y55gmoyq> <strong class="strong" data-astro-cid-y55gmoyq>過去1週間まで</strong> </p> </div> </li> </ul> <div class="box_btn_wrapper" data-astro-cid-y55gmoyq> <button class="box_btn_primary" data-astro-cid-y55gmoyq>アップグレード</button> </div> </div> </div> </section> <section class="contents" data-astro-cid-y55gmoyq> <h2 class="box_label" data-astro-cid-y55gmoyq>訪問数</h2> <div class="box" data-astro-cid-y55gmoyq> <div class="inner" data-astro-cid-y55gmoyq> <div class="wrapper" data-astro-cid-y55gmoyq> <p data-astro-cid-y55gmoyq>総訪問数</p> <p data-astro-cid-y55gmoyq> <strong data-astro-cid-y55gmoyq>540</strong> <span data-astro-cid-y55gmoyq>人</span> </p> </div> ${renderComponent($$result2, "MyLineChart", MyLineChart, { "client:load": true, "dataLabel": "訪問数", "labels": pvLabels, "dataPoints": pvDatas, "borderColor": "#468FDD", "client:component-hydration": "load", "client:component-path": "/Users/tat/Dev/indivi/src/components/MyLineChart.jsx", "client:component-export": "default", "data-astro-cid-y55gmoyq": true })} </div> </div> </section> <section class="contents" data-astro-cid-y55gmoyq> <h2 class="box_label" data-astro-cid-y55gmoyq>EC売り上げ</h2> <div class="box" data-astro-cid-y55gmoyq> <div class="inner" data-astro-cid-y55gmoyq> <div class="wrapper" data-astro-cid-y55gmoyq> <p data-astro-cid-y55gmoyq>総EC売り上げ金額</p> <p data-astro-cid-y55gmoyq> <strong data-astro-cid-y55gmoyq>3,053,082</strong> <span data-astro-cid-y55gmoyq>円</span> </p> </div> ${renderComponent($$result2, "MyLineChart", MyLineChart, { "client:load": true, "dataLabel": "売り上げ(円)", "labels": ecLabels, "dataPoints": ecSalesData, "borderColor": "#468FDD", "client:component-hydration": "load", "client:component-path": "/Users/tat/Dev/indivi/src/components/MyLineChart.jsx", "client:component-export": "default", "data-astro-cid-y55gmoyq": true })} </div> </div> </section> </div> <div class="container dis-none" id="switch" data-astro-cid-y55gmoyq> <section class="box" data-astro-cid-y55gmoyq></section> </div> ` })}  ${renderScript($$result, "/Users/tat/Dev/indivi/src/pages/dashboard/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tat/Dev/indivi/src/pages/dashboard/index.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
