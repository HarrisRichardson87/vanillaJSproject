// Variables
var root = document.querySelector(':root')
var container = document.querySelector('.container');
var newitemInput = document.getElementById('new_item_input')
var itemform = document.getElementById('new_item_form');
var deleteButton = document.getElementById('delete_button');
var undoButton = document.getElementById('undo_button');
var itemsList = document.getElementById('itemsList');
var itemBtns = document.querySelectorAll('.item_check_btn');
var themeBtn = document.querySelector('.theme_toogle_btn');
this.deletedItem = null;
this.lastDeletedIndex = -1;

undoButton.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Get last deleted item
   const deletedItem = document.getElementsByClassName("item_deleted")[0];

   // If none break
   if(!deletedItem)
       return;

   // Unhide it
   deletedItem.classList.remove("item_deleted");
});


deleteButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Run garbage collector, so deleted items dont build up
    garbageCollector(e);

    // Get selected item
    const selectedItem = document.getElementsByClassName("selected")[0];

    // If none selected break
    if(!selectedItem)
        return;

    // Unselect
    selectedItem.classList.remove("selected");

    // Hide Item
    selectedItem.classList.add("item_deleted");

    // Select the next item up
    const nextToSelect = selectedItem.previousSibling || selectedItem.nextSibling;
    
    // You deleted the last item
    if(!nextToSelect) 
        return;

    // Add selected class
    nextToSelect.classList.add("selected");
});

function garbageCollector(){
    // Get selected item
    const lastDeletedItem = document.getElementsByClassName("item_deleted")[0];

    // If none selected break
    if(!lastDeletedItem)
        return;

    lastDeletedItem.remove();
}


// Do this when we submit the form
itemform.addEventListener('submit', function (e) {
    e.preventDefault();
    var newitemInputValue = itemform.elements.new_item_input;

    additem(newitemInputValue.value)

    // Reset input value to empty
    newitemInputValue.value = '';
})

// To  add item in List
function additem(newitem) {
    // No input
    if(newitem === ""){
        // Show Error
        document.getElementById("error_input").style.display = "block";
        return;
    }

    // Hide Error
    document.getElementById("error_input").style.display = "none";

    // Create li element and set its class
    const newitemItem = document.createElement('li');
    newitemItem.setAttribute('class', 'item');

    // Add on Select
    onSelect(newitemItem);

    // Create span  element and set its class and add new item input
    const newitemBio = document.createElement('span');
    newitemBio.setAttribute('class', 'item_bio');
    
    // Put value of input in it
    newitemBio.innerText = newitem; // putting value of input in the li

    // append (insert) li tag in Ul
    itemsList.appendChild(newitemItem)

    // append (insert) newitem in li
    newitemItem.appendChild(newitemBio)
}

function onSelect(btns) {
    btns.addEventListener('click', function (e) {
        // Remove all other selected
        const parent = e.currentTarget.parentElement;
        for (var i = 0; i < parent.children.length; i++) {
            var item = parent.children[i];

            // remove all selectors
            item.classList.remove("selected");
          }

        // Change selected color to blue
        e.target.classList.add("selected");
    });
}
