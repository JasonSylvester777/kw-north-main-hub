const KW_FINANCE_URL='https://online.mortgagemax.co.za/kw-finance/kw-north/online';

function openKWFinance(){
  const popup=window.open(KW_FINANCE_URL,'_blank','noopener,noreferrer');
  if(!popup) showToast('Please allow pop-ups to open KW Finance.');
}

// Route existing prototype actions for KW Finance to the live MortgageMax application.
const financePrototypeAction=prototypeAction;
prototypeAction=function(label){
  if(String(label||'').trim().toLowerCase()==='kw finance'){
    openKWFinance();
    return;
  }
  financePrototypeAction(label);
};

// Preserve all earlier connected tool-card behaviours and add KW Finance as a live connection.
const financeBaseToolCard=toolCard;
toolCard=function(abbr,title,desc,category){
  if(title==='KW Finance'){
    return `<button class="tool-card" onclick="openKWFinance()" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">CONNECTED ›</span></div></button>`;
  }
  return financeBaseToolCard(abbr,title,desc,category);
};

function wireKWFinanceHomeAction(){
  document.querySelectorAll('.quick-action').forEach(button=>{
    const title=button.querySelector('strong')?.textContent?.trim();
    if(title==='KW Finance'){
      button.onclick=openKWFinance;
      button.title='Open KW Finance';
    }
  });
}

const financeNavigateBase=navigate;
navigate=function(view){
  financeNavigateBase(view);
  if(view==='home') setTimeout(wireKWFinanceHomeAction,0);
};

const financeCurrentView=location.hash.replace('#','')||'home';
if(financeCurrentView==='tools') navigate('tools');
if(financeCurrentView==='home') setTimeout(wireKWFinanceHomeAction,0);
