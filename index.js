/*
 * Copyright (c) 2019. Zachary Myers
 */

/**
 * Define vars
 * PS: I am well aware that this is *not* the right way to do this, i just wanted to
 * take a different approach for the project
 */

let list = [];

/**
 * Can't have anything written in the HTML, so we have a onLoad function to append the text of the div.
 */

function onLoad() {

    let shoppingList = document.getElementById("listDiv");
    shoppingList.innerText = "Shopping List";

}

/**
 * The addList function will add a item to the list defined on line 9, here we also check if the list is full.
 */

function addList() {
    let itemName = document.getElementById("itemInput").value;

    if (list.length > 6 && !document.getElementById("err")) {
        const err = document.createElement("p");
        err.id = "err";
        err.innerHTML = "The list is full";
        document.getElementById("listDiv").appendChild(err);
        return;
    } else if (list.length > 6 && document.getElementById("err")) {
        return;
    }

    // Add items to list
    list.push(itemName);

    updateHTML();
}

/**
 * The updateHTML function is defined here, the first thing it attempts to do is to delete the ordered lists and all of its contents,
 * the first time this function is run, it will throw a error into the console, but it still works after that so I don't
 * really care.
 */

function updateHTML() {
    const div = document.getElementById("listDiv");
    try {
        div.removeChild(document.getElementById("ulItem"));
    } catch (error) {
        console.log(error);
    }

    // Create the unordered list.

    const g = document.createElement('ol');
    g.id = 'ulItem';
    div.appendChild(g);

    // This for loop creates a new list item for each item in the array.

    for (let i = 0; i < list.length; i++) {
        const li = document.createElement('li');
        li.id = "listItem" + i;
        li.innerHTML = list[i];
        g.appendChild(li);
    }

}

/**
 * The remove list function removes a item from the list, then runs the updateHTML function to rebuild the html
 *
 * UPDATE: I made some changes, previously this would only work if you gave it the corresponding number on the side,
 * but now it checks if the input value is a number, if it isn't we run a for loop that goes through each item in the array
 * until it matches, if it doesn't match we throw a new error.
 *
 * Of course, it also checks if you provided a number, and if you did, it will act accordingly.
 */

function removeList() {
    let input = document.getElementById("itemInput").value;
    let itemCount = null;
    let needsError = false;

    // Was going to add this to the removeErr function but it didn't work and I didn't wanna debug so its
    // here now.

    // Side note: If two items are named the same thing, it will remove the first one.

    if (isNaN(input)) {
        for (let i = 0; i < list.length; i++) {
            if (input === list[i]) {
                itemCount = i;
                needsError = false;
            }
        }
        if (itemCount === null) {
            const err = document.createElement("p");
            err.id = "err-not-found";
            err.innerHTML = "Could not find that item";
            document.getElementById("listDiv").appendChild(err);
            needsError = true;
            return;
        }
    } else if (!isNaN(input)) {
        itemCount = input - 1;
        needsError = false;
    }
    // This removes the list item
    list.splice(itemCount, 1);

    // We don't want that error hanging around if the list isn't full
    // We also don't want it trying to delete something that doesn't exist.

    removeErr(needsError);
    updateHTML();
}

/**
 * New function time, not a super complex one like the others, but it gets the job done, Just made for checking if there's any errors that
 * need to be removed.
 *
 * We use the boolean needsError to keep track if the error needs to stay on the page or not.
 * There's probably a simpler/better way but its currently 2:30 AM and it works so I didn't touch it.
 */

function removeErr(needsError) {
    if (document.getElementById("err-not-found") && needsError === false) {
        document.getElementById("listDiv").removeChild(document.getElementById("err-not-found"))
    }

    if (list.length < 7 && document.getElementById("err")) {
        document.body.removeChild(document.getElementById("err"));
    }
}