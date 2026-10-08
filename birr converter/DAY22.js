// ===== JavaScript Project--Data-Driven App =====
// we have 4 sections
// 1 Project Brief and Setup
//2 Fetching and Rendering
//3 Interaction and State
//4 Persistence and Ship

// =====  1 Project Brief and Setup =====



// // hear we declares a constant object named the name calle state
// the state object
const state ={
    base: "ETB",// this is oure base cattercy (means all exchange rates fetched will likely relative to this currency)
    rates:{},// it is for store tody exchange rate from the internet then store hear
    watchlist:[],//it is for put my favorit list want to see easly at the time of open the list 
    amount:100,
    currency:"USD",
};


// Fetching the rates
const API = "https://open.er-api.com/v6/latest/ETB";// this url give the curant states of the exchanging rate
const status = document.querySelector("#status");
// this is our funtion ue use async is for at the time of downlode data from the internet some data are take time and it control time of downlode(means smale data downlode thane largest)
async function loadRates() {
status.textContent = "Loading rates…";
try {
   const res = await fetch(API);// it do send request to the internet to grab the data from the API address and waits the server to reply
   if (!res.ok) throw new Error("HTTP " + res.status);// this one cjecks the server had the problem

   const data = await res.json();// in hear the servare send the data in the form of raw text the it convert the text to usable js format
   console.log("API Data received", data);
   
   state.rates = data.rates; // it takes the download exchange rates and save them inside my state object rates property
    console.log("Current States Rates", state.rates);

   state.textContent = "";// for when download was successful it clears the loading rates massage from the screen
   render();// it call another function to refreshing the webpage and show the newly downloade rates to the user

} catch (err) {
   state.textContent = "Could not load rates.";
   console.error("Error loading rates:", err);
}
}


//Rendering the rates
const select = document.querySelector("#currency");// it for crate the drope down menu in the html
function render() {// it for updating the visual elements on the webpage
// fill the dropdown from the live rates
  const codes = Object.keys(state.rates);// it look inside states in the above it rates (pricelist and extract currency code (usd , eur...) then it turning them into a list)
   console.log("Available Currency Codes:", codes);
  select.innerHTML = codes
.map(c => `<option>${c}</option>`)
.join("");
select.value = state.currency;// this ensures the dropdown meanu automatically select the default currency 
renderWatchlist(); // covered next function
}

//loadRates(); //to taste it u must un look it 



//The convert action
const form = document.querySelector("#convert-form");// hear it do find the conversion from in the html then js list the user click the "convert button"
const amount = document.querySelector("#amount");//find the number input field where the user inter how mach many they want to convert
const result = document.querySelector("#result");// in oure html it has paragraph have id result it callculate answer will be printed on the screen

form.addEventListener("submit", (e) => {// it do list for the user to submit the form at the time of click the "convert buttome"
  e.preventDefault();// it is for stope the browser from refreshing
  const amt = Number(amount.value);// if the user accedantly inter the number in string form it convert ti in the number form
   console.log("User entered amount:", amt); //  See what number the user typed
  if (!amt || amt <= 0) {
     result.textContent = "Enter a valid amount.";
     console.log("Validation failed: Amount is invalid.");// show validation triggers
     return;
}
  state.currency = select.value;// save the curancy operation
   console.log("Selected currency:", state.currency);// it see what currency was chosen
  const rate = state.rates[state.currency];//it look up the exchange rate for that specific chosen
  console.log("Found exchange rate:", rate); //the rate fetched from state

  const out = (amt * rate).toFixed(2);
  console.log("Calculated output value:", out); // the final converted math result
  result.textContent =
  `${amt} ETB = ${out} ${state.currency}`;
});



//===== Building the watchlist ====

const addBtn = document.querySelector("#watch");// it for list for clicks on it
addBtn.addEventListener("click", () => {// it for list the specific button and runs the code inside it
    const c = select.value;//it grabs whatevere courrency code is currently selected in my dropdown menu
    console.log("Currency selected for watchlist:", c); //which currency you are trying to add

    // no duplicates
    if (state.watchlist.includes(c)) {
        console.log(`Duplicate found! ${c} is already in your watchlist.`); // if the duplicate check stops it
            return;}
    state.watchlist.push(c);// it see the currency is save new
      console.log("Updated Watchlist Array:", state.watchlist); //the new list containing your saved currencies
    save(); // persist (next section)
    renderWatchlist();
});



// ===== Rendering & removing watch items====

const watchUl = document.querySelector("#watchlist");// in hear t find the unordered list

   function renderWatchlist() {// this function is for redrawing the watchlist on the wab if samting change
    console.log("Rendering watchlist. Current list:", state.watchlist); // See the current items in the array
    
    if (state.watchlist.length === 0) {
        console.log("Watchlist is empty. Displaying 'No currencies yet'."); // See if the empty check triggers
     watchUl.innerHTML = "<li>No currencies yet</li>";
     return;
}
  watchUl.innerHTML = state.watchlist.map(c => {
   const r = state.rates[c];// see spacific currency rate
    console.log(`Mapping watchlist item: ${c}, Rate found: ${r}`); // See each currency and its fetched rate
   return `<li data-c="${c}">1 ETB = ${r} ${c}// crate list show the conversion rate
<button class="rm">×</button></li>`;
}).join("");//to insert the list
}


watchUl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) 
        return;// if the user click semewhere on the list it delete button
    const c = e.target.closest("li").dataset.c;// it save the list if the user cleack the button
    console.log(`Delete button clicked for currency: ${c}`); // See which currency code is targeted for deletion
    state.watchlist = state.watchlist.filter(x => x !== c);
    console.log("Updated watchlist array after removal:", state.watchlist); //See the filtered list
    save(); renderWatchlist();
});




// ===== Saving & loading state =====
// save the parts worth keeping
const KEY = "birr_watch_state"; //name of tag for storage
function save() {// it for save data
   const dataToSave={
    watchlist: state.watchlist,
    currency: state.currency,
   };
localStorage.setItem(KEY, JSON.stringify(dataToSave));
    console.log("Data successfully saved to localStorage:", dataToSave); // See what object was packed and saved
}

// load on startup, before the first render
function load() {// this function chake if data store befor
const saved = localStorage.getItem(KEY);
    console.log("Raw text retrieved from localStorage:", saved); //it is for the raw string pulled from storage
    
    if (saved) {
        const parsedData = JSON.parse(saved);
        Object.assign(state, parsedData);
        console.log("State successfully updated with loaded data:", state); //it is for the updated state object
    } else {
        console.log("No saved data found in storage. Starting with default state."); //it is for if storage was empty
    }
}


async function init() {// it is for allow us to use await inside it to pause executing until background tasks finish
load(); // Runs first to look into the browser's local storage and restore any previously saved data
await loadRates(); // Sends a request to the internet to fetch the live exchange rates.
render(); // draw everything
}
init();

loadRates(); //to taste it u must un look it 
