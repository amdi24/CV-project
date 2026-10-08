// simply this is oure State Object
const state ={// hear we do declares a constant object
    dishes:[],// this hold menu item from JSON
    cart:[],//it hold item add by the user like item (ID, name, price,..)
    search:" "// it is to store the text whan the user is currently typing into the search bar
};
 
console.log("intial state Object" ,state);// it is for chack our states is work

const meanuEl = document.querySelector("#menu");
async function loadMenu(){// this allow js to wait for the data file to load in the background without frezzing
    console.log("Loading meanu data from json");
    meanuEl.textContent = "loading menu";
    try{
        const res = await fetch ("menu.json");// this send a request to computrer or server to open and reas menu.json
        if(!res.ok) throw new Error("HTML error:" + res.startus);// this check if the file is found and loade success fully

        state.dishes = await res.json();          // this is for converts the raw data from the JSON file into real js array object
        console.log("manu lode", state.dishes);
        render();
    }
    catch(err){
        meanuEl.textContent = "can not load the menu";
        console.error("error lode menu" , err);
    }
}

// ===== 3red  Read the menu =====
// this function job is redraw the webpage interface the application data changes(state change)
function render(){
    console.log("read current state sechuation" , state);
    const term = state.search.toLocaleLowerCase();// when we text tipe in the search it change the text to the lower case
    const shown = state.dishes.filter(d => d.name.toLocaleLowerCase().includes(term));
     // filter is do if the dish found it keep that dish in the show if it not found remove the dish from the show list 
    if(shown.length === 0){
        meanuEl.innerHTML = "<p> no dishes found. </p>";
    }
    else{// hear show dot map work those filtered dishes in the js arr convert it in the form of HTML list
        meanuEl.innerHTML = shown.map(d => 
            `<article class = "dish" data-id="${d.id}">
        <img src="image/${d.image}" alt="${d.name}" class="dish-img">
            <h3>${d.name}</h3>
            <p class = "price">${d.price}ETB </p>
            <button class="add">Add</button>
               </article>`).join("")// .join simply join individual html in group
    renderCart();
               // to see it work or not we do this two syntasx in console in the wab but befor crate (manually chacke)
               //state.search = "doro"
               //render() // hear it say not found bucose doro is no found in the json
    }
}

// this function responsibility is draw and updating shoping cart
function renderCart(){
   if (state.cart.length === 0) {
        cartEl.innerHTML = `<h2>Your Cart</h2><p>Your cart is empty</p>`;
        return;
    }

    let cartHTML = `<h2>Your Cart</h2><ul>`;
    
    state.cart.forEach(item => {
        cartHTML += `
            <li data-id="${item.id}">
                <span>${item.name} (${item.price} ETB) x ${item.qty}</span>
                <button class="rm">Remove</button>
            </li>
        `;
    });

    cartHTML += `</ul>`;
    
    const total = cartTotal();
    cartHTML += `<h3>Total: ${total} ETB</h3>`;

    cartEl.innerHTML = cartHTML;
}



// ===== feature search =====
// at all this part is see only the user where it write 
const searchEl= document.querySelector("#search");
// Live Search Event Listener
searchEl.addEventListener("input", (e) => {// hear we add event list hapen in the input elements
    state.search = e.target.value;// in this we save text inside the search box
    console.log("-> Search term updated to:", state.search);
    render(); // Re-filter and redraw the screen instantly as the user types
});

// ===== add , update and remove ====
const cartEl = document.querySelector("#cart");
// this parte is aad and update
  meanuEl.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) return;
    const id = Number(e.target.closest(".dish").dataset.id);
    const dish = state.dishes.find(d => d.id === id);// to save the spacific item (dish)
    const line = state.cart.find(i => i.id === id);// fo see the track what the user add

    if (line){// this do if the item is already found in cart it increases its quantity by 1
         line.qty++;
    console.log(`increased quantity from ${line.name}.new quantity: ${line.qty}`);
    }
      else {// if item is not found in the cart it creates a copy of the dish object and sets its initial quantity to 1
        state.cart.push({ ...dish, qty: 1 });
        console.log(`Added new item to cart: ${dish.name}`);
}
save(); 
render();
});

