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
        showMessage(successMessage);
    } else {
        showMessage(validationResult);
    }
}
function generateMessage(validation) {
    const errorMessages = [];
    for (const error in validation) {
        errorMessages.push(`${validation[error]} já existe`);
    }
    return errorMessages
}

function showMessage(message) {
    const allMessages = generateMessage(message);
    const messagesDisplay = document.getElementById('messagesDisplay');
    messagesDisplay.style.display = "flex";
    for (let i = 0; i < allMessages.length; i++) {
        messagesDisplay.innerHTML += `<p class="message">${allMessages[i]}</p>`;
        console.log(allMessages[i]);
    }
    
}

// function printMessage(message) {
//     const messagesDisplay = document.getElementById('messagesDisplay');
//     const closeButtonId = 'closeButton';
//     messagesDisplay.innerHTML += 
//     `<p class="message">${message}</p>
//     <button id="${closeButtonId}">
//     <img src="./icons/close_button.svg" alt="Fechar Mensagem">
//     </button>`
//     messagesDisplay.style.display = "flex";
// }

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
                        <td class= "number">${email}</td>
                        <td class= "number">${cep}</td>
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
