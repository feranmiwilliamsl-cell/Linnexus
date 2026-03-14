/* LINNEXUS v4 — main.js */
(function(){

/* ── CURSOR ── */
const dot  = document.querySelector('.cur-dot');
const ring = document.querySelector('.cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}});
(function loop(){if(ring){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(loop)})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(ring){ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(16,124,109,.5)'}});
  el.addEventListener('mouseleave',()=>{if(ring){ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='rgba(16,124,109,.22)'}});
});

/* ── NAV ── */
const nav=document.getElementById('nav');
if(nav){window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});}

/* ── HAMBURGER ── */
const hb=document.getElementById('hamburger');
const mm=document.getElementById('mobMenu');
if(hb&&mm){hb.addEventListener('click',()=>{mm.classList.toggle('open');const s=hb.querySelectorAll('span');s[0].style.transform=mm.classList.contains('open')?'rotate(45deg) translate(5px,5px)':'';s[1].style.opacity=mm.classList.contains('open')?'0':'1';s[2].style.transform=mm.classList.contains('open')?'rotate(-45deg) translate(5px,-5px)':'';});}
if(mm){mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('open');if(hb){hb.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='1'})}}));}

/* ── PARTICLES ── */
const canvas=document.getElementById('particles');
if(canvas){
  const ctx=canvas.getContext('2d');
  let W,H,pts=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);
  function Pt(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*1.8+.5}
  for(let i=0;i<50;i++)pts.push(new Pt());
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(16,124,109,.45)';ctx.fill()});
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(16,124,109,${.3*(1-d/130)})`;ctx.lineWidth=.7;ctx.stroke()}}
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── SCROLL REVEAL ── */
const revealEls=document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
revealEls.forEach(el=>io.observe(el));

/* ── STAT COUNTERS ── */
document.querySelectorAll('.stat-n[data-target]').forEach(el=>{
  const io2=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      const target=+el.dataset.target,suffix=el.dataset.suffix||'';
      let cur=0;const step=target/60;
      const t=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.floor(cur)+suffix;if(cur>=target)clearInterval(t)},25);
      io2.disconnect();
    }
  },{threshold:.5});
  io2.observe(el);
});

/* ── HERO CARD TILT ── */
const hc=document.querySelector('.hero-card');
if(hc){
  hc.addEventListener('mousemove',e=>{const r=hc.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hc.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*10}deg) scale(1.02)`;});
  hc.addEventListener('mouseleave',()=>{hc.style.transform='';});
}

/* ── TABS ── */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const t=btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const panel=document.getElementById(t);
    if(panel){panel.classList.add('active');panel.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s').forEach(el=>el.classList.add('on'));}
  });
});

})();
