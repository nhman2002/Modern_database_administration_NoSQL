let errorBox = document.querySelector('.error-list');
let allRoutes = [...document.querySelectorAll('.route-item')];

allRoutes.forEach(route => {
    let allSeats = removeNoneSeat([...route.querySelectorAll('.route-seat-item')]);

    let continueButton = route.querySelector('.route-result-button');

    let routeCost = parseFloat(route.querySelector('.route-head-cost').innerHTML.slice(0, -1));

    let seatChoosing = [];

    let totalCost = 0;

    allSeats.forEach(seat => {
        seat.onclick = () => {
            handleChoosingSeat(seat, seatChoosing);

            let { result, errorMessage } = SeatValidationLimitChoosing(seat, seatChoosing);

            alertSeatChoosingError(result, errorMessage);

            displaySeatAndCost(seatChoosing, route, routeCost);
        }
    });

    continueButton.onclick = () => {
        let { result, errorMessage } = continueValidationSeat(seatChoosing);

        alertSeatChoosingError(result, errorMessage);

        if (result) {
            let seatsNumber = getSeatNumber(seatChoosing);
            let totalCost = totalTicketCost(seatChoosing, routeCost);
            getDataForLocalStorage(seatsNumber, routeCost, totalCost, route);
        }
    }

});

function removeNoneSeat(allSeats) {
    realSeats = allSeats.filter(seat => {
        return seat.querySelector('svg').style.display !== 'none';
    })

    return realSeats;
}

function handleChoosingSeat(seat, seatChoosing) {

    if (seat.classList.contains('seat-empty')) {
        seat.classList.remove('seat-empty');
        seat.classList.add('seat-active');

        seatChoosing.push(seat);

    } else if (seat.classList.contains('seat-active')) {
        seat.classList.remove('seat-active');
        seat.classList.add('seat-empty');

        removeSeatFromChoosing(seat, seatChoosing);
    }
}

function removeSeatFromChoosing(seat, seatChoosing) {
    let index = seatChoosing.indexOf(seat);
    if (index > -1) {
        seatChoosing.splice(index, 1);
    }
}

// Validation Seat
function SeatValidationLimitChoosing(seat, choosing) {
    const state = {
        result: true,
        errorMessage: '',
    };

    if (choosing.length > 5) {
        seat.classList.add('seat-empty');
        seat.classList.remove('seat-active');
        removeSeatFromChoosing(seat, choosing);

        state.result = false;
        state.errorMessage = 'Số ghế được chọn tối đa là 5...';
    }

    return state;
}

function continueValidationSeat(seatChoosing) {
    const state = {
        result: true,
        errorMessage: '',
    };

    if (seatChoosing.length === 0) {
        state.result = false;
        state.errorMessage = 'Vui lòng chọn ghế...';
    }
    return state;
}

function alertSeatChoosingError(result, errorMessage) {
    if (result === false) {

        errorBox.innerHTML = `<li class="error-item">${errorMessage}</li>`

        errorBox.parentElement.classList.add('error-validation-active');

        let timeAdd = setTimeout(() => {
            errorBox.parentElement.classList.remove('error-validation-active');
        }, 5000);
    }
}

function displaySeatAndCost(seats, route, routeCost) {
    let costVisible = route.querySelector('.route-result-cost-value');
    let totalCost = totalTicketCost(seats, routeCost);
    let seatVisible = route.querySelector('.route-result-name');
    let seatCount = route.querySelector('.route-result-count-value');

    seatVisible.innerHTML = seats.map((seat, index) => {
        return `<span class="route-result-name-ticket">${seat.innerText}</span>`;
    });

    seatCount.innerHTML = seats.length;
    costVisible.innerHTML = `${totalCost}.000<span>&#8363;</span>`
}

function getSeatNumber(seats) {
    return seats.map(seat => seat.innerText);
}

function totalTicketCost(seats, routeCost) {
    return routeCost * seats.length;
}

function getDataForLocalStorage(seats, ticketCost, totalCost, route) {
    let busType = route.querySelector('.route-head-type').innerHTML;

    let timeStart = route.querySelector('.route-head-timestart').innerHTML;

    let timeEnd = route.querySelector('.route-head-timeend').innerHTML;

    let dataBooking = JSON.parse(window.localStorage.getItem('dataBooking'));

    let data = {
        ...dataBooking, ...{
            seats,
            ticketCost,
            totalCost,
            busType,
            timeStart,
            timeEnd
        }
    }

    window.localStorage.setItem('dataBooking', JSON.stringify(data));
}