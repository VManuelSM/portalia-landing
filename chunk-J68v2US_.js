import{A as Le,B as Qy,Ct as ne,D as Ju,Et as qy,F as NS,H as Sc,I as Nc,K as Ug,M as Lo,Mt as vy,N as Lu,Q as Wy,R as Ou,S as I,St as nd,T as Iy,V as Ru,X as Wo,_ as Ey,_t as le,b as H,bt as my,c as Vt,d as $l,dt as ea,f as $y,ft as ed,gt as ku,h as Dm,kt as td,lt as dd,m as Ce,mt as ia,n as Ho,nt as Yl,pt as gy,rt as Yy,t as Hi,y as Fy,yt as mv,z as P1}from"./main-UGTNW54I.js";import{t as l}from"./chunk-CMS_nW3b.js";import{a as L,i as H$1,l as me,n as A,o as V$1,t as $e,u as nt$1}from"./chunk-BIqJhm6n.js";var V=class e{http=I(Hi);eventsControllerGetBySlug(n,t){return t?.observe===`events`?this.http.get(`/events/${n}`,le(H({},t),{observe:`events`})):t?.observe===`response`?this.http.get(`/events/${n}`,le(H({},t),{observe:`response`})):this.http.get(`/events/${n}`,le(H({},t),{observe:`body`}))}static ɵfac=function(t){return new(t||e)};static ɵprov=ne({token:e,factory:e.ɵfac,providedIn:`root`})};var nt={portalia:`PORTALIA`,crea:`CREA`,premium:`PREMIUM`};var it=`attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;var at=(e,n)=>`
precision ${n} float;
#define ${nt[e]} 1
#define TAU 6.2831853
uniform vec2 u_res;
uniform float u_scale;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_open;
uniform vec3 u_focus;
uniform float u_boost;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
float stars(vec2 p, float cell, float density, float t) {
  vec2 g = p / cell; vec2 id = floor(g); vec2 f = fract(g) - 0.5;
  float h = hash(id);
  vec2 off = (vec2(hash(id + 3.1), hash(id + 9.7)) - 0.5) * 0.7;
  float d = length(f - off) * cell;
  float size = 0.55 + 1.05 * hash(id + 5.3);
  float tw = 0.5 + 0.5 * sin(t * (0.5 + 1.8 * h) + h * 50.0);
  return step(1.0 - density, h) * tw * smoothstep(size, 0.0, d);
}

#ifdef PORTALIA
vec4 scene(vec2 p, vec2 res, float t) {
  vec2 uv = p / res;
  vec2 q = (p - u_focus.xy) / u_focus.z;
  float open = u_open;
  vec3 gold = vec3(0.882, 0.741, 0.533);
  vec3 col = mix(vec3(0.0, 0.059, 0.137), vec3(0.078, 0.157, 0.322), smoothstep(0.05, 1.0, uv.y) * 0.85);
  vec2 np = p / 540.0 + vec2(t * 0.011, -t * 0.005) + u_pointer * 0.035;
  float n = fbm(np + fbm(np * 1.7 + t * 0.018) * 1.4);
  col += vec3(0.10, 0.19, 0.42) * smoothstep(0.38, 0.95, n) * 0.6;
  col += gold * smoothstep(0.62, 1.0, n) * 0.07 * smoothstep(3.6, 0.2, length(q));
  float s = stars(p + u_pointer * 5.0, 36.0, 0.17, t) + 0.8 * stars(p + u_pointer * 13.0, 63.0, 0.24, t * 1.3);
  col += mix(vec3(0.96, 0.94, 0.89), gold, 0.45) * s;
  float r = length(q * vec2(1.0, 0.74));
  float breath = 0.9 + 0.1 * sin(t * 0.7);
  float halo = exp(-r * r * 1.5 / max(open, 0.02)) * 0.16;
  float rim = exp(-pow((r - 1.02 * open) * 4.2, 2.0)) * 0.2 * breath;
  float a = atan(q.y, q.x) + u_pointer.x * 0.09;
  float rays = pow(noise(vec2(a * 9.0, t * 0.14)), 2.6) + 0.5 * pow(noise(vec2(a * 23.0 + 4.0, -t * 0.09)), 3.0);
  rays *= smoothstep(4.4 * open + 0.01, 0.6, length(q)) * smoothstep(0.5, 1.1, length(q));
  col += gold * (halo + rim + rays * 0.14) * open;
  float dust = 0.0;
  for (int i = 0; i < 36; i++) {
    float fi = float(i);
    float h = hash(vec2(fi, 1.7)); float h2 = hash(vec2(fi, 8.3));
    float life = fract(t * (0.025 + 0.045 * h2) + h);
    float rad = mix(3.6, 0.55, life);
    float ang = h * TAU + life * (1.1 + h2);
    vec2 pp = vec2(cos(ang), sin(ang) * 1.3) * rad;
    float d = length(q - pp) * u_focus.z;
    float fade = smoothstep(0.0, 0.18, life) * smoothstep(1.0, 0.72, life);
    dust += smoothstep(1.5 + 1.2 * h2, 0.0, d) * fade;
  }
  col += gold * dust * open;
  col *= mix(0.7, 1.0, smoothstep(1.3, 0.25, length((uv - vec2(0.5, 0.58)) * vec2(1.15, 1.0))));
  return vec4(col, 1.0);
}
#endif

