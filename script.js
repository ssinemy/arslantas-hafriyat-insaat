const groups=JSON.parse(document.getElementById('gallery-data').textContent);
const viewer=document.getElementById('viewer'), photo=document.getElementById('slide-image');
let active=0,index=0,opener;
function render(){const group=groups[active],item=group.items[index];document.getElementById('gallery-title').textContent=group.name;photo.src=item.src;photo.alt=item.title;document.getElementById('slide-caption').textContent=item.title;document.getElementById('slide-counter').textContent=`${index+1} / ${group.items.length}`;viewer.querySelector('.slide-prev').hidden=viewer.querySelector('.slide-next').hidden=group.items.length<2;}
function move(step){index=(index+step+groups[active].items.length)%groups[active].items.length;render();}
document.querySelectorAll('[data-collection]').forEach(button=>{const panel=document.getElementById('overview-'+button.dataset.collection);button.addEventListener('click',()=>panel.showModal());panel.querySelector('.overview-close').addEventListener('click',()=>panel.close());panel.addEventListener('close',()=>button.focus());panel.addEventListener('click',event=>{if(event.target!==panel)return;const r=panel.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)panel.close();});});
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{active=Number(button.dataset.group);index=Number(button.dataset.photo);opener=button;render();viewer.showModal();}));
viewer.querySelector('.close').addEventListener('click',()=>viewer.close());
viewer.querySelector('.slide-prev').addEventListener('click',()=>move(-1));viewer.querySelector('.slide-next').addEventListener('click',()=>move(1));
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}});
viewer.addEventListener('close',()=>opener?.focus());
viewer.addEventListener('click',event=>{if(event.target!==viewer)return;const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();});
let touchStart;photo.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;},{passive:true});photo.addEventListener('touchend',event=>{if(touchStart==null)return;const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>50)move(delta<0?1:-1);touchStart=null;},{passive:true});
// Reveal each section once; all content stays visible without JavaScript.
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});},{threshold:0.08});
 document.querySelectorAll('.work-intro,.collection-card,.location-section').forEach(element=>{element.classList.add('reveal-ready');revealObserver.observe(element);});
}
