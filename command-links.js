const KW_COMMAND_URL='https://agent.kw.com';

function openKWCommand(){
  const popup=window.open(KW_COMMAND_URL,'_blank','noopener,noreferrer');
  if(!popup) showToast('Please allow pop-ups to open KW Command.');
}

// Keep the permanent Command entry point in one place. KW handles login, MFA and redirects.
const commandPrototypeAction=prototypeAction;
prototypeAction=function(label){
  if(String(label||'').trim().toLowerCase()==='kw command'){
    openKWCommand();
    return;
  }
  commandPrototypeAction(label);
};

// Preserve all previously connected tool-card behaviours and add Command as a live connection.
const commandBaseToolCard=toolCard;
toolCard=function(abbr,title,desc,category){
  if(title==='KW Command'){
    return `<button class="tool-card" onclick="openKWCommand()" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">CONNECTED ›</span></div></button>`;
  }
  return commandBaseToolCard(abbr,title,desc,category);
};

function wireCommandHomeAction(){
  document.querySelectorAll('.quick-action').forEach(button=>{
    const title=button.querySelector('strong')?.textContent?.trim();
    if(title==='KW Command'){
      button.onclick=openKWCommand;
      button.title='Open KW Command';
    }
  });
}

const commandNavigateBase=navigate;
navigate=function(view){
  commandNavigateBase(view);
  if(view==='home') setTimeout(wireCommandHomeAction,0);
};

const commandCurrentView=location.hash.replace('#','')||'home';
if(commandCurrentView==='tools') navigate('tools');
if(commandCurrentView==='home') setTimeout(wireCommandHomeAction,0);