#ifdef CREA
vec4 scene(vec2 p, vec2 res, float t) {
  vec2 uv = p / res;
  vec2 q = (p - u_focus.xy) / u_focus.z;
  vec3 navy = vec3(0.024, 0.035, 0.078);
  vec3 crimson = vec3(0.62, 0.17, 0.23);
  vec3 gold = vec3(0.86, 0.75, 0.42);
  float breath = 0.5 + 0.5 * sin(t * TAU / 8.0);
  vec3 col = navy + vec3(0.02, 0.025, 0.06) * uv.y;
  vec2 ap = vec2(p.x / 720.0, p.y / 420.0);
  float w1 = fbm(vec2(ap.x * 1.3 + t * 0.022, t * 0.035));
  float b1 = exp(-pow((uv.y - (0.74 + (w1 - 0.5) * 0.36 + u_pointer.y * 0.015)) * 5.0, 2.0));
  float w2 = fbm(vec2(ap.x * 2.1 - t * 0.018 + 5.0, t * 0.028 + 2.0));
  float b2 = exp(-pow((uv.y - (0.52 + (w2 - 0.5) * 0.42)) * 7.0, 2.0));
  float curtain = 0.55 + 0.45 * fbm(vec2(p.x / 85.0 + t * 0.04 + u_pointer.x * 0.3, uv.y * 2.5));
  col += crimson * b1 * curtain * (0.42 + 0.2 * breath);
  col += mix(crimson, gold, 0.55) * b2 * curtain * (0.14 + 0.1 * breath);
  float g = exp(-dot(q * vec2(0.65, 1.3), q * vec2(0.65, 1.3)) * 1.1);
  col += mix(crimson, gold, 0.35) * g * (0.12 + 0.06 * breath) * u_open;
  col += vec3(0.95, 0.9, 0.8) * stars(p + u_pointer * 5.0, 50.0, 0.12, t) * 0.55;
  float em = 0.0;
  for (int i = 0; i < 40; i++) {
    float fi = float(i);
    float h = hash(vec2(fi, 2.3)); float h2 = hash(vec2(fi, 6.1));
    float life = fract(t * (0.02 + 0.03 * h2) + h);
    vec2 pos = vec2(h * res.x + sin(t * 0.4 + h * 20.0) * 18.0, life * (res.y + 40.0) - 20.0);
    float fade = smoothstep(0.0, 0.1, life) * smoothstep(1.0, 0.6, life);
    em += smoothstep(1.3 + 1.3 * h2, 0.0, length(p - pos)) * fade * (0.55 + 0.45 * sin(t * 2.6 + h * 30.0));
  }
  col += mix(gold, vec3(1.0, 0.62, 0.38), 0.25) * em * 0.9 * u_open;
  // Abajo se vuelve transparente: el fondo de la p\xE1gina (con su resplandor carmes\xED) contin\xFAa sin corte.
  return vec4(col, smoothstep(0.0, 0.26, uv.y));
}
#endif

#ifdef PREMIUM
vec4 scene(vec2 p, vec2 res, float t) {
  vec2 uv = p / res;
  vec2 f = u_focus.xy;
  float R = u_focus.z;
  float boost = u_boost;
  vec3 gold = vec3(0.882, 0.741, 0.533);
  vec3 warm = vec3(1.0, 0.86, 0.62);
  vec3 col = mix(vec3(0.0, 0.059, 0.137), vec3(0.078, 0.157, 0.322), smoothstep(0.0, 1.0, uv.y));
  vec2 np = p / 480.0 + vec2(t * 0.01, 0.0) + u_pointer * 0.03;
  col += vec3(0.10, 0.19, 0.42) * smoothstep(0.45, 0.95, fbm(np)) * 0.35;
  col += mix(vec3(0.96, 0.94, 0.89), gold, 0.5) * stars(p + u_pointer * 6.0, 40.0, 0.12, t) * 0.7 * smoothstep(0.25, 0.85, uv.y);
  // Haces de escenario: nacen arriba, apuntan al bot\xF3n y se mecen; con boost se cierran sobre \xE9l.
  float beams = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 o = vec2(res.x * (0.12 + 0.25 * fi) + sin(t * 0.21 + fi * 1.7) * res.x * 0.04, res.y + 60.0);
    vec2 target = f + vec2(sin(t * (0.33 + 0.07 * fi) + fi * 2.3) * R * mix(1.6, 0.35, boost), 0.0);
    vec2 dir = normalize(target - o);
    vec2 d = p - o;
    float along = dot(d, dir);
    float across = abs(d.x * dir.y - d.y * dir.x);
    float width = 6.0 + along * (0.10 + 0.02 * fi);
    float reach = length(target - o);
    float cone = exp(-pow(across / width, 2.0)) * smoothstep(0.0, 120.0, along) * smoothstep(reach * 1.25, reach * 0.6, along);
    beams += cone * (0.75 + 0.25 * noise(vec2(fi * 7.0, t * 0.6)));
  }
  float motes = smoothstep(0.62, 0.9, fbm(vec2(p.x / 55.0, p.y / 55.0 - t * 0.15)));
  col += gold * beams * (0.10 + 0.12 * boost) * u_open;
  col += warm * beams * motes * (0.14 + 0.22 * boost) * u_open;
  // Resplandor de piso alrededor del bot\xF3n.
  vec2 q = (p - f) / R;
  col += gold * exp(-dot(q * vec2(0.45, 1.1), q * vec2(0.45, 1.1)) * 1.2) * (0.10 + 0.22 * boost) * u_open;
  // Bokeh dorado que sube.
  float bok = 0.0;
  for (int i = 0; i < 26; i++) {
    float fi = float(i);
    float h = hash(vec2(fi, 3.7)); float h2 = hash(vec2(fi, 9.1));
    float life = fract(t * (0.02 + 0.03 * h2) + h);
    vec2 pos = vec2(h * res.x + sin(t * 0.3 + h * 17.0) * 24.0, mix(-20.0, res.y + 20.0, life));
    float size = 3.0 + 9.0 * h2;
    float fade = smoothstep(0.0, 0.15, life) * smoothstep(1.0, 0.7, life);
    bok += smoothstep(size, size * 0.55, length(p - pos)) * fade * (0.25 + 0.35 * h);
  }
  col += mix(gold, warm, 0.4) * bok * 0.35 * u_open;
  // Pulso en anillos desde el bot\xF3n mientras est\xE1 encendido.
  float ring = fract(t * 0.6);
  col += gold * exp(-pow((length(q * vec2(0.6, 1.0)) - ring * 3.0) * 3.5, 2.0)) * (1.0 - ring) * 0.2 * boost;
  col *= mix(0.75, 1.0, smoothstep(1.2, 0.3, length((uv - vec2(0.5, 0.45)) * vec2(1.0, 1.2))));
  return vec4(col, 1.0);
}
#endif

