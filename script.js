const container = document.querySelector(".container");
const screen = document.querySelector(".screen");

const nums = container.querySelectorAll(".num");
const ops = container.querySelectorAll(".op");


const numbers = ["0","1","2","3","4","5","6","7","8","9","0",".","(-)"];
const operations = ["+","-","*","/","="];

let currentTotal = 0;
let lastInput;
const inputs = [];

//round numbers with long decimals

// read the buttons clicked and puts it into screen
nums.forEach(number => {
    number.addEventListener("click", (event)=>{
        event.target.style.opacity = .3;

        if (canAddNumber()){
            
            if(startNewNumber()){
                if(event.target.textContent == "(-)"){
                    inputs.push("-");

                }else{
                    inputs.push(event.target.textContent);
                }
            } else{
                if(inputs[inputs.length-1].includes(".") && event.target.textContent == ".") {
                    return false;
                }
                else if(event.target.textContent != "(-)"){
                    inputs[inputs.length-1] += event.target.textContent;
                }
            }

        
            lastInput = event.target.textContent
            updateScreen();

        }
    });
    number.addEventListener("mouseover", (event)=>{
        event.target.style.opacity = .7;

    });
    number.addEventListener("mouseout", (event)=>{
        event.target.style.opacity = 1;

    });
});

ops.forEach(op =>{
    op.addEventListener("click", (event)=>{
        event.target.style.opacity = .3;


        if(event.target.id == "clear"){
            clearInputs();
        }
        else if(event.target.textContent == "="){
            calculate();
        }
        else{
            if(addNewOperation()){
                inputs.push(event.target.textContent);
            }
        }

        lastInput = event.target.textContent
        updateScreen();

    });

    op.addEventListener("mouseover", (event)=>{
        event.target.style.opacity = .7;

    });
    op.addEventListener("mouseout", (event)=>{
        event.target.style.opacity = 1;

    });



})




// calculates all the values in the number;
function calculate(){
    let num1;
    let operation;
    let num2;

    if(inputs.length == 1){
        currentTotal = inputs[0];
    }
    else{
        for(let i = 0; i < inputs.length; i++){

            if((num1 == undefined || operation == undefined || num2 == undefined)){
                
                if(num1 == undefined){
                    num1 = inputs[i]
                } else if(operation == undefined && operations.includes(inputs[i])){
                    operation = inputs[i];
                } else if(num2 == undefined){
                    num2 = inputs[i];
                }
    
    
            }
    
    
            if(num1 != undefined && operation != undefined && num2 != undefined){
    
                    if(operation == "+"){
                        currentTotal = add(num1,num2);
                    }else if(operation == "-"){
                        currentTotal = subtract(num1,num2);
                    }else if(operation == "*"){
                        currentTotal = times(num1,num2);
                    }else if(operation == "/"){
                        currentTotal = divide(num1,num2);
                    }
    
                    num1 = currentTotal;
                    num2 = undefined;
                    operation = undefined;
    
            }
        }
    }
    if(operation != undefined || num2 != undefined){
        currentTotal = "ERROR"
    }
    clearInputs();
    inputs[0] = currentTotal.toString();
    screen.textContent = currentTotal + " ";
    currentTotal = 0;


}


function updateScreen(){
    screen.textContent = "";
    inputs.forEach(element => {
        if(operations.includes(element)){
            screen.textContent += " " + element + " ";
        }else{
            screen.textContent += element;
        }
    });
}

function add(num1, num2){

    return (parseFloat(num1) + parseFloat(num2));
    
}

function subtract(num1, num2){


    return (parseFloat(num1) - parseFloat(num2));
}


function times(num1, num2){
    return (parseFloat(num1) * parseFloat(num2));

}

function divide(num1, num2){
    if(num2 == 0){
        return "Why are you trying to divide by 0?";
    }
    return (parseFloat(num1) / parseFloat(num2));

}

function clearInputs(){
    while(inputs.length > 0){
        inputs.pop();
    }
    screen.textContent = "";

}



// determines if the calculator can start a new number or continue from the current number
function canAddNumber(){
    if (inputs[0] == undefined) return true;

    if(lastInput == "=" ){
        return false;
    } 

    return true;
}

function startNewNumber(){
    if(inputs.length == 0) return true;

    if (numbers.includes(lastInput)){
        return false;
    }
    return true;
}

// determines if the calculator can use an operation or not
function addNewOperation(){
    if(inputs.length == 0) return false;


    if(!(operations.includes(lastInput)) || lastInput == "=" )
    {

        return true;
    }
    return false;
}


