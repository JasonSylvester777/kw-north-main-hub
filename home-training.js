const HOME_TRAINING_API_URL='https://fdbsqjtwbucjhjgphhyh.supabase.co/functions/v1/training-api';
const HOME_TRAINING_PUBLISHABLE_KEY='sb_publishable_GmMPNJ5JAKMh8j9Mk1nmpg_3fs17xqG';
const HOME_TRAINING_TOKEN_KEY='kwNorthAgentHubTrainingToken';
let homeTrainingToken=localStorage.getItem(HOME_TRAINING_TOKEN_KEY)||'';
let homeTrainingCurrentSession=null;

async function homeTrainingApi(payload){
  const res=await fetch(HOME_TRAINING_API_URL,{method:'POST',headers:{'Content-Type':'application/json','apikey':HOME_TRAINING_PUBLISHABLE_KEY},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({error:'Invalid server response.'}));
  if(!res.ok) throw Object.assign(new Error(data.error||'Training request failed.'),{status:res.status,data});
  return data;
}

async function ensureHomeTrainingIdentity(){
  if(homeTrainingToken)return homeTrainingToken;
  const data=await homeTrainingApi({action:'identify',first_name:AGENT_HUB_PROFILE.first,last_name:AGENT_HUB_PROFILE.last});
  homeTrainingToken=data.token;
  localStorage.setItem(HOME_TRAINING_TOKEN_KEY,homeTrainingToken);
  return homeTrainingToken;
}

function findHomeTrainingCard(){
  return [...document.querySelectorAll('.card')].find(card=>card.querySelector('h3')?.textContent.trim()==='Training Academy');
}

function homeTrainingLoading(card){
  card.innerHTML=`<div class="card-title-row"><h3>Continue Training</h3><span class="tag purple">Loading</span></div><div class="list-row"><div class="list-icon">▶</div><div class="list-main"><strong>Checking your training progress…</strong><small>KW North Induction & Orientation</small></div></div>`;
}

async function enhanceHomeTrainingCard(){
  const card=findHomeTrainingCard();
  if(!card)return;
  homeTrainingLoading(card);
  try{
    await ensureHomeTrainingIdentity();
    let data;
    try{data=await homeTrainingApi({action:'progress',token:homeTrainingToken})}
    catch(err){
      if(err.status===401){homeTrainingToken='';localStorage.removeItem(HOME_TRAINING_TOKEN_KEY);await ensureHomeTrainingIdentity();data=await homeTrainingApi({action:'progress',token:homeTrainingToken})}
      else throw err;
    }
    const sessions=data.sessions||[];
    const passed=sessions.filter(s=>s.passed).length;
    const current=sessions.find(s=>s.unlocked&&!s.passed)||null;
    const pct=sessions.length?Math.round(passed/sessions.length*100):0;
    homeTrainingCurrentSession=current;

    if(data.induction_complete||(!current&&sessions.length)){
      card.innerHTML=`<div class="card-title-row"><h3>Training Academy</h3><span class="tag green">Induction complete</span></div><div class="list-row"><div class="list-icon">✓</div><div class="list-main"><strong>Induction & Orientation complete</strong><small>${passed} of ${sessions.length} sessions passed</small></div></div>${progress(100)}<button class="btn btn-dark full" style="margin-top:12px" onclick="navigate('training')">Explore More Training</button>`;
      return;
    }

    if(!current){
      card.innerHTML=`<div class="card-title-row"><h3>Training Academy</h3><span class="tag purple">Connected</span></div><div class="list-row"><div class="list-icon">▶</div><div class="list-main"><strong>KW North Training Academy</strong><small>Open your training categories</small></div></div><button class="btn btn-dark full" style="margin-top:12px" onclick="navigate('training')">Open Training Academy</button>`;
      return;
    }

    card.innerHTML=`<div class="card-title-row"><h3>Continue Training</h3><span class="tag purple">${passed}/${sessions.length} passed</span></div><div class="list-row"><div class="list-icon">▶</div><div class="list-main"><strong>Session ${escapeHomeTraining(current.session_key)} – ${escapeHomeTraining(current.title)}</strong><small>${escapeHomeTraining(current.subtitle||'Your next required Induction session')}</small></div></div><div class="tiny muted" style="margin:10px 0 6px">Induction progress • ${pct}%</div>${progress(pct)}<button class="btn btn-dark full" style="margin-top:12px" onclick="playHomeTrainingSession()">Watch This Video</button><button class="btn btn-ghost full" style="margin-top:6px" onclick="openDirectTraining('induction')">View Induction Programme</button>`;
  }catch(err){
    card.innerHTML=`<div class="card-title-row"><h3>Training Academy</h3><span class="tag amber">Connected</span></div><div class="list-row"><div class="list-icon">▶</div><div class="list-main"><strong>Training progress unavailable</strong><small>${escapeHomeTraining(err.message)}</small></div></div><button class="btn btn-dark full" style="margin-top:12px" onclick="navigate('training')">Open Training Academy</button>`;
  }
}

function escapeHomeTraining(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

async function playHomeTrainingSession(){
  if(!homeTrainingCurrentSession){navigate('training');return}
  try{
    await ensureHomeTrainingIdentity();
    const data=await homeTrainingApi({action:'open_session',token:homeTrainingToken,session_key:String(homeTrainingCurrentSession.session_key)});
    ensureTrainingModal();
    const modal=document.getElementById('agentTrainingModal');
    const frame=document.getElementById('agentTrainingFrame');
    const heading=document.getElementById('agentTrainingModalTitle');
    heading.textContent=`Session ${data.session.session_key} – ${data.session.title}`;
    frame.src=data.session.video_url;
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  }catch(err){showToast(`Could not open training: ${err.message}`)}
}

const navigateBeforeHomeTraining=navigate;
navigate=function(view){
  navigateBeforeHomeTraining(view);
  if(view==='home')setTimeout(enhanceHomeTrainingCard,0);
};

if((location.hash.replace('#','')||'home')==='home')setTimeout(enhanceHomeTrainingCard,0);