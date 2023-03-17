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
                validationResult[`${prop}Error`] = formValue[prop];
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
    console.log(validationResult);
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
    const errorMessages = {
        nameError: `O nome ${validationResult["nameError"]} já existe`,
        numberError: `O número ${validationResult["numberError"]} já existe`,
        emailError: `O e-mail ${validationResult["emailError"]} já existe`,
        cepError: `O cep ${validationResult["cepError"]} já existe`
    }
    const messages = [];

    if (validationResult.success) {
        messages.push("O novo contato foi adicionado com sucesso");
    } else {
        for (const prop in errorMessages) {
            if (prop in validationResult) {
                messages.push(errorMessages[prop]);
            }
        }
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