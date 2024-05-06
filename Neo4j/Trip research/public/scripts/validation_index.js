let formVal = document.querySelector('.main-form');
let submitButton = document.querySelector('.form-submit-button');
let errorBox = document.querySelector('.error-list');

let dataBooking = {};

let formValidation = () => {
    let inputFields = formVal.querySelectorAll('input:not(input[type="submit"])');
    let allErrorMessages = [];
    inputFields.forEach(input => {
        switch (input.getAttribute('type')) {
            case 'text':
                var { result, errorMessage } = textValidation(input, allErrorMessages);
                break;

            case 'date':
                var { result, errorMessage } = dateValidation(input, allErrorMessages);
                break;

            default:
                console.log('Completed validation form');
                break;
        }
    })

    if (existError(allErrorMessages)) {
        handleErrorMessages(allErrorMessages);
    } else {
        removeErrorMessages();
        getDataForLocalStorage(dataBooking);
        location.href = 'http://localhost:3000/views/bookingStep2.html';
    }
}

submitButton.onclick = (e) => {
    e.preventDefault();
    formValidation();
};

let radioValidation = (radio, allError) => {
    const state = {
        result: true,
        errorMessage: '',
    };

    return state;
}

let textValidation = (inputField, allError) => {
    const state = {
        result: true,
        errorMessage: '',
    };

    if (inputField.value === '') {
        state.result = false;

        if (inputField.id === 'route-departure') {
            state.errorMessage = 'Vui lòng chọn điểm đi...';
        } else {
            state.errorMessage = 'Vui lòng chọn điểm đến...';
        }
    }

    // Nếu value không tồn tại trong mảng result thì log out luôn

    addNewError(allError, state.errorMessage);

    return state;
}

let dateValidation = (inputField, allError) => {
    const state = {
        result: true,
        errorMessage: '',
    };

    if (inputField.value === '' && inputField.disabled === false) {
        state.result = false;

        if (inputField.id === 'date-departure') {
            state.errorMessage = 'Vui lòng chọn ngày đi...';
        } else {
            state.errorMessage = 'Vui lòng chọn ngày về...';
        }
    }

    addNewError(allError, state.errorMessage);

    return state;
}

let addNewError = (errorContain, error) => {
    errorContain.push(error);
}

let existError = (errorContain) => {
    let flag = false;
    for (let index = 0; index < errorContain.length; index++) {
        if (errorContain[index] !== '') {
            flag = true;
            break;
        }
    }
    return flag;
}

let removeErrorMessages = () => {
    errorBox.parentElement.classList.remove('error-validation-active');
}

let handleErrorMessages = (errorContain) => {
    errorBox.innerHTML = errorContain.map(error => {
        return `<li class="error-item">${error}</li>`
    }).join('');

    errorBox.parentElement.classList.add('error-validation-active');

    let timeAdd = setTimeout(() => {
        errorBox.parentElement.classList.remove('error-validation-active');
    }, 5000);

}

let getDataForLocalStorage = (data) => {
    let departure = document.querySelector('#route-departure').value;
    let destination = document.querySelector('#route-destination').value;
    let startDate = document.querySelector('#date-destination').value;
    let backDateField = document.querySelector('#date-destination');
    let isRoundTrip = !(backDateField.disabled);
    let backDate = '';

    if (isRoundTrip) {
        backDate = backDateField.value
    } else {
        backDate = '';
    }

    data = {
        ...{
            isRoundTrip,
            departure,
            destination,
            startDate,
            backDate
        }
    }

    window.localStorage.setItem('dataBooking', JSON.stringify(data));
}