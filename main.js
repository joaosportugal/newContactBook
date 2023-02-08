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

    const errors = [];
    const bothEqual = ({name, number}) => name == formName && number == formNumber
    const sameName = ({name, number}) => name == formName && number != formNumber
    const sameNumber = ({name, number}) => name != formName && number == formNumber
    

        if (contacts.find(bothEqual)) {
            undoHighlight();
            highlight();
            errors.push('Esse contato já existe');
        } else if(contacts.find(sameName)) {
            undoHighlight();
            highlight();
            errors.push('Esse nome já existe');
        } else if (contacts.find(sameNumber)) {
            undoHighlight();
            highlight();
            errors.push('Esse número já existe');
        } else {
            undoHighlight();
        }
        return errors;
        
}

    
    function loadContacts() {
        contacts = [
            {name: "João", number: "1111111"},
            {name: "Bruno", number: "22222222"},
            {name: "Paulo", number: "3333333"},
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
        const errorMessage = document.getElementById('errormessage');
        errorMessage.style.display = 'none';
        contacts.push({ name, number });
        renderTable(contacts);
    }

    function showErrorMessages(validationResults) {
        const errorMessage = document.getElementById('errormessage');
        errorMessage.style.display = 'flex';
        errorMessage.innerHTML = validationResults[0]
    }

    function readFormAndAddNewLine(){
        const name = getValue('name');
        const number = getValue('number');
        const validationResults = validate(contacts, name, number);
        const hasValidationError = validationResults.length > 0;
        hasValidationError ? showErrorMessages(validationResults) : addNewLine(contacts, name, number);
    }

    function addSubmitButtonListener(contacts) {
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', readFormAndAddNewLine);
    }

    loadContacts();
    renderTable(contacts);
    addSubmitButtonListener();

