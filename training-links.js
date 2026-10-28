const DIRECT_TRAINING_BASE = 'https://kw-north-training-hub.vercel.app';
const DIRECT_TRAINING_LINKS = {
  hub: `${DIRECT_TRAINING_BASE}/hub.html`,
  induction: `${DIRECT_TRAINING_BASE}/induction.html`,
  command: `${DIRECT_TRAINING_BASE}/training-section.html?category=command`,
  mapp: `${DIRECT_TRAINING_BASE}/training-section.html?category=mapp`,
  loom: `${DIRECT_TRAINING_BASE}/training-section.html?category=loom`,
  other: `${DIRECT_TRAINING_BASE}/training-section.html?category=other`,
  resources: `${DIRECT_TRAINING_BASE}/training-section.html?category=resources`
};

function openDirectTraining(section){
  const url = DIRECT_TRAINING_LINKS[section] || DIRECT_TRAINING_LINKS.hub;
  window.open(url,'_blank','noopener,noreferrer');
}

function openFullTrainingHub(){
  window.open(DIRECT_TRAINING_LINKS.hub,'_blank','noopener,noreferrer');
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
  return `${pageHead('Training Academy','Choose the training you need — each section opens directly',fullHub)}<section class="training-grid">${courses.map(c=>directTrainingCourse(...c)).join('')}</section>`;
}

views.training = directTrainingView;

// Refresh the current view so an already-open Training Academy immediately uses direct links.
if (location.hash.replace('#','') === 'training') navigate('training');
