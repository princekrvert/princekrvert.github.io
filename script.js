// Prince Kumar portfolio: theme toggle, scroll reveal, 3D hero scene, support box, mobile menu
(function(){
var r=document.documentElement,b=document.getElementById('th');
b.onclick=function(){var d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark';col()};
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var cv=document.getElementById('c');if(typeof THREE==='undefined')return;
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:false});R.setPixelRatio(Math.min(devicePixelRatio,1.5));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,100);C.position.z=7;
var m1=new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.55}),m2=new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.35});
var ico=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,1),m1),knot=new THREE.Mesh(new THREE.TorusKnotGeometry(.7,.22,90,12),m2),tor=new THREE.Mesh(new THREE.TorusGeometry(2.6,.015,8,80),m2);
ico.position.set(3.2,.6,-1);knot.position.set(-4,-1.6,-2);tor.position.copy(ico.position);tor.rotation.x=1.2;S.add(ico,knot,tor);
var n=260,p=new Float32Array(n*3);for(var i=0;i<n*3;i++)p[i]=(Math.random()-.5)*20;
var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));
var pm=new THREE.PointsMaterial({size:.04,transparent:true,opacity:.7}),pts=new THREE.Points(g,pm);S.add(pts);
function col(){var a=getComputedStyle(r).getPropertyValue('--acc').trim(),c=getComputedStyle(r).getPropertyValue('--acc2').trim();m1.color.set(a);pm.color.set(a);m2.color.set(c)}
col();matchMedia('(prefers-color-scheme:dark)').addEventListener('change',col);
function size(){var h=cv.parentElement;R.setSize(h.clientWidth,h.clientHeight,false);C.aspect=h.clientWidth/h.clientHeight;C.updateProjectionMatrix()}
size();addEventListener('resize',size);
var mx=0,my=0,vis=true,t=0;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis&&!reduce)loop()}).observe(cv.parentElement);
function draw(){t+=.01;ico.rotation.set(t*.6,t*.8,0);knot.rotation.set(t*.9,t*.5,0);tor.rotation.z=t*.4;pts.rotation.y=t*.05;
C.position.x+=(mx*1.2-C.position.x)*.04;C.position.y+=(-my*.8-C.position.y)*.04;C.lookAt(0,0,0);R.render(S,C)}
function loop(){if(!vis||document.hidden)return;draw();requestAnimationFrame(loop)}
document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)loop()});
if(reduce)draw();else loop();
})();

(function(){
var cp=document.getElementById('cp'),id=document.getElementById('upiId');if(!cp||!id)return;
function done(){cp.textContent='Copied ✓';setTimeout(function(){cp.textContent='Copy'},1800)}
cp.onclick=function(){var t=id.textContent;
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fb)}else fb();
function fb(){var r=document.createRange();r.selectNodeContents(id);var s=getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');done()}catch(e){}}};
})();

(function(){
var T={upi:{a:[50,100,250,500],s:'₹',l:'Pay with UPI app',n:'Opens your UPI app on a phone. On a computer, copy the ID.'},pp:{a:[2,5,10,20],s:'$',l:'Continue to PayPal',n:'You can still change the amount on PayPal.'}};
var tabs=document.querySelectorAll('.tabs button'),box=document.getElementById('amts'),pay=document.getElementById('pay'),row=document.getElementById('idrow'),note=document.getElementById('pnote'),idEl=document.getElementById('upiId');
if(!box||!pay||!idEl)return;
var tab='upi',amt=null;
function link(){if(tab==='upi')return 'upi://pay?pa='+idEl.textContent+'&pn=Prince%20Kumar&cu=INR'+(amt?'&am='+amt:'');return 'https://www.paypal.com/paypalme/princekrvert'+(amt?'/'+amt+'USD':'')}
function render(){var c=T[tab];
tabs.forEach(function(b){var on=b.dataset.t===tab;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
box.innerHTML='';c.a.forEach(function(v){var b=document.createElement('button');b.type='button';b.textContent=c.s+v;b.className=v===amt?'on':'';b.onclick=function(){amt=(amt===v)?null:v;render()};box.appendChild(b)});
row.hidden=tab!=='upi';pay.href=link();pay.textContent=amt?c.l+' · '+c.s+amt:c.l;note.textContent=c.n;
if(tab==='pp'){pay.target='_blank';pay.rel='noopener'}else{pay.removeAttribute('target');pay.removeAttribute('rel')}}
tabs.forEach(function(b){b.onclick=function(){tab=b.dataset.t;amt=null;render()}});
render();
})();

(function(){
var h=document.querySelector('header'),b=document.getElementById('mb');if(!h||!b)return;
function set(o){h.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');b.textContent=o?'\u2715':'\u2630'}
b.onclick=function(){set(!h.classList.contains('open'))};
h.querySelectorAll('nav a').forEach(function(a){a.onclick=function(){set(false)}});
addEventListener('resize',function(){if(innerWidth>960)set(false)});
var p=document.getElementById('pay'),n=document.getElementById('pnote');if(!p||!n)return;
var coarse=matchMedia('(pointer:coarse)').matches;
p.addEventListener('click',function(e){if(p.href.indexOf('upi:')!==0)return;
if(!coarse){e.preventDefault();n.textContent='UPI apps open on phones. Copy the ID above and pay from any UPI app.';return}
setTimeout(function(){if(!document.hidden)n.textContent='Nothing opened? Copy the ID above and pay from any UPI app.'},1500)});
})();
