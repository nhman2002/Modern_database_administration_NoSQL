// Get Date and Disable Past
let dateInput = [...document.querySelectorAll('.booking-date-item input[type="date"]')];
let findCurrentDate = (input) => {
    const toDay = new Date();
    let currentDay = toDay.getDate();
    let currentMonth = toDay.getMonth() + 1;
    let currentYear = toDay.getFullYear();

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth.toString();
    }
    if (currentDay < 10) {
        currentDay = '0' + currentDay.toString();
    }

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    input.value = currentDate;
    input.setAttribute('min', currentDate);
}

dateInput.forEach(current => {
    findCurrentDate(current);
});

// Swap route 
let routeSwap = (departure, destination) => {
    let departureValue = departure.value;
    let destinationValue = destination.value;

    departure.value = destinationValue;
    destination.value = departureValue;
}

document.querySelector('.booking-route-swap').onclick = () => {
    let departure = document.querySelector('#route-departure');
    let destination = document.querySelector('#route-destination');
    routeSwap(departure, destination);
};

// Options way to go, disable input 
let wayRadio = [...document.querySelectorAll('.booking-options input[type="radio"]')];
let isTwoWayChecked = (wayRadio) => {
    let twoWay = wayRadio.find(current => {
        return current.id == 'options-two-way';
    })
    return twoWay.checked;
}

let disableDate = (isTwoWayChecked, radio) => {
    isTwoWayChecked(radio) ? dateInput[1].disabled = false : dateInput[1].disabled = true;
    console.log(dateInput.disable);
}

wayRadio.forEach(current => {
    current.onclick = () => {
        disableDate(isTwoWayChecked, wayRadio);
    }
});