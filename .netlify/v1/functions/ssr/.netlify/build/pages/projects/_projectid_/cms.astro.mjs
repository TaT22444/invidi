import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, i as renderComponent, j as renderScript } from '../../../chunks/astro/server_BHyAVnZ_.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                     */
import { $ as $$Layout } from '../../../chunks/Layout_B090UaZe.mjs';
import 'clsx';
import admin from 'firebase-admin';
import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
export { renderers } from '../../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$Blog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Blog;
  const { existingBlogTags, blogList } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="cms_box cms-panel" id="blog-panel" style="display: none;" data-astro-cid-b4mpjmb3> <section class="box" data-astro-cid-b4mpjmb3> <div class="inner" data-astro-cid-b4mpjmb3> <!-- <div class="cms"> --> <form class="cms" method="POST" enctype="multipart/form-data" data-astro-cid-b4mpjmb3> <input type="hidden" name="action" value="create_blog" data-astro-cid-b4mpjmb3> <textarea name="blogTextContent" id="blogTextContent" style="display:none;" data-astro-cid-b4mpjmb3></textarea> <div class="cms-header" data-astro-cid-b4mpjmb3> <p class="cms-header_title" data-astro-cid-b4mpjmb3>ブログ</p> <div class="box_btn_wrapper" data-astro-cid-b4mpjmb3> <button type="submit" name="submitType" value="draft" class="box_btn" data-astro-cid-b4mpjmb3>
