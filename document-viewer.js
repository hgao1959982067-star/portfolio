(() => {
  const links = [...document.querySelectorAll('a.doc[href*="read-docs/"]')];
  const tea = document.querySelector('.script-reader');
  if ((!links.length && !tea) || typeof HTMLDialogElement === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `.document-overlay{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:clamp(12px,4vw,48px);border:0;background:transparent;color:#edf2e8;overflow:hidden}.document-overlay::backdrop{background:rgba(0,0,0,.76)}.document-overlay[open]{display:flex;align-items:center;justify-content:center}.document-panel{position:relative;width:min(1040px,100%);height:min(90vh,100%);background:#0b1820;border:1px solid #ffffff30;border-radius:12px;box-shadow:0 18px 80px #0009;overflow:hidden}.document-close{position:absolute;right:12px;top:12px;z-index:2;border:1px solid #ffffff80;background:#142923;color:#fff;border-radius:50%;width:42px;height:42px;font:24px/1 system-ui;cursor:pointer}.document-close:focus-visible{outline:3px solid #c3e4cc}.document-panel iframe{width:100%;height:100%;border:0;display:block}.document-inline{height:100%;overflow:auto;padding:60px clamp(20px,5vw,60px) 40px;line-height:1.9;overflow-wrap:anywhere}.document-inline p{margin:0 0 1em}@media(max-width:600px){.document-overlay{padding:10px}.document-panel{height:90vh}.document-close{top:6px;right:6px}}`;
  document.head.append(style);
  const dialog=document.createElement('dialog'); dialog.className='document-overlay'; dialog.setAttribute('aria-label','剧本与文档阅读');
  dialog.innerHTML='<div class="document-panel"><button type="button" class="document-close" aria-label="关闭文档">×</button><iframe title="文档内容"></iframe><div class="document-inline" hidden></div></div>';
  document.body.append(dialog);
  const frame=dialog.querySelector('iframe'), inline=dialog.querySelector('.document-inline'); let trigger=null, oldOverflow='';
  function open(el,url,content){trigger=el;oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';inline.hidden=!content;frame.hidden=!!content;frame.style.display=content?'none':'block';if(content){inline.innerHTML=content;inline.scrollTop=0}else frame.src=url;dialog.showModal();dialog.querySelector('button').focus()}
  links.forEach(a=>a.addEventListener('click',e=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();open(a,a.href,null)}));
  if(tea){const summary=tea.querySelector('summary'), content=tea.querySelector('.script-content');if(summary&&content)summary.addEventListener('click',e=>{e.preventDefault();open(summary,null,content.innerHTML)})}
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;frame.removeAttribute('src');inline.innerHTML='';trigger?.focus({preventScroll:true})});
  frame.addEventListener('load',()=>{try{const nav=frame.contentDocument?.querySelector('nav a');nav?.addEventListener('click',e=>{e.preventDefault();dialog.close()});frame.contentDocument?.addEventListener('keydown',e=>{if(e.key==='Escape')dialog.close()})}catch(e){}});
})();
