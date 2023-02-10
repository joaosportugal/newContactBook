let contacts = [];

function getValue(fieldName) {
    return document.getElementById(fieldName).value;
}

// function highlight() {
//     const existingNames = document.querySelectorAll('.name');
//     const existingNumbers = document.querySelectorAll('.number');
//     existingNames.forEach(existingName => {
//         if (existingName.innerHTML === getValue('name')) {
//             existingName.classList.add('highlight');
//         }
//     })
//     existingNumbers.forEach(existingNumber => {
//         if (existingNumber.innerHTML === getValue('number')) {
//             existingNumber.classList.add('highlight');
//         }
//     })
// }

// function undoHighlight() {
//     const highlighted = document.querySelectorAll('.highlight');
//     highlighted.forEach(element => element.classList.remove('highlight'));
// };

function highlight(contacts, inputInvalid) {
    const name = getValue('name');
    const number = getValue('number');
    
    for (const contact in contacts) {
        if (contacts[contact].name === inputInvalid.name) {
            console.log(contacts[contact]);
        } 
        if (contacts[contact].number === inputInvalid.number) {
            console.log(contacts[contact].number);
        }
    }
}

function validate(contacts, formName, formNumber) {
    const validationMessages = {};
    const inputInvalid = {};
    const validationResult = {inputInvalid, validationMessages};
    const sameName = contacts.find(({ name }) => name == formName);
    const sameNumber = contacts.find(({ number }) => number == formNumber);

    if (sameName === undefined && sameNumber === undefined) {
        contacts.push({name: formName, number: formNumber});
        renderTable(contacts);
        validationMessages.success = `O novo contato foi adicionado`;
    } 
    if (sameName !== undefined) {
        validationMessages.nameError = `O nome ${formName} já existe`;
        inputInvalid.name = formName;
    }
    if (sameNumber !== undefined) {
        validationMessages.numberError = `O número ${formNumber} já existe`;
        inputInvalid.number = formNumber;
    }

    return validationResult
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

function printMessages() {
    undoPrintMessages();
    const name = getValue('name');
    const number = getValue('number');
    const messages = validate(contacts, name, number).validationMessages;
    const invalidData = validate(contacts, name, number).inputInvalid;
    const messagesDisplay = document.getElementById('messagesDisplay');

    highlight(contacts, invalidData);

    for (const message in messages) {
        // console.log(messages[message]);
        messagesDisplay.innerHTML += `<p class="message">${messages[message]}</p>`
    }
}

function undoPrintMessages() {
    const messagesDisplay = document.getElementById('messagesDisplay');
    while (messagesDisplay.firstChild) {
        messagesDisplay.removeChild(messagesDisplay.firstChild);
    }
}

function addSubmitButtonListener(contacts) {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', printMessages);
}

loadContacts();
renderTable(contacts);
addSubmitButtonListener();



