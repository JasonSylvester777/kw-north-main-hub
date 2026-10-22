const root = document.getElementById('viewRoot');
const toast = document.getElementById('toast');
const palette = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const paletteResults = document.getElementById('paletteResults');
const search = document.getElementById('globalSearch');

const navItems = [
  ['home','⌂','Home','Your daily command centre'],
  ['business','◫','My Business','Goals, pipeline and production'],
  ['tools','▦','Tools & Systems','One-click access to every system'],
  ['transactions','✓','Transactions','Online Listing Form and OTP submission'],
  ['farm','⌖','My Farming Area','Map, streets, prospects and coverage'],
  ['calendar','□','Calendar','Training, meetings and appointments'],
  ['training','▶','Training Academy','Courses, recordings and learning'],
  ['accountability','↗','Accountability','Daily activity and Chooseday'],
  ['resources','≡','Resources','Scripts, forms, books and templates'],
  ['onboarding','◎','Onboarding','New-agent setup and progress'],
  ['support','?','Support','Help and Market Centre contacts']
];

const tools = [
  ['KW','KW Command','CRM, database and opportunities','KW Systems'],
  ['KF','KW Finance','Client finance application and referrals','Finance'],
  ['OL','Online Listing Form','Submit a new property listing','Transactions'],
  ['OTP','OTP Submission','Submit signed Offer to Purchase','Transactions'],
  ['DR','Documents Hub','Forms, templates and compliance files','Resources'],
  ['AC','Accountability','Daily and weekly production tracking','Productivity'],
  ['TR','Training Hub','Learning, induction and recordings','Training'],
  ['SP','Agent Support','Technical and operational help','Support'],
  ['GM','Google Meet','Join training and online meetings','Meetings'],
  ['GD','Google Drive','Shared KW North resources','Productivity'],
  ['GC','Google Calendar','Calendar and scheduling','Productivity'],
  ['MK','Marketing','Brand assets and marketing tools','Marketing']
];

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toast.classList.remove('show'),2400);
}
function prototypeAction(label){showToast(`${label} — link will be connected after the look & feel is approved.`)}
function btn(label, cls='btn-soft'){return `<button class="btn ${cls}" onclick="prototypeAction('${label.replaceAll("'","\\'")}')">${label}</button>`}
function progress(value){return `<div class="progress"><span style="width:${value}%"></span></div>`}

