const PRICE_CALCULATOR_URL='';

function openPriceCalculator(){
  if(PRICE_CALCULATOR_URL){
    window.open(PRICE_CALCULATOR_URL,'_blank','noopener,noreferrer');
  } else {
    showToast('Price Calculator — ready to connect once the calculator link is supplied.');
  }
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
      button.innerHTML='<div class="tool-logo">R</div><h3>Price Calculator</h3><p>Calculate and compare property pricing quickly</p><div class="tool-meta"><span class="tag">Property Tools</span><span class="status">READY ›</span></div>';
      button.addEventListener('click',openPriceCalculator);
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
