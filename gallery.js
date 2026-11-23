(() => {
  const links = Array.from(document.querySelectorAll('figure a')).filter(a => a.querySelector('img'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `.gallery-viewer{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:rgba(5,12,16,.97);color:#fff}.gallery-viewer::backdrop{background:rgba(0,0,0,.85)}.gallery-viewer[open]{display:flex;align-items:center;justify-content:center}.gallery-viewer img{max-width:calc(100% - 130px);max-height:calc(100% - 120px);object-fit:contain}.gallery-viewer button{position:absolute;border:1px solid #ffffff70;background:#142923dd;color:white;border-radius:50%;width:48px;height:48px;font-size:26px;cursor:pointer}.gallery-viewer button:focus-visible{outline:3px solid #a5dfd6}.gallery-viewer .prev{left:16px}.gallery-viewer .next{right:16px}.gallery-viewer .close{top:16px;right:16px}.gallery-viewer .caption{position:absolute;bottom:18px;left:70px;right:70px;text-align:center;font:14px/1.4 system-ui;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media(max-width:600px){.gallery-viewer img{max-width:calc(100% - 60px);max-height:calc(100% - 140px)}.gallery-viewer .prev{left:5px}.gallery-viewer .next{right:5px}.gallery-viewer button{width:40px;height:40px;font-size:22px}}`;
  document.head.append(style);
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-viewer';
  dialog.setAttribute('aria-label', '图片查看器');
  dialog.innerHTML = '<button class="close" type="button" aria-label="关闭图片">×</button><button class="prev" type="button" aria-label="上一张图片">‹</button><img alt=""><button class="next" type="button" aria-label="下一张图片">›</button><div class="caption" aria-live="polite"></div>';
  document.body.append(dialog);
  const img=dialog.querySelector('img'), caption=dialog.querySelector('.caption');
  let index=0, lastFocus=null, touchStart=null;
  function show(n){ index=(n+links.length)%links.length; const link=links[index], thumb=link.querySelector('img'); img.src=link.href; img.alt=thumb.alt || '作品图片'; caption.textContent=(index+1)+' / '+links.length+' · '+(link.closest('figure')?.querySelector('figcaption')?.textContent || img.alt); }
  links.forEach((link,i)=>link.addEventListener('click',e=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();lastFocus=link;show(i);dialog.showModal();dialog.querySelector('.close').focus();}));
  dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.prev').addEventListener('click',()=>show(index-1));
  dialog.querySelector('.next').addEventListener('click',()=>show(index+1));
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}else if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>{img.removeAttribute('src');lastFocus?.focus()});
  dialog.addEventListener('touchstart',e=>{touchStart=e.touches[0].clientX},{passive:true});
  dialog.addEventListener('touchend',e=>{if(touchStart===null)return;const dx=e.changedTouches[0].clientX-touchStart;touchStart=null;if(Math.abs(dx)>50)show(index+(dx<0?1:-1))},{passive:true});
})();
