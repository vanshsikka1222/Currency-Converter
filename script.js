/* CURRENCY Exchange Rates API with 150+ currencies..!!
Github link : github.com/fawazahmed0/currency-api#readme
*/

/* URL Structure : 
https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{currencyCode}/{currencyCode}.json
*/

const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
// "/usd/inr.json" (The left out URL that focus on out=r correct results (editable))
//Converts USD to INR (can edit some variables in link for other conversions).

//Selecting 'select' tags in dropdown-menu div
const dropDown = document.querySelectorAll(".dropdown-menu select");
//Selecting 'button' that will update and give result of exchange
const button = document.querySelector("form button");
//Selecting "from" country Code
const fromCode = document.querySelector(".FROM select");
//Selecting "to" country Code
const toCode = document.querySelector(".TO select");
//Selecting our msg to update acc to result
const message = document.querySelector(".msg");

//We have 2 select ("from" and "to")
for(let select of dropDown) {
    for(currCode in countryCodes) {
        //Creating new HTML tag "option" inside select tag
        let newOpt = document.createElement("option");
        //Assigning 'value' attribute of option tag = currency code
        newOpt.value = currCode;
        //Assigning innerText of option tag = currency code
        newOpt.innerText = currCode;
        //Appending all options inside select tag
        select.append(newOpt);

        // For Default selections (from: USD)(to: INR)
        if(select.name === "FROM" && currCode === "USD") {
            newOpt.selected = "selected";
        } else if (select.name === "TO" && currCode === "INR") {
            newOpt.selected = "selected";
        }
    }
    //Event Listener on select, that updates flag on selecting country Code acc.
    select.addEventListener("change", (event) => {
        flag(event.target);
    })
}

//Updating our Flag acc to selection of curr code
const flag = (element) => {
    let currC = element.value; // Selecting Currency Code
    let countryC = countryCodes[currC]; //Selecting Country Code
    let source = `https://flagsapi.com/${countryC}/flat/64.png`; //new Source
    let img = element.parentElement.querySelector("img"); //Selecting img tag
    img.src = source; //Updating our flag image source according to CountryCode
}

//Adding EventListener on Button that will give result
button.addEventListener("click", async (event) => {
    //To prevent default functionality of button on click : Reload Page, Submit
    //We want to remove all defaults and add our own functionality.
    event.preventDefault();

    //Accessing form input value (amount money)
    let amt = document.querySelector("form input");
    let amtVal = amt.value;
    //If entered val is negative or null, keep it equal to 1 
    if(amtVal < 1 || amtVal === "") {
        amtVal = 1;
        amtVal.value = "1";
    }

    //Will create a URL to fetch API
    const URL = 
    `${Base_URL}/${fromCode.value.toLowerCase()}/${toCode.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let currRate = data[toCode.value.toLowerCase()];
    // console.log(currRate);

    //Final answer (amount)
    let ans = amtVal * currRate;
    //Updating Message
    message.innerText = `${amtVal} ${fromCode.value} = ${ans} ${toCode.value}`; 
});

//Adding event listener on Button Click
function changeColor() {
    //Selecting message box
    var messageBox = document.querySelector("form button"); 
    messageBox.style.backgroundColor = "black";
    setTimeout(function() {
        messageBox.style.backgroundColor = "#178b02";
      }, 100);
}

//By Vansh Sikka
