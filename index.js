let tipButtons = document.querySelectorAll(".buttons div");
let selected = null;

let inputs = document.querySelectorAll("input");
let customInput = document.querySelector(".custom-input");
let billInput = document.querySelector("#bill-input");
let peopleInput = document.querySelector("#people-input");

let resetButton = document.querySelector(".reset-btn");

let tip = 0;
let tipAmt = 0;
let totalAmt = 0;

// Tip Buttons
for(i = 0; i < tipButtons.length; i++) {
    tipButtons[i].addEventListener("click", function() {           
        customInput.value = null;

        if(tipButtons[i] != selected) {
            selected.classList.remove("activeBtn");
        }

        selected = this;
        selected.classList.add("activeBtn");        
        
        tip = selected.innerText.slice(0, this.innerText.length-1)/100;

        calcAndDisplayAmounts();
    });
}


// Custom Tip
customInput.addEventListener("click", function(){
    if(selected != null) {
        selected.classList.remove("activeBtn");
        selected = null;
    }    
});

customInput.addEventListener("input", function(){
    tip = customInput.value/100;
});


// Inputs
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function() {
        calcAndDisplayAmounts();
    });
}


// Reset Button
resetButton.addEventListener("click", function() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;        
    }

    if(selected != null) {
        selected.classList.remove("activeBtn");
        selected = null;
    }    

    removeZeroError();

    tip = 0;

    tipAmt = 0;
    totalAmt = 0;    

    updateDisplayAmounts();
});


//Functions
function updateDisplayAmounts() {
    document.querySelector(".tip-person").innerText = "$" + tipAmt.toFixed(2);
    document.querySelector(".total-person").innerText = "$" + totalAmt.toFixed(2);
} 

function addZeroError() {
    document.querySelector(".zero-error-text").classList.remove("hidden");
    peopleInput.classList.add("zero-error-input");
}

function removeZeroError() {
    document.querySelector(".zero-error-text").classList.add("hidden");
    peopleInput.classList.remove("zero-error-input");
}

function calcAndDisplayAmounts() {
    if(peopleInput.value != 0) {
        removeZeroError();

        tipAmt = (tip * billInput.value)/peopleInput.value;
        totalAmt = (billInput.value/peopleInput.value) + tipAmt;
    }
    else {
        tipAmt = 0;
        totalAmt = 0;

        addZeroError();
    }

    updateDisplayAmounts();
}
