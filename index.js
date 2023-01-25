
let periocidadPago = false // false= mensial, year= anual
let totalPay = [];
const plans = [
  {
    id: 0,
    name: 'Arcade',
    valueMon: 9,
    valueYear: 90
  },
  {
    id: 1,
    name: 'Advanced',
    valueMon: 12,
    valueYear: 120
  },
  {
    id: 2,
    name: 'Pro',
    valueMon: 15,
    valueYear: 150
  }
];

let totalAditions = [];
const aditionalsBeneficios = [
  {
    id: 0,
    name: 'Online service',
    valueMon: 1,
    valueYear: 10
  },
  {
    id: 1,
    name: 'Larger storage',
    valueMon: 2,
    valueYear: 20
  },
  {
    id: 2,
    name: 'Customizable Profile',
    valueMon: 2,
    valueYear: 20
  }
]


formClient.addEventListener('submit', (e) => {
  e.preventDefault()

  const isOk = validateInputs('validar')
  if(!isOk) return
  section1.style.display = 'none'
  section2.classList.remove('hidden')

  divStep1.classList.remove('bg-sky-100')
  step1.classList.remove('text-sky-800')

  divStep2.classList.add('bg-sky-100')
  step2.classList.add('text-sky-800')
})

//Selección del plan - arcade / advance / pro
let select = []; 
cardOptions.forEach((card, ind) => {
  card.addEventListener('click', () => {
    select.push(ind)
    if(select.length > 1){
      cardOptions[select[0]].classList.remove('bg-gray-50')
      cardOptions[select[0]].classList.remove('border-indigo-500')
      select.shift()
    }
    card.classList.add('bg-gray-50')
    card.classList.add('border-indigo-500')
  })
})


//buttons
const btnNext1 = document.querySelector('#btn-next1');
// ahora el btnNext1 se hace a través del submit del form

const goBack1 = document.querySelector('#goBack1')
goBack1.addEventListener('click', () => {
  section1.style.display = 'block'
  section2.classList.add('hidden')

  divStep1.classList.add('bg-sky-100')
  step1.classList.add('text-sky-800')

  divStep2.classList.remove('bg-sky-100')
  step2.classList.remove('text-sky-800')
})

const goBack2 = document.querySelector('#goBack2')
goBack2.addEventListener('click', () => {
  section3.classList.add('hidden')
  section2.classList.remove('hidden')

  divStep3.classList.remove('bg-sky-100')
  step3.classList.remove('text-sky-800')

  divStep2.classList.add('bg-sky-100')
  step2.classList.add('text-sky-800')
})

const btnNext2 = document.querySelector('#btn-next2');
btnNext2.addEventListener('click', () => {
  if(!select.length) {
    cardOptions.forEach((card) => {
      card.classList.add('border-red-500')
    })
    setTimeout(() => {
      cardOptions.forEach((card) => {
        card.classList.remove('border-red-500')
      })
    }, 800)
    return  
  } 

  section2.classList.add('hidden')
  section3.classList.remove('hidden')

  divStep3.classList.add('bg-sky-100')
  step3.classList.add('text-sky-800')

  divStep2.classList.remove('bg-sky-100')
  step2.classList.remove('text-sky-800')

})


const btnNext3 = document.querySelector('#btn-next3');
btnNext3.addEventListener('click', () => {
  section3.classList.add('hidden')
  section4.classList.remove('hidden')

  divStep4.classList.add('bg-sky-100')
  step4.classList.add('text-sky-800')

  divStep3.classList.remove('bg-sky-100')
  step3.classList.remove('text-sky-800')

  detallesFinalCompra()
})

const goBack3 = document.querySelector('#goBack3')
goBack3.addEventListener('click', () => {
  section4.classList.add('hidden')
  section3.classList.remove('hidden')

  divStep4.classList.remove('bg-sky-100')
  step4.classList.remove('text-sky-800')

  divStep3.classList.add('bg-sky-100')
  step3.classList.add('text-sky-800')

  aditionalsDiv.innerHTML = ''
  totalPay = []
})

