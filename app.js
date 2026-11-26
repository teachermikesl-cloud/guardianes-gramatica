const app=document.getElementById('app'),STORE='teachermikesl-guardianes-gramatica-v2';
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const star=n=>'★'.repeat(n)+'☆'.repeat(3-n);
let store;try{store=JSON.parse(localStorage.getItem(STORE))||{}}catch{store={}}store.records||={};
try{const old=JSON.parse(localStorage.getItem('teachermikesl-guardianes-gramatica-v1'));if(old&&!store.migrated){for(const [id,value] of Object.entries(old))store.records[id+':guardian']=value;store.migrated=true}}catch{}
let view='home',zone=null,level='guardian',mode='solo',teamCount=2,game=null,muted=false;
const DEFAULT_PROFILES=[['🦁','Leones'],['🐉','Dragones'],['🦉','Búhos'],['🐺','Lobos']];
const PROFILE_ICONS=['🦁','🐉','🦉','🐺','🦊','🦅','🐻','🐯'];
const BLOCKS=ZONES.slice(0,4).map(z=>({id:z.id,name:z.short,icon:z.icon}));
store.settings||={length:20,finalLength:25,blocks:BLOCKS.map(b=>b.id)};
store.profiles||=DEFAULT_PROFILES.map(([icon,name])=>({icon,name}));
const gameLength=()=>zone.id==='final'?Number(store.settings.finalLength||25):Number(store.settings.length||20);
const gameBlocks=()=>BLOCKS.filter(b=>(store.settings.blocks||[]).includes(b.id)).map(b=>b.id);
const profile=(i,source=game)=>source?.profiles?.[i]||store.profiles[i]||{icon:DEFAULT_PROFILES[i][0],name:DEFAULT_PROFILES[i][1]};
const teamName=(i,source=game)=>`${profile(i,source).icon} ${profile(i,source).name}`;
const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(store))}catch{}};
const rec=()=>store.records[zone.id+':'+level]||{best:0,stars:0,missed:[]};
const levelName=()=>LEVELS.find(l=>l.id===level).name;
const bank=()=>getQuestionBank(zone.id,level);
function makeOrders(ids,teamIndex=0){
 const byId=new Map(bank().map(q=>[q.id,q])),offset=Math.floor(Math.random()*4);
 let choiceNumber=0;
 return ids.map(id=>{
  const q=byId.get(id);
  if(!q?.options)return null;
  const positions=q.options.map((_,i)=>i);
  if(q.type==='multi')return shuffle(positions);
  const target=(choiceNumber++ +offset+teamIndex)%positions.length;
  const order=shuffle(positions.filter(i=>i!==q.answer));
  order.splice(target,0,q.answer);
  return order;
 });
}
function qFor(l){
 const index=game.mode==='teams'?l.index:game.index;
 const q=bank().find(item=>item.id===l.ids[index]);
 if(!q)return null;
 const order=l.orders?.[index];
 if(!order||!q.options)return q;
 const options=order.map(i=>q.options[i]);
 return {...q,options,answer:q.type==='multi'?q.answer.map(i=>order.indexOf(i)).sort((a,b)=>a-b):order.indexOf(q.answer)};
}
const goTop=()=>window.scrollTo(0,0);
const scene=name=>gameAudio.setScene(name);
const soundUI=()=>{$('#soundButton').classList.toggle('active',gameAudio.isEnabled());$('#soundButton').setAttribute('aria-label',gameAudio.isEnabled()?'Silenciar música y sonidos':'Activar música y sonidos')};
function home(){
 view='home';game=null;zone=null;goTop();scene('menu');
 const done=ZONES.slice(0,4).filter(z=>LEVELS.some(l=>store.records[z.id+':'+l.id]?.stars>0)).length;
 app.innerHTML=`<div class="page"><section class="hero"><div class="hero-inner"><span class="overline hero-badge">UNA AVENTURA DE LENGUA · 5.º Y 6.º</span><h1>GUARDIANES<br><span>DE LA<br>GRAMÁTICA</span></h1><p>El dragón de tinta ha mezclado las palabras. Entra en la arena, supera los retos y recupera el poder del lenguaje.</p><button class="btn btn-gold" id="exploreButton">Elegir una zona</button></div><div class="hero-art"><img src="assets/buho-guardian.webp" alt="Búho guardián con pluma mágica y escudo"></div><span class="spark a">✦</span><span class="spark b">✧</span><span class="spark c">✦</span></section><section id="zones"><div class="section-head"><div><span class="overline">ELIGE TU MISIÓN</span><h2>Cuatro zonas para conquistar</h2></div><p>${done} de 4 zonas completadas</p></div><div class="zone-grid">${ZONES.slice(0,4).map(z=>`<button class="zone-card" data-zone="${z.id}" style="--start:${z.start};--end:${z.end};--border:${z.color}"><span class="zone-tag">${z.label}</span><h3>${z.short}</h3><p>${z.description}</p><span class="zone-icon">${z.icon}</span></button>`).join('')}</div><button class="final-card" data-zone="final"><span class="final-icon">🐉</span><span><span class="overline">RETO FINAL</span><h3>El dragón de tinta</h3><p>Una batalla con preguntas de las cuatro zonas.</p></span></button><div class="home-note"><div><strong>Tu entrenamiento continúa cuando vuelves</strong><small>Las estrellas, los récords y las partidas en curso se guardan por nivel en este dispositivo.</small></div><button class="text-button" id="clearButton">Borrar progreso</button></div></section></div>`;
 $('#exploreButton').onclick=()=>$('#zones').scrollIntoView({behavior:'smooth'});
 app.querySelectorAll('[data-zone]').forEach(b=>b.onclick=()=>setup(b.dataset.zone));
 $('#clearButton').onclick=()=>{if(confirm('¿Borrar el progreso de este dispositivo?')){store={records:{},migrated:true,settings:store.settings,profiles:store.profiles};save();home()}};
}
function setup(id){
 view='setup';zone=ZONES.find(z=>z.id===id);game=null;goTop();scene('menu');
 const resume=store.active?.zoneId===id;
 app.innerHTML=`<div class="page"><button class="back" id="backButton">‹ Volver a las zonas</button><section class="panel"><div class="setup-head"><div class="setup-medallion">${zone.icon}</div><div><span class="overline">${zone.label}</span><h1>${zone.name}</h1><p>${zone.description} Configura la duración de la partida más abajo. En equipos, cada grupo avanza a su ritmo.</p></div></div><div class="section-head"><div><span class="overline">PREPARA EL COMBATE</span><h2>Elige el nivel</h2></div><p class="record" id="recordText"></p></div><div class="level-grid">${LEVELS.map(l=>`<button class="level-choice ${level===l.id?'selected':''}" aria-pressed="${level===l.id}" data-level="${l.id}"><span>${l.icon}</span><b>${l.name}</b><small>${l.description}</small></button>`).join('')}</div><div class="section-head"><div><span class="overline">ELIGE CÓMO JUGAR</span><h2>Modo de juego</h2></div></div><div class="mode-grid"><button class="mode ${mode==='solo'?'selected':''}" aria-pressed="${mode==='solo'}" data-mode="solo"><span class="mode-icon">🎮</span><b>Individual</b><small>Portátil, tableta o móvil.</small></button><button class="mode ${mode==='teams'?'selected':''}" aria-pressed="${mode==='teams'}" data-mode="teams"><span class="mode-icon">⚔️</span><b>Por equipos</b><small>Pantalla dividida para 2, 3 o 4 equipos.</small></button><button class="mode ${mode==='class'?'selected':''}" aria-pressed="${mode==='class'}" data-mode="class"><span class="mode-icon">📺</span><b>Toda la clase</b><small>Una aventura colectiva en la pizarra.</small></button></div><div class="team-row ${mode==='teams'?'':'hidden'}" id="teamRow"><label for="teamSelect">Número de equipos</label><select id="teamSelect"><option value="2">2 equipos</option><option value="3">3 equipos</option><option value="4">4 equipos</option></select></div><div class="setup-actions"><button class="btn btn-gold" id="startButton">Ver repaso y jugar</button>${resume?'<button class="btn btn-blue" id="resumeButton">Reanudar partida</button>':''}<button class="btn btn-blue" id="reviewButton">Repasar fallos</button></div><p class="muted setup-note">La música empieza al comenzar la batalla. Puedes apagarla y ajustar el volumen arriba.</p></section></div>`;
 $('#teamSelect').value=String(teamCount);
 let lengthChoices=zone.id==='final'?[15,25,40]:[10,20,30];
 app.querySelector('.setup-actions').insertAdjacentHTML('beforebegin',`<section class="teacher-settings" aria-labelledby="settingsTitle"><span class="overline">AJUSTES DEL DOCENTE</span><h2 id="settingsTitle">Personaliza la partida</h2><div class="setting-grid"><label>Duración de la partida<select id="lengthSelect">${lengthChoices.map(n=>`<option value="${n}">${n} retos</option>`).join('')}</select></label>${zone.id==='final'?`<fieldset class="block-picker"><legend>Bloques de contenido</legend>${BLOCKS.map(b=>`<label><input type="checkbox" value="${b.id}" class="block-check" ${gameBlocks().includes(b.id)?'checked':''}> ${b.icon} ${esc(b.name)}</label>`).join('')}</fieldset>`:''}</div><p class="settings-note">Los ajustes se guardan en este dispositivo. Cada zona trabaja su propio bloque de contenido.</p></section><section class="profiles-settings ${mode==='teams'?'':'hidden'}" id="profilesSettings" aria-labelledby="profilesTitle"><span class="overline">IDENTIDAD DE EQUIPO</span><h2 id="profilesTitle">Nombres y emblemas</h2><p>Usa nombres de fantasía; no hace falta introducir datos del alumnado.</p><div class="profile-grid" id="profileGrid"></div></section>`);
 $('#lengthSelect').value=String(gameLength());
 $('#lengthSelect').onchange=e=>{if(zone.id==='final')store.settings.finalLength=+e.target.value;else store.settings.length=+e.target.value;save()};
 const refreshLength=()=>{if(zone.id!=='final')return;const available=bank().filter(q=>gameBlocks().some(id=>q.id.startsWith(id+'-'))).length;lengthChoices=[15,25,30,Math.min(40,available)].filter((n,i,a)=>n<=available&&a.indexOf(n)===i);$('#lengthSelect').innerHTML=lengthChoices.map(n=>`<option value="${n}">${n} retos</option>`).join('');store.settings.finalLength=lengthChoices.includes(+store.settings.finalLength)?+store.settings.finalLength:lengthChoices[lengthChoices.length-1];$('#lengthSelect').value=String(store.settings.finalLength);save()};refreshLength();
 app.querySelectorAll('.block-check').forEach(c=>c.onchange=()=>{const ids=[...app.querySelectorAll('.block-check:checked')].map(x=>x.value);if(!ids.length){c.checked=true;return}store.settings.blocks=ids;refreshLength();update();save()});
 const renderProfiles=()=>{const grid=$('#profileGrid');grid.innerHTML=Array.from({length:teamCount},(_,i)=>`<div class="profile-card"><label>Equipo ${i+1}<input class="profile-name" data-profile="${i}" maxlength="16" value="${esc(store.profiles[i]?.name||DEFAULT_PROFILES[i][1])}" autocomplete="off"></label><label>Emblema<select class="profile-icon" data-profile="${i}">${PROFILE_ICONS.map(icon=>`<option value="${icon}" ${icon===(store.profiles[i]?.icon||DEFAULT_PROFILES[i][0])?'selected':''}>${icon}</option>`).join('')}</select></label></div>`).join('');grid.querySelectorAll('.profile-name').forEach(input=>input.oninput=()=>{const i=+input.dataset.profile;store.profiles[i].name=input.value.trim().slice(0,16)||DEFAULT_PROFILES[i][1];save()});grid.querySelectorAll('.profile-icon').forEach(select=>select.onchange=()=>{store.profiles[+select.dataset.profile].icon=select.value;save()})};renderProfiles();
 const update=()=>{let r=rec(),valid=new Set(bank().filter(q=>zone.id!=='final'||gameBlocks().some(id=>q.id.startsWith(id+'-'))).map(q=>q.id)),missed=(r.missed||[]).filter(id=>valid.has(id));$('#recordText').textContent=`Récord ${r.best} · ${star(r.stars)}`;$('#reviewButton').classList.toggle('hidden',!missed.length);$('#reviewButton').textContent=`Repasar fallos (${missed.length})`};update();
 $('#backButton').onclick=home;
 app.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=b.dataset.level;app.querySelectorAll('[data-level]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});update()});
 app.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;app.querySelectorAll('[data-mode]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});$('#teamRow').classList.toggle('hidden',mode!=='teams');$('#profilesSettings').classList.toggle('hidden',mode!=='teams')});
 $('#teamSelect').onchange=e=>{teamCount=Number(e.target.value);renderProfiles()};
 $('#startButton').onclick=()=>showLesson(false);
 $('#resumeButton')?.addEventListener('click',resumeGame);
 $('#reviewButton').onclick=()=>showLesson(true);
}
function showLesson(review){
 view='lesson';goTop();scene('menu');
 const lesson=LESSONS[zone.id];
 app.innerHTML=`<div class="page lesson-page"><button class="back" id="lessonBack">‹ Volver a la preparación</button><section class="panel"><span class="overline">${zone.label} · REPASO RÁPIDO</span><h1>${esc(lesson.title)}</h1><p class="lesson-intro">${esc(lesson.intro)}</p><div class="lesson-grid">${lesson.cards.map(([title,text,example])=>`<article class="lesson-card"><h2>${esc(title)}</h2><p>${esc(text)}</p><div class="lesson-example"><span>Ejemplo</span><strong>${esc(example)}</strong></div></article>`).join('')}</div><div class="lesson-actions"><p>Ya conoces las ideas principales. Durante el juego podrás aprender también de cada error.</p><button class="btn btn-gold" id="lessonStart">Comenzar batalla</button></div></section></div>`;
 $('#lessonBack').onclick=()=>setup(zone.id);
 $('#lessonStart').onclick=()=>start(review);
}
function lane(ids,teamIndex){return {ids,index:0,orders:makeOrders(ids,teamIndex),correct:0,points:0,lastChange:0,streak:0,missed:[],history:[],selected:[],wordOrder:null,submitted:false,correctAnswer:false}}
function start(review){
 const allowed=zone.id==='final'?gameBlocks():[zone.id];
 const pool=review?bank().filter(q=>(rec().missed||[]).includes(q.id)&&(zone.id!=='final'||allowed.some(id=>q.id.startsWith(id+'-')))):shuffle(bank().filter(q=>zone.id!=='final'||allowed.some(id=>q.id.startsWith(id+'-'))));
 if(!pool.length)return;
 const count=review?1:mode==='teams'?teamCount:1,length=review?Math.min(pool.length,25):Math.min(pool.length,gameLength());
 game={zoneId:zone.id,level,mode:review?'solo':mode,index:0,phase:'answer',review,blocks:allowed,profiles:store.profiles.slice(0,count).map(p=>({...p})),lanes:Array.from({length:count},(_,i)=>lane(Array.from({length},(_,j)=>pool[(j+i*(zone.id==='final'?23:7))%pool.length].id),i))};
 store.active=game;save();if(!muted)gameAudio.setEnabled(true).then(soundUI);scene(zone.id==='final'?'boss':'battle');gameAudio.effect('open');battle();
}
function resumeGame(){
 game=store.active;if(!game)return;zone=ZONES.find(z=>z.id===game.zoneId);level=game.level;mode=game.mode;teamCount=game.lanes.length;
 const byId=new Map(bank().map(q=>[q.id,q]));
 for(const l of game.lanes){
  l.history||=[];
  if(!l.orders)l.orders=l.ids.map(id=>byId.get(id)?.options?.map((_,i)=>i)||null);
  if(game.mode==='teams'&&typeof l.index!=='number'){
   l.index=Math.min(l.ids.length,game.index+(l.submitted?1:0));
   l.selected=[];l.submitted=false;l.wordOrder=null;
  }
 }
 if(game.mode==='teams'&&game.lanes.every(l=>l.index>=l.ids.length)){result();return}
 if(game.mode==='teams'&&game.phase!=='paused')game.phase='answer';
 store.active=game;save();
 if(!muted)gameAudio.setEnabled(true).then(soundUI);scene(zone.id==='final'?'boss':'battle');
 game.phase==='checkpoint'||game.phase==='paused'?checkpoint():battle();
}
function options(q,l,i){
 if(q.type==='build'){
  if(!l.wordOrder)l.wordOrder=shuffle(q.words.map((_,j)=>j));
  return `<div class="sentence">${l.selected.length?l.selected.map(j=>`<button class="word" data-lane="${i}" data-remove="${j}" ${l.submitted?'disabled':''}>${esc(q.words[j])} ×</button>`).join(''):'<span class="placeholder">Tu frase aparecerá aquí</span>'}</div><div class="word-bank">${l.wordOrder.map(j=>`<button class="word" data-lane="${i}" data-word="${j}" ${l.selected.includes(j)||l.submitted?'disabled':''}>${esc(q.words[j])}</button>`).join('')}</div><button class="btn btn-blue check-answer" data-lane="${i}" ${l.selected.length!==q.words.length||l.submitted?'disabled':''}>Comprobar frase</button>`
 }
 return `<div class="choice-grid">${q.options.map((o,j)=>`<button class="answer ${l.selected.includes(j)?'selected':''}" aria-pressed="${q.type==='multi'?String(l.selected.includes(j)):'false'}" data-lane="${i}" data-answer="${j}" ${l.submitted?'disabled':''}><span class="key">${j+1}</span>${esc(o)}</button>`).join('')}</div>${q.type==='multi'?`<button class="btn btn-blue check-answer" data-lane="${i}" ${!l.selected.length||l.submitted?'disabled':''}>Comprobar selección</button>`:''}`;
}
function solution(q){return q.type==='choice'||q.type==='fill'?q.options[q.answer]:q.type==='multi'?q.answer.map(j=>q.options[j]).join(', '):q.answer}
function response(q,l){return q.type==='choice'||q.type==='fill'?q.options[l.selected[0]]||'Sin respuesta':q.type==='multi'?l.selected.map(j=>q.options[j]).join(', '):l.selected.map(j=>q.words[j]).join(' ')}
function logAnswer(l,q,right){l.history||=[];l.history.push({id:q.id,prompt:q.prompt,answer:response(q,l),solution:solution(q),explain:q.explain,right})}
function card(l,i){
 const q=qFor(l),team=game.lanes.length>1,reveal=game.phase==='reveal';
 return `<section class="panel question-panel lane-panel" style="--team-color:${['#60d6ef','#ffc96b','#f28fe5','#92e888'][i%4]}" aria-label="${team?esc(teamName(i)):'Reto'}"><div class="lane-heading"><span class="team-badge">${team?esc(teamName(i)):mode==='class'?'TODA LA CLASE':'TU MISIÓN'}</span><strong>${l.points-(team&&l.submitted&&!reveal?l.lastChange:0)} PUNTOS</strong></div><div class="lane-progress"><div style="width:${Math.max(2,100*(game.index+(reveal?1:0))/l.ids.length)}%"></div></div><span class="question-label">${q.type==='fill'?'COMPLETA LA FRASE':q.type==='choice'?'ELIGE LA RESPUESTA':q.type==='multi'?'SELECCIONA TODAS':'ORDENA LAS PALABRAS'}</span><h2>${esc(q.prompt)}</h2>${level==='aprendiz'&&!l.submitted?`<p class="question-hint">Pista: ${esc(q.hint||q.explain)}</p>`:''}${l.submitted&&!reveal?'<div class="answer-wait">Respuesta registrada · Esperando a los demás equipos</div>':options(q,l,i)}${reveal?`<div class="feedback ${l.correctAnswer?'correct':'wrong'}" role="status"><strong>${l.correctAnswer?'¡Acierto!':'Sigue entrenando'}</strong><p>Respuesta: <b>${esc(solution(q))}</b></p><p>${esc(q.explain)}</p></div>`:''}</section>`;
}
function teamCard(l,i){
 const color=['#60d6ef','#ffc96b','#f28fe5','#92e888'][i%4];
 if(l.index>=l.ids.length)return `<section class="panel question-panel lane-panel team-finished" style="--team-color:${color}" aria-label="${esc(teamName(i))}"><div class="lane-heading"><span class="team-badge">${esc(teamName(i))}</span><strong>${l.ids.length} / ${l.ids.length}</strong></div><div class="lane-progress"><div style="width:100%"></div></div><div class="finish-message"><span aria-hidden="true">🏁</span><h2>¡Retos terminados!</h2><p>Espera a que terminen los demás equipos para ver la clasificación.</p></div></section>`;
 const q=qFor(l);
 return `<section class="panel question-panel lane-panel" style="--team-color:${color}" aria-label="${esc(teamName(i))}"><div class="lane-heading"><span class="team-badge">${esc(teamName(i))}</span><strong>RETO ${l.index+1} / ${l.ids.length}</strong></div><div class="lane-progress"><div style="width:${Math.max(2,100*l.index/l.ids.length)}%"></div></div><span class="question-label">${q.type==='fill'?'COMPLETA LA FRASE':q.type==='choice'?'ELIGE LA RESPUESTA':q.type==='multi'?'SELECCIONA TODAS':'ORDENA LAS PALABRAS'}</span><h2>${esc(q.prompt)}</h2>${level==='aprendiz'?`<p class="question-hint">Pista: ${esc(q.hint||q.explain)}</p>`:''}${options(q,l,i)}</section>`;
}
function battleTeams(keepScroll=false){
 const scroll=keepScroll?window.scrollY:0;view='battle';scene(zone.id==='final'?'boss':'battle');
 app.innerHTML=`<div class="page battle-page team-page"><div class="battle-controls"><button class="back" id="exitButton">‹ Guardar y salir</button><button class="text-button" id="pauseButton">Pausar</button></div><div class="battle-top"><h1>${zone.icon} ${zone.short}</h1><div class="round-label">${levelName().toUpperCase()} · CADA EQUIPO AVANZA A SU RITMO</div></div><div class="team-board teams-${game.lanes.length}">${game.lanes.map(teamCard).join('')}</div><p class="team-footnote">Las respuestas y la clasificación se mostrarán al terminar todos los equipos.</p></div>`;
 $('#exitButton').onclick=()=>{store.active=game;save();home()};
 $('#pauseButton').onclick=()=>{game.previousPhase=game.phase;game.phase='paused';store.active=game;save();checkpoint()};
 app.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>choose(+b.dataset.lane,+b.dataset.answer));
 app.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{const l=game.lanes[+b.dataset.lane];l.selected.push(+b.dataset.word);store.active=game;save();battleTeams(true)});
 app.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const l=game.lanes[+b.dataset.lane];l.selected.splice(l.selected.indexOf(+b.dataset.remove),1);store.active=game;save();battleTeams(true)});
 app.querySelectorAll('.check-answer').forEach(b=>b.onclick=()=>submit(+b.dataset.lane));
 window.scrollTo(0,scroll);
}
function battle(keepScroll=false){
 if(game.mode==='teams'){battleTeams(keepScroll);return}
 const scroll=keepScroll?window.scrollY:0;view='battle';scene(zone.id==='final'?'boss':'battle');let teams=game.lanes.length>1,l=game.lanes[0];
 app.innerHTML=`<div class="page battle-page ${teams?'team-page':''}"><div class="battle-controls"><button class="back" id="exitButton">‹ Guardar y salir</button><button class="text-button" id="pauseButton">Pausar</button></div><div class="battle-top"><h1>${zone.icon} ${zone.short}</h1><div class="round-label">${levelName().toUpperCase()} · RETO ${game.index+1} / ${l.ids.length}</div><div class="points">RONDA <strong>${game.index+1}</strong></div></div>${teams?`<div class="team-board teams-${game.lanes.length}">${game.lanes.map(card).join('')}</div>`:`<div class="battle-layout"><div class="battle-left"><div class="battle-scene"><img class="fighter owl" src="assets/buho-guardian.webp" alt="Búho guardián"><span class="versus">VS</span><img class="fighter dragon" src="assets/dragon-tinta.webp" alt="Dragón de tinta"></div><div class="battle-status"><div><b>GUARDIÁN · ESCUDO</b><div class="healthbar player"><div style="width:${Math.max(8,100-l.missed.length*5)}%"></div></div></div><div class="boss"><b>DRAGÓN · TINTA</b><div class="healthbar"><div style="width:${Math.max(0,100-l.correct/l.ids.length*100)}%"></div></div></div></div></div>${card(l,0)}</div>`}${game.phase==='reveal'?`<div class="round-actions"><button class="btn btn-gold" id="nextButton">${game.index===l.ids.length-1?'Ver resultado':'Siguiente reto'}</button></div>`:''}</div>`;
 $('#exitButton').onclick=()=>{store.active=game;save();home()};
 $('#pauseButton').onclick=()=>{game.previousPhase=game.phase;game.phase='paused';store.active=game;save();checkpoint()};
 $('#nextButton')?.addEventListener('click',advance);
 app.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>choose(+b.dataset.lane,+b.dataset.answer));
 app.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{let x=game.lanes[+b.dataset.lane];x.selected.push(+b.dataset.word);store.active=game;save();battle(true)});
 app.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{let x=game.lanes[+b.dataset.lane];x.selected.splice(x.selected.indexOf(+b.dataset.remove),1);store.active=game;save();battle(true)});
 app.querySelectorAll('.check-answer').forEach(b=>b.onclick=()=>submit(+b.dataset.lane));
 window.scrollTo(0,scroll);
}
function choose(i,j){
 const l=game.lanes[i],q=qFor(l);if(l.submitted||game.phase!=='answer')return;
 if(q.type==='choice'||q.type==='fill'){l.selected=[j];submit(i);return}
 let pos=l.selected.indexOf(j);pos<0?l.selected.push(j):l.selected.splice(pos,1);store.active=game;save();battle(true);
}
function submit(i){
 if(game.mode==='teams'){submitTeam(i);return}
 const l=game.lanes[i],q=qFor(l);if(l.submitted||game.phase!=='answer')return;
 const right=q.type==='choice'||q.type==='fill'?l.selected[0]===q.answer:q.type==='multi'?JSON.stringify([...l.selected].sort((a,b)=>a-b))===JSON.stringify(q.answer):l.selected.map(j=>q.words[j]).join(' ')===q.answer;
 logAnswer(l,q,right);
 l.submitted=true;l.correctAnswer=right;const before=l.points;
 if(right){l.correct++;l.streak++;l.points+=level==='maestro'?125+(l.streak%3===0?50:0):100+(l.streak%3===0?25:0)}
 else{l.streak=0;l.missed.push(q.id);if(level==='maestro')l.points=Math.max(0,l.points-25)}
 l.lastChange=l.points-before;
 if(game.lanes.length===1)gameAudio.effect(right?'good':'bad');else gameAudio.effect('open');
 if(game.lanes.every(x=>x.submitted)){game.phase='reveal';if(game.index===l.ids.length-1)gameAudio.effect('win')}
 store.active=game;save();battle(game.phase!=='reveal');
}
function submitTeam(i){
 const l=game.lanes[i];if(game.phase!=='answer'||l.index>=l.ids.length)return;
 const q=qFor(l);
 const right=q.type==='choice'||q.type==='fill'?l.selected[0]===q.answer:q.type==='multi'?JSON.stringify([...l.selected].sort((a,b)=>a-b))===JSON.stringify(q.answer):l.selected.map(j=>q.words[j]).join(' ')===q.answer;
 logAnswer(l,q,right);
 if(right){l.correct++;l.streak++;l.points+=level==='maestro'?125+(l.streak%3===0?50:0):100+(l.streak%3===0?25:0)}
 else{l.streak=0;l.missed.push(q.id);if(level==='maestro')l.points=Math.max(0,l.points-25)}
 l.index++;l.selected=[];l.wordOrder=null;
 gameAudio.effect('open');
 store.active=game;save();
 if(game.lanes.every(item=>item.index>=item.ids.length)){gameAudio.effect('win');result()}
 else battleTeams(true);
}
function advance(){
 if(game.phase!=='reveal')return;
 if(game.index===game.lanes[0].ids.length-1){result();return}
 if((game.index+1)%5===0){game.phase='checkpoint';store.active=game;save();checkpoint()}else next();
}
function next(){game.index++;game.phase='answer';game.lanes.forEach(l=>{l.selected=[];l.submitted=false;l.correctAnswer=false;l.lastChange=0;l.wordOrder=null});store.active=game;save();battle()}
function checkpoint(){
 view='checkpoint';goTop();scene('menu');const paused=game.phase==='paused';
 const team=game.mode==='teams';
 app.innerHTML=`<div class="page"><section class="panel result checkpoint"><div class="medal">${paused?'⏸️':'✨'}</div><span class="overline">${paused?'BATALLA EN PAUSA':'PUNTO DE CONTROL'}</span><h1>${paused?'Toma un respiro':'¡Buen trabajo!'}</h1><p>${team?'Cada equipo conserva su avance. La clasificación sigue oculta.':`Reto ${game.index+(game.phase==='checkpoint'?1:0)} de ${game.lanes[0].ids.length}.`} La partida está guardada.</p><div class="team-scores">${game.lanes.map((l,i)=>`<span>${team?esc(teamName(i))+': '+l.index+' / '+l.ids.length:'Puntos: '+l.points}</span>`).join('')}</div><div class="result-buttons"><button class="btn btn-gold" id="continueButton">Continuar</button><button class="btn btn-blue" id="leaveButton">Volver al inicio</button></div></section></div>`;
 $('#continueButton').onclick=()=>{if(paused){game.phase=game.previousPhase||'answer';delete game.previousPhase;store.active=game;save();battle()}else next()};
 $('#leaveButton').onclick=()=>{store.active=game;save();home()};
}
function reportFor(finished){
 return `<section class="match-report" aria-labelledby="reportTitle"><span class="overline">REPASO DEL COMBATE</span><h2 id="reportTitle">Informe para aprender</h2><p>Abre cada equipo para ver sus respuestas y las explicaciones. El informe se muestra al terminar la partida.</p><div class="report-grid">${finished.lanes.map((l,i)=>{const errors=(l.history||[]).filter(h=>!h.right);const byBlock=BLOCKS.map(b=>({name:b.name,count:errors.filter(h=>finished.zoneId===b.id||h.id.startsWith(b.id+'-')).length})).filter(b=>b.count);return `<details class="report-team"><summary><span>${esc(finished.mode==='teams'?teamName(i,finished):finished.mode==='class'?'Toda la clase':'Tu partida')}</span><strong>${l.correct} / ${l.ids.length} aciertos · ${errors.length} por repasar</strong></summary><div class="report-body">${byBlock.length?`<p class="report-blocks">Revisa: ${byBlock.map(b=>`${esc(b.name)} (${b.count})`).join(' · ')}</p>`:''}${errors.length?errors.map((h,j)=>`<article class="report-error"><span>RETO PARA REPASAR ${j+1}</span><h3>${esc(h.prompt)}</h3><p><b>Tu respuesta:</b> ${esc(h.answer)}</p><p><b>Respuesta correcta:</b> ${esc(h.solution)}</p><p class="report-explain">${esc(h.explain)}</p></article>`).join(''):'<p class="report-perfect">¡Todas las respuestas correctas!</p>'}</div></details>`}).join('')}</div></section>`;
}
function result(){
 view='result';goTop();scene('victory');const finished=game,length=game.lanes[0].ids.length,count=game.lanes.length,total=game.lanes.reduce((n,l)=>n+l.correct,0),rate=total/(length*count),earned=rate===1?3:rate>=.75?2:rate>=.5?1:0;
 const old=rec(),played=new Set(game.lanes.flatMap(l=>l.ids)),valid=new Set(bank().map(q=>q.id)),missed=game.review?new Set(game.lanes.flatMap(l=>l.missed)):new Set([...(old.missed||[]).filter(id=>!played.has(id)&&valid.has(id)),...game.lanes.flatMap(l=>l.missed)]);
 store.records[zone.id+':'+level]={best:game.review?old.best:Math.max(old.best,...game.lanes.map(l=>l.points)),stars:game.review?old.stars:Math.max(old.stars,earned),missed:[...missed]};
 store.active=null;game=null;save();
 const ranked=finished.lanes.map((l,i)=>({team:i+1,points:l.points,correct:l.correct})).sort((a,b)=>b.points-a.points||b.correct-a.correct||a.team-b.team);
 const ranking=finished.mode==='teams'?`<h2>Clasificación final</h2><div class="ranking">${ranked.map(item=>`<div class="ranking-row ${item.points===ranked[0].points?'winner':''}"><span class="ranking-position">${1+ranked.findIndex(other=>other.points===item.points)}.º</span><strong>${esc(teamName(item.team-1,finished))}</strong><span>${item.correct} aciertos · ${item.points} puntos</span></div>`).join('')}</div>`:`<div class="team-scores"><span>Puntos: <b>${finished.lanes[0].points}</b></span></div>`;
 app.innerHTML=`<div class="page"><section class="panel result"><div class="medal">${earned===3?'🏆':earned>=1?'🛡️':'💪'}</div><span class="overline">BATALLA TERMINADA · ${levelName().toUpperCase()}</span><h1>${finished.mode==='teams'?'¡Batalla completada!':earned===3?'¡Victoria legendaria!':earned>=2?'¡Zona conquistada!':earned===1?'¡Buen entrenamiento!':'¡Sigue practicando!'}</h1><div class="star-row">${star(earned)}</div><p>${total} aciertos de ${length*count} retos.</p>${ranking}<p class="muted">${missed.size} preguntas pendientes para repasar en este nivel.</p>${reportFor(finished)}<div class="result-buttons"><button class="btn btn-gold" id="againButton">Jugar de nuevo</button>${missed.size?'<button class="btn btn-blue" id="retryButton">Repasar fallos</button>':''}<button class="btn btn-blue" id="zonesButton">Elegir otra zona</button></div></section></div>`;
 $('#againButton').onclick=()=>start(false);$('#retryButton')?.addEventListener('click',()=>start(true));$('#zonesButton').onclick=home;
}
$('#homeButton').onclick=()=>{if(game){store.active=game;save()}home()};
$('#helpButton').onclick=()=>$('#helpDialog').showModal();
$('#soundButton').onclick=async()=>{muted=gameAudio.isEnabled();await gameAudio.setEnabled(!muted);muted=!gameAudio.isEnabled();soundUI()};
$('#volumeSelect').oninput=e=>gameAudio.setVolume(+e.target.value/100);
document.addEventListener('keydown',e=>{if(view!=='battle'||game?.lanes.length!==1||$('#helpDialog').open)return;if(game.phase==='reveal'&&e.key==='Enter')advance();else if(game.phase==='answer'&&/^[1-4]$/.test(e.key))app.querySelector(`[data-lane="0"][data-answer="${+e.key-1}"]`)?.click()});
home();
