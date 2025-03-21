import { e as createComponent, f as createAstro, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../../chunks/Layout_B090UaZe.mjs';
/* empty css                                      */
import admin from 'firebase-admin';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Form = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Form;
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
  userData && userData.projects ? userData.projects : [];
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
  const { projectId } = Astro2.params;
  let currentProject = null;
  if (userData && userData.projects) {
    currentProject = userData.projects.find((p) => p.id === projectId);
  }
  if (!currentProject) {
    console.error("該当のプロジェクトが見つかりません");
    return new Response(null, {
      status: 303,
      headers: { Location: "/" }
    });
  }
  const userId = authUser?.uid || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Form", "userId": userId, "accountName": accountName, "projects": userData?.projects ?? [], "data-astro-cid-jtbmss7u": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pan" data-astro-cid-jtbmss7u> <p class="pan_item" data-astro-cid-jtbmss7u> <a${addAttribute(userId ? `/${userId}` : "/", "href")} data-astro-cid-jtbmss7u>トップ</a> <span data-astro-cid-jtbmss7u> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> </svg> </span> <span data-astro-cid-jtbmss7u>${currentProject?.name || "(No Name)"}</span> <span data-astro-cid-jtbmss7u> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> </svg> </span> <span data-astro-cid-jtbmss7u>フォーム</span> </p> </div> <nav class="nav" data-astro-cid-jtbmss7u> <button class="nav_btn" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_623_115)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_623_115" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> <ul class="nav_list" data-astro-cid-jtbmss7u> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>サマリー</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}/profile`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>プロフィール</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}/form`, "href")} class="nav_link active" id="switch-btn" data-astro-cid-jtbmss7u>フォーム</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}/cms`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>CMS</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}/analitics`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>アナリティクス</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}/preview`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>プレビュー</a> </li> <li class="nav_item" data-astro-cid-jtbmss7u> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-jtbmss7u>プレビュー</a> </li> </ul> </nav> <div class="container" id="switch" data-astro-cid-jtbmss7u> <div class="box_header" data-astro-cid-jtbmss7u> <p class="box_desc" data-astro-cid-jtbmss7u>お問い合わせセクションのプレビュー・編集ができます。</p> <div class="box_btn_wrapper" data-astro-cid-jtbmss7u> <button class="box_btn" data-astro-cid-jtbmss7u>キャンセル</button> <button id="save-btn" class="box_btn save" data-astro-cid-jtbmss7u>保存</button> </div> </div> <section class="box" data-astro-cid-jtbmss7u> <div class="inner" data-astro-cid-jtbmss7u> <div class="form" data-astro-cid-jtbmss7u> <div class="form-header" data-astro-cid-jtbmss7u> <button class="form_btn" data-astro-cid-jtbmss7u> <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_628_234)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47121 10.9712C8.34619 11.0962 8.17666 11.1664 7.99988 11.1664C7.8231 11.1664 7.65356 11.0962 7.52855 10.9712L3.75721 7.1999C3.69354 7.13841 3.64275 7.06484 3.60781 6.98351C3.57287 6.90217 3.55448 6.81469 3.55371 6.72617C3.55294 6.63765 3.56981 6.54986 3.60333 6.46793C3.63685 6.386 3.68635 6.31157 3.74895 6.24897C3.81155 6.18638 3.88598 6.13688 3.96791 6.10336C4.04984 6.06983 4.13763 6.05297 4.22615 6.05374C4.31467 6.05451 4.40215 6.0729 4.48348 6.10784C4.56482 6.14277 4.63838 6.19356 4.69988 6.25724L7.99988 9.55724L11.2999 6.25724C11.4256 6.1358 11.594 6.0686 11.7688 6.07012C11.9436 6.07164 12.1108 6.14175 12.2344 6.26536C12.358 6.38896 12.4281 6.55617 12.4297 6.73097C12.4312 6.90577 12.364 7.07417 12.2425 7.1999L8.47121 10.9712Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_628_234" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" transform="matrix(0 1 -1 0 16 0.5)" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> <div class="form-header_left" data-astro-cid-jtbmss7u> <div class="form-header_title_setting" data-astro-cid-jtbmss7u> <p class="form-header_title" data-astro-cid-jtbmss7u> <!-- <span class="Ja">お問い合わせ</span>
                  <span>/</span>
                  <span class="en">contact</span> --> <span class="En" data-astro-cid-jtbmss7u>Contact</span> <span data-astro-cid-jtbmss7u>/</span> <span class="ja" data-astro-cid-jtbmss7u>お問い合わせ</span> </p> <span class="form-header_title_lang" data-astro-cid-jtbmss7u> <button class="active" data-astro-cid-jtbmss7u>Ja</button> <span data-astro-cid-jtbmss7u>/</span> <button data-astro-cid-jtbmss7u>En</button> <span data-astro-cid-jtbmss7u>/</span> <button data-astro-cid-jtbmss7u>Ja+en</button> <span data-astro-cid-jtbmss7u>/</span> <button data-astro-cid-jtbmss7u>En+ja</button> </span> </div> <div class="form-header_desc" data-astro-cid-jtbmss7u> <p id="form-description" data-astro-cid-jtbmss7u>フォームの説明が入ります。フォームの説明が入ります。フォームの説明が入ります。フォームの説明が入ります。フォームの説明が入ります。フォームの説明が入ります。</p> <span class="item_action_btns" data-astro-cid-jtbmss7u> <button data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> </svg> </button> </span> </div> </div> </div> <div class="form-body" data-astro-cid-jtbmss7u> <div class="form-body_input-wrapper" data-astro-cid-jtbmss7u> <span class="visibox" data-astro-cid-jtbmss7u> <input type="checkbox" name="visible" checked data-astro-cid-jtbmss7u> <label for="visible" data-astro-cid-jtbmss7u>表示させる</label> </span> <label for="corp_name" data-astro-cid-jtbmss7u>会社名</label> <input type="text" name="corp_name" placeholder="◯◯株式会社△△部" data-astro-cid-jtbmss7u> </div> <div class="form-body_input-wrapper" data-astro-cid-jtbmss7u> <span class="visibox" data-astro-cid-jtbmss7u> <input type="checkbox" name="visible" checked data-astro-cid-jtbmss7u> <label for="visible" data-astro-cid-jtbmss7u>表示させる</label> </span> <label for="name" data-astro-cid-jtbmss7u>ご氏名</label> <input type="text" name="name" placeholder="サイト 太郎" data-astro-cid-jtbmss7u> </div> <div class="form-body_input-wrapper" data-astro-cid-jtbmss7u> <span class="visibox" data-astro-cid-jtbmss7u> <input type="checkbox" name="visible" checked data-astro-cid-jtbmss7u> <label for="visible" data-astro-cid-jtbmss7u>表示させる</label> </span> <label for="email" data-astro-cid-jtbmss7u>メールアドレス</label> <input type="email" name="email" placeholder="メールアドレス" data-astro-cid-jtbmss7u> </div> <fieldset id="optionFieldset" data-astro-cid-jtbmss7u> <span class="visibox" data-astro-cid-jtbmss7u> <input type="checkbox" name="visible" checked data-astro-cid-jtbmss7u> <label for="visible" data-astro-cid-jtbmss7u>表示させる</label> </span> <p class="subject_label" data-astro-cid-jtbmss7u>ご用件</p> <div class="form-body_wrapper" data-astro-cid-jtbmss7u> <input type="checkbox" name="3st_elem" data-astro-cid-jtbmss7u> <label for="3st_elem" data-astro-cid-jtbmss7u>イベント出演の依頼</label> <span class="item_action_btns" data-astro-cid-jtbmss7u> <button data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-jtbmss7u></path> </svg> </button> <button data-astro-cid-jtbmss7u> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M7.05273 12.9454L12.9461 7.05371M7.05273 7.05371L12.9461 12.9454" stroke="#C4C4C4" stroke-linecap="round" data-astro-cid-jtbmss7u></path> </svg> </button> </span> </div> <button class="form-body_wrapper_btn" type="button" id="addOptionBtn" data-astro-cid-jtbmss7u>+ 選択肢を追加(あと2個)</button> </fieldset> <textarea class="form-body_wrapper_textarea" name="otherRequest" rows="4" cols="50" placeholder="自由記入欄" data-astro-cid-jtbmss7u></textarea> </div> </div> </div> </section> </div> <section class="contents" data-astro-cid-jtbmss7u> <h2 class="box_label" data-astro-cid-jtbmss7u>お問い合わせ一覧</h2> <div class="info_number_wrapper" data-astro-cid-jtbmss7u> <p class="info_number" data-astro-cid-jtbmss7u> <span class="label" data-astro-cid-jtbmss7u>新着</span> <span class="number" data-astro-cid-jtbmss7u>3</span> <span data-astro-cid-jtbmss7u>件</span> </p> <p class="info_number" data-astro-cid-jtbmss7u> <span class="label" data-astro-cid-jtbmss7u>総数</span> <span class="number" data-astro-cid-jtbmss7u>24</span> <span data-astro-cid-jtbmss7u>件</span> </p> </div> <div class="option_box" data-astro-cid-jtbmss7u> <div class="subject_wrapper" data-astro-cid-jtbmss7u> <button class="active" data-astro-cid-jtbmss7u>全て</button> <button data-astro-cid-jtbmss7u>イベント出演の依頼</button> <button data-astro-cid-jtbmss7u>webサイト制作の相談</button> </div> <div class="option_wrapper" data-astro-cid-jtbmss7u> <div class="option" data-astro-cid-jtbmss7u> <input type="radio" checked id="all" name="option" data-astro-cid-jtbmss7u> <label for="all" data-astro-cid-jtbmss7u>全て</label> </div> <div class="option" data-astro-cid-jtbmss7u> <input type="radio" id="flag" name="option" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M2.66602 14.0003V10.4583M2.66602 10.4583C6.54468 7.42498 9.45402 13.4916 13.3327 10.4583V2.87565C9.45402 5.90898 6.54468 -0.157686 2.66602 2.87565V10.4583Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jtbmss7u></path> </svg> <label for="flag" data-astro-cid-jtbmss7u>のみ</label> </div> <div class="option" data-astro-cid-jtbmss7u> <input type="radio" id="unread" name="option" data-astro-cid-jtbmss7u> <label for="unread" data-astro-cid-jtbmss7u>未読のみ</label> </div> </div> </div> <div class="form_list" data-astro-cid-jtbmss7u> <div class="form_item" data-astro-cid-jtbmss7u> <div class="form_item_body" data-astro-cid-jtbmss7u> <div class="form_item_info" data-astro-cid-jtbmss7u> <p class="form_item_info_item" data-astro-cid-jtbmss7u>株式会社もっふる</p> <span class="slash" data-astro-cid-jtbmss7u></span> <p class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</p> <span class="slash" data-astro-cid-jtbmss7u></span> <time class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</time> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <p class="form_item_label" data-astro-cid-jtbmss7u>用件</p> <p class="form_item_text" data-astro-cid-jtbmss7u>
