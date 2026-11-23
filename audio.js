// Banda sonora original sintetizada con Web Audio. No utiliza pistas externas.
const gameAudio=(()=>{
 let ctx,master,timer,enabled=false,scene='menu',step=0,next=0,volume=.48;
 const roots={menu:[146.83,116.54,130.81,130.81],battle:[146.83,130.81,116.54,110],boss:[146.83,138.59,130.81,116.54],victory:[174.61,196,220,261.63]};
 const bpm={menu:98,battle:126,boss:146,victory:112};
 function context(){if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=volume;master.connect(ctx.destination)}return ctx}
 function tone(freq,time,duration,type='triangle',gain=.06){
  const c=context(),osc=c.createOscillator(),env=c.createGain(),filter=c.createBiquadFilter();
  osc.type=type;osc.frequency.setValueAtTime(freq,time);filter.type='lowpass';filter.frequency.value=type==='sawtooth'?1200:3400;
  env.gain.setValueAtTime(.0001,time);env.gain.exponentialRampToValueAtTime(gain,time+.018);env.gain.exponentialRampToValueAtTime(.0001,time+duration);
  osc.connect(filter).connect(env).connect(master);osc.start(time);osc.stop(time+duration+.03)
 }
 function drum(time,kind){
  const c=context(),duration=kind==='kick'?.22:.09,buffer=c.createBuffer(1,Math.ceil(c.sampleRate*duration),c.sampleRate),data=buffer.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,kind==='kick'?2:3);
  const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();src.buffer=buffer;
  filter.type=kind==='kick'?'lowpass':'highpass';filter.frequency.value=kind==='kick'?170:kind==='snare'?1300:5300;
  gain.gain.value=kind==='kick'?.16:kind==='snare'?.055:.021;src.connect(filter).connect(gain).connect(master);src.start(time)
 }
 function schedule(){
  if(!enabled)return;const c=context(),beat=60/bpm[scene],rootList=roots[scene];
  while(next<c.currentTime+.3){
   const part=step%16,bar=Math.floor(step/16)%4,root=rootList[bar],t=next;
   if(part===0){tone(root/2,t,beat*7.5,'sawtooth',scene==='menu'?.027:.053);tone(root,t,beat*6,'triangle',.018)}
   if(part%4===0)drum(t,'kick');
   if(part%4===2)drum(t,'snare');
   if(scene!=='menu'&&part%2===1)drum(t,'hat');
   if(part%2===0)tone(root/2*(part===6?1.5:1),t,beat*.8,'sawtooth',scene==='boss'?.055:.035);
   const motif=[0,2,4,2,0,4,5,4,2,0,4,5,7,5,4,2],scale=[1,1.125,1.2,1.333,1.5,1.6,1.8,2];
   if(part%2===0||scene==='boss')tone(root*2*scale[motif[part]],t,beat*(scene==='menu'?.7:.4),'triangle',scene==='menu'?.022:.04);
   if((scene==='boss'||scene==='victory')&&part%4===0){tone(root*3,t,beat*1.7,'sine',.021);tone(root*4,t,beat*1.7,'sine',.013)}
   step++;next+=beat/2
  }
 }
 async function setEnabled(value){
  if(value===enabled)return enabled;
  if(value){try{await context().resume();enabled=true;step=0;next=ctx.currentTime+.05;schedule();timer=setInterval(schedule,75)}catch{enabled=false}}
  else{enabled=false;clearInterval(timer);timer=null}
  return enabled
 }
 function setScene(value){if(!roots[value]||scene===value)return;scene=value;if(enabled){step=0;next=context().currentTime+.12}}
 function setVolume(value){volume=Math.max(0,Math.min(1,value));if(master)master.gain.setTargetAtTime(volume,context().currentTime,.04)}
 function effect(kind){
  if(!enabled)return;const t=context().currentTime+.02;
  if(kind==='good'){tone(523.25,t,.14,'triangle',.1);tone(783.99,t+.08,.23,'triangle',.08)}
  if(kind==='bad'){tone(220,t,.16,'sawtooth',.07);tone(164.81,t+.12,.25,'triangle',.05)}
  if(kind==='win'){[392,523.25,659.25,783.99,1046.5].forEach((n,i)=>tone(n,t+i*.11,.45,'triangle',.09));drum(t,'kick')}
  if(kind==='open'){tone(440,t,.14,'triangle',.055);tone(659.25,t+.1,.2,'sine',.05)}
 }
 return {setEnabled,setScene,setVolume,effect,isEnabled:()=>enabled}
})();
