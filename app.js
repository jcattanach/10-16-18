let btnPlaceOrder = document.getElementById('btnPlaceOrder')
let btnDeleteOrder = document.getElementById('btnDeleteOrder')
let btnShowOrder = document.getElementById('btnShowOrder')
let infoContainer = document.getElementById('infoContainer')
let containerList = document.getElementById('containerList')

const ORDER_URL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
//const ORDER_URL_WITH_EMAIL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${pass}`
function hideOrders(orderList){
  orderList.parentElement.innerHTML = ''
}

function fetchCoffeeOrders(callback) {
  fetch(ORDER_URL)
  .then(function(response){
  return response.json()})
  .then(function(orders){
    callback(orders)
})}

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

btnPlaceOrder.addEventListener('click', function() {
  orderChoicesList = `
  <h3>Submit your email and then click on an option</h3>
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
  </ul>`

  infoContainer.innerHTML = orderChoicesList
})
