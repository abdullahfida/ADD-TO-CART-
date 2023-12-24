// WORKING WITH FIREBASE
const appSetting = {
    databaseURL: "https://first-mobile-app-f7fc8-default-rtdb.firebaseio.com/"
}

import { initializeApp } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js "
import { getDatabase, ref, push, onValue, remove } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js "

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")

// WORKING WITH ENTER KEY
const event = new KeyboardEvent('keydown',{
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
});  

// WORKING WITH HTML 
const cartBtn = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const listEl = document.getElementById("shopping-list")

cartBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    //  console.log(inputValue)
    // displayingInputValue(inputValue)
    clearingInputField()
})
// FUNCTION FOR RENDERING OUT INPUT VALUE
function displayingInputValue(item) { 
    let itemId = item[0]
    let itemValue = item[1]
    // listEl.innerHTML += `<li>${listItem}</li>`
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    listEl.append(newEl)
    // console.log(event)
    // newEl.dispatchEvent(event)
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `ShoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
}
// FUNCTIONS FOR CLEARING INPUT FIELD AND SHOPPING LIST
function clearingInputField() {
    inputField.value = " "
}
function clearingListEl() { 
    listEl.innerHTML = ""
}

// FETCHING DATA FROM FIREBASE AND DISPLAYING 
onValue(shoppingListInDB, function (snapshot) {
    // console.log(snapshot.val())
    if(snapshot.exists()){

        let listToArray = Object.entries(snapshot.val())
        clearingListEl()
        for (let i = 0; i < listToArray.length; i++) {
            let currentItem = listToArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            displayingInputValue(currentItem)
    
        }
    } else{
        listEl.innerHTML = "No items yet..."   
    }
})
