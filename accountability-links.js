const ACCOUNTABILITY_APP_URL='https://kw-north-accountability-program.vercel.app/agent.html';

function ensureAccountabilityModal(){
  if(document.getElementById('agentAccountabilityModal')) return;

  const style=document.createElement('style');
  style.textContent=`
    .agent-accountability-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99998;align-items:center;justify-content:center;padding:22px}
    .agent-accountability-overlay.open{display:flex}
    .agent-accountability-modal{width:min(1180px,97vw);height:min(860px,93vh);background:#fff;border:1px solid #CCCCCC;border-radius:22px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.34);display:flex;flex-direction:column}
    .agent-accountability-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 16px;background:#000000;color:#fff;border-bottom:4px solid #B40101}
    .agent-accountability-title{display:flex;align-items:center;gap:11px;font-weight:800}
    .agent-accountability-mark{width:36px;height:36px;border-radius:10px;background:#B40101;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:900}
    .agent-accountability-title small{display:block;color:#CCCCCC;font-size:10px;font-weight:500;margin-top:2px}
    .agent-accountability-close{border:1px solid #CCCCCC;border-radius:10px;padding:9px 13px;font-weight:800;cursor:pointer;background:#fff;color:#000}
    .agent-accountability-frame{width:100%;height:100%;border:0;background:#fff}
    .accountability-connected-note{margin:0 0 16px;padding:11px 13px;border:1px solid #CCCCCC;border-left:4px solid #B40101;border-radius:12px;background:#fff;font-size:11px;color:#666666}
    @media(max-width:700px){.agent-accountability-overlay{padding:0}.agent-accountability-modal{width:100vw;height:100vh;border-radius:0}.agent-accountability-head{padding-top:max(13px,env(safe-area-inset-top))}}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.id='agentAccountabilityModal';
  overlay.className='agent-accountability-overlay';
  overlay.innerHTML=`<div class="agent-accountability-modal" role="dialog" aria-modal="true" aria-label="KW North Accountability Reporting"><div class="agent-accountability-head"><div class="agent-accountability-title"><span class="agent-accountability-mark">KW</span><div>Accountability Reporting<small>KW North • Live programme</small></div></div><button class="agent-accountability-close" onclick="closeAccountabilityModal()">Close</button></div><iframe id="agentAccountabilityFrame" class="agent-accountability-frame" title="KW North Accountability Reporting"></iframe></div>`;
  overlay.addEventListener('click',e=>{if(e.target===overlay) closeAccountabilityModal();});
  document.body.appendChild(overlay);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open')) closeAccountabilityModal();});
}

function openAccountabilityModal(){
  ensureAccountabilityModal();
  const modal=document.getElementById('agentAccountabilityModal');
  const frame=document.getElementById('agentAccountabilityFrame');
  frame.src=ACCOUNTABILITY_APP_URL;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeAccountabilityModal(){
  const modal=document.getElementById('agentAccountabilityModal');
  const frame=document.getElementById('agentAccountabilityFrame');
  if(modal) modal.classList.remove('open');
  if(frame) frame.src='about:blank';
  document.body.style.overflow='';
}

function connectedAccountabilityView(){
  const openReporting='<button class="btn btn-primary" onclick="openAccountabilityModal()">Open Accountability Reporting</button>';
  return `${pageHead('Accountability','Weekly goals, running actuals, training progress and production accountability',openReporting)}
    <div class="accountability-connected-note"><strong style="color:#000">Live system connected.</strong> Use the reporting button for your actual weekly goals and running totals. The summary cards below remain the Agent Hub visual layer until live agent data is connected in Phase 2.</div>
    <section class="accountability-board">
      ${score('Conversations','32','50',64)}
      ${score('Appointments','2','3',67)}
      ${score('Active Listings','5','8',63)}
      ${score('OTPs','1','2',50)}
    </section>
    <div class="grid grid-2" style="margin-top:16px">
      <section class="card">
        <div class="card-title-row"><h3>Live Accountability Programme</h3><span class="tag red">CONNECTED</span></div>
        <div class="list">
          ${actionRow('Set / Update Weekly Goals','Monday commitment')}
          ${actionRow('Update Running Actuals','Weekly totals')}
          ${actionRow('Training & Setup Progress','Linked to Training Hub')}
          ${actionRow('Production Gap Tracking','Goal vs actual')}
        </div>
        <button class="btn btn-primary full" style="margin-top:14px" onclick="openAccountabilityModal()">Update My Accountability</button>
      </section>
      <section class="card">
        <div class="card-title-row"><h3>Chooseday</h3><span class="tag">Separate integration</span></div>
        <div class="grid grid-3"><div><h2 style="margin:0">17</h2><span class="tiny muted">Agents</span></div><div><h2 style="margin:0">610</h2><span class="tiny muted">Calls</span></div><div><h2 style="margin:0">16</h2><span class="tiny muted">Appointments</span></div></div>
        <p class="tiny muted" style="margin:14px 0 0">Chooseday remains a separate Hub connection until its live reporting / leaderboard link is connected.</p>
      </section>
    </div>`;
}

views.accountability=connectedAccountabilityView;

// Keep the Home summary, but make its main action open the real reporting programme.
const accountabilityBaseHomeView=views.home;
views.home=function(){
  let html=accountabilityBaseHomeView();
  html=html.replace('<h3>Accountability</h3><span class="tag green">On track</span>','<h3>Accountability</h3><span class="tag red">Connected</span>');
  html=html.replace(`onclick="navigate('accountability')">Update Today</button>`,`onclick="openAccountabilityModal()">Update Today</button>`);
  return html;
};

// Preserve the existing Training connection while adding Accountability as a live connected tool.
toolCard=function(abbr,title,desc,category){
  let action=`prototypeAction('${title.replaceAll("'","\\'")}')`;
  let status='READY';
  if(title==='Training Hub'){
    action="navigate('training')";
    status='CONNECTED';
  } else if(title==='Accountability'){
    action='openAccountabilityModal()';
    status='CONNECTED';
  }
  return `<button class="tool-card" onclick="${action}" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">${status} ›</span></div></button>`;
};

// Re-render whichever connected view is currently open so the integration is visible immediately.
const accountabilityCurrentView=location.hash.replace('#','')||'home';
if(accountabilityCurrentView==='home'||accountabilityCurrentView==='accountability'||accountabilityCurrentView==='tools') navigate(accountabilityCurrentView);
