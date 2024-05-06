let dataAdmin = document.querySelector('.data');

let dataAddBtn = document.querySelector('.data-control-add');
let dataEditBtn = document.querySelectorAll('.data-value-action-edit');
let dataRemoveBtn = document.querySelectorAll('.data-value-action-remove');

let closePopup = document.querySelector('.data-popup-close');
let closeConfirm = document.querySelector('.data-confirm-cancel');

dataAddBtn.onclick = () => {
    dataAdmin.classList.add('data-popup-active');
}

dataEditBtn.forEach((element, index) => {
    element.onclick = () => {
        dataAdmin.classList.add('data-popup-active');
    }
})

dataRemoveBtn.forEach((element, index) => {
    element.onclick = () => {
        dataAdmin.classList.add('data-confirm-active');
    }
})

closePopup.onclick = () => {
    dataAdmin.classList.remove('data-popup-active');
}

closeConfirm.onclick = () => {
    dataAdmin.classList.remove('data-confirm-active');
}