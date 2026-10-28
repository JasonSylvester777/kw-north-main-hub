const ONLINE_LISTING_FORM_URL='https://script.google.com/a/macros/kwsouthafrica.co.za/s/AKfycbxY-kpydtF-SUaK2DrTNMdgv-pqH7AD8PRmz74EbEamzOrG_0v3WiA83vfuLm8v6ams/exec';

function openOnlineListingForm(){
  const popup=window.open(ONLINE_LISTING_FORM_URL,'_blank','noopener,noreferrer');
  if(!popup) showToast('Please allow pop-ups to open the Online Listing Form.');
}

// Route the existing listing actions to the live Google Apps Script form.
const listingPrototypeAction=prototypeAction;
prototypeAction=function(label){
  const normalized=String(label||'').toLowerCase();
  if(normalized==='submit online listing'||normalized==='submit listing'||normalized==='start online listing'||normalized==='online listing form'){
    openOnlineListingForm();
    return;
  }
  listingPrototypeAction(label);
};

function connectedTransactionsView(){
  return `${pageHead('Transactions & Submissions','Fast access to the two submission processes agents use most')}
  <section class="transaction-feature">
    <article class="transaction-card primary">
      <div class="transaction-icon">OL</div>
      <div class="card-title-row" style="margin-bottom:4px"><h2>Online Listing Form</h2><span class="tag red">CONNECTED</span></div>
      <p>Open the live KW South Africa Online Listing Form. Your Google Workspace sign-in is handled securely by the form itself.</p>
      <div class="checklist">
        <div class="check">Property and seller information</div>
        <div class="check">Mandate and pricing details</div>
        <div class="check">Required documents and media</div>
        <div class="check">Final review before submission</div>
      </div>
      <button class="btn btn-primary" onclick="openOnlineListingForm()">Open Online Listing Form</button>
    </article>
    <article class="transaction-card secondary">
      <div class="transaction-icon">OTP</div>
      <h2>OTP Submission</h2>
      <p>Submit a signed Offer to Purchase with the required supporting information and documents.</p>
      <div class="checklist">
        <div class="check">Buyer and seller information</div>
        <div class="check">Purchase price and finance status</div>
        <div class="check">Signed OTP and FICA documents</div>
        <div class="check">Final compliance check</div>
      </div>
      ${btn('Submit OTP','btn-dark')}
    </article>
  </section>
  <div class="grid grid-2" style="margin-top:16px">
    <section class="card">
      <div class="card-title-row"><h3>Online Listing Form</h3><span class="tag green">Live</span></div>
      <p class="muted" style="margin-top:0">The form opens in a new browser tab because it uses your KW South Africa Google Workspace session.</p>
      <button class="btn btn-primary full" onclick="openOnlineListingForm()">Start New Listing Submission</button>
    </section>
    <section class="card">
      <div class="card-title-row"><h3>Before You Submit</h3><span class="tag amber">Checklist</span></div>
      <div class="list">
        ${actionRow('All signatures complete','Mandatory')}
        ${actionRow('Required documents attached','Mandatory')}
        ${actionRow('Client & property information checked','Review')}
        ${actionRow('Finance details captured','Where applicable')}
      </div>
    </section>
  </div>`;
}

views.transactions=connectedTransactionsView;

// Preserve Training and Accountability tool integrations and add Online Listing Form as connected.
const listingBaseToolCard=toolCard;
toolCard=function(abbr,title,desc,category){
  if(title==='Online Listing Form'){
    return `<button class="tool-card" onclick="openOnlineListingForm()" style="text-align:left"><div class="tool-logo">${abbr}</div><h3>${title}</h3><p>${desc}</p><div class="tool-meta"><span class="tag">${category}</span><span class="status">CONNECTED ›</span></div></button>`;
  }
  return listingBaseToolCard(abbr,title,desc,category);
};

// Re-render connected areas so the new form status appears immediately.
const listingCurrentView=location.hash.replace('#','')||'home';
if(['home','tools','transactions'].includes(listingCurrentView)) navigate(listingCurrentView);
