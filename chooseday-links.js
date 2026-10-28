const CHOOSEDAY_FORM_URL='https://kw-north-agent-hub.vercel.app/chooseday/';

function ensureChooseDayModal(){
  if(document.getElementById('agentChooseDayModal')) return;

  const style=document.createElement('style');
  style.textContent=`
    .agent-chooseday-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99996;align-items:center;justify-content:center;padding:22px}
    .agent-chooseday-overlay.open{display:flex}
    .agent-chooseday-modal{width:min(1220px,97vw);height:min(900px,94vh);background:#fff;border:1px solid #CCCCCC;border-radius:22px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.34);display:flex;flex-direction:column}
    .agent-chooseday-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 16px;background:#000000;color:#fff;border-bottom:4px solid #B40101}
    .agent-chooseday-title{display:flex;align-items:center;gap:11px;font-weight:800}
    .agent-chooseday-mark{width:36px;height:36px;border-radius:10px;background:#B40101;color:#fff;display:grid;place-items:center;font-size:12px;font-weight:900}
    .agent-chooseday-title small{display:block;color:#CCCCCC;font-size:10px;font-weight:500;margin-top:2px}
    .agent-chooseday-close{border:1px solid #CCCCCC;border-radius:10px;padding:9px 13px;font-weight:800;cursor:pointer;background:#fff;color:#000}
    .agent-chooseday-frame{width:100%;height:100%;border:0;background:#fff}
    @media(max-width:700px){.agent-chooseday-overlay{padding:0}.agent-chooseday-modal{width:100vw;height:100vh;border-radius:0}.agent-chooseday-head{padding-top:max(13px,env(safe-area-inset-top))}}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.id='agentChooseDayModal';
  overlay.className='agent-chooseday-overlay';
  overlay.innerHTML=`<div class="agent-chooseday-modal" role="dialog" aria-modal="true" aria-label="KW North ChooseDay"><div class="agent-chooseday-head"><div class="agent-chooseday-title"><span class="agent-chooseday-mark">KW</span><div>ChooseDay Submission<small>KW North • Calls, conversations and appointments</small></div></div><button class="agent-chooseday-close" onclick="closeChooseDayModal()">Close</button></div><iframe id="agentChooseDayFrame" class="agent-chooseday-frame" title="KW North ChooseDay Submission"></iframe></div>`;
  overlay.addEventListener('click',e=>{if(e.target===overlay) closeChooseDayModal();});
  document.body.appendChild(overlay);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open')) closeChooseDayModal();});
}

function openChooseDayModal(){
  ensureChooseDayModal();
  const modal=document.getElementById('agentChooseDayModal');
  const frame=document.getElementById('agentChooseDayFrame');
  frame.src=CHOOSEDAY_FORM_URL;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeChooseDayModal(){
  const modal=document.getElementById('agentChooseDayModal');
  const frame=document.getElementById('agentChooseDayFrame');
  if(modal) modal.classList.remove('open');
  if(frame) frame.src='about:blank';
  document.body.style.overflow='';
}

function connectedChooseDayAccountabilityView(){
  const actions='<button class="btn btn-primary" onclick="openAccountabilityModal()">Open Accountability Reporting</button><button class="btn btn-dark" onclick="openChooseDayModal()">Open ChooseDay</button>';
  return `${pageHead('Accountability','Weekly accountability, live reporting and ChooseDay performance',actions)}
    <div class="accountability-connected-note"><strong style="color:#000">Live systems connected.</strong> Accountability Reporting and ChooseDay Submission are now both available directly from the Agent Hub.</div>
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
        <div class="card-title-row"><h3>ChooseDay</h3><span class="tag red">CONNECTED</span></div>
        <div class="grid grid-3"><div><h2 style="margin:0">17</h2><span class="tiny muted">Agents</span></div><div><h2 style="margin:0">610</h2><span class="tiny muted">Calls</span></div><div><h2 style="margin:0">16</h2><span class="tiny muted">Appointments</span></div></div>
        <p class="tiny muted" style="margin:14px 0 12px">Submit your live round results and view the current ChooseDay leaderboard without leaving the Agent Hub.</p>
        <button class="btn btn-dark full" onclick="openChooseDayModal()">Open ChooseDay Submission</button>
      </section>
    </div>`;
}

views.accountability=connectedChooseDayAccountabilityView;

function injectChooseDayTool(){
  if((location.hash.replace('#','')||'home')!=='tools') return;
  const grid=document.querySelector('.tool-grid');
  if(!grid||document.getElementById('chooseDayTool')) return;
  const button=document.createElement('button');
  button.id='chooseDayTool';
  button.className='tool-card';
  button.style.textAlign='left';
  button.innerHTML='<div class="tool-logo">CD</div><h3>ChooseDay</h3><p>Submit call challenge results and view the live leaderboard</p><div class="tool-meta"><span class="tag">Productivity</span><span class="status">CONNECTED ›</span></div>';
  button.addEventListener('click',openChooseDayModal);
  grid.appendChild(button);
}

const chooseDayNavigateBase=navigate;
navigate=function(view){
  chooseDayNavigateBase(view);
  if(view==='tools') setTimeout(injectChooseDayTool,0);
};

const chooseDayCurrentView=location.hash.replace('#','')||'home';
if(chooseDayCurrentView==='accountability') navigate('accountability');
if(chooseDayCurrentView==='tools') setTimeout(injectChooseDayTool,0);