// remove handled the same way on the cart panel
cartEl.addEventListener("click", (e) => {

    if (!e.target.matches(".rm")) return;// it cheack if the user click the link or not
    const id = Number(e.target.closest("li").dataset.id);
    console.log(`remove item ID: ${id} from cart`);
    state.cart = state.cart.filter(i => i.id !== id);// this do crate new array then find the match id and drope that
save(); 
render();
});


function cartTotal() {// total price calculat
    const total = state.cart.reduce((sum, i) =>
    sum + i.price * i.qty, 0);

    console.log(`Calculated cart total: ${total} ETB`);
        return  total;
}
function save() {// it save the data

    localStorage.setItem("addiseats",
    JSON.stringify(state.cart));
    console.log("Cart saved to localStorage:", state.cart);
}
function load() {

    const s = localStorage.getItem("addiseats");
    if (s) {
        state.cart = JSON.parse(s);
        console.log("Cart loaded successfully from localStorage:", state.cart);
    }else{
        console.log("No saved cart found in localStorage.");
    }
}

async function init() {
load(); // restore saved cart
if(searchEl){
    searchEl.value = "";
    state.search = "";
}
await loadMenu(); // fetch dishes + render
}
init();


console.log("elemant loaded",{meanuEl , searchEl , cartEl});







// DAY 24 Section


const phoneRegex = /^(?:\+251|0)9\d{8}$/;// this is the form of standard phone in js

// this function is check that the checkout form is valid or not (means it see the user add all info befor complite the procase)
function Checkout({name , phone}){
    let errormessage = ""
  if(!name.trim()){// trim() this one is a built in js string method. then it is used to remove space if the usar rite space for example if user type like this ("   ") trim() matude change it like ("")
       errormessage= "please enter your name";
 } 
  else if(!phoneRegex.test(phone)){// hear the matude test() is used or check if the user input phone number is mache in in the (const phoneStayle = /^(?:\+251|0)9\d{8}$/;)
       errormessage ="Enter Valid phone number";
}
 else if(state.cart.length ===0){
       errormessage ="Your cort is empty";
}
 else{
    errormessage = "";// it is show ther is no errar found
  
}
  return errormessage;
}
// hear we declare the varables use in tne html form
const checkform = document.querySelector("#check");//El is discribe that the variable hold an HTML element from the wabpage
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const areEl = document.querySelector("#area");
const errorEl = document.querySelector("#error");


// hear we wiil do the events like the person add name , phone number, area selection (like accebte the value from the user for oure variables)
// in simple word what will hapened if the user use this parte of code
checkform.addEventListener("submit",(e) => {// this EventList lis list oure events hapend in that parte for this we use 3 events name,phone and area selection
    e.preventDefault();// at the time of event add by default the broser refresh it self but this code controle the page not refresh it self
    
    // this is oure object this
    const data = {// then this object work is gather data from the user input value and give it to the variable
        name:nameEl.value,
        phone:phoneEl.value,
        area:areEl.value
    };
    
    const errormessage = Checkout(data);//this part work is send the data came from the user to Checkout function then give the result to error errormessage
    errorEl.textContent = errormessage;//it is for update the message
    if(errormessage){
        console.log("see your data agen");
    }
    else{
        order(data);
        //console.log("valide");
    }
    
});

// this function totaly accept order information from data then procase the all procasse
function order(data){// crate object for order
    const order1 ={...data,// the three dot is it for accebt all inpute value at all
        items:[...state.cart],
        total: cartTotal(),// it for calculat the total value of the order go to in the cartTotal function
    };
    console.log("successfully orderes" , order1);

//this one is below the pone tabel 
    errorEl.style.color = "green";
    errorEl.textContent = `Success! Total: ${order1.total} ETB, delivery to ${order1.area}`;
    
    
    //alert(`successfull Total:${order1.total}ETB, delevary to ${order1.area}`);// it is show on the tope allarte 
state.cart = []; //it is for state to empty the cart
save(); // it is for update the local storage
render(); // IT FOR re render  or (update cart and menu)
checkform.reset();// it is for clear the form boxes 

}