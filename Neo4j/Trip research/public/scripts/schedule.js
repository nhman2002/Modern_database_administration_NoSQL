// handle double search filter
let departureField = document.querySelector('.search-departure');
let destinationField = document.querySelector('.search-destination');
let bodyTable = document.querySelector('.schedule-body');
let schedules = [...bodyTable.querySelectorAll('.schedule-item')];
let onlyDest = [...document.querySelectorAll('.schedule-item-d-destination')];
let noneData = document.querySelector('.schedule-none-value');



let combineFilter = {
    departure: '',
    destination: ''
};
let currentSchedules = {
    dep: '',
    dest: '',
}

departureField.onkeyup = function () {
    combineFilter.departure = this.value;
    letSearch();
}
destinationField.onkeyup = function () {
    combineFilter.destination = this.value;
    letSearch();
}

function letSearch() {
    if (combineFilter.departure === '' && combineFilter.destination === '') {
        noneSearchData();
    }
    currentSchedules.dep = findMatchDeparture(combineFilter);
    currentSchedules.dest = findMatchDestination(combineFilter);
    reBuildScheduleAfterMatch(currentSchedules);
}

function cleanString(str, last = -1) {
    if (last === -1) return str.slice(0, last).trim().toUpperCase();
    else return str.slice(0).trim().toUpperCase();
}

function noneSearchData() {
    bodyTable.classList.remove('schedule-none');
    schedules.forEach(element => {
        element.style.display = "block";
    })
    schedules.forEach(ele => ele.setAttribute("data-match", "visible"));
}

function noneResult() {
    schedules.forEach(element => {
        element.style.display = "none";
    })
    schedules.forEach(ele => ele.setAttribute("data-match", "hidden"));
    bodyTable.classList.add('schedule-none');
}

function findMatchDeparture(combineFilter) {
    let match = schedules.filter(current => {
        let currentText = current.querySelector('.schedule-d-departure').innerHTML;
        let checkFilter = cleanString(currentText).indexOf(cleanString(combineFilter.departure, 0));
        return (cleanString(combineFilter.departure, 0) != '' && checkFilter >= 0);
    });
    currentSchedules.dep = match;
    return match;
}

function findMatchDestination(combineFilter) {
    let match = onlyDest.filter(item => {
        let currentText = item.innerHTML;
        let checkFilter = cleanString(currentText, 0).indexOf(cleanString(combineFilter.destination, 0));
        return (cleanString(combineFilter.destination, 0) != '' && checkFilter >= 0);
    });
    currentSchedules.dest = match;
    return match;
}

function reBuildScheduleAfterMatch(currentResult) {
    let { dep, dest } = currentResult;

    if ((dep.length === 0 && dest.length === 0) && (combineFilter.departure !== '' || combineFilter.destination !== '')) {
        noneResult();
    } else if (combineFilter.departure === '' && combineFilter.destination === '') {
        noneSearchData();
    } else {
        noneSearchData();

        schedules.forEach(ele => setDisplay(ele, "none"));
        schedules.forEach(ele => ele.setAttribute("data-match", "hidden"));

        {
            dep.forEach(ele => {
                if (dest.length === 0) {
                    ele.dataset.match = "visible";
                } else {
                    existInDestination(ele, dest);
                }
            })

            dest.forEach(ele => {
                if (dep.length === 0) {
                    let scheduleItem = destToParent(ele);
                    scheduleItem.dataset.match = "visible";
                } else {
                    existInDeparture(ele, dep);
                }
            })
        }

        finalCheckAfterAllHandle();
    }
}

function findSameElement(contain, child) {
    return child.filter((ele, index) => {
        if (contain.includes(ele));
        return ele;
    })
}

function setDisplay(element, value) {
    element.style.display = value;
}

function getDisplay(element) {
    return element.style.display;
}

function destToParent(destItem) {
    return destItem.parentElement.parentElement.parentElement;
}

function existInDeparture(ele, array) {
    for (let i = 0; i < array.length; i++) {
        let scheduleItem = array[i];
        if (ele === scheduleItem) {
            ele.dataset.match = "visible";
            break;
        } else {
            ele.dataset.match = "hidden";
        }
    }
}

function existInDestination(ele, array) {
    for (let i = 0; i < array.length; i++) {
        let scheduleItem = destToParent(array[i]);
        if (ele === scheduleItem) {
            ele.dataset.match = "visible";
            break;
        } else {
            ele.dataset.match = "hidden";
        }
    }
}

function finalCheckAfterAllHandle() {
    schedules.forEach(ele => {
        if (ele.dataset.match === "hidden") {
            setDisplay(ele, "none");
        } else {
            setDisplay(ele, "block")
        }
    })

    if ((combineFilter.departure !== '' && currentSchedules.dep.length === 0)
        || (combineFilter.destination !== '' && currentSchedules.dest.length === 0)
    ) {
        noneResult();
    }
}