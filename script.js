const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* text scramble */
const G='!<>-_\\/[]{}=+*^?#01';
function scramble(el,txt){if(reduce){el.textContent=txt;return}let f=0;clearInterval(el._t);
 el._t=setInterval(()=>{el.textContent=[...txt].map((c,i)=>c===' '?' ':i<f/2?c:G[Math.random()*G.length|0]).join('');if(++f>txt.length*2)clearInterval(el._t)},30)}
const nm=$('#name');scramble(nm,'Anchala Kumari');nm.addEventListener('mouseenter',()=>scramble(nm,'Anchala Kumari'));

/* typing */
const roles=["UI/UX Designer","Power BI Analyst","Python & ML Learner","Frontend Developer","Azure & AI Explorer"];
let ri=0,ci=0,del=false;const tEl=$('#typing');
(function type(){const w=roles[ri];tEl.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(type,1300)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(type,del?35:75)})();

/* counters */
$$('[data-n]').forEach(b=>{const n=+b.dataset.n;let k=0;const t=setInterval(()=>{b.textContent=++k;if(k>=n)clearInterval(t)},120)});

/* ticker */
const words=["Power BI","Python","Machine Learning","UI/UX","Figma","Azure","JavaScript","Prompt Engineering","Canva","Midjourney"];
const row=words.map(w=>`<span>${w}</span><i class="fas fa-spider"></i>`).join('');
$('#tick').innerHTML=row+row+row+row;

/* reveal + scrambled headings */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');const h=e.target.querySelector('.sc');if(h)scramble(h,h.textContent);io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach(el=>io.observe(el));

/* skill filter */
$('#tabs').addEventListener('click',e=>{const t=e.target.closest('.tab');if(!t)return;
 $$('.tab').forEach(b=>b.classList.toggle('on',b===t));let d=0;
 $$('.chip').forEach(c=>{const show=t.dataset.f==='all'||c.dataset.c===t.dataset.f;c.classList.toggle('hide',!show);
  if(show){c.style.animation='none';c.offsetWidth;c.style.animation=`pop .5s ${d++*.05}s both`}})});

/* project modal */
const P=[{i:'fa-globe',t:'Portfolio',d:'My personal site, built from scratch without frameworks, with a Spider-Woman theme and interactive effects.',l:['Stack: HTML, CSS, JavaScript','Canvas web animation, scroll effects','Fully responsive']},
{i:'fa-chart-pie',t:'My Power BI Dashboards',d:'A set of dashboards that turn raw data into visuals people can read at a glance.',l:['Stack: Power BI, DAX','KPIs, charts and filters','Built for quick decisions']},
{i:'fa-heart-pulse',t:'Diabetes Predictor',d:'A machine learning project that predicts the risk of diabetes from patient health data. Still in development.',l:['Stack: Python, ML','Status: in progress','Goal: accurate, explainable predictions']}];
const md=$('#modal');
function openP(i){const p=P[i];$('#mc').innerHTML=`<i class="fas ${p.i}" style="font-size:2rem;color:var(--hi)"></i><h3>${p.t}</h3><p>${p.d}</p><ul>${p.l.map(x=>`<li>${x}</li>`).join('')}</ul>`;md.classList.add('open')}
$$('.card').forEach(c=>{c.addEventListener('click',()=>openP(c.dataset.p));c.addEventListener('keydown',e=>e.key==='Enter'&&openP(c.dataset.p))});
md.addEventListener('click',e=>{if(e.target===md||e.target.closest('.x'))md.classList.remove('open')});
addEventListener('keydown',e=>e.key==='Escape'&&md.classList.remove('open'));

/* copy email */
$('#mail').addEventListener('click',e=>{e.preventDefault();const a='aanyakashyap838@gmail.com';
 (navigator.clipboard?navigator.clipboard.writeText(a):Promise.reject()).catch(()=>{}).finally(()=>{const t=$('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)})});

/* 3D tilt (cards, contact) */
$$('.card,.tilt').forEach(c=>{
 c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
  c.style.transform=`perspective(700px) rotateX(${(y/r.height-.5)*-12}deg) rotateY(${(x/r.width-.5)*12}deg) translateY(-6px)`});
 c.addEventListener('mouseleave',()=>c.style.transform='')});
const mk=$('#mask');document.addEventListener('mousemove',e=>{const r=mk.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/innerWidth,y=(e.clientY-r.top-r.height/2)/innerHeight;mk.style.transform=`rotateY(${x*50}deg) rotateX(${-y*50}deg)`});

/* magnetic buttons */
$$('.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});

/* cursor + hero parallax */
const cur=$('#cur'),hd=$('#home');let mx=-999,my=-999;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';
 hd.style.setProperty('--px',(mx/innerWidth-.5)*2);hd.style.setProperty('--py',(my/innerHeight-.5)*2);
 if(!reduce&&Math.random()<.5)parts.push({x:mx,y:my,vx:(Math.random()-.5)*1.2,vy:Math.random()*1.2,l:1})});
$$('a,button,.card,.chip').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('big'));el.addEventListener('mouseleave',()=>cur.classList.remove('big'))});

