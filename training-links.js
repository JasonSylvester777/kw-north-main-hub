const DIRECT_TRAINING_BASE = 'https://kw-north-training-hub.vercel.app';
const AGENT_TRAINING_ENTRY = `${DIRECT_TRAINING_BASE}/agent-training-entry.html`;
const AGENT_HUB_PROFILE = { first: 'Jason', last: 'Sylvester' };

function ensureTrainingModal(){
  if(document.getElementById('agentTrainingModal')) return;
  const style=document.createElement('style');
  style.textContent=`
    .agent-training-overlay{display:none;position:fixed;inset:0;background:rgba(15,23,42,.72);z-index:99999;align-items:center;justify-content:center;padding:22px}
    .agent-training-overlay.open{display:flex}
    .agent-training-modal{width:min(1100px,96vw);height:min(820px,92vh);background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.32);display:flex;flex-direction:column}
    .agent-training-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 16px;background:#15171b;color:#fff}
    .agent-training-title{display:flex;align-items:center;gap:10px;font-weight:800}
    .agent-training-title span{width:34px;height:34px;border-radius:10px;background:#c8102e;display:grid;place-items:center;font-size:12px}
    .agent-training-close{border:0;border-radius:10px;padding:9px 13px;font-weight:800;cursor:pointer;background:#fff;color:#15171b}
    .agent-training-frame{width:100%;height:100%;border:0;background:#f7f7f8}
    @media(max-width:700px){.agent-training-overlay{padding:0}.agent-training-modal{width:100vw;height:100vh;border-radius:0}.agent-training-head{padding-top:max(14px,env(safe-area-inset-top))}}
  `;
  document.head.appendChild(style);
  const overlay=document.createElement('div');
  overlay.id='agentTrainingModal';
  overlay.className='agent-training-overlay';
  overlay.innerHTML=`<div class="agent-training-modal" role="dialog" aria-modal="true" aria-label="KW North Training"><div class="agent-training-head"><div class="agent-training-title"><span>KW</span><div id="agentTrainingModalTitle">KW North Training</div></div><button class="agent-training-close" onclick="closeTrainingModal()">Close</button></div><iframe id="agentTrainingFrame" class="agent-training-frame" allow="autoplay; fullscreen" allowfullscreen></iframe></div>`;
  overlay.addEventListener('click',e=>{if(e.target===overlay) closeTrainingModal();});
  document.body.appendChild(overlay);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open')) closeTrainingModal();});
}

function openTrainingModal(section='hub',title='KW North Training'){
  ensureTrainingModal();
  const modal=document.getElementById('agentTrainingModal');
  const frame=document.getElementById('agentTrainingFrame');
  const heading=document.getElementById('agentTrainingModalTitle');
  const qs=new URLSearchParams({first:AGENT_HUB_PROFILE.first,last:AGENT_HUB_PROFILE.last,category:section});
  heading.textContent=title;
  frame.src=`${AGENT_TRAINING_ENTRY}?${qs.toString()}`;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeTrainingModal(){
  const modal=document.getElementById('agentTrainingModal');
  const frame=document.getElementById('agentTrainingFrame');
  if(modal) modal.classList.remove('open');
  if(frame) frame.src='about:blank';
  document.body.style.overflow='';
}

function openDirectTraining(section){
  const titles={induction:'Induction & Orientation',command:'KW Command Training',mapp:'MAPP & Listings',loom:'LOOM',other:'Other Training',resources:'Helpful Resources',hub:'KW North Training Hub'};
  openTrainingModal(section,titles[section]||'KW North Training');
}

function openFullTrainingHub(){
  openTrainingModal('hub','KW North Training Hub');
}

// Keep agents inside the Agent Hub until they choose a specific training category.
openTrainingHub = function(){ navigate('training'); };

toolCard = function(abbr,title,desc,category){
  const action = title === 'Training Hub' ? "navigate('training')" : `prototypeAction('${title.replaceAll("'","\\'")}')`;
  return `<button class="tool-card" onclick="${action}" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">${title==='Training Hub'?'CONNECTED':'READY'} ›</span></div></button>`;
};

function directTrainingCourse(icon,title,desc,badge,key){
  return `<article class="course-card"><div class="course-cover"><span class="course-icon">${icon}</span><small>KW NORTH TRAINING</small></div><div class="course-body"><h3>${title}</h3><p>${desc}</p><div class="course-progress-row"><span>${badge}</span><strong>DIRECT ACCESS</strong></div><button class="btn btn-dark full" style="margin-top:12px" onclick="openDirectTraining('${key}')">${key==='induction'?'Continue Induction':'Open Training'}</button></div></article>`;
}

function directTrainingView(){
  const courses = [
    ['◎','Induction & Orientation','15 required learning units • 80% assessment pass mark','Required','induction'],
    ['KW','KW Command Training','Contacts, tasks, SmartPlans and practical Command workflows','Tech','command'],
    ['M','MAPP & Listings','MAPP overview, mobile access, listing uploads, Agent Sites and AI tools','Listings','mapp'],
    ['L','LOOM','Property information, contact data and report troubleshooting','LOOM','loom'],
    ['+','Other Training','Browser, cache and additional practical support training','Support','other'],
    ['R','Helpful Resources','Reference material and additional learning content','Resources','resources']
  ];
  const fullHub = '<button class="btn btn-primary" onclick="openFullTrainingHub()">Open Full Training Hub</button>';
  return `${pageHead('Training Academy','Choose the training you need — each section opens here without leaving the Agent Hub',fullHub)}<section class="training-grid">${courses.map(c=>directTrainingCourse(...c)).join('')}</section>`;
}

views.training = directTrainingView;

if (location.hash.replace('#','') === 'training') navigate('training');