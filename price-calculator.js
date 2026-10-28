const PRICE_CALCULATOR_URL='https://tinyurl.com/32e947jf';

function openPriceCalculator(){
  const popup=window.open(PRICE_CALCULATOR_URL,'_blank','noopener,noreferrer');
  if(!popup && typeof showToast==='function') showToast('Please allow pop-ups to open the Price Calculator.');
}

function injectPriceCalculator(){
  const view=(location.hash.replace('#','')||'home');

  if(view==='home'){
    const quickActions=document.querySelector('.quick-actions');
    if(quickActions && !document.getElementById('priceCalculatorQuick')){
      const button=document.createElement('button');
      button.id='priceCalculatorQuick';
      button.className='quick-action';
      button.innerHTML='<span class="quick-arrow">↗</span><span class="quick-icon">R</span><strong>Price Calculator</strong><small>Property pricing tool</small>';
      button.addEventListener('click',openPriceCalculator);
      button.title='Open Price Calculator';
      quickActions.appendChild(button);
    }
  }

  if(view==='tools'){
    const grid=document.querySelector('.tool-grid');
    if(grid && !document.getElementById('priceCalculatorTool')){
      const button=document.createElement('button');
      button.id='priceCalculatorTool';
      button.className='tool-card';
      button.style.textAlign='left';
      button.innerHTML='<div class="tool-logo">R</div><h3>Price Calculator</h3><p>Calculate and compare property pricing quickly</p><div class="tool-meta"><span class="tag">Property Tools</span><span class="status">CONNECTED ›</span></div>';
      button.addEventListener('click',openPriceCalculator);
      button.title='Open Price Calculator';
      grid.appendChild(button);
    }
  }
}

const navigateBeforePriceCalculator=navigate;
navigate=function(view){
  navigateBeforePriceCalculator(view);
  setTimeout(injectPriceCalculator,0);
};

setTimeout(injectPriceCalculator,0);
