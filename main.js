let contacts = [];

function getValue(fieldName) {
    return document.getElementById(fieldName).value;
}

function getNewContact() {
    const formValue = { 
        name: getValue('name'),
        number: getValue('number'),
        email: getValue('email'),
        cep: getValue('cep')
    }
    return formValue
}

function validate(formValue) {
    const validationResult = {
        success: true,
        errors: []
    };
    contacts.forEach(contact => {
        for (const prop in formValue) {
            if (contact[prop] === formValue[prop]) {
                validationResult.success = false;
                validationResult.errors.push(
                    {
                        field: prop,
                        value: formValue[prop],
                        type: 'repetitionError'
                    }
                )
            }
        }
    })
    return validationResult
}

function renderValidationResult(validationResult) {
    cleanAndHideMessageBox();
    generateMessage(validationResult);
    showMessage();
}

function addNewContact() {
    const formValue = getNewContact();
    const validationResult = validate(formValue);
    renderValidationResult(validationResult);

    if (validationResult.success) {
        contacts.push(formValue);
        renderTable(contacts);
    }
}

function generateMessage(validationResult) {
    const errorsArray = validationResult.errors;
    const messages = [];

    function getErrorMessage(errorType, fieldName, fieldValue) {
        const errorMessagesList = {
            repetitionError: {
                name: `O nome ${fieldValue} já existe`,
                number: `O número ${fieldValue} já existe`,
                email: `O email ${fieldValue} já existe`,
                cep: `O cep já ${fieldValue} existe`
            },
            emptyFieldError: {
                name: `O campo ${fieldName} deve ser preenchido`,
                number: `O campo ${fieldName} deve ser preenchido`,
                email: `O campo ${fieldName} deve ser preenchido`,
                cep: `O campo ${fieldName} deve ser preenchido`
            }
        };

        const errorMessages = errorMessagesList[errorType];

        return errorMessages[fieldName] || '';
    }

    if (validationResult.success) {
        messages.push("O novo contato foi adicionado com sucesso");
    } else {
        errorsArray.forEach(error => {
            if (error.type === 'repetitionError') {
                const repetitionErrorMessage = getErrorMessage('repetitionError', error.field, error.value);
                messages.push(repetitionErrorMessage);
            }
            if (error.type === 'emptyFieldError') {
                const emptyFieldErrorMessage = getErrorMessage('emptyFieldError', error.field, error.value);
                messages.push(emptyFieldErrorMessage);
            }
        })
    }

    for (let i = 0; i < messages.length; i++) {
        messagesDisplay.innerHTML += `<p class="message">${messages[i]}</p>`;
    }

    return messages
}


function showMessage() {
    const messagesDisplay = document.getElementById('messagesDisplay');
    messagesDisplay.style.display = "flex";
    messagesDisplay.classList.add('show');
}

function cleanAndHideMessageBox() {
    const messagesDisplay = document.getElementById('messagesDisplay');
    messagesDisplay.style.display = "none";
    messagesDisplay.innerHTML = "";
}

function loadContacts() {
    contacts = [
        { 
            name: "João",
            number: "1111111",
            email: "joaosportugal@hotmail.com",
            cep: "22.780-792"
        },
        { 
            name: "Bruno",
            number: "22222222",
            email: 'brunoreis@gmail.com',
            cep: '09.099-94'
        },
        { 
            name: "Paulo",
            number: "3333333",
            email: 'paulo@yahoo.com.br',
            cep: '22.792-780'
        },
    ];
}

function renderTable(contacts) {
    const contactList = document.getElementById('bodyTable');
    contactList.innerHTML = "";
    contacts.forEach(
        ({ name, number, email, cep }) => {
            contactList.innerHTML +=
                `<tr class= "contact">
                        <td class= "name">${name}</td>
                        <td class= "number">${number}</td>
                        <td class= "email">${email}</td>
                        <td class= "cep">${cep}</td>
                    </tr>`;
        }
    )
}

function addSubmitButtonListener() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', addNewContact);
}



loadContacts();
renderTable(contacts);
addSubmitButtonListener();