//toogle select it's mountly or yearly
checkPago.addEventListener('click', () => {
  if(checkPago.checked){
    periocidadPago = true
    free1.classList.remove('hidden')
    free2.classList.remove('hidden')
    free3.classList.remove('hidden')
    pagoYear.classList.add('font-bold')
    pagoYear.classList.add('text-sky-700')
    pagoMes.classList.remove('font-bold')
    pagoMes.classList.remove('text-sky-700')

    textPlan1.innerText = '$90/ye'
    textPlan2.innerText = '$120/ye'
    textPlan3.innerText = '$150/ye'

    aditionText1.innerText = '+$10/ye'
    aditionText2.innerText = '+$20/ye'
    aditionText3.innerText = '+$20/ye'

  } else {
    periocidadPago = false
    free1.classList.add('hidden')
    free2.classList.add('hidden')
    free3.classList.add('hidden')

    pagoYear.classList.remove('font-bold')
    pagoYear.classList.remove('text-sky-700')
    pagoMes.classList.add('font-bold')
    pagoMes.classList.add('text-sky-700')

    textPlan1.innerText = '$9/mo'
    textPlan2.innerText = '$12/mo'
    textPlan3.innerText = '$15/mo'

    //Step3
    aditionText1.innerText = '+$1/mo'
    aditionText2.innerText = '+$2/mo'
    aditionText3.innerText = '+$2/mo'
  }
})

aditionsOptions.forEach((div, ind) => {
  div.children[0].children[0].addEventListener('click', () => {
    if(!div.children[0].children[0].checked){
      div.classList.remove('bg-gray-50')
      div.classList.remove('border-indigo-500')
    } else {
      div.classList.add('bg-gray-50')
      div.classList.add('border-indigo-500')
    }

    updateTotalAditions(ind)
    
  })
})

const sumarTotal = (arr) => arr.reduce((a, b) => a + b, 0)

const btnConfirm = document.querySelector('#btn-confirm');
btnConfirm.addEventListener('click', () => {
  section4.classList.add('hidden')
  section5.classList.remove('hidden')
})

//btn ssection 4, for change of pay form
changeFormPay.addEventListener('click', ()=> {
  periocidadPago = !periocidadPago
  aditionalsDiv.innerHTML = ''
  detallesFinalCompra()
})

function detallesFinalCompra(){
  totalPay = []
  //se seleccion el plan y se suma al totalPay
  const [ plan ] = plans.filter(opcion => opcion.id === select[0])
  const valorPlanSeleccionado = periocidadPago ? plan.valueYear : plan.valueMon
  totalPay.push(valorPlanSeleccionado)
  const formaPago = periocidadPago ? 'Yearly' : 'Mountly'

  namePlanFinal.innerText = `${plan.name}(${formaPago})`
  valorPlanFinal.innerText = `$${valorPlanSeleccionado}/${periocidadPago ? 'ye' : 'mo'}`


  //Aditionals to plan
  calcAndPushAditions()

  //Information total pay
  textTotal.innerText = `Total (per ${formaPago})`
  totalPayHtml.innerHTML = `+${sumarTotal(totalPay)}/${formaPago.slice(0,2).toLowerCase()}`
}

function validateInputs(type){
  let ok = true;
  if(type === 'validar'){
    inputs.forEach(inp => {
      if(inp.value === ''){
        inp.classList.add('border-red-500')
        ok = false
        return
      } else {
        inp.classList.remove('border-red-500')
        
      }
    })
  }  
  return ok
}

function updateTotalAditions(ind){
  if(totalAditions.includes(ind)){
    const newAditions = totalAditions.filter(val => val !== ind)
    totalAditions = newAditions
  } else {
    totalAditions.push(ind)
  }
}

function createAditionHtml(info){
  const valorPlanSeleccionado = periocidadPago ? info.valueYear : info.valueMon
  const html = `
  <div class="flex justify-between">
    <p class="text-sm text-gray-400">${info.name}</p>
    <p class="text-sm text-sky-800">+$${valorPlanSeleccionado}/${periocidadPago ? 'ye' : 'mo'}</p>
  </div>
  `
  aditionalsDiv.innerHTML += html;
}

function calcAndPushAditions() {
  const aditionals = totalAditions.map(val => {
    const select = aditionalsBeneficios.filter(adition => (adition.id === val))
    select.forEach(adition => {
      const payAdd = periocidadPago ? adition.valueYear : adition.valueMon
      totalPay.push(payAdd)
    })
    return select[0]
  })  
  aditionals.forEach(val => createAditionHtml(val))
}
