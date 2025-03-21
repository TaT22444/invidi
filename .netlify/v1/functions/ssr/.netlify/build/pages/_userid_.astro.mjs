import { e as createComponent, f as createAstro, r as renderTemplate, i as renderComponent, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_B090UaZe.mjs';
import admin from 'firebase-admin';
import { v4 } from 'uuid';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (!admin.apps.length) {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT || '{\n  "type": "service_account",\n  "project_id": "test-87192",\n  "private_key_id": "f8c752d50cc048bbfb09e05146c69dbd0b6cb1b6",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf8oB8fxG+EN3a\\ns2kqH+nNt6cr5yxKXEkY73y2PfBAiOOeo7lFhxJrwV51I0iVttuUeMmsxX+HkIaa\\nTKE21IKybYwrw1O66ov0TRZz5xGmcx9FZtS0FQ8m5Mnnqzb9sDBkRdDKMMrIlZdA\\nGbpW2u43KCo2XC+4ft40ZYox4aFGirf7ZTx5G+ElQh2TGE4x/gnvV0ykiP1cP3Xp\\nE1TPluLuAIvycNX5QBsZFt1IGist/tlzLHw1zRcf8C8PYNCVGcqcMb7fSercaj+A\\na2oVj8IH5ACGFf+XZzT09jbH9hT8mfaZXms7AZR4jhBhWco2tYOKwY1pmuXyVeri\\nthwLkHDzAgMBAAECggEAHMqVMFPbSMBWfyiudIO8HWjCsddyFIyaJ9/sLg3mMmex\\nuXu1PPu8aCMtsp5AUZrR2d8IRo5ij2+HmzzSBEGqqR2pDrOhXdMckERUF1bvyWuN\\npHuHLEdiK9khMw+R3Yaan2Il3E9+IS80Q7id30aXfNxBBPoBKQ/FRd9FSgdYdY73\\n0nTp3S2uOdmT6/xRAMGQz2uBS7Vt+IEbNeWRMco0mgqIlzIlgkvBArJt4Tzg/xc4\\nEzZwQAIAm1T5/tU5hbJg9vm9h0oqdf+URxZ5/RY/KvWNovYXPN4CAgzcglbeH5up\\nKPN5dccHySsDdv6mn9eVxsCJNNXHyPZyeb8oESwzWQKBgQDaOk3a5UCygS6aNdGi\\n4j69ZhwTEUYxCCmIrT+D4j2AGCkMKBnNfmaHdLlZQCxzayF0k6V9DDTHQe3kHGUN\\nOP/ZCbXbYoOysPwDAq+secoE2VFyph6tKMOogVG/SyMjYfNrBPdf7ELRMMkEE4B+\\nWBgfIYWFcQwiVj3kpR7ly10BFQKBgQC7ociJWjrOpf14b9Mi5qlTalhEKRCiOyZy\\naMCLTe3aGHWNKeoU55XHJirw8+Hzez+r9FOv1nSDvuZKx5l5YnvBPNa3N8YHjp9W\\noC1iWI+iYJ6mbbggQv50V16fY+zovXDoI/V0hwwRuR2M5pLuHO8UuEK8yuZ2uw4p\\nseQqarpb5wKBgQCT/4KZd2y/IrkWQHWh/8oI7N0RWV+/FQgF92jh6mdHHhuIcRG+\\nuYCTUOf6zXjX9cnEo/VRrxuEHwRU9aTaqNNqwBkjZdZnM3xWFlZJpHcLfs6r8FlR\\nmhnHh5yHHVABSQaqh720wig2ct2A9DDqfpgtVLCW5SoTh2WGUS15LsguWQKBgACJ\\nDqRtsHtEd/uu/gA8fkExrXzMTTLZTlvHNr1vBH250iQL+ZIDsya1UiwL1ho2wNDB\\nyrdWulBh7BBMj4CMKmQ7wzUUoKkG3CeIH3kHXamN8wXwjDTzW/yC/08fHt7vI3JW\\nH+4sMHmgeJgdVE//nyME/5PAVHYERJ8T1d3VHiEDAoGATVJVo/+ikTXJfHz1e3oe\\nqndDpXhQlj2VsNWBBBHgovSwH4iOd66EWKvTIRCIRzS6XDZ2w2cPKMxZ/6UbIfyf\\naDMpkMsCQE824Hg+HU6POn91XIuzPSV/snXJ9KtqHdXOAKOPe0W8CLiEFHmhArej\\nrrjFJp1QQG7U82o5YqnHg1Y=\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk-fbsvc@test-87192.iam.gserviceaccount.com",\n  "client_id": "110908066451240127621",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-87192.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}';
    {
      const serviceAccount = JSON.parse(serviceAccountStr);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
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
  const { userId } = Astro2.params;
  let authUser = null;
  if (token) {
    try {
      authUser = await adminAuth.verifyIdToken(token);
    } catch (err) {
      console.error("IDトークンの検証に失敗しました", err);
    }
  }
  if (!authUser?.uid) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/" }
    });
  }
  if (authUser.uid !== userId) {
    return new Response("アクセス権がありません", { status: 403 });
  }
  let userData = null;
  const userRef = db.collection("users").doc(userId);
  const userSnap = await userRef.get();
  if (userSnap.exists) {
    userData = userSnap.data();
  } else {
    console.error("User data not found for:", userId);
    return new Response(null, {
      status: 303,
      headers: { Location: "/" }
    });
  }
  const projects = userData.projects || [];
  const planName = userData.plan || "free";
  let postError = "";
  const method = Astro2.request.method.toUpperCase();
  if (method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action")?.toString() || "";
    if (action === "logout") {
      return new Response(null, {
        status: 303,
        headers: {
          "Set-Cookie": "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
          Location: "/"
        }
      });
    } else if (action === "create_project") {
      const projectName = formData.get("projectName")?.toString() || "";
      const projectDescription = formData.get("projectDescription")?.toString() || "";
      const newProject = {
        id: v4(),
        name: projectName,
        description: projectDescription,
        followers: 0,
        currentPages: 0,
        maxPages: 3,
        createdAt: /* @__PURE__ */ new Date(),
        ownerId: userId,
        allTags: []
      };
      try {
        const userSnap2 = await userRef.get();
        if (userSnap2.exists) {
          const currentProjects = userSnap2.data().projects || [];
          currentProjects.push(newProject);
          await userRef.update({ projects: currentProjects });
          if (planName === "free") {
            const projectDocRef = db.collection("projects").doc(newProject.id);
            await projectDocRef.set({
              userId,
              // 紐付け用
              plan: planName,
              // "free"
              name: projectName,
              description: projectDescription,
              createdAt: /* @__PURE__ */ new Date(),
              allTags: []
            });
            await projectDocRef.collection("blog").doc("init").set({
              title: "サンプルブログ",
              content: "これは初期作成されたサンプル投稿です",
              createdAt: /* @__PURE__ */ new Date()
            });
            await projectDocRef.collection("notice").doc("init").set({
              title: "サンプルお知らせ",
              content: "これは初期作成されたサンプルお知らせです",
              createdAt: /* @__PURE__ */ new Date()
            });
            await projectDocRef.collection("contact").doc("init").set({
              name: "Contactサンプル",
              message: "お問い合わせフォームに送信された例・・・",
              createdAt: /* @__PURE__ */ new Date()
            });
          }
          return new Response(null, {
            status: 303,
            headers: { Location: `/${userId}` }
          });
        } else {
          postError = "ユーザーデータが見つかりません";
        }
      } catch (err) {
        console.error("[Create Project Error]", err);
        postError = "プロジェクト作成に失敗しました";
      }
    } else if (action === "delete_project") {
      const projectId = formData.get("projectId")?.toString() || "";
      const typedName = formData.get("confirmProjectName")?.toString() || "";
      const originalName = formData.get("originalProjectName")?.toString() || "";
      if (!projectId) {
        postError = "プロジェクトIDが指定されていません";
      } else if (typedName !== originalName) {
        postError = "プロジェクト名が一致しません（server）。削除を中断しました。";
      } else {
        try {
          const userSnap2 = await userRef.get();
          if (userSnap2.exists) {
            const currentProjects = userSnap2.data().projects || [];
            const updatedProjects = currentProjects.filter((p) => p.id !== projectId);
            await userRef.update({ projects: updatedProjects });
            return new Response(null, {
              status: 303,
              headers: { Location: `/${userId}` }
            });
          } else {
            postError = "ユーザーデータが見つかりません";
          }
        } catch (err) {
          console.error("[Delete Project Error]", err);
          postError = "プロジェクト削除に失敗しました";
        }
      }
    }
  }
  return renderTemplate(_a || (_a = __template(["", `  <script client:load>
	
	document.querySelectorAll('.box_project-item').forEach((item) => {
    item.addEventListener('click', (event) => {

			const projectId = item.getAttribute('data-project-id');
			window.location.href = '/projects/' + projectId;
    });
  });

  const iconButtons = document.querySelectorAll('.form_item_icon, .form_item_btn');
  iconButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      // 親要素へのクリックを伝搬しない＝カードのクリックイベントをキャンセル
      event.stopPropagation();

      // TODO: 実際の削除処理やお気に入り処理などはここで行う
      console.log('アイコンボタンがクリックされました！');
    });
  });

const deleteModal = document.getElementById("delete-confirm-modal");
  const deleteCancelBtn = document.getElementById("delete-cancel-btn");
  const deleteSubmitBtn = document.getElementById("delete-submit-btn");
  const deleteProjectIdInput = document.getElementById("deleteProjectId");
  const deleteOriginalNameInput = document.getElementById("deleteOriginalName");
  const confirmProjectNameInput = document.getElementById("confirmProjectNameInput");

  const deleteConfirmBtns = document.querySelectorAll(".delete_confirm_btn");
  deleteConfirmBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // クリックされたプロジェクトの情報を取得
      const projectId = btn.getAttribute("data-project-id");
      const projectName = btn.getAttribute("data-project-name");

      // hidden input に値を反映
      deleteProjectIdInput.value = projectId;
      deleteOriginalNameInput.value = projectName;
      confirmProjectNameInput.value = "";

      // モーダルを表示
      deleteModal.style.display = "block";
    });
  });

  deleteCancelBtn.addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === deleteModal) {
      deleteModal.style.display = "none";
    }
  });

  deleteSubmitBtn.addEventListener("click", (e) => {
    const typedName = confirmProjectNameInput.value.trim();
    const originalName = deleteOriginalNameInput.value.trim();

    if (!typedName || typedName !== originalName) {
      e.preventDefault();
      alert("プロジェクト名が一致しません（front）。削除できません。");
    }
  });


  const modal = document.getElementById("project-modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalSpan = document.getElementById("close-modal");
  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }
  if (closeModalSpan) {
    closeModalSpan.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  const defaultFormMode = "{defaultFormMode}";
  const savedMode = localStorage.getItem("formMode") || defaultFormMode;
  localStorage.setItem("formMode", savedMode);

  const loginBox = document.getElementById("auth_box_login");
  const registerBox = document.getElementById("auth_box_register");
  const toRegisterBtn = document.getElementById("auth_box_change_to_register");
  const toLoginBtn = document.getElementById("auth_box_change_to_login");


  if (savedMode === "register") {
    loginBox.classList.add("dis-none");
    registerBox.classList.remove("dis-none");
  } else {
    registerBox.classList.add("dis-none");
    loginBox.classList.remove("dis-none");
  }

  if (toRegisterBtn) {
    toRegisterBtn.addEventListener("click", () => {
      localStorage.setItem("formMode", "register");
      loginBox.classList.add("dis-none");
      registerBox.classList.remove("dis-none");
    });
  }
  if (toLoginBtn) {
    toLoginBtn.addEventListener("click", () => {
      localStorage.setItem("formMode", "login");
      registerBox.classList.add("dis-none");
      loginBox.classList.remove("dis-none");
    });
  }
</script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "App Title", "userId": userId, "accountName": userData.displayName, "projects": projects, "data-astro-cid-pb63czk5": true }, { "default": ($$result2) => renderTemplate`${postError && renderTemplate`${maybeRenderHead()}<p style="color:red;" data-astro-cid-pb63czk5>${postError}</p>`}<div class="pan" data-astro-cid-pb63czk5> <p class="pan_item" data-astro-cid-pb63czk5> <a${addAttribute(userId ? `/${userId}` : "/", "href")} data-astro-cid-pb63czk5>トップ</a> <span data-astro-cid-pb63czk5> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-pb63czk5> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-pb63czk5></path> </svg> </span> <span data-astro-cid-pb63czk5>${userData.displayName || "(No Name)"}</span> </p> </div> ${planName === "free" && renderTemplate`<div class="box first" data-astro-cid-pb63czk5> <div class="inner" data-astro-cid-pb63czk5> <div class="box_header" data-astro-cid-pb63czk5> <h2 class="box_header_label" data-astro-cid-pb63czk5>フリープラン</h2> <a href="/" class="box_header_btn" data-astro-cid-pb63czk5>他のプランを見る</a> </div> <div class="box_plan-list" data-astro-cid-pb63czk5> <div class="box_plan-item" data-astro-cid-pb63czk5> <p class="box_plan-item_label" data-astro-cid-pb63czk5>料金</p> <div class="box_plan-item_contents" data-astro-cid-pb63czk5> <p class="box_plan-item_text" data-astro-cid-pb63czk5> <strong class="strong" data-astro-cid-pb63czk5>無料</strong> </p> <div class="box_plan-item_bar" data-astro-cid-pb63czk5> <span class="box_plan-item_bar_elem" data-astro-cid-pb63czk5></span> </div> </div> </div> <div class="box_plan-item" data-astro-cid-pb63czk5> <p class="box_plan-item_label" data-astro-cid-pb63czk5>プロジェクト数</p> <div class="box_plan-item_contents" data-astro-cid-pb63czk5> <p class="box_plan-item_text" data-astro-cid-pb63czk5> <strong class="strong" data-astro-cid-pb63czk5>${projects.length}</strong> <span data-astro-cid-pb63czk5>/</span> <span data-astro-cid-pb63czk5>3</span> </p> <div class="box_plan-item_bar" data-astro-cid-pb63czk5> <span class="box_plan-item_bar_elem" data-astro-cid-pb63czk5></span> </div> </div> </div> <div class="box_plan-item" data-astro-cid-pb63czk5> <p class="box_plan-item_label" data-astro-cid-pb63czk5>総データ使用量</p> <div class="box_plan-item_contents" data-astro-cid-pb63czk5> <p class="box_plan-item_text" data-astro-cid-pb63czk5> <strong class="strong" data-astro-cid-pb63czk5>24</strong> <span data-astro-cid-pb63czk5>GB</span> <span data-astro-cid-pb63czk5>/</span> <span data-astro-cid-pb63czk5>124</span> <span data-astro-cid-pb63czk5>GB</span> </p> <div class="box_plan-item_bar" data-astro-cid-pb63czk5> <span class="box_plan-item_bar_elem" data-astro-cid-pb63czk5></span> </div> </div> </div> </div> </div> </div>`}<div class="box" data-astro-cid-pb63czk5> <div class="inner" data-astro-cid-pb63czk5> <div class="box_header" data-astro-cid-pb63czk5> <h2 class="box_header_label" data-astro-cid-pb63czk5> <span data-astro-cid-pb63czk5>プロジェクト</span> <span class="box_header_label_elem" data-astro-cid-pb63czk5>${projects.length}</span> <span data-astro-cid-pb63czk5>/</span> <span data-astro-cid-pb63czk5>3</span> </h2> <button id="open-modal" class="box_header_btn" data-astro-cid-pb63czk5> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-pb63czk5> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 18.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-pb63czk5></path> </svg> <p data-astro-cid-pb63czk5>新しいプロジェクト</p> </button> </div> <div class="box_search" data-astro-cid-pb63czk5> <div class="box_search_wrapper" data-astro-cid-pb63czk5> <button data-astro-cid-pb63czk5> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-pb63czk5> <path d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-pb63czk5></path> </svg> </button> <input type="text" placeholder="プロジェクトを検索" data-astro-cid-pb63czk5> </div> </div> ${projects.length > 0 ? renderTemplate`<div class="box_project-list" data-astro-cid-pb63czk5> ${projects.map((project) => renderTemplate`<div class="box_project-item"${addAttribute(project.id, "data-project-id")} data-astro-cid-pb63czk5> <div class="box_project-item_img" data-astro-cid-pb63czk5></div> <h3 class="box_project-item_name" data-astro-cid-pb63czk5>${project.name}</h3> <div class="box_project-item_right" data-astro-cid-pb63czk5> <div class="box_project-item_right_wrapper" data-astro-cid-pb63czk5> <p class="box_project-item_right_wrapper_label" data-astro-cid-pb63czk5>フォロワー数</p> <p class="box_project-item_right_wrapper_label value" data-astro-cid-pb63czk5> <strong class="strong" data-astro-cid-pb63czk5>${project.followers || 0}</strong> <span data-astro-cid-pb63czk5>人</span> </p> </div> <div class="box_project-item_right_wrapper" data-astro-cid-pb63czk5> <p class="box_project-item_right_wrapper_label" data-astro-cid-pb63czk5>ページ数</p> <p class="box_project-item_right_wrapper_label value" data-astro-cid-pb63czk5> <strong class="strong" data-astro-cid-pb63czk5>${project.currentPages || 0}</strong> <span data-astro-cid-pb63czk5>/</span> <span data-astro-cid-pb63czk5>${project.maxPages || 0}</span> </p> </div> </div> <div class="form_item_btns" data-astro-cid-pb63czk5>  <button class="form_item_icon delete_confirm_btn" type="button"${addAttribute(project.id, "data-project-id")}${addAttribute(project.name, "data-project-name")}${addAttribute((e) => e.stopPropagation(), "onClick")} data-astro-cid-pb63czk5>  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-pb63czk5> <path d="M8.33268 5.00033H11.666C11.666 4.5583 11.4904 4.13437 11.1779 3.82181C10.8653 3.50925 10.4414 3.33366 9.99935 3.33366C9.55732 3.33366 9.1334 3.50925 8.82084 3.82181C8.50828 4.13437 8.33268 4.5583 8.33268 5.00033ZM6.66602 5.00033C6.66602 4.11627 7.0172 3.26842 7.64233 2.6433C8.26745 2.01818 9.11529 1.66699 9.99935 1.66699C10.8834 1.66699 11.7313 2.01818 12.3564 2.6433C12.9815 3.26842 13.3327 4.11627 13.3327 5.00033H17.4993C17.7204 5.00033 17.9323 5.08812 18.0886 5.2444C18.2449 5.40068 18.3327 5.61265 18.3327 5.83366C18.3327 6.05467 18.2449 6.26663 18.0886 6.42291C17.9323 6.57919 17.7204 6.66699 17.4993 6.66699H16.7643L16.026 15.2837C15.955 16.1157 15.5743 16.8908 14.9592 17.4556C14.3441 18.0204 13.5394 18.3338 12.7043 18.3337H7.29435C6.45927 18.3338 5.65458 18.0204 5.03947 17.4556C4.42437 16.8908 4.04366 16.1157 3.97268 15.2837L3.23435 6.66699H2.49935C2.27834 6.66699 2.06637 6.57919 1.91009 6.42291C1.75381 6.26663 1.66602 6.05467 1.66602 5.83366C1.66602 5.61265 1.75381 5.40068 1.91009 5.2444C2.06637 5.08812 2.27834 5.00033 2.49935 5.00033H6.66602Z" fill="#C4C4C4" data-astro-cid-pb63czk5></path> </svg> </button> <button class="form_item_btn" data-astro-cid-pb63czk5>  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-pb63czk5> <g clip-path="url(#clip0_623_115)" data-astro-cid-pb63czk5> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-pb63czk5></path> </g> <defs data-astro-cid-pb63czk5> <clipPath id="clip0_623_115" data-astro-cid-pb63czk5> <rect width="16" height="16" fill="white" data-astro-cid-pb63czk5></rect> </clipPath> </defs> </svg> </button> </div> </div>`)} </div>` : renderTemplate`<p class="no-projects" data-astro-cid-pb63czk5>プロジェクトはありません</p>`} </div> </div> <form method="POST" data-astro-cid-pb63czk5> <input type="hidden" name="action" value="logout" data-astro-cid-pb63czk5> <button type="submit" data-astro-cid-pb63czk5>ログアウト</button> </form> <div id="delete-confirm-modal" class="modal" style="display: none;" data-astro-cid-pb63czk5> <div class="modal-content" data-astro-cid-pb63czk5> <div class="modal_header" data-astro-cid-pb63czk5> <h2 class="modal_header_title" data-astro-cid-pb63czk5>プロジェクトを削除</h2> <p class="modal_header_desc" data-astro-cid-pb63czk5>下の記入欄にプロジェクト名を入力してください</p> </div> <form class="delete_project_form" method="POST" data-astro-cid-pb63czk5> <input type="hidden" name="action" value="delete_project" data-astro-cid-pb63czk5> <input type="hidden" name="projectId" id="deleteProjectId" data-astro-cid-pb63czk5> <input type="hidden" name="originalProjectName" id="deleteOriginalName" data-astro-cid-pb63czk5> <div class="project_settings_wrapper" data-astro-cid-pb63czk5> <label for="confirmProjectName" data-astro-cid-pb63czk5>プロジェクト名</label> <input type="text" name="confirmProjectName" id="confirmProjectNameInput" placeholder="プロジェクト名を入力" required data-astro-cid-pb63czk5> </div> <div class="project_settings_btns" data-astro-cid-pb63czk5> <span class="close" id="delete-cancel-btn" data-astro-cid-pb63czk5>やめる</span> <button class="delete" type="submit" id="delete-submit-btn" data-astro-cid-pb63czk5>
削除
</button> </div> </form> </div> </div> <div id="project-modal" class="modal" style="display: none;" data-astro-cid-pb63czk5> <div class="modal-content" data-astro-cid-pb63czk5> <div class="modal_header" data-astro-cid-pb63czk5> <h2 class="modal_header_title" data-astro-cid-pb63czk5>新しくプロジェクトを作成</h2> <p class="modal_header_desc" data-astro-cid-pb63czk5>あと2つ作成できます</p> <button class="upgrade_btn" data-astro-cid-pb63czk5>
アップグレードして作成可能枠を増やす
</button> </div> <form class="project_settings" method="POST" data-astro-cid-pb63czk5> <input type="hidden" name="action" value="create_project" data-astro-cid-pb63czk5> <div class="project_settings_wrapper" data-astro-cid-pb63czk5> <label for="projectName" data-astro-cid-pb63czk5>プロジェクト名</label> <input type="text" name="projectName" required data-astro-cid-pb63czk5> </div> <div class="project_settings_wrapper" data-astro-cid-pb63czk5> <label for="projectDescription" data-astro-cid-pb63czk5>プロジェクトの説明</label> <textarea name="projectDescription" rows="4" placeholder="どんなプロジェクトか説明してください" data-astro-cid-pb63czk5></textarea> </div> <div class="project_settings_btns" data-astro-cid-pb63czk5> <span class="close" id="close-modal" data-astro-cid-pb63czk5>閉じる</span> <button class="create" type="submit" data-astro-cid-pb63czk5>作成</button> </div> </form> </div> </div> ` }));
}, "/Users/tat/Dev/indivi/src/pages/[userId]/index.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/[userId]/index.astro";
const $$url = "/[userId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