function pageHead(title, subtitle, actions=''){
  return `<div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;
}

function homeView(){
  return `
  ${pageHead('Good evening, Jason','Thursday, 22 October • Your business at a glance', btn('Customize Home'))}
  <section class="hero-card">
    <div class="hero-copy">
      <span class="eyebrow">KW NORTH AGENT HUB • PILOT</span>
      <h2>One place to run your real estate business.</h2>
      <p>Everything you need today — systems, submissions, farming, training, accountability and support — without hunting through bookmarks or WhatsApp.</p>
      <div class="hero-actions">
        ${btn('Submit Online Listing','btn-primary')}
        ${btn('Submit OTP','btn-soft')}
        <button class="btn btn-soft" onclick="navigate('farm')">Open My Farm</button>
      </div>
    </div>
    <div class="hero-side">
      <div class="hero-stat"><small>Monthly goal</small><strong>68%</strong>${progress(68)}</div>
      <div class="hero-stat"><small>Farm coverage</small><strong>64%</strong>${progress(64)}</div>
      <div class="hero-stat"><small>Appointments</small><strong>16</strong><small>+4 this week</small></div>
      <div class="hero-stat"><small>Follow-ups due</small><strong>7</strong><small>3 high priority</small></div>
    </div>
  </section>

  <div class="section-label">Quick actions</div>
  <section class="quick-actions">
    ${quick('OL','Submit Listing','Online Listing Form','transactions',true)}
    ${quick('OTP','Submit OTP','Offer to Purchase','transactions',true)}
    ${quick('KW','KW Command','CRM & Database','tools')}
    ${quick('KF','KW Finance','Client finance','tools')}
    ${quick('⌖','My Farm','64% covered','farm')}
    ${quick('↗','Accountability','Update today','accountability')}
  </section>

  <div class="section-label">My business</div>
  <section class="grid grid-5">
    ${metric('☎','610','Calls','+12%',72)}
    ${metric('◉','325','Contacts','+8%',66)}
    ${metric('◇','16','Appointments','+14%',80)}
    ${metric('⌂','5','Listings Taken','+2',63)}
    ${metric('R','R125k','GCI','68%',68)}
  </section>

  <div class="grid grid-2" style="margin-top:16px">
    <section class="card">
      <div class="card-title-row"><h3>Today</h3><button class="btn btn-ghost" onclick="navigate('calendar')">Open calendar</button></div>
      <div class="schedule-list">
        ${schedule('08:30','Team Meeting','Online • Weekly rhythm','JOIN')}
        ${schedule('10:00','Ignite: Lead Generation','Training Academy','JOIN')}
        ${schedule('14:30','Listing Appointment','Bendor • Seller meeting','VIEW')}
      </div>
    </section>
    <section class="card">
      <div class="card-title-row"><h3>My Farming Area</h3><button class="btn btn-ghost" onclick="navigate('farm')">Open map</button></div>
      <div class="farm-kpi">
        <div class="mini"><strong>64%</strong><small>Area covered</small></div>
        <div class="mini"><strong>10</strong><small>Streets remaining</small></div>
        <div class="mini"><strong>9</strong><small>Active prospects</small></div>
        <div class="mini"><strong>4</strong><small>Follow-ups due</small></div>
      </div>
      <div class="tiny muted" style="margin-bottom:7px">Overall farm coverage</div>${progress(64)}
      <button class="btn btn-dark full" style="margin-top:14px" onclick="navigate('farm')">View My Farming Area</button>
    </section>
  </div>

  <div class="grid grid-3" style="margin-top:16px">
    <section class="card"><div class="card-title-row"><h3>Accountability</h3><span class="tag green">On track</span></div><div class="list">${miniActivity('Calls','32 / 50',64)}${miniActivity('Contacts','18 / 25',72)}${miniActivity('Appointments','2 / 3',67)}</div><button class="btn btn-primary full" style="margin-top:12px" onclick="navigate('accountability')">Update Today</button></section>
    <section class="card"><div class="card-title-row"><h3>Continue Learning</h3><span class="tag purple">65%</span></div><div class="list-row"><div class="list-icon">▶</div><div class="list-main"><strong>Working With Sellers</strong><small>Module 4 • Listing Presentation</small></div></div><div style="margin-top:10px">${progress(65)}</div><button class="btn btn-dark full" style="margin-top:12px" onclick="navigate('training')">Continue Course</button></section>
    <section class="card"><div class="card-title-row"><h3>Action Required</h3><span class="tag red">7 items</span></div><div class="list">${actionRow('3 prospect follow-ups','Due today')}${actionRow('2 onboarding tasks','This week')}${actionRow('2 streets not recently worked','Farm')}</div></section>
  </div>`;
}
function quick(icon,title,sub,view,priority=false){return `<button class="quick-action ${priority?'priority':''}" onclick="${view==='transactions'&&priority?`prototypeAction('${title}')`:`navigate('${view}')`}"><span class="quick-arrow">↗</span><span class="quick-icon">${icon}</span><strong>${title}</strong><small>${sub}</small></button>`}
function metric(icon,value,label,change,pct){return `<div class="card metric"><div class="metric-top"><span class="metric-icon">${icon}</span><span class="metric-change">${change}</span></div><h4>${value}</h4><p>${label}</p>${progress(pct)}</div>`}
function schedule(time,title,sub,action){return `<div class="schedule-item"><div class="time-box">${time}</div><div class="schedule-copy"><strong>${title}</strong><small>${sub}</small></div><button class="btn btn-ghost" onclick="prototypeAction('${action}: ${title}')">${action}</button></div>`}
function miniActivity(title,value,pct){return `<div><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px"><span>${title}</span><strong>${value}</strong></div>${progress(pct)}</div>`}
function actionRow(title,meta){return `<div class="list-row"><div class="list-icon">!</div><div class="list-main"><strong>${title}</strong><small>${meta}</small></div><span>›</span></div>`}

function businessView(){
 return `${pageHead('My Business','Goals, activity, pipeline and production in one place',btn('Update Activity','btn-primary')+btn('Edit Goals'))}
 <section class="grid grid-4">${metric('R','R125,000','GCI this month','68%',68)}${metric('⌂','5','Listings Taken','+2',63)}${metric('✓','3','Sales','+1',60)}${metric('◇','16','Appointments','+14%',80)}</section>
 <div class="grid grid-2" style="margin-top:16px">
  <section class="card"><div class="card-title-row"><h3>Annual Goal Progress</h3><span class="tag red">68%</span></div><h2 style="margin:0;font-size:28px">R816,000 <span class="muted tiny">of R1,200,000</span></h2><div style="margin:16px 0">${progress(68)}</div><div class="grid grid-3"><div><strong>R384k</strong><div class="tiny muted">Remaining</div></div><div><strong>48</strong><div class="tiny muted">Listing goal</div></div><div><strong>36</strong><div class="tiny muted">Sales goal</div></div></div></section>
  <section class="card"><div class="card-title-row"><h3>Activity Conversion</h3><span class="tag green">Healthy</span></div>${miniActivity('Calls → Contacts','53%',53)}<br>${miniActivity('Contacts → Appointments','5%',35)}<br>${miniActivity('Appointments → Listings','31%',62)}<br>${miniActivity('Listings → Sales','60%',60)}</section>
 </div>
 <div class="section-label">Pipeline</div>
 <section class="card"><div class="list">${pipeline('Prospects','24','9 hot')}${pipeline('Appointments','7','3 this week')}${pipeline('Listings Taken','5','R18.4m stock')}${pipeline('Offers / Pending','4','R7.9m value')}${pipeline('Sold','3','R125k GCI')}</div></section>`
}
function pipeline(title,count,meta){return `<div class="list-row"><div class="list-icon">${count}</div><div class="list-main"><strong>${title}</strong><small>${meta}</small></div><button class="btn btn-ghost" onclick="prototypeAction('Open ${title}')">View</button></div>`}

function toolsView(){
 const categories=['All','KW Systems','Transactions','Finance','Productivity','Training','Support','Marketing'];
 return `${pageHead('Tools & Systems','Your central launcher — one Hub, every system',btn('+ Add Favourite'))}
 <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px">${categories.map((c,i)=>`<button class="btn ${i===0?'btn-dark':'btn-soft'}" onclick="showToast('${c} filter • prototype')">${c}</button>`).join('')}</div>
 <section class="tool-grid">${tools.map(t=>toolCard(...t)).join('')}</section>`
}
function toolCard(abbr,title,desc,category){return `<button class="tool-card" onclick="prototypeAction('${title}')" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">READY ›</span></div></button>`}

function transactionsView(){
 return `${pageHead('Transactions & Submissions','Fast access to the two submission processes agents use most',btn('Submission Help'))}
 <section class="transaction-feature">
  <article class="transaction-card primary"><div class="transaction-icon">OL</div><h2>Online Listing Form</h2><p>Start a new listing submission from one central location. The final live form link will be connected after design approval.</p><div class="checklist"><div class="check">Property and seller information</div><div class="check">Mandate and pricing details</div><div class="check">Required documents and media</div><div class="check">Final review before submission</div></div>${btn('Start Online Listing','btn-primary')}</article>
  <article class="transaction-card secondary"><div class="transaction-icon">OTP</div><h2>OTP Submission</h2><p>Submit a signed Offer to Purchase with the required supporting information and documents.</p><div class="checklist"><div class="check">Buyer and seller information</div><div class="check">Purchase price and finance status</div><div class="check">Signed OTP and FICA documents</div><div class="check">Final compliance check</div></div>${btn('Submit OTP','btn-dark')}</article>
 </section>
 <div class="grid grid-2" style="margin-top:16px"><section class="card"><div class="card-title-row"><h3>Before You Submit</h3><span class="tag amber">Checklist</span></div><div class="list">${actionRow('All signatures complete','Mandatory')}${actionRow('Required documents attached','Mandatory')}${actionRow('Client & property information checked','Review')}${actionRow('Finance details captured','Where applicable')}</div></section><section class="card"><div class="card-title-row"><h3>Recent Submissions</h3><span class="tag">Future phase</span></div><div class="empty-panel" style="padding:26px 10px"><div class="big-icon">✓</div><h2>Submission tracking later</h2><p>Once systems are connected, agents can see status such as Submitted, Under Review, Information Required and Completed.</p></div></section></div>`
}

function farmView(){
 return `${pageHead('My Farming Area','Bendor • Visual prospecting coverage and opportunities',btn('Add Prospect','btn-primary')+btn('Log Activity'))}
 <section class="farm-summary">
  <div class="card map-card">
    <div class="map-toolbar"><button class="map-chip">Farm Boundary</button><button class="map-chip">Streets</button><button class="map-chip">Prospects</button></div>
    ${farmSVG()}
    <div class="map-legend"><span><i class="legend-dot" style="background:#379b67"></i>Prospected</span><span><i class="legend-dot" style="background:#e29a2a"></i>In progress</span><span><i class="legend-dot" style="background:#c9ccd1"></i>Not started</span><span><i class="legend-dot" style="background:#b8142f"></i>Prospect</span></div>
  </div>
  <aside class="card"><div class="card-title-row"><h3>Farm Overview</h3><span class="tag red">Bendor</span></div><div class="farm-kpi"><div class="mini"><strong>64%</strong><small>Coverage</small></div><div class="mini"><strong>28</strong><small>Total streets</small></div><div class="mini"><strong>9</strong><small>Prospects</small></div><div class="mini"><strong>4</strong><small>Follow-ups</small></div></div><div class="tiny muted">173 of 265 properties contacted</div><div style="margin:7px 0 16px">${progress(65)}</div><div class="card-title-row"><h3>Work Next</h3></div><div class="list">${farmTask('Silveroak Street','0% prospected','Not started')}${farmTask('Palm Avenue','Last worked 62 days ago','Overdue')}${farmTask('Munnik Avenue','5 follow-ups outstanding','Priority')}</div></aside>
 </section>
 <div class="section-label">Street progress</div>
 <section class="card"><div class="street-row"><strong>Street</strong><small class="street-stat">Coverage</small><small class="street-stat">Last worked</small><small>Status</small></div>${street('Honeysuckle Street','92%','14 Oct','Prospected','green')}${street('Munnik Avenue','70%','20 Oct','Follow-up','red')}${street('Palm Avenue','45%','21 Aug','Overdue','amber')}${street('Silveroak Street','0%','—','Not started','')}</section>`
}
function farmTask(title,meta,status){return `<div class="list-row"><div class="list-icon">⌖</div><div class="list-main"><strong>${title}</strong><small>${meta}</small></div><span class="tag ${status==='Priority'?'red':status==='Overdue'?'amber':''}">${status}</span></div>`}
function street(name,cov,last,status,color){return `<div class="street-row"><div><strong>${name}</strong><small style="display:block;margin-top:3px">${status}</small></div><div class="street-stat"><small>${cov}</small></div><div class="street-stat"><small>${last}</small></div><span class="tag ${color}">${status}</span></div>`}
function farmSVG(){return `<svg class="farm-map" viewBox="0 0 760 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative farming area map">
 <rect width="760" height="500" fill="#edf0ec"/>
 <g fill="none" stroke="#d8ddd7" stroke-width="22" stroke-linecap="round"><path d="M-20 90 C140 125 220 70 375 94 S620 160 790 120"/><path d="M15 290 C170 250 250 325 410 288 S610 225 790 275"/><path d="M145 -10 C175 95 125 172 160 265 S230 400 190 530"/><path d="M520 -30 C480 100 550 200 515 325 S480 430 510 530"/></g>
 <g fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"><path d="M-20 90 C140 125 220 70 375 94 S620 160 790 120"/><path d="M15 290 C170 250 250 325 410 288 S610 225 790 275"/><path d="M145 -10 C175 95 125 172 160 265 S230 400 190 530"/><path d="M520 -30 C480 100 550 200 515 325 S480 430 510 530"/></g>
 <path d="M102 74 L500 55 L651 158 L612 405 L390 459 L138 390 L82 205 Z" fill="rgba(184,20,47,.045)" stroke="#b8142f" stroke-width="3" stroke-dasharray="8 7"/>
 <g stroke-linecap="round" fill="none" stroke-width="6"><path d="M150 145 L430 135" stroke="#379b67"/><path d="M195 190 L470 183" stroke="#379b67"/><path d="M225 235 L495 228" stroke="#e29a2a"/><path d="M230 335 L470 330" stroke="#c9ccd1"/><path d="M285 380 L455 372" stroke="#c9ccd1"/></g>
 <g font-family="Arial" font-size="11" fill="#6f736f"><text x="245" y="130">Honeysuckle St</text><text x="267" y="177">Munnik Ave</text><text x="300" y="221">Palm Ave</text><text x="300" y="324">Silveroak St</text></g>
 <g class="farm-pin"><circle cx="385" cy="175" r="10" fill="#b8142f" stroke="#fff" stroke-width="4"/><circle cx="440" cy="223" r="10" fill="#b8142f" stroke="#fff" stroke-width="4"/><circle cx="268" cy="231" r="10" fill="#7355b7" stroke="#fff" stroke-width="4"/><circle cx="340" cy="335" r="10" fill="#2867b2" stroke="#fff" stroke-width="4"/></g>
 </svg>`}

function calendarView(){
 const days=[27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
 return `${pageHead('Calendar','KW North training, meetings, appointments and events',btn('+ Add to My Calendar','btn-primary'))}
 <section class="calendar-grid"><div class="card calendar-card"><div class="card-title-row" style="padding:16px;margin:0"><h3>October 2026</h3><div>${btn('‹','btn-ghost')}${btn('›','btn-ghost')}</div></div><div class="calendar-head">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div>${d}</div>`).join('')}</div><div class="calendar-body">${days.map((d,i)=>calendarDay(d,i)).join('')}</div></div><aside class="card"><div class="card-title-row"><h3>Upcoming</h3><span class="tag red">This week</span></div><div class="schedule-list">${schedule('08:30','Team Meeting','Friday • Online','JOIN')}${schedule('09:00','Ignite Training','Monday • Training Room','VIEW')}${schedule('11:00','Productivity Coaching','Tuesday • Online','JOIN')}${schedule('14:00','New Agent Orientation','Wednesday • Office','VIEW')}</div></aside></section>`
}
function calendarDay(d,i){const prev=i<4; const today=d===22 && i>20; let events=''; if(d===22&&i>20) events='<span class="event-pill">Chooseday</span>'; if(d===23) events='<span class="event-pill blue">Team Meeting</span>'; if(d===26) events='<span class="event-pill dark">Ignite Training</span>'; return `<div class="day ${prev?'muted-day':''} ${today?'today':''}"><span class="day-num">${d}</span>${events}</div>`}

function trainingView(){
 const courses=[['🏠','Seller Mastery','7 modules • Listings, pricing and mandates',70],['☎','Lead Generation','8 modules • Prospecting and follow-up',45],['KW','Command Basics','6 modules • Database and opportunities',100],['⚖','Contracts & Compliance','5 modules • Processes and documents',25],['📣','Marketing Essentials','6 modules • Brand and social media',55],['💰','KW Finance','4 modules • Referral process and finance',0]];
 return `${pageHead('Training Academy','Learn, continue courses and join live KW North training',btn('Upcoming Training','btn-primary'))}<section class="training-grid">${courses.map(c=>course(...c)).join('')}</section>`
}
function course(icon,title,desc,pct){return `<article class="course-card"><div class="course-cover"><span class="course-icon">${icon}</span><small>KW NORTH TRAINING</small></div><div class="course-body"><h3>${title}</h3><p>${desc}</p><div class="course-progress-row"><span>${pct===100?'Completed':pct===0?'Not started':'In progress'}</span><strong>${pct}%</strong></div>${progress(pct)}<button class="btn ${pct===0?'btn-soft':'btn-dark'} full" style="margin-top:12px" onclick="prototypeAction('${title}')">${pct===100?'Review':pct===0?'Start Course':'Continue'}</button></div></article>`}

function accountabilityView(){
 return `${pageHead('Accountability','Daily activity, weekly scorecards and Chooseday performance',btn('Update Today','btn-primary'))}<section class="accountability-board">${score('Calls','32','50',64)}${score('Contacts','18','25',72)}${score('Appointments','2','3',67)}${score('Follow-ups','7','10',70)}</section><div class="grid grid-2" style="margin-top:16px"><section class="card"><div class="card-title-row"><h3>This Week</h3><span class="tag green">On track</span></div>${miniActivity('Calls','168 / 250',67)}<br>${miniActivity('Contacts','91 / 125',73)}<br>${miniActivity('Appointments','9 / 15',60)}</section><section class="card"><div class="card-title-row"><h3>Chooseday</h3><span class="tag red">Office challenge</span></div><div class="grid grid-3"><div><h2 style="margin:0">17</h2><span class="tiny muted">Agents</span></div><div><h2 style="margin:0">610</h2><span class="tiny muted">Calls</span></div><div><h2 style="margin:0">16</h2><span class="tiny muted">Appointments</span></div></div><button class="btn btn-dark full" style="margin-top:16px" onclick="prototypeAction('Chooseday Leaderboard')">Open Leaderboard</button></section></div>`
}
function score(label,actual,target,pct){return `<div class="score-card"><div class="score-top"><h3>${label}</h3><span class="tag ${pct>=70?'green':'amber'}">${pct}%</span></div><strong>${actual}<span class="tiny muted"> / ${target}</span></strong>${progress(pct)}<small>Today's target</small></div>`}

function resourcesView(){
 const res=[['PDF','Sole Mandate Script','Scripts • Seller'],['DOC','Listing Checklist','Checklists • Listing'],['PPT','Listing Presentation','Presentations • Seller'],['PDF','OTP Checklist','Transactions • OTP'],['PDF','FICA Checklist','Compliance'],['DOC','Buyer Consultation Guide','Buyer Management'],['BOOK','The Millionaire Real Estate Agent','Books'],['VIDEO','Pricing Strategy Training','Training']];
 return `${pageHead('Resource Library','Search scripts, forms, presentations, books and documents',btn('+ Upload Resource'))}<div class="resource-list">${res.map(r=>resource(...r)).join('')}</div>`
}
function resource(type,title,cat){return `<button class="resource-card" onclick="prototypeAction('${title}')" style="text-align:left"><div class="resource-file">${type}</div><div class="resource-main"><strong>${title}</strong><small>${cat}</small></div><span>›</span></button>`}

function onboardingView(){
 return `${pageHead('Onboarding','A guided path from Day 1 to your first listing and first sale',btn('View Full Programme','btn-primary'))}<section class="onboarding-wrap"><div class="card onboarding-score"><div class="ring"><span class="ring-value">38%</span></div><h3>Your onboarding progress</h3><p>8 of 21 core tasks complete</p></div><div class="card"><div class="card-title-row"><h3>Next Steps</h3><span class="tag red">3 due</span></div><div class="step-list">${step('1','Agent Setup','Email, profile, WhatsApp groups',true)}${step('2','Systems Access','Command, Hub and required tools',true)}${step('3','Required Apps','Install mobile tools and sign in',false,true)}${step('4','Compliance','Complete required documents')}${step('5','Set Farming Area','Confirm your area and streets')}${step('6','Online Listing & OTP','Learn both submission processes')}</div></div></section>`
}
function step(num,title,sub,done=false,active=false){return `<div class="step ${done?'done':''} ${active?'active':''}"><div class="step-num">${done?'✓':num}</div><div class="step-main"><strong>${title}</strong><small>${sub}</small></div><span>${done?'Done':'›'}</span></div>`}

function supportView(){
 const items=[['⌘','Technology & Systems','Login help, apps and system access'],['KF','KW Finance','Finance referrals and allocation support'],['✓','Transactions','Online Listing Form and OTP assistance'],['⚖','Compliance','Documents, FICA and process questions'],['▶','Training','Courses, live sessions and recordings'],['⌂','Listings','Listing process and submission support']];
 return `${pageHead('Support','Get to the right person or process without searching WhatsApp',btn('Search Help','btn-primary'))}<section class="support-grid">${items.map(i=>support(...i)).join('')}</section>`
}
function support(icon,title,desc){return `<article class="support-card"><div class="support-icon">${icon}</div><h3>${title}</h3><p>${desc}</p><button class="btn btn-soft full" onclick="prototypeAction('${title} Support')">Get Help</button></article>`}

function profileView(){return `${pageHead('My Profile','Your agent information, preferences and system access',btn('Edit Profile','btn-primary'))}<section class="grid grid-2"><div class="card"><div class="list-row"><span class="avatar" style="width:52px;height:52px">JS</span><div class="list-main"><strong>Jason Sylvester</strong><small>KW North • Agent</small></div></div><div class="section-label">Agent information</div><div class="list">${actionRow('Email','Agent email')}${actionRow('Mobile','Contact number')}${actionRow('Farming area','Bendor')}${actionRow('Start date','KW North')}</div></div><div class="card"><div class="card-title-row"><h3>My Access</h3><span class="tag green">Active</span></div><div class="list">${['KW Command','KW Finance','Online Listing Form','OTP Submission','Training Academy','Documents Hub'].map(x=>`<div class="list-row"><div class="list-main"><strong>${x}</strong><small>Access enabled</small></div><span class="tag green">✓</span></div>`).join('')}</div></div></section>`}
function moreView(){return `${pageHead('More','All remaining areas of your Agent Hub')}<div class="more-grid">${[['business','My Business'],['transactions','Transactions'],['training','Training Academy'],['accountability','Accountability'],['resources','Resources'],['onboarding','Onboarding'],['support','Support'],['profile','My Profile']].map(x=>`<button class="more-item" onclick="navigate('${x[0]}')"><strong>${x[1]}</strong><small>Open section ›</small></button>`).join('')}</div>`}

const views={home:homeView,business:businessView,tools:toolsView,transactions:transactionsView,farm:farmView,calendar:calendarView,training:trainingView,accountability:accountabilityView,resources:resourcesView,onboarding:onboardingView,support:supportView,profile:profileView,more:moreView};

function navigate(view){
  if(!views[view]) view='home';
  root.innerHTML=views[view]();
  document.querySelectorAll('[data-view]').forEach(el=>el.classList.toggle('active',el.dataset.view===view || (view==='more'&&el.dataset.view==='more')));
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'',`#${view}`);
}

