let drop_list = document.querySelectorAll(".input_currency_box select");
let get_button = document.querySelector(".get_rate")
let output = document.querySelector(".output")
const amount = document.querySelector(".input_no")
let swap = document.querySelector("i");
let error = document.querySelector(".error")

let from_curr = document.querySelector(".from select")
let to_curr = document.querySelector(".to select")



let from_img  = document.querySelector(".from img")
let to_img = document.querySelector(".to img")
from_img.src = `https://flagcdn.com/48x36/us.png`

for(let i=0;i<drop_list.length;i++){
  
    for(currency_code in country_list){
        let optiontag = document.createElement("option")
        optiontag.innerHTML = `<option value = "${currency_code}">${currency_code}</option>`
       drop_list[i].append(optiontag)
    }
    drop_list[i].addEventListener("change",e=>{
            //  console.log("suraj")
            console.log(drop_list[i].value)
             loadflag(e.target.value,i)
    })
    
}

function loadflag(element,i)
{
    // console.log(element)
    let cc = country_list[element]
   cc = cc.toString()
  cc =  cc.toLowerCase()

  if(element=="ANG" && i==0){
    from_img.src = 'http://img3.wikia.nocookie.net/__cb20130822194948/prowrestling/images/b/b3/The_Netherlands_Flag.jpg'
  return;
}

  else if(element == "ANG" && i==1){
    to_img.src = 'http://img3.wikia.nocookie.net/__cb20130822194948/prowrestling/images/b/b3/The_Netherlands_Flag.jpg'
  return;
}

  if(i==0)
    from_img.src = `https://flagcdn.com/48x36/${cc}.png`

    else
    to_img.src = `https://flagcdn.com/48x36/${cc}.png`
}

window.addEventListener("load",(e)=>{
    // console.log("suraj")
    get_exchange_rate()
})

get_button.addEventListener("click",e=>{
    get_exchange_rate()
    // error.style.display = "none"
})

function get_exchange_rate(){
   
    amount_val = amount.value
    output.innerHTML = "Getting exchange rate..."
    // output.style.letter-spacing "none";

    if(amount_val != "" || amount_val!=0 ){
        output.style.display = "block"
        // console.log("if")
        error.style.display = "none"
        let url = `https://v6.exchangerate-api.com/v6/813b14757dbc0e54dcc7917f/latest/${from_curr.value}`;
        fetch(url).then(response => response.json()).then(result =>{
        //    
        // console.log(result)
           let exchangerate;
           let totalexchangerate

           if(from_curr.value == to_curr.value){
           exchangerate = amount_val;
           totalexchangerate = exchangerate
           }

           else{
            // console.log("suraj")
             exchangerate = result.conversion_rates[to_curr.value]
             totalexchangerate  = exchangerate * amount_val;
             totalexchangerate.toFixed(5);
           }
            
           
    
            output.innerHTML = `${amount.value} ${from_curr.value} = ${totalexchangerate} ${to_curr.value}`
    
        }).catch(()=>{
          output.innerHTML = "NOt"
                 console.log("wrong")
        })
    }

    else{
        output.style.display = "none"
        // console.log("eror")
        error.style.display = "block";
        return;
    }
        
    }


swap.addEventListener("click",(e)=>{
    console.log("swap")
   const temp = from_curr.value
    from_curr.value = to_curr.value
    to_curr.value = temp

   const temp_img = from_img.src
    from_img.src = to_img.src
    to_img.src = temp_img
})

