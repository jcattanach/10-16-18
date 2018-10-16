let btnPlaceOrder = document.getElementById('btnPlaceOrder')
let btnDeleteOrder = document.getElementById('btnDeleteOrder')
let btnShowOrder = document.getElementById('btnShowOrder')
let infoContainer = document.getElementById('infoContainer')
let containerList = document.getElementById('containerList')

const ORDER_URL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
//const ORDER_URL_WITH_EMAIL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${pass}`


function deleteConformation(email) {
  deleteNotice = `
  <h4>Your order for ${email} has been deleted<h4>`

  infoContainer.innerHTML = deleteNotice
  containerList.innerHTML = ''
}




function deleteOrder(email) {
  console.log(ORDER_URL + email)
  fetch(ORDER_URL + email,{
    'method': "DELETE"
  })
  deleteConformation(email)
}

function deleteOrderBtn(){
  deleteOrderEmail = txtEmailDeleteOrder.value
  deleteOrder(deleteOrderEmail)
}

function submitOrder(choice) {
  if(txtPlaceOrderEmail.value == "") {
    infoContainer.insertAdjacentHTML("beforeend", "Please enter a valid email!")
} else {
  order = choice
  placeOrderEmail = txtPlaceOrderEmail.value
  fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'content-type' : 'application/JSON'},
      body: JSON.stringify({
        emailAddress: `${placeOrderEmail}`,
        coffee: `${order}`,
      })
    }
  )
  let newOrderConfirmation = `Your order of ${order} has been submitted for ${placeOrderEmail}!`
  infoContainer.innerHTML = newOrderConfirmation}
}


function fetchCoffeeOrders(callback) {
  fetch(ORDER_URL)
  .then(function(response){
  return response.json()})
  .then(function(orders){
    callback(orders)
})}


function displayOrders(orders) {
let hideButton = `<button onclick="hideOrders(this)">Hide List</button>`
containerList.insertAdjacentHTML('beforeend',hideButton)
for (email in orders) {
  let theOrder = orders[email]
  let coffeeOrder = `
  <li>
  <h4>${theOrder.emailAddress}</h4>
  <label>${theOrder.coffee}</label>
  </li>
`
containerList.insertAdjacentHTML('beforeend',coffeeOrder)}
}

btnShowOrder.addEventListener('click', function(){
  fetchCoffeeOrders(function(orders){
    // pass it to a function which will create UI
    displayOrders(orders)
  })
})
function hideOrders(info){
  info.parentElement.innerHTML = ''
}

btnPlaceOrder.addEventListener('click', function() {
  orderChoicesList = `
  <h3>Enter your email and then click on an option</h3>
  <input type="email" id="txtPlaceOrderEmail" placeholder="Email"/>
  <ul
    <li>
    <button id="btnSubmitOrder" onclick="submitOrder(this.innerHTML)">Regular Black Coffee</button>
    </li><li>
    <button id="btnSubmitOrder" onclick="submitOrder(this.innerHTML)">Iced Coffee</button>
    </li><li>
    <button id="btnSubmitOrder" onclick="submitOrder(this.innerHTML)">Cappucino</button>
    </li><li>
    <button id="btnSubmitOrder" onclick="submitOrder(this.innerHTML)">Espresso</button>
    </li><li>
    <button id="btnSubmitOrder" onclick="submitOrder(this.innerHTML)">Machiatto</button>
    </li>
  </ul>
  <button onclick="hideOrders(this)">Quit Order</button>`

  infoContainer.innerHTML = orderChoicesList
})

btnDeleteOrder.addEventListener('click',function(){
  deletePrompt = `
  <h4>Enter your email and your order will be deleted</h4>
  <input id="txtEmailDeleteOrder"type="email" placeholder="email"/>
  <button id="deleteOrder" onclick="deleteOrderBtn()">Submit</button>`

infoContainer.innerHTML = deletePrompt
})