void main() {
  vec2 p = gl_FragCoord.xy / u_scale;
  vec4 c = scene(p, u_res / u_scale, u_time);
  vec3 col = c.rgb + (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) / 255.0;
  gl_FragColor = vec4(col * c.a, c.a);
}`;var ot={portalia:{fy:.36,r:.36},crea:{fy:.5,r:.5},premium:{fy:.5,r:.5}};var $=class e{variant=P1(`portalia`);focus=P1();boost=P1(!1);host=I(Wo);constructor(){let n,t=!1;I(Ce).onDestroy(()=>{t=!0,n?.()}),Yl(()=>{if(typeof WebGLRenderingContext>`u`)return;let i=()=>{t||(n=this.start())},s=globalThis.requestIdleCallback;s?s(i,{timeout:600}):setTimeout(i,120)})}start(){let n=this.host.nativeElement,t=n.querySelector(`canvas`),i=t.getContext(`webgl`,{alpha:this.variant()===`crea`,antialias:!1,depth:!1,stencil:!1,powerPreference:`low-power`,preserveDrawingBuffer:!1});if(!i)return()=>{};let s=(i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT)?.precision??0)>0,x=rt(i,it,at(this.variant(),s?`highp`:`mediump`));if(!x)return()=>{};i.useProgram(x);let b=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,b),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);let E=i.getAttribLocation(x,`a_pos`);i.enableVertexAttribArray(E),i.vertexAttribPointer(E,2,i.FLOAT,!1,0,0);let _=c=>i.getUniformLocation(x,c),S=_(`u_res`),We=_(`u_scale`),Qe=_(`u_time`),Ke=_(`u_pointer`),Xe=_(`u_open`),Ye=_(`u_focus`),Ze=_(`u_boost`),k=globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,ae=globalThis.matchMedia?.(`(pointer: coarse)`).matches??!1,Je=ae?65e4:15e5,oe=1e3/(ae?30:60),z=1,A=1,F=[0,0,1],U=()=>{let c=t.getBoundingClientRect(),g=Math.max(1,c.width),P=Math.max(1,c.height);A=Math.min(window.devicePixelRatio||1,Math.sqrt(Je/(g*P)))*z,t.width=Math.round(g*A),t.height=Math.round(P*A),i.viewport(0,0,t.width,t.height);let xe=this.focus(),ve=ot[this.variant()];if(xe){let R=xe.getBoundingClientRect();F=[R.left+R.width/2-c.left,P-(R.top+R.height*ve.fy-c.top),Math.max(60,R.width*ve.r)]}else F=[g/2,P*.7,Math.min(g,P)*.3]},v={x:0,y:0,tx:0,ty:0},re=c=>{v.tx=c.clientX/window.innerWidth*2-1,v.ty=-(c.clientY/window.innerHeight*2-1)},le=performance.now(),G=0,se=le,M=0,w=0,W=0,L=!0,ce=!1,Q=0,et=0,K=c=>{let g=k?14e3:c-le,P=k?1:1-Math.pow(2,-10*Math.min(1,g/2200));k||(M+=((this.boost()?1:0)-M)*.08),G=k?g:G+Math.min(100,c-se)*(1+.9*M),se=c,v.x+=(v.tx-v.x)*.04,v.y+=(v.ty-v.y)*.04,i.uniform2f(S,t.width,t.height),i.uniform1f(We,A),i.uniform1f(Qe,G/1e3%2e3),i.uniform2f(Ke,v.x,v.y),i.uniform1f(Xe,P),i.uniform3f(Ye,F[0],F[1],F[2]),i.uniform1f(Ze,M),i.drawArrays(i.TRIANGLE_STRIP,0,4),ce||(ce=!0,n.classList.add(`is-live`),n.parentElement?.setAttribute(`data-sky`,`live`))},pe=c=>{if(w=0,!L||document.hidden)return;w=requestAnimationFrame(pe);let g=c-W;g<oe-2||(W&&g>oe*1.6&&Q++,++et%90===0&&(Q>30&&z>.5&&(z*=.8,U()),Q=0),W=c,K(c))},X=()=>{!k&&!w&&L&&!document.hidden&&(w=requestAnimationFrame(pe))};U(),K(performance.now());let Y=new(globalThis.ResizeObserver??class{observe(){}disconnect(){}})(()=>{U(),(k||!w)&&K(performance.now())});Y.observe(t);let de=this.focus();de&&Y.observe(de);let me=globalThis.IntersectionObserver?new IntersectionObserver(([c])=>{L=c.isIntersecting,L&&X()}):null;me?.observe(n);let ue=()=>X();document.addEventListener(`visibilitychange`,ue),k||window.addEventListener(`pointermove`,re,{passive:!0});let fe=c=>{c.preventDefault(),cancelAnimationFrame(w),w=0,L=!1};return t.addEventListener(`webglcontextlost`,fe),X(),()=>{cancelAnimationFrame(w),Y.disconnect(),me?.disconnect(),document.removeEventListener(`visibilitychange`,ue),window.removeEventListener(`pointermove`,re),t.removeEventListener(`webglcontextlost`,fe),n.parentElement?.removeAttribute(`data-sky`),i.getExtension(`WEBGL_lose_context`)?.loseContext()}}static ɵfac=function(t){return new(t||e)};static ɵcmp=Dm({type:e,selectors:[[`app-portal-sky`]],hostAttrs:[`aria-hidden`,`true`,1,`portal-sky`,`pointer-events-none`,`absolute`,`inset-0`,`block`],inputs:{variant:[1,`variant`],focus:[1,`focus`],boost:[1,`boost`]},decls:1,vars:0,consts:[[1,`portal-sky-canvas`,`block`,`h-full`,`w-full`]],template:function(t,i){t&1&&Lu(0,`canvas`,0)},encapsulation:2})};function rt(e,n,t){let i=(E,_)=>{let S=e.createShader(E);return e.shaderSource(S,_),e.compileShader(S),e.getShaderParameter(S,e.COMPILE_STATUS)?S:(console.warn(`portal-sky:`,e.getShaderInfoLog(S)),null)},s=i(e.VERTEX_SHADER,n),x=i(e.FRAGMENT_SHADER,t);if(!s||!x)return null;let b=e.createProgram();return e.attachShader(b,s),e.attachShader(b,x),e.linkProgram(b),e.getProgramParameter(b,e.LINK_STATUS)?b:null}var lt=()=>[0,1,2,3];var st=()=>[0,1,2,3,4,5];var ct=(e,n)=>n.title;var je=(e,n)=>n.id;function pt(e,n){if(e&1&&(Lo(0,`p`,49),qy(1),ea()),e&2){let t=Fy();Ug(),td(`De `,t.startsAt,` a `,t.endsAt??`…`,` h`)}}function dt(e,n){if(e&1&&(Lo(0,`a`,51),Nc(),Lo(1,`svg`,52),ku(2,`path`,53)(3,`circle`,54),ea(),qy(4),ea()),e&2){let t=Fy(),i=Fy();Ru(`href`,t.venueMapUrl,$l),Ug(4),ia(` `,t.venueName??i.porConfirmar,` · ver mapa `)}}function mt(e,n){if(e&1&&(Lo(0,`span`),qy(1),ea()),e&2){let t=Fy(),i=Fy();Ug(),ed(t.venueName??i.porConfirmar)}}function ut(e,n){if(e&1&&(Lo(0,`p`,48),qy(1),ea(),gy(2,pt,2,2,`p`,49),Lo(3,`p`,50),gy(4,dt,5,2,`a`,51)(5,mt,2,1,`span`),ea()),e&2){let t=n,i=Fy();Ug(),ed(i.formatEventDate(t.date)),Ug(),my(t.startsAt?2:-1),Ug(2),my(t.venueMapUrl?4:5)}}function ft(e,n){e&1&&(Lo(0,`p`,15),qy(1,`No pudimos cargar la información del evento. Intenta de nuevo en un momento.`),ea())}function xt(e,n){e&1&&(Lo(0,`div`,16)(1,`span`,13),qy(2,`Cargando la información del evento`),ea(),ku(3,`span`,55)(4,`span`,56)(5,`span`,57),ea())}function vt(e,n){e&1&&(Lo(0,`a`,18),qy(1,`Regístrate gratis`),ea())}function gt(e,n){e&1&&(Lo(0,`span`,19),qy(1,`El registro abre pronto`),ea())}function yt(e,n){if(e&1&&(Lo(0,`li`,58),ku(1,`img`,59),Lo(2,`div`,60)(3,`p`,61),qy(4),ea(),Lo(5,`p`,62),qy(6),ea()()()),e&2){let t=n.$implicit,i=n.$index;Ju(`--%NS%i`,i),Ug(),Ru(`src`,t.img),Ug(3),ed(t.title),Ug(2),ed(t.text)}}function ht(e,n){e&1&&qy(0,` Los horarios se publican en cuanto se confirmen. `)}function bt(e,n){if(e&1&&(Lo(0,`span`,85),qy(1),ea()),e&2){let t=Fy().$implicit,i=Fy();Wy((t.available??0)>0?`bg-success-700/30 text-success-500`:`bg-error-700/30 text-error-500`),Ug(),ed((t.available??0)>0?i.formatSeats(t.available??0):`Cupo lleno`)}}function _t(e,n){if(e&1&&(Lo(0,`p`,68),qy(1),ea()),e&2){let t=Fy().$implicit;Ug(),ed(t.subtitle)}}function Et(e,n){e&1&&ku(0,`img`,79),e&2&&Ru(`src`,n)}function wt(e,n){if(e&1&&(Lo(0,`span`,80),qy(1),ea()),e&2){Fy();let t=Yy(0),i=Fy();Ug(),ed(i.initials(t.name))}}function Ct(e,n){e&1&&(Nc(),Lo(0,`svg`,81),ku(1,`path`,86),ea())}function St(e,n){if(e&1&&(Lo(0,`span`,84),qy(1),ea()),e&2){let t=n;Ou(`title`,t),Ug(),ed(t)}}function kt(e,n){if(e&1&&(dd(0),Lo(1,`li`,63)(2,`article`,64)(3,`div`,65)(4,`h3`,66),qy(5),ea(),gy(6,bt,2,3,`span`,67),ea(),gy(7,_t,2,1,`p`,68),Lo(8,`p`,69),ku(9,`app-kind-chip`,70),Lo(10,`span`,71),Nc(),Lo(11,`svg`,72),ku(12,`circle`,73)(13,`path`,74),ea(),Sc(),Lo(14,`span`),qy(15),ea()()(),Lo(16,`p`,75),qy(17),ea(),Lo(18,`div`,76)(19,`div`,77)(20,`span`,78),gy(21,Et,1,1,`img`,79)(22,wt,2,1,`span`,80)(23,Ct,2,0,`svg`,81),ea(),Lo(24,`span`,82)(25,`span`,83),qy(26),ea(),gy(27,St,2,2,`span`,84),ea()()()()()),e&2){let t,i,s=n.$implicit,x=n.$index,b=Fy(),E=Qy(s.speaker?.status===`CONFIRMED`?s.speaker:null);Ug(),Ju(`--%NS%i`,x),Ug(),Ou(`data-kind`,s.kind),Ug(3),ed(s.title),Ug(),my(s.available!=null?6:-1),Ug(),my(s.subtitle?7:-1),Ug(2),Ru(`kind`,s.kind),Ug(6),nd(``,s.startsAt?s.startsAt+` h`:`Hora por confirmar`,``,s.durationMin?` · `+s.durationMin+` min`:``,``,s.space?` · `+s.space:``),Ug(2),ed(s.description??`Descripción por confirmar.`),Ug(4),my((t=E?.photoUrl)?21:E?22:23,t),Ug(5),ed(b.responsibleName(s)),Ug(),my((i=E?.headline)?27:-1,i)}}function Pt(e,n){e&1&&(Lo(0,`li`,88),ku(1,`span`,90)(2,`span`,91)(3,`span`,92),ea())}function Tt(e,n){e&1&&(Ey(0,Pt,4,0,`li`,88,vy),Lo(2,`li`,89),qy(3,`Cargando el programa`),ea()),e&2&&Iy(mv(0,lt))}function Dt(e,n){e&1&&(Lo(0,`li`,87),qy(1,`Programa por confirmar.`),ea())}function Ft(e,n){if(e&1&&gy(0,Tt,4,1)(1,Dt,2,0,`li`,87),e&2){let t=Fy();my(t.query.isPending()?0:1)}}function Lt(e,n){if(e&1&&(Lo(0,`li`),ku(1,`app-speaker-card`,93),ea()),e&2){let t=n.$implicit,i=n.$index;Ju(`--%NS%i`,i),Ug(),Ru(`speaker`,t)(`compact`,!0)}}function Rt(e,n){e&1&&(Lo(0,`li`,95),ku(1,`span`,96),ea())}function At(e,n){e&1&&Ey(0,Rt,2,0,`li`,95,vy),e&2&&Iy(mv(0,st))}function Mt(e,n){e&1&&(Lo(0,`li`,94),qy(1,`Ponentes por confirmar.`),ea())}function It(e,n){if(e&1&&gy(0,At,2,1)(1,Mt,2,0,`li`,94),e&2){let t=Fy();my(t.speakersQuery.isPending()?0:1)}}var ze=`portalia`;var Ge=`Por confirmar`;var Nt=new Intl.DateTimeFormat(`es-MX`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`});function Ot(e){let n=Nt.format(/* @__PURE__ */ new Date(`${e}T00:00:00Z`));return n.charAt(0).toUpperCase()+n.slice(1)}function qt(e){return e===1?`1 lugar`:`${e} lugares`}function ie(e){return e.charAt(0).toUpperCase()+e.slice(1)}var Ht=[`cero`,`una`,`dos`,`tres`,`cuatro`,`cinco`,`seis`,`siete`,`ocho`,`nueve`,`diez`];function j(e){return Ht[e]??String(e)}function Bt(e){return e.speaker&&e.speaker.status===`CONFIRMED`?e.speaker.name:Ge}var Ue=class e{api=I(V);speakersApi=I(V$1);porConfirmar=Ge;formatEventDate=Ot;formatSeats=qt;responsibleName=Bt;initials=$e;query=Vt(()=>({queryKey:[`events`,ze],queryFn:()=>NS(this.api.eventsControllerGetBySlug(ze)),staleTime:6e4}));speakersQuery=Vt(()=>({queryKey:nt$1,queryFn:()=>NS(this.speakersApi.speakersControllerList({event:me})),staleTime:6e4}));featuredSpeakers=Le(()=>{let n=this.speakersQuery.data()??[];return[...n.filter(t=>t.photoUrl),...n.filter(t=>!t.photoUrl)].slice(0,6)});ev=Le(()=>this.query.data());sessions=Le(()=>this.ev()?.sessions??[]);conferences=Le(()=>this.sessions().filter(n=>n.kind===`CONFERENCE`));experiences=Le(()=>this.sessions().filter(n=>n.kind===`EXPERIENCE`));pendingTimes=Le(()=>this.sessions().some(n=>n.startsAt===null));pillars=Le(()=>{let n=this.conferences().length,t=this.experiences(),i=t.some(s=>s.capacity!=null)?`, con cupo limitado.`:`. Entrada libre con registro.`;return[{title:`Conferencias`,text:n===0?`Voces que abren perspectivas.`:`${n===1?`Una voz que abre`:`${ie(j(n))} voces que abren`} perspectivas. Entrada libre con registro.`,img:`img/portalia-conferencias.jpg`},{title:`Experiencias`,text:t.length===1?`Una sesi\xF3n para aprender haciendo${i}`:`${t.length>1?ie(j(t.length))+` sesiones`:`Sesiones`} para aprender haciendo${i}`,img:`img/portalia-experiencias.jpg`},{title:`Conexión`,text:`Mesas de conversación con cada ponente al terminar.`,img:`img/portalia-conexion.jpg`}]});speakersBlurb=Le(()=>{let n=this.conferences().length,t=this.experiences().length;if(n===0&&t===0)return`Los iremos presentando conforme confirmen.`;return`${ie([n>0?`${j(n)} ${n===1?`conferencia`:`conferencias`}`:null,t>0?`${j(t)} ${t===1?`experiencia`:`experiencias`}`:null].filter(Boolean).join(` y `))}. Conoce a quienes las imparten y c\xF3mo contactarlos.`});registrationOpen=Le(()=>this.ev()?.registrationOpen??!1);static ɵfac=function(t){return new(t||e)};static ɵcmp=Dm({type:e,selectors:[[`app-landing-page`]],decls:77,vars:13,consts:[[`heroLogo`,``],[`appInView`,``,1,`hero`,`bg-stars`,`relative`,`overflow-hidden`,`px-4`,`pb-10`,`pt-8`,`text-center`,`sm:pb-16`,`sm:pt-12`],[`variant`,`portalia`,3,`focus`],[`aria-hidden`,`true`,1,`hero-glow`,`pointer-events-none`,`absolute`,`left-1/2`,`top-0`,`-z-0`,`h-[520px]`,`w-[520px]`,`-translate-x-1/2`,`-translate-y-1/3`,`rounded-full`,`sm:h-[760px]`,`sm:w-[760px]`],[`aria-label`,`Secciones`,1,`relative`,`mx-auto`,`mb-6`,`flex`,`max-w-3xl`,`flex-wrap`,`items-center`,`justify-center`,`gap-x-5`,`gap-y-2`,`text-xs`,`uppercase`,`tracking-[0.18em]`,`text-neutral-200/75`,`sm:mb-8`],[`href`,`#programa`,1,`link-gold`],[`routerLink`,`/ponentes`,1,`link-gold`],[`routerLink`,`/crea2027`,1,`link-gold`],[`routerLink`,`/pase`,1,`link-gold`,`text-accent-300`],[1,`relative`,`mx-auto`,`flex`,`max-w-3xl`,`flex-col`,`items-center`],[1,`hero-logo`],[`srcset`,`brand/logo-portalia-sm.webp 480w, brand/logo-portalia.webp 960w`,`sizes`,`(max-width: 640px) 300px, 480px`,`type`,`image/webp`],[`src`,`brand/logo-portalia.png`,`width`,`960`,`height`,`605`,`alt`,`Portalia. Donde termina lo conocido, comienza la magia.`,`fetchpriority`,`high`,1,`h-auto`,`w-[300px]`,`sm:w-[480px]`],[1,`sr-only`],[1,`hero-rise`,`mt-4`,`font-display`,`text-xs`,`uppercase`,`tracking-[0.3em]`,`text-accent-300`,`sm:text-sm`,2,`--i`,`1`],[1,`hero-rise`,`mt-6`,`text-sm`,`text-neutral-200/80`,2,`--i`,`2`],[`aria-live`,`polite`,`aria-busy`,`true`,1,`mt-6`,`flex`,`flex-col`,`items-center`,`gap-2`],[1,`hero-rise`,`mt-8`,`flex`,`w-full`,`flex-col`,`items-center`,`gap-3`,`sm:flex-row`,`sm:justify-center`,2,`--i`,`5`],[`routerLink`,`/registro`,1,`btn-gold`,`inline-flex`,`w-full`,`items-center`,`justify-center`,`rounded-full`,`bg-accent-500`,`px-8`,`py-3`,`font-display`,`text-sm`,`font-semibold`,`uppercase`,`tracking-widest`,`text-primary-950`,`sm:w-auto`],[`aria-disabled`,`true`,1,`inline-flex`,`w-full`,`items-center`,`justify-center`,`rounded-full`,`border`,`border-accent-500/60`,`px-8`,`py-3`,`font-display`,`text-sm`,`font-semibold`,`uppercase`,`tracking-widest`,`text-accent-300`,`sm:w-auto`],[`href`,`#programa`,1,`link-gold`,`text-sm`,`text-neutral-200/80`],[`aria-labelledby`,`que-es`,1,`bg-neutral-50`,`px-4`,`py-12`,`text-neutral-900`,`sm:py-16`],[1,`mx-auto`,`max-w-3xl`],[`id`,`que-es`,1,`font-display`,`text-2xl`,`text-primary-700`,`sm:text-3xl`],[1,`mt-4`,`leading-relaxed`,`text-neutral-700`],[1,`mt-3`,`italic`,`text-neutral-500`],[`appInView`,``,1,`reveal-list`,`mt-8`,`grid`,`gap-4`,`sm:grid-cols-3`,3,`appInViewOnce`],[1,`overflow-hidden`,`rounded-xl`,`border`,`border-neutral-200`,`bg-white`,3,`--%NS%i`],[`id`,`programa`,`aria-labelledby`,`programa-titulo`,1,`bg-primary-900`,`px-4`,`py-12`,`sm:py-16`],[1,`mx-auto`,`max-w-5xl`],[`id`,`programa-titulo`,1,`font-display`,`text-2xl`,`text-accent-300`,`sm:text-3xl`],[1,`mt-2`,`max-w-2xl`,`text-sm`,`text-neutral-200/75`],[`data-testid`,`programa`,`appInView`,``,1,`reveal-list`,`mt-8`,`grid`,`grid-cols-1`,`gap-4`,`md:grid-cols-2`,3,`appInViewOnce`],[1,`h-full`,3,`--%NS%i`],[`id`,`ponentes`,`aria-labelledby`,`ponentes-titulo`,1,`bg-neutral-100`,`px-4`,`py-12`,`text-neutral-900`,`sm:py-16`],[1,`flex`,`flex-col`,`gap-2`,`sm:flex-row`,`sm:items-end`,`sm:justify-between`],[`id`,`ponentes-titulo`,1,`font-display`,`text-2xl`,`text-primary-700`,`sm:text-3xl`],[1,`mt-2`,`max-w-xl`,`text-sm`,`text-neutral-700`],[`routerLink`,`/ponentes`,1,`link-gold`,`shrink-0`,`text-sm`,`font-semibold`,`text-primary-700`],[`data-testid`,`ponentes`,`appInView`,``,1,`reveal-list`,`mt-8`,`grid`,`grid-cols-2`,`gap-3`,`sm:grid-cols-3`,`sm:gap-4`,`lg:grid-cols-6`,3,`appInViewOnce`],[3,`--%NS%i`],[`aria-labelledby`,`crea-teaser-titulo`,1,`crea-teaser`,`px-4`,`py-12`,`sm:py-16`],[1,`mx-auto`,`flex`,`max-w-3xl`,`flex-col`,`items-center`,`gap-5`,`text-center`],[`src`,`brand/gymind/gymind-dorado-horizontal.png`,`width`,`960`,`height`,`337`,`alt`,`GyMind. Expansión de la conciencia`,`loading`,`lazy`,`decoding`,`async`,1,`h-auto`,`w-48`,`sm:w-56`],[1,`font-display`,`text-xs`,`uppercase`,`tracking-[0.3em]`,`text-crea-gold-300`],[`id`,`crea-teaser-titulo`,1,`font-crea`,`text-4xl`,`leading-tight`,`text-neutral-50`,`sm:text-5xl`],[1,`max-w-xl`,`leading-relaxed`,`text-neutral-200/85`],[`routerLink`,`/crea2027`,1,`btn-crea`,`inline-flex`,`items-center`,`justify-center`,`rounded-full`,`px-7`,`py-3`,`font-display`,`text-sm`,`font-semibold`,`uppercase`,`tracking-widest`],[1,`hero-rise`,`mt-6`,`font-display`,`text-xl`,`text-neutral-50`,`sm:text-2xl`,2,`--i`,`2`],[1,`hero-rise`,`mt-1`,`text-sm`,`text-neutral-200/80`,2,`--i`,`3`],[1,`hero-rise`,`mt-3`,`text-base`,`text-neutral-100`,2,`--i`,`4`],[`target`,`_blank`,`rel`,`noopener`,1,`link-gold`,`inline-flex`,`items-center`,`gap-1.5`,`text-accent-300`,3,`href`],[`viewBox`,`0 0 24 24`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`1.75`,`stroke-linecap`,`round`,`stroke-linejoin`,`round`,`aria-hidden`,`true`,1,`h-4`,`w-4`,`shrink-0`],[`d`,`M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z`],[`cx`,`12`,`cy`,`10`,`r`,`3`],[1,`skeleton`,`h-7`,`w-64`,`rounded-md`],[1,`skeleton`,`h-4`,`w-32`,`rounded-md`],[1,`skeleton`,`mt-1`,`h-5`,`w-48`,`rounded-md`],[1,`overflow-hidden`,`rounded-xl`,`border`,`border-neutral-200`,`bg-white`],[`width`,`960`,`height`,`640`,`alt`,``,`loading`,`lazy`,`decoding`,`async`,1,`aspect-[3/2]`,`w-full`,`object-cover`,3,`src`],[1,`p-4`],[1,`font-display`,`text-sm`,`uppercase`,`tracking-wider`,`text-primary-700`],[1,`mt-1`,`text-sm`,`text-neutral-700`],[1,`h-full`],[1,`session-card`,`flex`,`h-full`,`flex-col`,`rounded-2xl`,`border`,`p-5`,`sm:p-6`],[1,`flex`,`items-start`,`justify-between`,`gap-3`],[1,`font-display`,`text-lg`,`leading-snug`,`text-neutral-50`,`sm:text-xl`],[1,`mt-0.5`,`shrink-0`,`rounded-full`,`px-2.5`,`py-0.5`,`text-xs`,`font-semibold`,3,`class`],[1,`mt-1`,`text-sm`,`font-semibold`,`text-neutral-100/90`],[1,`mt-3`,`flex`,`flex-wrap`,`items-center`,`gap-x-2.5`,`gap-y-1.5`,`text-xs`,`text-neutral-200/80`],[`surface`,`dark`,3,`kind`],[1,`inline-flex`,`items-start`,`gap-1`],[`viewBox`,`0 0 24 24`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`2`,`stroke-linecap`,`round`,`stroke-linejoin`,`round`,`aria-hidden`,`true`,1,`mt-px`,`h-3.5`,`w-3.5`,`shrink-0`,`opacity-70`],[`cx`,`12`,`cy`,`12`,`r`,`9`],[`d`,`M12 7v5l3 2`],[1,`mt-4`,`text-sm`,`leading-relaxed`,`text-neutral-200/85`],[1,`mt-auto`,`pt-5`],[1,`flex`,`items-center`,`gap-3`,`border-t`,`border-neutral-50/10`,`pt-4`],[`aria-hidden`,`true`,1,`session-avatar`,`relative`,`flex`,`h-11`,`w-11`,`shrink-0`,`items-center`,`justify-center`,`overflow-hidden`,`rounded-full`,`bg-primary-950`],[`alt`,``,`width`,`88`,`height`,`88`,`loading`,`lazy`,`decoding`,`async`,1,`h-full`,`w-full`,`object-cover`,`object-[50%_22%]`,3,`src`],[1,`font-display`,`text-sm`,`tracking-[0.06em]`,`text-accent-300`],[`viewBox`,`0 0 80 96`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`5`,`stroke-linecap`,`round`,1,`h-6`,`w-5`,`text-accent-500/80`],[1,`min-w-0`],[1,`block`,`truncate`,`text-sm`,`font-semibold`,`text-neutral-50`],[1,`block`,`truncate`,`text-xs`,`text-neutral-200/70`],[1,`mt-0.5`,`shrink-0`,`rounded-full`,`px-2.5`,`py-0.5`,`text-xs`,`font-semibold`],[`d`,`M12 92V42a28 28 0 0 1 56 0v50`],[1,`text-sm`,`text-neutral-200/70`],[`aria-hidden`,`true`,1,`flex`,`flex-col`,`gap-3`,`rounded-2xl`,`border`,`border-accent-500/15`,`p-5`],[`aria-live`,`polite`,1,`sr-only`],[1,`skeleton`,`h-5`,`w-48`,`rounded-md`],[1,`skeleton`,`h-3`,`w-32`,`rounded-md`],[1,`skeleton`,`h-12`,`w-full`,`rounded-md`],[3,`speaker`,`compact`],[1,`col-span-full`,`text-sm`,`text-neutral-500`],[`aria-hidden`,`true`,1,`overflow-hidden`,`rounded-2xl`,`bg-white`],[1,`skeleton`,`block`,`aspect-square`,`w-full`]],template:function(t,i){if(t&1&&(Lo(0,`header`,1),ku(1,`app-portal-sky`,2)(2,`div`,3),Lo(3,`nav`,4)(4,`a`,5),qy(5,`Programa`),ea(),Lo(6,`a`,6),qy(7,`Ponentes`),ea(),Lo(8,`a`,7),qy(9,`Crea tu Año`),ea(),Lo(10,`a`,8),qy(11,`Mi pase`),ea()(),Lo(12,`div`,9)(13,`picture`,10),ku(14,`source`,11)(15,`img`,12,0),ea(),Lo(17,`h1`,13),qy(18),ea(),Lo(19,`p`,14),qy(20,`Primera edición · Festival de ideas y experiencias`),ea(),gy(21,ut,6,3)(22,ft,2,0,`p`,15)(23,xt,6,0,`div`,16),Lo(24,`div`,17),gy(25,vt,2,0,`a`,18)(26,gt,2,0,`span`,19),Lo(27,`a`,20),qy(28,`Ver el programa`),ea()()()(),Lo(29,`section`,21)(30,`div`,22)(31,`h2`,23),qy(32,`¿Qué es Portalia?`),ea(),Lo(33,`p`,24),qy(34),ea(),Lo(35,`p`,25),qy(36),ea(),Lo(37,`ul`,26),Ey(38,yt,7,5,`li`,27,ct),ea()()(),Lo(40,`section`,28)(41,`div`,29)(42,`h2`,30),qy(43,`Programa`),ea(),Lo(44,`p`,31),qy(45,` Conferencias y experiencias, todas libres con tu registro. `),gy(46,ht,1,0),ea(),Lo(47,`ol`,32),Ey(48,kt,28,15,`li`,33,je,!1,Ft,2,1),ea()()(),Lo(51,`section`,34)(52,`div`,29)(53,`div`,35)(54,`div`)(55,`h2`,36),qy(56,`Quiénes participan`),ea(),Lo(57,`p`,37),qy(58),ea()(),Lo(59,`a`,38),qy(60,`Ver el directorio completo`),ea()(),Lo(61,`ul`,39),Ey(62,Lt,2,4,`li`,40,je,!1,It,2,1),ea()()(),Lo(65,`section`,41)(66,`div`,42),ku(67,`img`,43),Lo(68,`p`,44),qy(69,`Sábado 5 de diciembre · Hotel Misión Pachuca`),ea(),Lo(70,`h2`,45),qy(71,`Crea tu Año 2027`),ea(),Lo(72,`p`,46),qy(73,`Al día siguiente de Portalia, el taller de GyMind para diseñar tu próximo año con dirección, ritmo y acción.`),ea(),Lo(74,`a`,47),qy(75,`Conocer Crea tu Año`),ea()()(),ku(76,`app-site-footer`)),t&2){let s,x=$y(16);Ug(),Ru(`focus`,x),Ug(17),ed(i.ev()?.name??`Portalia`),Ug(3),my((s=i.ev())?21:i.query.isError()?22:23,s),Ug(4),my(i.registrationOpen()?25:26),Ug(9),ed(i.ev()?.description??i.porConfirmar),Ug(2),ed(i.ev()?.tagline??``),Ug(),Ru(`appInViewOnce`,!0),Ug(),Iy(i.pillars()),Ug(8),my(i.pendingTimes()?46:-1),Ug(),Ru(`appInViewOnce`,!0),Ug(),Iy(i.sessions()),Ug(10),ed(i.speakersBlurb()),Ug(3),Ru(`appInViewOnce`,!0),Ug(),Iy(i.featuredSpeakers())}},dependencies:[Ho,l,H$1,A,$,L],encapsulation:2})};export{Ue as a,qt as c,Ot as i,ze as l,Bt as n,V as o,Ge as r,j as s,$ as t};