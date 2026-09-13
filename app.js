const $$=selector=>[...document.querySelectorAll(selector)];
function revealHash(hash){if(!hash||hash==='#')return;const target=document.getElementById(decodeURIComponent(hash.slice(1)));if(!target)return;if(target.tagName==='DETAILS')target.open=true;let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement}requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>revealHash(a.hash)));
document.getElementById('chapter-select').addEventListener('change',e=>{location.hash=e.target.value;revealHash(e.target.value)});
window.addEventListener('hashchange',()=>revealHash(location.hash));
if(location.hash)revealHash(location.hash);
const nav=$$('.sidebar nav a');
const observer=new IntersectionObserver(entries=>{const entry=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!entry)return;nav.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});document.getElementById('chapter-select').value='#'+entry.target.id},{rootMargin:'-95px 0px -65% 0px',threshold:0});
$$('.chapter').forEach(el=>observer.observe(el));
document.getElementById('quota-form').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('employees');const raw=input.value.trim();const n=Number(raw);const error=document.getElementById('quota-error');const result=document.getElementById('quota-result');if(raw===''||!Number.isSafeInteger(n)||n<0||n>10000000){error.textContent='Informe um número inteiro entre 0 e 10.000.000.';input.setAttribute('aria-invalid','true');result.textContent='Corrija a base de cálculo para realizar uma nova simulação.';input.focus();return}error.textContent='';input.removeAttribute('aria-invalid');if(n<7){result.innerHTML='<strong>Base inferior a 7 empregados.</strong><p>A cartilha não prevê obrigatoriedade por esse critério. Consulte o enquadramento do estabelecimento para orientar a contratação voluntária.</p>';return}const min=Math.ceil(n*5/100),max=Math.ceil(n*15/100);result.innerHTML='<div class="result-metrics"><div><span>MÍNIMO · 5%</span><strong>'+min.toLocaleString('pt-BR')+'</strong>aprendiz'+(min===1?'':'es')+'</div><div><span>MÁXIMO · 15%</span><strong>'+max.toLocaleString('pt-BR')+'</strong>aprendiz'+(max===1?'':'es')+'</div></div><p>Base informada: '+n.toLocaleString('pt-BR')+' empregados. Frações arredondadas para cima, conforme a cartilha. Verifique as hipóteses de dispensa antes de aplicar o resultado.</p>'});
const dialog=document.getElementById('pdf-dialog');
$$('.print-button').forEach(b=>b.addEventListener('click',()=>dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
let closedBeforePrint=[];
window.addEventListener('beforeprint',()=>{closedBeforePrint=$$('details:not([open])');closedBeforePrint.forEach(d=>d.open=true)});
window.addEventListener('afterprint',()=>{closedBeforePrint.forEach(d=>d.open=false);closedBeforePrint=[]});
document.getElementById('confirm-print').addEventListener('click',()=>{dialog.close();window.print()});

window.addEventListener('scroll',()=>{if(window.scrollY<150){document.getElementById('chapter-select').value='#inicio';nav.forEach(a=>{a.classList.remove('active');a.removeAttribute('aria-current')})}},{passive:true});