イベント出演の依頼
</p> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <p class="form_item_label" data-astro-cid-jtbmss7u>自由記入</p> <h3 class="form_item_text" data-astro-cid-jtbmss7u>
初めまして、株式会社もっふるの広報担当の喪降と申します。 Google検索で貴社のWEBコンテンツをご紹介し、相互の認知度向上に寄与したいと考えております。 よくあるリード営業などではない為に、費用や掲載費用などは一切なく、 貴社様のご紹介を弊社メディアでさせて頂いても構いませんでしょうか？ また、Googleでの認知度向上を目的に、弊社サイトと貴社サイトの相互リンクをご提案いたします。 費用や掲載料は一切発生せず、双方の顧客にとって有益な情報提供が可能になります。 ご興味がございましたら、下記メールアドレスまでご返信いただけますと幸いです。
</h3> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <p class="form_item_label" data-astro-cid-jtbmss7u>メールアドレス</p> <a class="form_item_text" data-astro-cid-jtbmss7u>
tatsu0823takasago@icloud.com
</a> </div> </div> <div class="form_item_btns" data-astro-cid-jtbmss7u> <button class="form_item_flag" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M2.66602 14.0003V10.4583M2.66602 10.4583C6.54468 7.42498 9.45402 13.4916 13.3327 10.4583V2.87565C9.45402 5.90898 6.54468 -0.157686 2.66602 2.87565V10.4583Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jtbmss7u></path> </svg> </button> <button class="form_item_btn" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_623_115)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_623_115" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> </div> </div> <div class="form_item" data-astro-cid-jtbmss7u> <div class="form_item_body" data-astro-cid-jtbmss7u> <div class="form_item_info" data-astro-cid-jtbmss7u> <p class="form_item_info_item" data-astro-cid-jtbmss7u>株式会社もっふる</p> <span class="slash" data-astro-cid-jtbmss7u></span> <p class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</p> <span class="slash" data-astro-cid-jtbmss7u></span> <time class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</time> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <h3 class="form_item_text" data-astro-cid-jtbmss7u>
初めまして、株式会社もっふるの広報担当の喪降と申します。 Google検索で貴社のWEBコンテンツをご紹介し、相互の認知度向上に寄与したいと考えております。 よくあるリード営業などではない為に、費用や掲載費用などは一切なく、 貴社様のご紹介を弊社メディアでさせて頂いても構いませんでしょうか？ また、Googleでの認知度向上を目的に、弊社サイトと貴社サイトの相互リンクをご提案いたします。 費用や掲載料は一切発生せず、双方の顧客にとって有益な情報提供が可能になります。 ご興味がございましたら、下記メールアドレスまでご返信いただけますと幸いです。
</h3> </div> </div> <div class="form_item_btns" data-astro-cid-jtbmss7u> <button class="form_item_flag" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M2.66602 14.0003V10.4583M2.66602 10.4583C6.54468 7.42498 9.45402 13.4916 13.3327 10.4583V2.87565C9.45402 5.90898 6.54468 -0.157686 2.66602 2.87565V10.4583Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jtbmss7u></path> </svg> </button> <button class="form_item_btn" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_623_115)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_623_115" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> </div> </div> <div class="form_item read" data-astro-cid-jtbmss7u> <div class="form_item_body" data-astro-cid-jtbmss7u> <div class="form_item_info" data-astro-cid-jtbmss7u> <p class="form_item_info_item" data-astro-cid-jtbmss7u>株式会社もっふる</p> <span class="slash" data-astro-cid-jtbmss7u></span> <p class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</p> <span class="slash" data-astro-cid-jtbmss7u></span> <time class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</time> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <h3 class="form_item_text" data-astro-cid-jtbmss7u>
初めまして、株式会社もっふるの広報担当の喪降と申します。 Google検索で貴社のWEBコンテンツをご紹介し、相互の認知度向上に寄与したいと考えております。 よくあるリード営業などではない為に、費用や掲載費用などは一切なく、 貴社様のご紹介を弊社メディアでさせて頂いても構いませんでしょうか？ また、Googleでの認知度向上を目的に、弊社サイトと貴社サイトの相互リンクをご提案いたします。 費用や掲載料は一切発生せず、双方の顧客にとって有益な情報提供が可能になります。 ご興味がございましたら、下記メールアドレスまでご返信いただけますと幸いです。
</h3> </div> </div> <div class="form_item_btns" data-astro-cid-jtbmss7u> <button class="form_item_flag" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M2.66602 14.0003V10.4583M2.66602 10.4583C6.54468 7.42498 9.45402 13.4916 13.3327 10.4583V2.87565C9.45402 5.90898 6.54468 -0.157686 2.66602 2.87565V10.4583Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jtbmss7u></path> </svg> </button> <button class="form_item_btn" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_623_115)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_623_115" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> </div> </div> <div class="form_item" data-astro-cid-jtbmss7u> <div class="form_item_body" data-astro-cid-jtbmss7u> <div class="form_item_info" data-astro-cid-jtbmss7u> <p class="form_item_info_item" data-astro-cid-jtbmss7u>株式会社もっふる</p> <span class="slash" data-astro-cid-jtbmss7u></span> <p class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</p> <span class="slash" data-astro-cid-jtbmss7u></span> <time class="form_item_info_item" data-astro-cid-jtbmss7u>藻降 太郎</time> </div> <div class="form_item_wrapper" data-astro-cid-jtbmss7u> <h3 class="form_item_text" data-astro-cid-jtbmss7u>
初めまして、株式会社もっふるの広報担当の喪降と申します。 Google検索で貴社のWEBコンテンツをご紹介し、相互の認知度向上に寄与したいと考えております。 よくあるリード営業などではない為に、費用や掲載費用などは一切なく、 貴社様のご紹介を弊社メディアでさせて頂いても構いませんでしょうか？ また、Googleでの認知度向上を目的に、弊社サイトと貴社サイトの相互リンクをご提案いたします。 費用や掲載料は一切発生せず、双方の顧客にとって有益な情報提供が可能になります。 ご興味がございましたら、下記メールアドレスまでご返信いただけますと幸いです。
</h3> </div> </div> <div class="form_item_btns" data-astro-cid-jtbmss7u> <button class="form_item_flag" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <path d="M2.66602 14.0003V10.4583M2.66602 10.4583C6.54468 7.42498 9.45402 13.4916 13.3327 10.4583V2.87565C9.45402 5.90898 6.54468 -0.157686 2.66602 2.87565V10.4583Z" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jtbmss7u></path> </svg> </button> <button class="form_item_btn" data-astro-cid-jtbmss7u> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jtbmss7u> <g clip-path="url(#clip0_623_115)" data-astro-cid-jtbmss7u> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-jtbmss7u></path> </g> <defs data-astro-cid-jtbmss7u> <clipPath id="clip0_623_115" data-astro-cid-jtbmss7u> <rect width="16" height="16" fill="white" data-astro-cid-jtbmss7u></rect> </clipPath> </defs> </svg> </button> </div> </div> </div> </section> ` })}  ${renderScript($$result, "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/form.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/form.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/form.astro";
const $$url = "/projects/[projectId]/form";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Form,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
