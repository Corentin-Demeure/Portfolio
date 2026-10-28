document.querySelectorAll('.featured-carousel').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('[data-feature-slide]')];
 const thumbs=[...carousel.querySelectorAll('[data-feature-index]')];
 const controls=carousel.querySelector('.featured-controls');let current=0;
 function show(index){current=(index+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==current);thumbs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));carousel.querySelector('.featured-count').textContent=(current+1)+' / '+slides.length;}
 if(slides.length<2)return;controls.hidden=false;
 thumbs.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.featureIndex))));
 carousel.querySelectorAll('[data-feature-step]').forEach(b=>b.addEventListener('click',()=>show(current+Number(b.dataset.featureStep))));
 controls.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowLeft'?-1:1));thumbs[current].focus();}});
});