/* background web */
const cv=$('#web'),cx=cv.getContext('2d');let W,H,nodes=[];const SP=16,RG=11;
function build(){W=cv.width=fx.width=innerWidth;H=cv.height=fx.height=innerHeight;nodes=[];
 const ox=W*.5,oy=H*.45,R=Math.hypot(W,H)*.7;
 for(let r=1;r<=RG;r++){const rw=[];for(let s=0;s<SP;s++){const a=s/SP*6.2832,d=R*Math.pow(r/RG,1.35),x=ox+Math.cos(a)*d,y=oy+Math.sin(a)*d;rw.push({bx:x,by:y,x,y})}nodes.push(rw)}nodes.ox=ox;nodes.oy=oy}
function web(){cx.clearRect(0,0,W,H);
 nodes.forEach(rw=>rw.forEach(n=>{const dx=mx-n.bx,dy=my-n.by,f=Math.max(0,1-Math.hypot(dx,dy)/240);n.x+=(n.bx+dx*f*.4-n.x)*.12;n.y+=(n.by+dy*f*.4-n.y)*.12}));
 for(let s=0;s<SP;s++){cx.beginPath();cx.moveTo(nodes.ox,nodes.oy);nodes.forEach(r=>cx.lineTo(r[s].x,r[s].y));cx.strokeStyle='rgba(190,160,215,.3)';cx.stroke()}
 nodes.forEach((rw,ri)=>{cx.beginPath();rw.forEach((n,i)=>{const m=rw[(i+1)%SP],qx=nodes.ox+((n.x+m.x)/2-nodes.ox)*.82,qy=nodes.oy+((n.y+m.y)/2-nodes.oy)*.82;if(!i)cx.moveTo(n.x,n.y);cx.quadraticCurveTo(qx,qy,m.x,m.y)});cx.strokeStyle=`rgba(155,74,124,${.15+ri*.02})`;cx.stroke()})}

/* fx: trail, web shots, ripples */
const fx=$('#fx'),fc=fx.getContext('2d'),parts=[],shots=[];
addEventListener('click',e=>{if(reduce||e.target.closest('.modal'))return;const s=$('#thread svg').getBoundingClientRect();
 shots.push({x0:s.left+18,y0:s.top+22,x1:e.clientX,y1:e.clientY,t:0})});
function fxDraw(){fc.clearRect(0,0,W,H);
 parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l-=.03;fc.fillStyle=`rgba(208,143,185,${Math.max(p.l,0)*.7})`;fc.beginPath();fc.arc(p.x,p.y,2*p.l+.5,0,6.3);fc.fill()});
 for(let i=parts.length-1;i>=0;i--)if(parts[i].l<=0)parts.splice(i,1);
 shots.forEach(s=>{s.t+=.05;const k=Math.min(s.t,1),a=s.t>1.4?Math.max(0,1-(s.t-1.4)*1.6):1,ex=s.x0+(s.x1-s.x0)*k,ey=s.y0+(s.y1-s.y0)*k;
  fc.strokeStyle=`rgba(235,225,245,${a})`;fc.lineWidth=1.6;fc.beginPath();fc.moveTo(s.x0,s.y0);fc.lineTo(ex,ey);fc.stroke();
  if(s.t>=1){const r=14+(s.t-1)*50;fc.strokeStyle=`rgba(208,143,185,${a})`;fc.lineWidth=1;
   for(let j=0;j<8;j++){const an=j*.785;fc.beginPath();fc.moveTo(s.x1,s.y1);fc.lineTo(s.x1+Math.cos(an)*r,s.y1+Math.sin(an)*r);fc.stroke()}
   fc.beginPath();fc.arc(s.x1,s.y1,r*.55,0,6.3);fc.stroke()}});
 for(let i=shots.length-1;i>=0;i--)if(shots[i].t>2.4)shots.splice(i,1)}
addEventListener('resize',build);build();
(function loop(){web();fxDraw();requestAnimationFrame(loop)})();

/* scroll: progress, thread, active nav */
const th=$('#thread'),L=$$('.links a'),S=L.map(a=>$(a.hash));
addEventListener('scroll',()=>{const p=scrollY/(document.body.scrollHeight-innerHeight||1);$('#bar').style.width=p*100+'%';
 th.style.height=(80+p*(innerHeight-200))+'px';let k=0;S.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)k=i});L.forEach((a,i)=>a.classList.toggle('active',i===k))},{passive:true});