下書き保存
</button> <button type="submit" name="submitType" value="publish" class="box_btn save" data-astro-cid-b4mpjmb3>投稿</button> </div> </div> <div class="cms-body" data-astro-cid-b4mpjmb3> <!-- <form class="cms-body" method="POST"> --> <!-- <input type="hidden" name="action" value="create_blog" /> --> <div class="cms-body_input-wrapper" data-astro-cid-b4mpjmb3> <label for="cms-title" data-astro-cid-b4mpjmb3>タイトル</label> <input type="text" id="cms-title" name="blogTitle" placeholder="タイトルを入力してください" data-astro-cid-b4mpjmb3> </div> <div class="cms-body_input-wrapper" data-astro-cid-b4mpjmb3> <label for="blogThumbnail" data-astro-cid-b4mpjmb3>サムネイル画像</label> <input type="file" id="blogThumbnail" name="blogThumbnail" accept="image/*" style="display:none;" data-astro-cid-b4mpjmb3> <div id="thumbnail-preview-container" data-astro-cid-b4mpjmb3></div> </div> <div class="cms-body_input-wrapper" data-astro-cid-b4mpjmb3> <p data-astro-cid-b4mpjmb3>本文</p> <div class="cms-body_input-wrapper_contents" data-astro-cid-b4mpjmb3> <div class="blog-elems" data-astro-cid-b4mpjmb3> <button class="blog-elems_elem" data-type="heading1" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>大見出し</p> </button> <button class="blog-elems_elem" data-type="heading2" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>中見出し</p> </button> <button class="blog-elems_elem" data-type="heading3" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>小出し</p> </button> <button class="blog-elems_elem" data-type="text" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>テキスト</p> </button> <button class="blog-elems_elem" data-type="image" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>画像</p> </button> <button class="blog-elems_elem" data-type="link" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>リンク</p> </button> </div> <div class="blog" data-astro-cid-b4mpjmb3></div> <div class="blog-limits" data-astro-cid-b4mpjmb3> <p data-astro-cid-b4mpjmb3> <span data-astro-cid-b4mpjmb3>あと</span> <strong class="strong" data-astro-cid-b4mpjmb3>400</strong> <span data-astro-cid-b4mpjmb3>文字</span> </p> <p data-astro-cid-b4mpjmb3> <span data-astro-cid-b4mpjmb3>添付可能画像数</span> <strong class="strong" data-astro-cid-b4mpjmb3>3</strong> <span data-astro-cid-b4mpjmb3>/</span> <span data-astro-cid-b4mpjmb3>3</span> <span data-astro-cid-b4mpjmb3>枚</span> </p> </div> </div> </div> <fieldset id="blog-tag-fieldset" data-astro-cid-b4mpjmb3> <p class="label" data-astro-cid-b4mpjmb3>タグ</p> ${existingBlogTags.map((tag) => renderTemplate`<div class="cms-body_wrapper"${addAttribute(String(tag), "data-key")} data-astro-cid-b4mpjmb3> <input type="checkbox"${addAttribute(`blog-tag-${tag}`, "id")} name="blogTags"${addAttribute(String(tag), "value")} data-astro-cid-b4mpjmb3> <label${addAttribute(`blog-tag-${tag}`, "for")} data-astro-cid-b4mpjmb3>${tag}</label> </div>`)} <button type="button" id="addBlogTagBtn" class="cms-body_wrapper_btn" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-b4mpjmb3></path> </svg> <p data-astro-cid-b4mpjmb3>タグを追加(2/5)</p> </button> </fieldset> </div> </form> </div> </section> <section class="posted" data-astro-cid-b4mpjmb3> <h2 class="posted_label" data-astro-cid-b4mpjmb3>ブログ一覧</h2> <div class="option_box" data-astro-cid-b4mpjmb3> <div class="subject_wrapper" id="blog-status-wrapper" data-astro-cid-b4mpjmb3> <button class="active" data-astro-cid-b4mpjmb3>公開</button> <button data-astro-cid-b4mpjmb3>下書き</button> </div> <div class="option_wrapper" id="blog-option-wrapper" data-astro-cid-b4mpjmb3> <div class="option" data-astro-cid-b4mpjmb3> <input type="radio" checked id="blog-tag-all" name="blog-option" value="すべて" data-astro-cid-b4mpjmb3> <label for="blog-tag-all" data-astro-cid-b4mpjmb3>すべて</label> </div> ${existingBlogTags.map((tag, index) => renderTemplate`<div class="option" data-astro-cid-b4mpjmb3> <input type="radio"${addAttribute(`blog-tag-${index}`, "id")} name="blog-option"${addAttribute(tag, "value")} data-astro-cid-b4mpjmb3> <label${addAttribute(`blog-tag-${index}`, "for")} data-astro-cid-b4mpjmb3>${tag}</label> </div>`)} </div> </div> <ul class="posted_blog-list" data-astro-cid-b4mpjmb3> <ul class="posted_blog-list" data-astro-cid-b4mpjmb3> ${blogList.length > 0 ? blogList.map((post) => renderTemplate`<li class="posted_blog-item"${addAttribute(post.id, "key")}${addAttribute(post.status || "public", "data-status")}${addAttribute(JSON.stringify(post.tags || []), "data-tags")} data-astro-cid-b4mpjmb3> <img${addAttribute(post.thumbnailUrl || "/assets/noimage.png", "src")} alt="" data-astro-cid-b4mpjmb3> <p data-astro-cid-b4mpjmb3> <span data-astro-cid-b4mpjmb3> ${post.tags && post.tags.length > 0 ? post.tags.join(", ") : "\u672A\u5206\u985E"} </span> <span class="slash" data-astro-cid-b4mpjmb3></span> <span data-astro-cid-b4mpjmb3>${post.dateStr || "\u65E5\u4ED8\u672A\u8A2D\u5B9A"}</span> </p> <h4 data-astro-cid-b4mpjmb3>${post.title || "(\u7121\u984C)"}</h4> <div class="posted_blog-item_btns" data-astro-cid-b4mpjmb3> <button class="posted_blog-item_btn delete"${addAttribute(post.id, "data-blog-id")} data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path d="M8.33268 5.00033H11.666C11.666 4.5583 11.4904 4.13437 11.1779 3.82181C10.8653 3.50925 10.4414 3.33366 9.99935 3.33366C9.55732 3.33366 9.1334 3.50925 8.82084 3.82181C8.50828 4.13437 8.33268 4.5583 8.33268 5.00033ZM6.66602 5.00033C6.66602 4.11627 7.0172 3.26842 7.64233 2.6433C8.26745 2.01818 9.11529 1.66699 9.99935 1.66699C10.8834 1.66699 11.7313 2.01818 12.3564 2.6433C12.9815 3.26842 13.3327 4.11627 13.3327 5.00033H17.4993C17.7204 5.00033 17.9323 5.08812 18.0886 5.2444C18.2449 5.40068 18.3327 5.61265 18.3327 5.83366C18.3327 6.05467 18.2449 6.26663 18.0886 6.42291C17.9323 6.57919 17.7204 6.66699 17.4993 6.66699H16.7643L16.026 15.2837C15.955 16.1157 15.5743 16.8908 14.9592 17.4556C14.3441 18.0204 13.5394 18.3338 12.7043 18.3337H7.29435C6.45927 18.3338 5.65458 18.0204 5.03947 17.4556C4.42437 16.8908 4.04366 16.1157 3.97268 15.2837L3.23435 6.66699H2.49935C2.27834 6.66699 2.06637 6.57919 1.91009 6.42291C1.75381 6.26663 1.66602 6.05467 1.66602 5.83366C1.66602 5.61265 1.75381 5.40068 1.91009 5.2444C2.06637 5.08812 2.27834 5.00033 2.49935 5.00033H6.66602ZM12.4993 10.0003C12.4993 9.77931 12.4116 9.56735 12.2553 9.41107C12.099 9.25479 11.887 9.16699 11.666 9.16699C11.445 9.16699 11.233 9.25479 11.0768 9.41107C10.9205 9.56735 10.8327 9.77931 10.8327 10.0003V13.3337C10.8327 13.5547 10.9205 13.7666 11.0768 13.9229C11.233 14.0792 11.445 14.167 11.666 14.167C11.887 14.167 12.099 14.0792 12.2553 13.9229C12.4116 13.7666 12.4993 13.5547 12.4993 13.3337V10.0003ZM8.33268 9.16699C8.5537 9.16699 8.76566 9.25479 8.92194 9.41107C9.07822 9.56735 9.16602 9.77931 9.16602 10.0003V13.3337C9.16602 13.5547 9.07822 13.7666 8.92194 13.9229C8.76566 14.0792 8.5537 14.167 8.33268 14.167C8.11167 14.167 7.89971 14.0792 7.74343 13.9229C7.58715 13.7666 7.49935 13.5547 7.49935 13.3337V10.0003C7.49935 9.77931 7.58715 9.56735 7.74343 9.41107C7.89971 9.25479 8.11167 9.16699 8.33268 9.16699ZM5.63268 15.142C5.66819 15.5582 5.85866 15.9458 6.16638 16.2283C6.47411 16.5107 6.87667 16.6673 7.29435 16.667H12.7043C13.1217 16.6668 13.5239 16.5101 13.8313 16.2277C14.1386 15.9453 14.3289 15.5579 14.3643 15.142L15.091 6.66699H4.90768L5.63268 15.142Z" fill="#C4C4C4" data-astro-cid-b4mpjmb3></path> </svg> </button> <button class="posted_blog-item_btn edit" data-astro-cid-b4mpjmb3> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-b4mpjmb3> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-b4mpjmb3></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-b4mpjmb3></path> </svg> </button> </div> </li>`) : renderTemplate`<li data-astro-cid-b4mpjmb3>ブログ記事はありません</li>`} </ul> </ul> </section> </div> `;
}, "/Users/tat/Dev/indivi/src/components/Blog.astro", void 0);

const $$Astro$1 = createAstro();
const $$Notice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Notice;
  const { existingNewsTags, noticeList } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="cms_box cms-panel" id="notice-panel" style="display: block;" data-astro-cid-ftwfccio> <section class="box" data-astro-cid-ftwfccio> <div class="inner" data-astro-cid-ftwfccio> <!-- <div class="cms"> --> <form class="cms" method="POST" enctype="multipart/form-data" data-astro-cid-ftwfccio> <input type="hidden" name="action" value="create_notice" data-astro-cid-ftwfccio> <div class="cms-header" data-astro-cid-ftwfccio> <p class="cms-header_title" data-astro-cid-ftwfccio>お知らせ</p> <div class="box_btn_wrapper" data-astro-cid-ftwfccio> <button type="submit" class="box_btn" data-astro-cid-ftwfccio>下書き保存</button> <button type="submit" id="save-btn" class="box_btn save" data-astro-cid-ftwfccio>投稿</button> </div> </div> <!-- <form class="cms-body" method="POST"> --> <div class="cms-body" data-astro-cid-ftwfccio> <div class="cms-body_input-wrapper" data-astro-cid-ftwfccio> <label for="news-title" data-astro-cid-ftwfccio>タイトル</label> <input type="text" id="news-title" name="newsTitle" placeholder="タイトルを入力してください" data-astro-cid-ftwfccio> </div> <div class="cms-body_input-wrapper" data-astro-cid-ftwfccio> <label for="news-text" data-astro-cid-ftwfccio>本文</label> <textarea id="news-text" name="newsBody" placeholder="お知らせの本文を入力してください" data-astro-cid-ftwfccio></textarea> </div> <fieldset id="tag-fieldset" data-astro-cid-ftwfccio> <p class="label" data-astro-cid-ftwfccio>タグ</p> ${existingNewsTags.map((tag) => renderTemplate`<div class="cms-body_wrapper"${addAttribute(String(tag), "data-key")} data-astro-cid-ftwfccio> <input type="checkbox"${addAttribute(`news-tag-${tag}`, "id")} name="newsTags"${addAttribute(String(tag), "value")} data-astro-cid-ftwfccio> <label${addAttribute(`news-tag-${tag}`, "for")} data-astro-cid-ftwfccio>${tag}</label> </div>`)} <button type="button" id="addNewsBtn" class="cms-body_wrapper_btn" data-astro-cid-ftwfccio> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ftwfccio> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-ftwfccio></path> </svg> <p data-astro-cid-ftwfccio>タグを追加(2/5)</p> </button> </fieldset> <!-- </form> --> </div> <!-- </div> --> </form> </div> </section> <section class="posted" data-astro-cid-ftwfccio> <h2 class="posted_label" data-astro-cid-ftwfccio>お知らせ一覧</h2> <div class="option_box" data-astro-cid-ftwfccio> <div class="subject_wrapper" id="notice-status-wrapper" data-astro-cid-ftwfccio> <button class="active" data-astro-cid-ftwfccio>公開</button> <button data-astro-cid-ftwfccio>下書き</button> </div> <div class="option_wrapper" id="notice-option-wrapper" data-astro-cid-ftwfccio> <div class="option" data-astro-cid-ftwfccio> <input type="radio" checked id="notice-tag-all" name="notice-option" value="すべて" data-astro-cid-ftwfccio> <label for="notice-tag-all" data-astro-cid-ftwfccio>すべて</label> </div> ${existingNewsTags.map((tag, index) => renderTemplate`<div class="option" data-astro-cid-ftwfccio> <input type="radio"${addAttribute(`notice-tag-${index}`, "id")} name="notice-option"${addAttribute(tag, "value")} data-astro-cid-ftwfccio> <label${addAttribute(`notice-tag-${index}`, "for")} data-astro-cid-ftwfccio>${tag}</label> </div>`)} </div> </div> <ul class="posted_list" data-astro-cid-ftwfccio> ${noticeList.length > 0 ? noticeList.map((item) => renderTemplate`<li class="posted_item"${addAttribute(item.id, "key")}${addAttribute(item.status || "public", "data-status")}${addAttribute(JSON.stringify(item.tags || []), "data-tags")} data-astro-cid-ftwfccio> <div class="posted_item_info" data-astro-cid-ftwfccio> <p data-astro-cid-ftwfccio> <span data-astro-cid-ftwfccio> ${item.tags && item.tags.length > 0 ? item.tags.join(", ") : "\u672A\u5206\u985E"} </span> <span class="slash" data-astro-cid-ftwfccio></span> <span data-astro-cid-ftwfccio>${item.dateStr}</span> </p> <h4 class="posted_item_title" data-astro-cid-ftwfccio> ${item.title || "(\u7121\u984C)"} </h4> </div> <div class="posted_item_btns" data-astro-cid-ftwfccio> <button class="posted_item_btn delete"${addAttribute(item.id, "data-notice-id")} data-astro-cid-ftwfccio> <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ftwfccio> <path d="M8.33268 5.00033H11.666C11.666 4.5583 11.4904 4.13437 11.1779 3.82181C10.8653 3.50925 10.4414 3.33366 9.99935 3.33366C9.55732 3.33366 9.1334 3.50925 8.82084 3.82181C8.50828 4.13437 8.33268 4.5583 8.33268 5.00033ZM6.66602 5.00033C6.66602 4.11627 7.0172 3.26842 7.64233 2.6433C8.26745 2.01818 9.11529 1.66699 9.99935 1.66699C10.8834 1.66699 11.7313 2.01818 12.3564 2.6433C12.9815 3.26842 13.3327 4.11627 13.3327 5.00033H17.4993C17.7204 5.00033 17.9323 5.08812 18.0886 5.2444C18.2449 5.40068 18.3327 5.61265 18.3327 5.83366C18.3327 6.05467 18.2449 6.26663 18.0886 6.42291C17.9323 6.57919 17.7204 6.66699 17.4993 6.66699H16.7643L16.026 15.2837C15.955 16.1157 15.5743 16.8908 14.9592 17.4556C14.3441 18.0204 13.5394 18.3338 12.7043 18.3337H7.29435C6.45927 18.3338 5.65458 18.0204 5.03947 17.4556C4.42437 16.8908 4.04366 16.1157 3.97268 15.2837L3.23435 6.66699H2.49935C2.27834 6.66699 2.06637 6.57919 1.91009 6.42291C1.75381 6.26663 1.66602 6.05467 1.66602 5.83366C1.66602 5.61265 1.75381 5.40068 1.91009 5.2444C2.06637 5.08812 2.27834 5.00033 2.49935 5.00033H6.66602ZM12.4993 10.0003C12.4993 9.77931 12.4116 9.56735 12.2553 9.41107C12.099 9.25479 11.887 9.16699 11.666 9.16699C11.445 9.16699 11.233 9.25479 11.0768 9.41107C10.9205 9.56735 10.8327 9.77931 10.8327 10.0003V13.3337C10.8327 13.5547 10.9205 13.7666 11.0768 13.9229C11.233 14.0792 11.445 14.167 11.666 14.167C11.887 14.167 12.099 14.0792 12.2553 13.9229C12.4116 13.7666 12.4993 13.5547 12.4993 13.3337V10.0003ZM8.33268 9.16699C8.5537 9.16699 8.76566 9.25479 8.92194 9.41107C9.07822 9.56735 9.16602 9.77931 9.16602 10.0003V13.3337C9.16602 13.5547 9.07822 13.7666 8.92194 13.9229C8.76566 14.0792 8.5537 14.167 8.33268 14.167C8.11167 14.167 7.89971 14.0792 7.74343 13.9229C7.58715 13.7666 7.49935 13.5547 7.49935 13.3337V10.0003C7.49935 9.77931 7.58715 9.56735 7.74343 9.41107C7.89971 9.25479 8.11167 9.16699 8.33268 9.16699ZM5.63268 15.142C5.66819 15.5582 5.85866 15.9458 6.16638 16.2283C6.47411 16.5107 6.87667 16.6673 7.29435 16.667H12.7043C13.1217 16.6668 13.5239 16.5101 13.8313 16.2277C14.1386 15.9453 14.3289 15.5579 14.3643 15.142L15.091 6.66699H4.90768L5.63268 15.142Z" fill="#C4C4C4" data-astro-cid-ftwfccio></path> </svg> </button> <button class="posted_item_btn" data-astro-cid-ftwfccio> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ftwfccio> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4559 5.41632C21.5509 5.56052 21.5932 5.7331 21.5757 5.9049C21.5582 6.07671 21.482 6.23721 21.3599 6.35932L12.1669 15.5513C12.0728 15.6453 11.9555 15.7126 11.8269 15.7463L7.99787 16.7463C7.8713 16.7793 7.7383 16.7787 7.61206 16.7444C7.48583 16.7101 7.37076 16.6434 7.27826 16.5509C7.18577 16.4584 7.11908 16.3434 7.0848 16.2171C7.05053 16.0909 7.04986 15.9579 7.08287 15.8313L8.08287 12.0033C8.11277 11.8887 8.16776 11.7821 8.24387 11.6913L17.4709 2.47032C17.6115 2.32987 17.8021 2.25098 18.0009 2.25098C18.1996 2.25098 18.3902 2.32987 18.5309 2.47032L21.3599 5.29832C21.3948 5.33516 21.4269 5.3746 21.4559 5.41632ZM19.7689 5.82832L18.0009 4.06132L9.48287 12.5793L8.85787 14.9723L11.2509 14.3473L19.7689 5.82832Z" fill="#C4C4C4" data-astro-cid-ftwfccio></path> <path d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9089 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z" fill="#C4C4C4" data-astro-cid-ftwfccio></path> </svg> </button> <button class="posted_item_open" data-astro-cid-ftwfccio> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ftwfccio> <g clip-path="url(#clip0_623_115)" data-astro-cid-ftwfccio> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-ftwfccio></path> </g> <defs data-astro-cid-ftwfccio> <clipPath id="clip0_623_115" data-astro-cid-ftwfccio> <rect width="16" height="16" fill="white" data-astro-cid-ftwfccio></rect> </clipPath> </defs> </svg> </button> </div> </li>`) : renderTemplate`<li data-astro-cid-ftwfccio>お知らせはありません</li>`} </ul> </section> </div> `;
}, "/Users/tat/Dev/indivi/src/components/Notice.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Cms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cms;
  function formatCreatedAt(createdAt) {
    if (!createdAt) return "日付未設定";
    const dateObj = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
  function getFirebaseApp() {
    if (!getApps().length) {
      initializeApp({
        credential: cert(JSON.parse('{\n  "type": "service_account",\n  "project_id": "test-87192",\n  "private_key_id": "f8c752d50cc048bbfb09e05146c69dbd0b6cb1b6",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf8oB8fxG+EN3a\\ns2kqH+nNt6cr5yxKXEkY73y2PfBAiOOeo7lFhxJrwV51I0iVttuUeMmsxX+HkIaa\\nTKE21IKybYwrw1O66ov0TRZz5xGmcx9FZtS0FQ8m5Mnnqzb9sDBkRdDKMMrIlZdA\\nGbpW2u43KCo2XC+4ft40ZYox4aFGirf7ZTx5G+ElQh2TGE4x/gnvV0ykiP1cP3Xp\\nE1TPluLuAIvycNX5QBsZFt1IGist/tlzLHw1zRcf8C8PYNCVGcqcMb7fSercaj+A\\na2oVj8IH5ACGFf+XZzT09jbH9hT8mfaZXms7AZR4jhBhWco2tYOKwY1pmuXyVeri\\nthwLkHDzAgMBAAECggEAHMqVMFPbSMBWfyiudIO8HWjCsddyFIyaJ9/sLg3mMmex\\nuXu1PPu8aCMtsp5AUZrR2d8IRo5ij2+HmzzSBEGqqR2pDrOhXdMckERUF1bvyWuN\\npHuHLEdiK9khMw+R3Yaan2Il3E9+IS80Q7id30aXfNxBBPoBKQ/FRd9FSgdYdY73\\n0nTp3S2uOdmT6/xRAMGQz2uBS7Vt+IEbNeWRMco0mgqIlzIlgkvBArJt4Tzg/xc4\\nEzZwQAIAm1T5/tU5hbJg9vm9h0oqdf+URxZ5/RY/KvWNovYXPN4CAgzcglbeH5up\\nKPN5dccHySsDdv6mn9eVxsCJNNXHyPZyeb8oESwzWQKBgQDaOk3a5UCygS6aNdGi\\n4j69ZhwTEUYxCCmIrT+D4j2AGCkMKBnNfmaHdLlZQCxzayF0k6V9DDTHQe3kHGUN\\nOP/ZCbXbYoOysPwDAq+secoE2VFyph6tKMOogVG/SyMjYfNrBPdf7ELRMMkEE4B+\\nWBgfIYWFcQwiVj3kpR7ly10BFQKBgQC7ociJWjrOpf14b9Mi5qlTalhEKRCiOyZy\\naMCLTe3aGHWNKeoU55XHJirw8+Hzez+r9FOv1nSDvuZKx5l5YnvBPNa3N8YHjp9W\\noC1iWI+iYJ6mbbggQv50V16fY+zovXDoI/V0hwwRuR2M5pLuHO8UuEK8yuZ2uw4p\\nseQqarpb5wKBgQCT/4KZd2y/IrkWQHWh/8oI7N0RWV+/FQgF92jh6mdHHhuIcRG+\\nuYCTUOf6zXjX9cnEo/VRrxuEHwRU9aTaqNNqwBkjZdZnM3xWFlZJpHcLfs6r8FlR\\nmhnHh5yHHVABSQaqh720wig2ct2A9DDqfpgtVLCW5SoTh2WGUS15LsguWQKBgACJ\\nDqRtsHtEd/uu/gA8fkExrXzMTTLZTlvHNr1vBH250iQL+ZIDsya1UiwL1ho2wNDB\\nyrdWulBh7BBMj4CMKmQ7wzUUoKkG3CeIH3kHXamN8wXwjDTzW/yC/08fHt7vI3JW\\nH+4sMHmgeJgdVE//nyME/5PAVHYERJ8T1d3VHiEDAoGATVJVo/+ikTXJfHz1e3oe\\nqndDpXhQlj2VsNWBBBHgovSwH4iOd66EWKvTIRCIRzS6XDZ2w2cPKMxZ/6UbIfyf\\naDMpkMsCQE824Hg+HU6POn91XIuzPSV/snXJ9KtqHdXOAKOPe0W8CLiEFHmhArej\\nrrjFJp1QQG7U82o5YqnHg1Y=\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk-fbsvc@test-87192.iam.gserviceaccount.com",\n  "client_id": "110908066451240127621",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-87192.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}')),
        storageBucket: "test-87192.firebasestorage.app"
        // 環境変数から正しいバケット名を設定
      });
    }
    return getApp();
  }
  async function uploadImageToStorage(file, projectId2, userId2, uploadType) {
    if (!file || typeof file.name !== "string" || file.size <= 0) {
      throw new Error("無効なファイルです。");
    }
    const app = getFirebaseApp();
    const bucket = getStorage(app).bucket("test-87192.firebasestorage.app");
    if (!bucket.name) {
      throw new Error("バケット名が設定されていません。環境変数 FIREBASE_STORAGE_BUCKET を確認してください。");
    }
    console.log("✅ Firebase Storage バケット:", bucket.name);
    let folderPath = `projects/${projectId2}/`;
    if (uploadType === "user") {
      folderPath += `users/${userId2}/`;
    } else if (uploadType === "blog") {
      folderPath += `blogThumbnails/`;
    }
    const ext = file.name.split(".").pop();
    const fileName = `${folderPath}${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileRef = bucket.file(fileName);
    await fileRef.save(buffer, {
      contentType: file.type,
      public: true,
      metadata: {
        contentType: file.type,
        customMetadata: {
          projectId: projectId2,
          userId: userId2,
          uploadType
          // "user" か "blog" かをメタデータに保存
        }
      }
    });
    await fileRef.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  }
  if (!admin.apps.length) {
    const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT || '{\n  "type": "service_account",\n  "project_id": "test-87192",\n  "private_key_id": "f8c752d50cc048bbfb09e05146c69dbd0b6cb1b6",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCf8oB8fxG+EN3a\\ns2kqH+nNt6cr5yxKXEkY73y2PfBAiOOeo7lFhxJrwV51I0iVttuUeMmsxX+HkIaa\\nTKE21IKybYwrw1O66ov0TRZz5xGmcx9FZtS0FQ8m5Mnnqzb9sDBkRdDKMMrIlZdA\\nGbpW2u43KCo2XC+4ft40ZYox4aFGirf7ZTx5G+ElQh2TGE4x/gnvV0ykiP1cP3Xp\\nE1TPluLuAIvycNX5QBsZFt1IGist/tlzLHw1zRcf8C8PYNCVGcqcMb7fSercaj+A\\na2oVj8IH5ACGFf+XZzT09jbH9hT8mfaZXms7AZR4jhBhWco2tYOKwY1pmuXyVeri\\nthwLkHDzAgMBAAECggEAHMqVMFPbSMBWfyiudIO8HWjCsddyFIyaJ9/sLg3mMmex\\nuXu1PPu8aCMtsp5AUZrR2d8IRo5ij2+HmzzSBEGqqR2pDrOhXdMckERUF1bvyWuN\\npHuHLEdiK9khMw+R3Yaan2Il3E9+IS80Q7id30aXfNxBBPoBKQ/FRd9FSgdYdY73\\n0nTp3S2uOdmT6/xRAMGQz2uBS7Vt+IEbNeWRMco0mgqIlzIlgkvBArJt4Tzg/xc4\\nEzZwQAIAm1T5/tU5hbJg9vm9h0oqdf+URxZ5/RY/KvWNovYXPN4CAgzcglbeH5up\\nKPN5dccHySsDdv6mn9eVxsCJNNXHyPZyeb8oESwzWQKBgQDaOk3a5UCygS6aNdGi\\n4j69ZhwTEUYxCCmIrT+D4j2AGCkMKBnNfmaHdLlZQCxzayF0k6V9DDTHQe3kHGUN\\nOP/ZCbXbYoOysPwDAq+secoE2VFyph6tKMOogVG/SyMjYfNrBPdf7ELRMMkEE4B+\\nWBgfIYWFcQwiVj3kpR7ly10BFQKBgQC7ociJWjrOpf14b9Mi5qlTalhEKRCiOyZy\\naMCLTe3aGHWNKeoU55XHJirw8+Hzez+r9FOv1nSDvuZKx5l5YnvBPNa3N8YHjp9W\\noC1iWI+iYJ6mbbggQv50V16fY+zovXDoI/V0hwwRuR2M5pLuHO8UuEK8yuZ2uw4p\\nseQqarpb5wKBgQCT/4KZd2y/IrkWQHWh/8oI7N0RWV+/FQgF92jh6mdHHhuIcRG+\\nuYCTUOf6zXjX9cnEo/VRrxuEHwRU9aTaqNNqwBkjZdZnM3xWFlZJpHcLfs6r8FlR\\nmhnHh5yHHVABSQaqh720wig2ct2A9DDqfpgtVLCW5SoTh2WGUS15LsguWQKBgACJ\\nDqRtsHtEd/uu/gA8fkExrXzMTTLZTlvHNr1vBH250iQL+ZIDsya1UiwL1ho2wNDB\\nyrdWulBh7BBMj4CMKmQ7wzUUoKkG3CeIH3kHXamN8wXwjDTzW/yC/08fHt7vI3JW\\nH+4sMHmgeJgdVE//nyME/5PAVHYERJ8T1d3VHiEDAoGATVJVo/+ikTXJfHz1e3oe\\nqndDpXhQlj2VsNWBBBHgovSwH4iOd66EWKvTIRCIRzS6XDZ2w2cPKMxZ/6UbIfyf\\naDMpkMsCQE824Hg+HU6POn91XIuzPSV/snXJ9KtqHdXOAKOPe0W8CLiEFHmhArej\\nrrjFJp1QQG7U82o5YqnHg1Y=\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "firebase-adminsdk-fbsvc@test-87192.iam.gserviceaccount.com",\n  "client_id": "110908066451240127621",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40test-87192.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}';
    console.log("Service Account:", serviceAccountStr);
    {
      const serviceAccount = JSON.parse(serviceAccountStr);
      const bucketName = "test-87192.firebasestorage.app";
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: bucketName
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
  let authUser = null;
  if (token) {
    try {
      authUser = await adminAuth.verifyIdToken(token);
    } catch (err) {
      console.error("IDトークンの検証に失敗:", err);
    }
  }
  let userData = null;
  if (authUser) {
    const snap = await db.collection("users").doc(authUser.uid).get();
    if (snap.exists) {
      userData = snap.data();
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
  const projectSnap = await db.collection("projects").doc(projectId).get();
  const projectData = projectSnap.data() || {};
  const existingBlogTags = projectData.blogTags || [];
  const existingNewsTags = projectData.newsTags || [];
  const accountName = authUser && userData && userData.displayName ? userData.displayName : "ログイン";
  const userId = authUser?.uid || "";
  let blogList = [];
  let noticeList = [];
  try {
    const blogSnap = await db.collection("projects").doc(projectId).collection("blog").orderBy("createdAt", "desc").get();
    blogList = blogSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dateStr: formatCreatedAt(data.createdAt)
      };
    });
    const noticeSnap = await db.collection("projects").doc(projectId).collection("notice").orderBy("createdAt", "desc").get();
    noticeList = noticeSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // フォーマットした文字列を dateStr などに格納しておく
        dateStr: formatCreatedAt(data.createdAt)
      };
    });
  } catch (err) {
    console.error("Firestoreからの一覧取得に失敗:", err);
  }
  const method = Astro2.request.method.toUpperCase();
  if (method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action")?.toString() || "";
    try {
      if (action === "upload_blog_image") {
        const image = formData.get("image");
        const projectId2 = formData.get("projectId")?.toString() || "";
        if (!image || !projectId2) {
          return new Response(
            JSON.stringify({ error: "画像またはプロジェクトIDが指定されていません" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        try {
          const imageUrl = await uploadImageToStorage(image, projectId2, authUser?.uid || "unknown", "blog-content");
          return new Response(
            JSON.stringify({ imageUrl }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          console.error("❌ ブログ画像アップロード失敗:", err.message);
          return new Response(
            JSON.stringify({ error: "画像のアップロードに失敗しました" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      } else if (action === "create_blog") {
        const title = formData.get("blogTitle")?.toString() || "";
        const blogBody = formData.get("blogTextContent")?.toString() || "";
        const submitType = formData.get("submitType")?.toString() || "draft";
        const status = submitType === "publish" ? "public" : "draft";
        const rawTags = formData.getAll("blogTags");
        const file = formData.get("blogThumbnail");
        let thumbnailUrl = "";
        if (file) {
          try {
            thumbnailUrl = await uploadImageToStorage(file, projectId, authUser?.uid || "unknown", "blog");
          } catch (err) {
            console.error("❌ サムネイルアップロード失敗:", err.message);
          }
        }
        console.log("保存するブログ本文:", blogBody);
        const blogRef = admin.firestore().collection("projects").doc(projectId).collection("blog");
        await blogRef.add({
          title,
          body: blogBody,
          // ここでbodyフィールドに値を設定
          createdAt: /* @__PURE__ */ new Date(),
          status,
          tags: rawTags,
          thumbnailUrl
        });
        const projectDocRef = db.collection("projects").doc(projectId);
        if (rawTags.length > 0) {
          await projectDocRef.update({
            blogTags: admin.firestore.FieldValue.arrayUnion(...rawTags)
          });
        }
        return new Response(null, {
          status: 303,
          headers: { Location: `/projects/${projectId}` }
        });
      } else if (action === "create_notice") {
        const title = formData.get("newsTitle")?.toString() || "";
        const body = formData.get("newsBody")?.toString() || "";
        const newsTags = formData.getAll("newsTags");
        const submitType = formData.get("submitType")?.toString() || "draft";
        const status = submitType === "publish" ? "public" : "draft";
        const noticeRef = db.collection("projects").doc(projectId).collection("notice");
        await noticeRef.add({
          title,
          body,
          tags: newsTags,
          createdAt: /* @__PURE__ */ new Date(),
          status
          // ステータスを追加
        });
        const projectDocRef = db.collection("projects").doc(projectId);
        if (newsTags.length > 0) {
          await projectDocRef.update({
            newsTags: admin.firestore.FieldValue.arrayUnion(...newsTags)
          });
        }
        return new Response(null, {
          status: 303,
          headers: { Location: `/projects/${projectId}` }
        });
      }
    } catch (err) {
      console.error("投稿時エラー:", err);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Form", "userId": userId, "accountName": accountName, "projects": userData?.projects ?? [], "data-astro-cid-x3wfoqhz": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="deleteConfirmModal" class="modal" data-astro-cid-x3wfoqhz> <div class="modal_content" data-astro-cid-x3wfoqhz> <h3 data-astro-cid-x3wfoqhz>ブログ記事の削除</h3> <p data-astro-cid-x3wfoqhz>このブログ記事を削除してもよろしいですか？</p> <p data-astro-cid-x3wfoqhz>この操作は取り消せません。</p> <div class="modal_confirm" data-astro-cid-x3wfoqhz> <p data-astro-cid-x3wfoqhz>確認のため、プロジェクト名を入力してください：</p> <p class="modal_project-name" data-astro-cid-x3wfoqhz>${currentProject?.name || "(No Name)"}</p> <input id="confirmProjectName" class="modal_input" placeholder="プロジェクト名を入力" data-astro-cid-x3wfoqhz> <p id="nameError" class="modal_error" data-astro-cid-x3wfoqhz></p> </div> <div class="modal_buttons" data-astro-cid-x3wfoqhz> <button class="modal_button cancel" id="cancelDelete" data-astro-cid-x3wfoqhz>キャンセル</button> <button class="modal_button delete" id="confirmDelete" disabled data-astro-cid-x3wfoqhz>削除する</button> </div> </div> </div> <div class="pan" data-astro-cid-x3wfoqhz> <p class="pan_item" data-astro-cid-x3wfoqhz> <a${addAttribute(userId ? `/${userId}` : "/", "href")} data-astro-cid-x3wfoqhz>トップ</a> <span data-astro-cid-x3wfoqhz> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-x3wfoqhz> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-x3wfoqhz></path> </svg> </span> <span data-astro-cid-x3wfoqhz>${currentProject?.name || "(No Name)"}</span> <span data-astro-cid-x3wfoqhz> <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-x3wfoqhz> <path d="M0.456 6.356V5.18L3.156 4.208L4.98 3.548V3.5L3.156 2.828L0.456 1.856V0.692L6.384 2.996V4.04L0.456 6.356Z" fill="#C4C4C4" data-astro-cid-x3wfoqhz></path> </svg> </span> <span data-astro-cid-x3wfoqhz>CMS</span> </p> </div> <nav class="nav" data-astro-cid-x3wfoqhz> <button class="nav_btn" data-astro-cid-x3wfoqhz> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-x3wfoqhz> <g clip-path="url(#clip0_623_115)" data-astro-cid-x3wfoqhz> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4712 7.52879C10.5962 7.65381 10.6664 7.82334 10.6664 8.00012C10.6664 8.1769 10.5962 8.34644 10.4712 8.47145L6.6999 12.2428C6.63841 12.3065 6.56484 12.3572 6.48351 12.3922C6.40217 12.4271 6.31469 12.4455 6.22617 12.4463C6.13765 12.4471 6.04986 12.4302 5.96793 12.3967C5.886 12.3631 5.81157 12.3136 5.74897 12.251C5.68638 12.1885 5.63688 12.114 5.60336 12.0321C5.56983 11.9502 5.55297 11.8624 5.55374 11.7739C5.55451 11.6853 5.5729 11.5979 5.60784 11.5165C5.64277 11.4352 5.69356 11.3616 5.75724 11.3001L9.05724 8.00012L5.75724 4.70012C5.6358 4.57439 5.5686 4.40598 5.57012 4.23119C5.57164 4.05639 5.64175 3.88918 5.76536 3.76557C5.88896 3.64197 6.05617 3.57186 6.23097 3.57034C6.40577 3.56882 6.57417 3.63601 6.6999 3.75745L10.4712 7.52879Z" fill="white" data-astro-cid-x3wfoqhz></path> </g> <defs data-astro-cid-x3wfoqhz> <clipPath id="clip0_623_115" data-astro-cid-x3wfoqhz> <rect width="16" height="16" fill="white" data-astro-cid-x3wfoqhz></rect> </clipPath> </defs> </svg> </button> <ul class="nav_list" data-astro-cid-x3wfoqhz> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>サマリー</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}/profile`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>プロフィール</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}/form`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>フォーム</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link active" id="switch-btn" data-astro-cid-x3wfoqhz>CMS</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>アナリティクス</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>プレビュー</a> </li> <li class="nav_item" data-astro-cid-x3wfoqhz> <a${addAttribute(`/projects/${projectId}`, "href")} class="nav_link" id="switch-btn" data-astro-cid-x3wfoqhz>プレビュー</a> </li> </ul> </nav> <div class="container" id="switch" data-astro-cid-x3wfoqhz> <div class="cms-box" data-astro-cid-x3wfoqhz> <div class="inner" data-astro-cid-x3wfoqhz> <div class="box_title-wrapper" data-astro-cid-x3wfoqhz> <div class="box_title-wrapper_left" data-astro-cid-x3wfoqhz> <p class="box_title" data-astro-cid-x3wfoqhz>CMS</p> <p class="box_desc" data-astro-cid-x3wfoqhz>ブログやお知らせなどのコンテンツを導入し、投稿・更新することができます。</p> </div> <div class="box_title-wrapper_right" data-astro-cid-x3wfoqhz> <p class="box_title-wrapper_right_label" data-astro-cid-x3wfoqhz>
追加可能コンテンツ数
<strong data-astro-cid-x3wfoqhz>0</strong> </p> <button class="box_title-wrapper_right_btn" data-astro-cid-x3wfoqhz>
アップグレードしてCMSの枠を増やす
</button> </div> </div> <div class="box_cms" data-astro-cid-x3wfoqhz> <p data-astro-cid-x3wfoqhz>コンテンツ <span data-astro-cid-x3wfoqhz>2/2</span></p> <ul class="box_cms-list" data-astro-cid-x3wfoqhz> <li class="box_cms-item active" data-target="notice-panel" data-astro-cid-x3wfoqhz>お知らせ</li> <li class="box_cms-item" data-target="blog-panel" data-astro-cid-x3wfoqhz>ブログ</li> <li data-astro-cid-x3wfoqhz> <button class="box_cms_number" data-astro-cid-x3wfoqhz> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-x3wfoqhz> <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white" data-astro-cid-x3wfoqhz></path> </svg> <p data-astro-cid-x3wfoqhz>あと 0</p> </button> </li> </ul> </div> </div> </div> <!-- <div class="box_header">
      <p class="box_desc">お知らせを投稿・編集できます</p>
      <div class="box_btn_wrapper">
        <button class="box_btn">キャンセル</button>
        <button id="save-btn"  class="box_btn save">公開</button>
      </div>
    </div> --> <div class="cms_contents" data-astro-cid-x3wfoqhz> ${renderComponent($$result2, "Blog", $$Blog, { "existingBlogTags": existingBlogTags, "blogList": blogList, "data-astro-cid-x3wfoqhz": true })} <!-- お知らせタブ --> ${renderComponent($$result2, "Notice", $$Notice, { "existingNewsTags": existingNewsTags, "noticeList": noticeList, "data-astro-cid-x3wfoqhz": true })} </div> </div> ` })}  ${renderScript($$result, "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/cms.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/cms.astro", void 0);
const $$file = "/Users/tat/Dev/indivi/src/pages/projects/[projectId]/cms.astro";
const $$url = "/projects/[projectId]/cms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cms,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
