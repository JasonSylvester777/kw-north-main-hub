const MAPP_URL='https://kw.mapp.co.za';

function openMAPP(){
  const popup=window.open(MAPP_URL,'_blank','noopener,noreferrer');
  if(!popup && typeof showToast==='function') showToast('Please allow pop-ups to open MAPP.');
}

function injectMAPP(){
  const view=(location.hash.replace('#','')||'home');
  if(view!=='tools') return;
  const grid=document.querySelector('.tool-grid');
  if(!grid || document.getElementById('mappTool')) return;

  const button=document.createElement('button');
  button.id='mappTool';
  button.className='tool-card';
  button.style.textAlign='left';
  button.innerHTML='<div class="tool-logo">M</div><h3>MAPP</h3><p>Property listings, agent tools and MAPP access</p><div class="tool-meta"><span class="tag">KW Systems</span><span class="status">CONNECTED ›</span></div>';
  button.addEventListener('click',openMAPP);
  button.title='Open MAPP';
  grid.appendChild(button);
}

const navigateBeforeMAPP=navigate;
navigate=function(view){
  navigateBeforeMAPP(view);
  setTimeout(injectMAPP,0);
};

setTimeout(injectMAPP,0);
