/*****  EVENT PROPAGATION  *****/
// describes how events are handled in the Document Object Model (DOM) tree
// It involves two phases: capturing and bubbling

/*****  BUBBLING (default)  *****/
// events are executed from bottom up
// e.g. BUTTON -> FORM -> DIV
// some events do not button (focus, blur, mouseenter, mouseleave, load, unload, abort, error)
const div = document.querySelector("div");
const form = document.querySelector("form");
const button = document.querySelector("button");

div.addEventListener("click", clickFunc);
form.addEventListener("click", clickFunc);
button.addEventListener("click", clickFunc);


/*****  E.TARGET vs THIS.TARGET vs EVENT.CURRENTTARGET  *****/
function clickFunc(e) {
    let currentTarget = e.currentTarget.tagName;
    let target = e.target.tagName;
    let thisTarget = this.tagName;
    console.log(`currentTarget: ${currentTarget}, target: ${target}, this.target: ${thisTarget}`);
    /*
        currentTarget: BUTTON, target: BUTTON, this.target: BUTTON
        currentTarget: FORM, target: BUTTON, this.target: FORM
        urrentTarget: DIV, target: BUTTON, this.target: DIV 
    */
}


/*****  EVENT CAPTURING/TRICKLING  *****/
// events are executed from top to bottom
// e.g. DIV -> FORM -> BUTTON 
// done with div.addEventListener("click", clickFunc, { capture: true });
/* 
    currentTarget: DIV, target: BUTTON, this.target: DIV
    currentTarget: FORM, target: BUTTON, this.target: FORM
    currentTarget: BUTTON, target: BUTTON, this.target: BUTTON
*/

/*****  STOP PROPAGATION  *****/
function clickFunc(e) {
    e.stopPropagation();
    let currentTarget = e.currentTarget.tagName;
    let target = e.target.tagName;
    let thisTarget = this.tagName;
    console.log(`currentTarget: ${currentTarget}, target: ${target}, this.target: ${thisTarget}`);
    /*
        currentTarget: BUTTON, target: BUTTON, this.target: BUTTON
    */
}


/*****  EVENT DELEGATION  *****/
const products = document.querySelector(".products");
products.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        window.location.href += "/" + e.target.className;
    }
});


/*****  COMMON QUESTIONS  *****/

// 1. on button click, execute in this order: FORM -> BUTTON -> DIV
// form is following capture
// button and div bubble
const divEl = document.querySelector(".div");
const formEl = document.querySelector(".form");
const buttonEl = document.querySelector(".button");

divEl.addEventListener("click", () => console.log("div"));
formEl.addEventListener("click", () => console.log("form"), { capture: true });
buttonEl.addEventListener("click", () => console.log("button"));


// 2. create modal which closes by clicking outside of it
const modalBtn = document.querySelector(".modalButton");
const modalContainer = document.querySelector(".modalContainer");

modalBtn.addEventListener("click", () => {
    toggleModal(true);
});
modalContainer.addEventListener("click", (e) => {
    if (e.target.className === "modalContainer") {
        toggleModal(false);
    }
});

function toggleModal(toggle) {
    modalContainer.style.display = toggle ? "flex" : "none";
}