function renderPalette(filter=''){
  const q=filter.trim().toLowerCase();
  const matches=navItems.filter(n=>!q || `${n[2]} ${n[3]}`.toLowerCase().includes(q));
  paletteResults.innerHTML=matches.map(n=>`<button class="palette-item" onclick="navigate('${n[0]}');closePalette()"><span class="palette-icon">${n[1]}</span><span><strong>${n[2]}</strong><small>${n[3]}</small></span></button>`).join('') || `<div class="empty-panel" style="padding:25px"><p>No matching Hub section.</p></div>`;
}
function openPalette(){palette.classList.add('open');palette.setAttribute('aria-hidden','false');paletteInput.value='';renderPalette();setTimeout(()=>paletteInput.focus(),50)}
function closePalette(){palette.classList.remove('open');palette.setAttribute('aria-hidden','true')}

document.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b) navigate(b.dataset.view)});
search.addEventListener('focus',openPalette);
search.addEventListener('click',openPalette);
paletteInput.addEventListener('input',e=>renderPalette(e.target.value));
palette.addEventListener('click',e=>{if(e.target===palette)closePalette()});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette()}if(e.key==='Escape')closePalette()});
document.getElementById('notificationBtn').addEventListener('click',()=>showToast('3 notifications • prototype'));

navigate(location.hash.replace('#','') || 'home');
