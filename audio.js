// Música y efectos sintetizados en el navegador: no se descargan pistas externas.
const gameAudio=(()=>{
  let ctx, enabled=false, timer=null, step=0, nextTime=0;
  const bpm=112, beat=60/bpm, notes=[
    [146.83,174.61,220.00], // Re menor
    [116.54,146.83,174.61], // Si bemol mayor
    [130.81,174.61,220.00], // Fa mayor
    [130.81,164.81,196.00]  // Do mayor
  ];
  function context(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();return ctx}
  function tone(freq,time,length,type='triangle',gain=.035){const c=context(),osc=c.createOscillator(),amp=c.createGain(),filter=c.createBiquadFilter();osc.type=type;osc.frequency.setValueAtTime(freq,time);filter.type='lowpass';filter.frequency.value=1800;amp.gain.setValueAtTime(.0001,time);amp.gain.exponentialRampToValueAtTime(gain,time+.025);amp.gain.exponentialRampToValueAtTime(.0001,time+length);osc.connect(filter).connect(amp).connect(c.destination);osc.start(time);osc.stop(time+length+.02)}
  function drum(time,low=false){const c=context(),dur=low?.17:.08,buffer=c.createBuffer(1,Math.ceil(c.sampleRate*dur),c.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);const source=c.createBufferSource(),filter=c.createBiquadFilter(),amp=c.createGain();buffer.copyToChannel(data,0);source.buffer=buffer;filter.type=low?'lowpass':'highpass';filter.frequency.value=low?260:4000;amp.gain.value=low?.055:.018;source.connect(filter).connect(amp).connect(c.destination);source.start(time)}
  function schedule(){const c=context();while(nextTime<c.currentTime+.24){const bar=Math.floor(step/8)%4,part=step%8,chord=notes[bar];if(part===0){tone(chord[0]/2,nextTime,beat*3.7,'sawtooth',.018);tone(chord[0],nextTime,beat*2.6,'triangle',.012);drum(nextTime,true)}if(part===4)drum(nextTime,true);if(part===2||part===6)drum(nextTime,false);tone(chord[[0,1,2,1,0,2,1,2][part]]*2,nextTime,beat*.35,'triangle',.012);if(part===0||part===4)tone(chord[2]*2,nextTime,beat*1.6,'sine',.008);step++;nextTime+=beat/2}}
  async function setEnabled(value){enabled=value;if(enabled){try{await context().resume();step=0;nextTime=ctx.currentTime+.05;schedule();timer=setInterval(schedule,70);effect('open')}catch{enabled=false}}else if(timer){clearInterval(timer);timer=null}return enabled}
  function effect(kind){if(!enabled)return;const c=context(),t=c.currentTime+.01;try{if(kind==='good'){tone(523.25,t,.18,'triangle',.09);tone(783.99,t+.08,.25,'triangle',.07);tone(1046.5,t+.17,.37,'sine',.06)}else if(kind==='bad'){tone(220,t,.15,'sawtooth',.055);tone(164.81,t+.12,.28,'triangle',.045)}else if(kind==='win'){[392,523.25,659.25,783.99,1046.5].forEach((n,i)=>tone(n,t+i*.12,.5,'triangle',.08));drum(t,true)}else if(kind==='attack'){tone(294,t,.09,'sawtooth',.05);tone(392,t+.07,.17,'triangle',.05)}else if(kind==='open'){tone(440,t,.12,'triangle',.04);tone(659.25,t+.09,.2,'sine',.04)}}catch{}}
  return{setEnabled,effect,isEnabled:()=>enabled};
})();
