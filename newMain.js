let contacts = [];

function getValue(fieldName) {
    return document.getElementById(fieldName).value;
}

function getNewContact() {
    const newContact = { 
        name: getValue('name'),
        number: getValue('number'),
        email: getValue('email'),
        cep: getValue('cep')
    }
    return newContact
}

function validate(newContact) {
    const validationResult = {};
    contacts.forEach(contact => {
        for (const prop in newContact) {
            if (contact[prop] === newContact[prop]) {
                validationResult[`${prop}Error`] = newContact[prop];
            }
        }
    })
    return validationResult
}

function addNewContact() {
    const newContact = getNewContact();
    const validationResult = validate(newContact);

    if (Object.keys(validationResult).length === 0) {
        contacts.push(newContact);
        renderTable(contacts);
        cleanAndHideMessageBox();
        generateMessage(validationResult);
        showMessage();
    } else {
        cleanAndHideMessageBox();
        generateMessage(validationResult);
        showMessage();
    }
}

function generateMessage(validationResult) {
    const errorMessages = {
        nameError: `O nome ${validationResult["nameError"]} já existe`,
        numberError: `O número ${validationResult["numberError"]} já existe`,
        emailError: `O e-mail ${validationResult["emailError"]} já existe`,
        cepError: `O cep ${validationResult["cepError"]} já existe`
    }
    const selectedMessages = [];

    if (Object.values(validationResult).length > 0) {
        for (const prop in errorMessages) {
            if (prop in validationResult) {
                selectedMessages.push(errorMessages[prop]);
            }
        }
    } else {
        selectedMessages.push("O novo contato foi adicionado com sucesso");
    }

    for (let i = 0; i < selectedMessages.length; i++) {
        messagesDisplay.innerHTML += `<p class="message">${selectedMessages[i]}</p>`;
    }

    return selectedMessages
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

document.getElementById('messagesDisplay').addEventListener('input', function() {
    console.log('olá mundo');
    // const tableMove = document.getElementById("tableMove");
    // tableMove.style.animation = "3s ease-in 1s infinite reverse both running slidein"
});