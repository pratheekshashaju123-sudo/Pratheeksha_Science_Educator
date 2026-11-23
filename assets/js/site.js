'use strict';
(() => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  let theme = 'dark';
  try {theme = localStorage.getItem('pratheeksha-theme') === 'light' ? 'light' : 'dark';} catch (_) {}
  function setTheme(next) {
    theme = next;
    root.setAttribute('data-theme',next);
    themeToggle.textContent = next === 'dark' ? '☼' : '☾';
    themeToggle.setAttribute('aria-label',next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try {localStorage.setItem('pratheeksha-theme',next);} catch (_) {}
  }
  setTheme(theme);
  themeToggle.addEventListener('click',()=>setTheme(theme === 'dark' ? 'light' : 'dark'));

  const menu = $('#mainNav'), menuToggle = $('#menuToggle');
  function closeMenu() {menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}
  menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
  $$('#mainNav a').forEach(el => el.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  const progress = $('#scrollProgress');
  let raf=false;
  function onScroll() {
    if(raf)return;
    raf=true;
    requestAnimationFrame(()=>{
      const max = Math.max(1,document.documentElement.scrollHeight-innerHeight);
      progress.style.width=(scrollY/max*100)+'%';
      raf=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  $('#year').textContent = String(new Date().getFullYear());
  $('#backTop').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  const video = $('#heroVideo'), status=$('#videoStatus'), btn=$('#playSound'), audio=$('#soundToggle');
  // No loop attribute or loop handler. Keep last frame after the clip ends.
  video.loop=false;
  let ended=false;
  function setStatus(s){status.textContent=s;}
  function updateAudioButton(){audio.textContent=video.muted?'♪ Sound on':'♪ Sound off';audio.setAttribute('aria-label',video.muted?'Replay welcome with sound':'Mute welcome video');}
  function onEnded(){ended=true;setStatus('Welcome video finished · plays once');btn.textContent='↻ Replay welcome with sound';audio.textContent='↻ Replay with sound';}
  video.addEventListener('ended',onEnded);
  video.addEventListener('error',()=>{setStatus('Welcome video unavailable');btn.textContent='Play welcome with sound';});
  async function playWithSound() {
    ended=false;
    try{video.pause();video.currentTime=0;}catch(_){}
    video.muted=false;
    video.volume=1;
    btn.textContent='▶ Playing welcome';
    updateAudioButton();
    try {await video.play();setStatus('Welcome video · sound on · plays once');}
    catch(err){video.muted=true;updateAudioButton();setStatus('Browser blocked sound · click Play welcome with sound');try{await video.play();}catch(_){setStatus('Click Play welcome with sound to begin');}btn.textContent='▶ Play welcome with sound';}
  }
  btn.addEventListener('click',playWithSound);
  audio.addEventListener('click',async()=>{
    if(ended || video.paused){await playWithSound();return;}
    if(video.muted){video.muted=false;video.volume=1;setStatus('Welcome video · sound on · plays once');}
    else{video.muted=true;setStatus('Welcome video · muted · plays once');}
    updateAudioButton();
  });
  // Try sound first on load, then muted autoplay if permission is denied.
  async function startBackgroundVideo(){
    video.muted=false;video.volume=1;
    try{await video.play();setStatus('Welcome video · sound on · plays once');updateAudioButton();}
    catch(_){video.muted=true;updateAudioButton();try{await video.play();setStatus('Welcome video · muted · click to enable sound');}catch(_){setStatus('Click Play welcome with sound to begin');}}
  }
  startBackgroundVideo();

  const subjects = {
    science:{kicker:'SUBJECT 01 / GENERAL SCIENCE',title:'Turning questions into discoveries.',text:'Help learners understand scientific ideas through observation, investigations, discussion and evidence-based reasoning.',tags:['Observation','Reasoning','Student participation'],graphic:'✳',caption:'EXPLORE • UNDERSTAND • APPLY'},
    biology:{kicker:'SUBJECT 02 / BIOLOGY & LIFE SCIENCE',title:'Understanding the living world.',text:'Explore life processes, organism diversity and the connections between structure, function and living systems.',tags:['Living systems','Zoology','Biodiversity'],graphic:'⌬',caption:'LIFE • STRUCTURE • CONNECTION'},
    environment:{kicker:'SUBJECT 03 / ENVIRONMENTAL SCIENCE',title:'Connecting learning with the planet.',text:'Use environmental examples to introduce ecological relationships, conservation, biodiversity and thoughtful stewardship.',tags:['Ecology','Conservation','Sustainability'],graphic:'❋',caption:'PLANET • SYSTEMS • CARE'},
    practical:{kicker:'SUBJECT 04 / PRACTICAL DISCOVERY',title:'Learning by doing and reflecting.',text:'Support age-appropriate demonstrations, investigations and reflective discussions that link scientific ideas to observable results.',tags:['Experiments','Demonstrations','Reflection'],graphic:'✧',caption:'ASK • TEST • EXPLAIN'}
  };
  const tabButtons = $$('.subject-tab');
  function setSubject(id,focus=false){
    const d=subjects[id];if(!d)return;
    tabButtons.forEach(btn=>{const current=btn.dataset.subject===id;btn.classList.toggle('active',current);btn.setAttribute('aria-selected',String(current));btn.tabIndex=current?0:-1;if(current&&focus)btn.focus();});
    $('#subjectKicker').textContent=d.kicker;$('#subjectTitle').textContent=d.title;$('#subjectDescription').textContent=d.text;
    $('#subjectVisual').dataset.visual=id;$('.graphic-core').textContent=d.graphic;$('#visualCaption').textContent=d.caption;
    $('#subjectTags').replaceChildren(...d.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));
  }
  tabButtons.forEach((btn,i)=>{
    btn.addEventListener('click',()=>setSubject(btn.dataset.subject));
    btn.addEventListener('keydown',e=>{
      if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key))return;
      e.preventDefault();let idx=i;
      if(e.key==='Home')idx=0;else if(e.key==='End')idx=tabButtons.length-1;else idx=(i+(e.key==='ArrowDown'||e.key==='ArrowRight'?1:-1)+tabButtons.length)%tabButtons.length;
      setSubject(tabButtons[idx].dataset.subject,true);
    });
  });

  const experiences={
    kd:{kicker:'FEB 2021 — JUL 2024',title:'Junior Programme Executive — Science Education',org:'Mazhavillu: Teach Science for Kerala · Kerala Development & Innovation Strategic Council (K-DISC)',bullets:['Delivered science education and learning activities for school-age learners.','Developed lesson plans, instructional modules and curriculum-aligned learning resources.','Used inquiry-based, experiential and student-centred methods to strengthen participation.','Supported progress assessment, student mentoring and educational outreach.']},
    kfri:{kicker:'FEB 2021 — JUL 2023',title:'Institutional Assignment — Science Education',org:'KSCSTE — Kerala Forest Research Institute (KFRI), Peechi, Kerala',bullets:['Designed science education content and delivered learning activities for students aged 9–13.','Created learning resources covering biodiversity, ecology, conservation and environmental science.','Led or supported interactive workshops and student learning sessions.','Collaborated with educators, scientists and programme coordinators on science outreach.']},
    school:{kicker:'JUL 2023 — FEB 2024',title:'Institutional Assignment — Science Teaching',org:'Indira Gandhi Memorial Model Residential Higher Secondary School, Nilambur, Kerala',bullets:['Taught Standard 6 learners through structured science lessons.','Prepared demonstrations, worksheets and activity-based instruction.','Used classroom-management and differentiated strategies to support individual learners.','Applied student assessments and feedback to reinforce learning.']}
  };
  const modal = $('#detailModal');
  let priorFocus = null;
  function openDetails(id){const d=experiences[id];if(!d)return;priorFocus=document.activeElement;$('#modalKicker').textContent=d.kicker;$('#modalHeading').textContent=d.title;$('#modalOrg').textContent=d.org;
    const ul=document.createElement('ul');d.bullets.forEach(b=>{const li=document.createElement('li');li.textContent=b;ul.appendChild(li);});$('#modalBody').replaceChildren(ul);
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#closeModal').focus();}
  function closeDetails(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(priorFocus&&priorFocus.focus)priorFocus.focus();}
  $$('[data-exp]').forEach(btn=>btn.addEventListener('click',()=>openDetails(btn.dataset.exp)));
  $('#closeModal').addEventListener('click',closeDetails);$('#modalDone').addEventListener('click',closeDetails);
  $('[data-close="true"]').addEventListener('click',closeDetails);
  document.addEventListener('keydown',e=>{
    if(!modal.classList.contains('open'))return;
    if(e.key==='Escape')closeDetails();
    if(e.key==='Tab'){
      const focusables=$$('button,a[href]').filter(el=>modal.contains(el));
      const first=focusables[0],last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });

  $('#copyEmail').addEventListener('click',async e=>{
    const txt='pratheekshashaju123@gmail.com';
    try{await navigator.clipboard.writeText(txt);e.currentTarget.textContent='✓ Email address copied';}
    catch(_){e.currentTarget.textContent='Email: '+txt;}
    setTimeout(()=>{if(e.currentTarget)e.currentTarget.textContent='Copy email address ⧉';},2400);
  });
  const intersectionSupported=('IntersectionObserver' in window);
  if(intersectionSupported){
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
    $$('.reveal').forEach(el=>revealObserver.observe(el));
    const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){$$('#mainNav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}
    }),{rootMargin:'-16% 0px -65% 0px'});
    $$('main section[id]').forEach(el=>sectionObserver.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('visible'));
})();
