let contacts = [];

function getValue(fieldName) {
    return document.getElementById(fieldName).value;
}

function highlight() {
    const existingNames = document.querySelectorAll('.name');
    const existingNumbers = document.querySelectorAll('.number');
    existingNames.forEach(existingName => {
        if (existingName.innerHTML === getValue('name')) {
            existingName.classList.add('highlight');
        }
    })
    existingNumbers.forEach(existingNumber => {
        if (existingNumber.innerHTML === getValue('number')) {
            existingNumber.classList.add('highlight');
        }
    })
}

function undoHighlight() {
    const highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(element => element.classList.remove('highlight'));
};

function validate(contacts, formName, formNumber) {

    const errors = { name: 0, number: 0 };
    const sameName = ({ name }) => name == formName
    const sameNumber = ({ number }) => number == formNumber

    if (contacts.find(sameName)) {
        undoHighlight();
        highlight();
        errors.name = 'Esse nome já existe';
    }
    if (contacts.find(sameNumber)) {
        undoHighlight();
        highlight();
        errors.number = 'Esse número já existe';
    }
    return errors

}

function loadContacts() {
    contacts = [
        { name: "João", number: "1111111" },
        { name: "Bruno", number: "22222222" },
        { name: "Paulo", number: "3333333" },
    ];
}

function renderTable(contacts) {
    const contactList = document.getElementById('bodyTable');
    contactList.innerHTML = "";
    contacts.forEach(
        ({ name, number }) => {
            contactList.innerHTML +=
                `<tr class= "contact">
                        <td class= "name">${name}</td>
                        <td class= "number">${number}</td>
                    </tr>`;
        }
    )
}

function addNewLine(contacts, name, number) {
    cleanErrorMessages();
    contacts.push({ name, number });
    renderTable(contacts);
}

function cleanErrorMessages() {
    const nameErrorMessage = document.getElementById('nameErrorMessage');
    const numberErrorMessage = document.getElementById('numberErrorMessage');
    nameErrorMessage.style.display = 'none';
    numberErrorMessage.style.display = 'none';
}

function showErrorMessages(nameValidationResult, numberValidationResult) {
    cleanErrorMessages();
    const nameErrorMessage = document.getElementById('nameErrorMessage');
    const numberErrorMessage = document.getElementById('numberErrorMessage');

    if (nameValidationResult != 0) {
        nameErrorMessage.innerHTML = nameValidationResult
        nameErrorMessage.style.display = 'flex';
    }
    if (numberValidationResult != 0) {
        numberErrorMessage.innerHTML = numberValidationResult;
        numberErrorMessage.style.display = 'flex';
    }
}

function readFormAndAddNewLine() {
    const name = getValue('name');
    const number = getValue('number');
    const validationResults = validate(contacts, name, number);
    const nameValidationResult = validationResults.name
    const numberValidationResult = validationResults.number
    const hasValidationError = (nameValidationResult != 0 || numberValidationResult != 0);
    hasValidationError ? showErrorMessages(nameValidationResult, numberValidationResult) : addNewLine(contacts, name, number);
}

function addSubmitButtonListener(contacts) {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', readFormAndAddNewLine);
}

loadContacts();
renderTable(contacts);
addSubmitButtonListener();

