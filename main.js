let contacts = [];

function getValue(fieldName) {
    return document.getElementById(fieldName).value;
}

function validate(contacts, formName, formNumber) {
    contacts = Array.from(contacts);
    const allNames = contacts.map(contact => contact.name)
    const allNumber = contacts.map(contact => contact.number)
    const invalidName = allNames.filter(name => name === formName);
    const invalidNumber = allNumber.filter(number => number === formNumber);
    const validationResult = {};
    if (invalidName.length) {
        validationResult.invalidName = invalidName[0];
    }
    if (invalidNumber.length) {
        validationResult.invalidNumber = invalidNumber[0];
    }
    return validationResult
}

function readValidationResultAndRun() {
    undoPrintMessage();
    renderTable(contacts);
    const name = getValue('name');
    const number = getValue('number');
    const validationResult = validate(contacts, name, number);
    const invalidName = validationResult.invalidName;
    const invalidNumber = validationResult.invalidNumber;
    if (Object.keys(validationResult).length > 0) {
        if (invalidName && invalidNumber) {
            printMessage(`O nome ${invalidName} já existe`);
            printMessage(`O número ${invalidNumber} já existe`);
            highlight(invalidName);
            highlight(invalidNumber);
        } else if (invalidName) {
            printMessage(`O nome ${invalidName} já existe`);
            highlight(invalidName);
        } else if (invalidNumber) {
            printMessage(`O número ${invalidNumber} já existe`);
            highlight(invalidNumber);
        }
    } else {
        addContact(name, number);
        printMessage('O contato foi adicionado com sucesso');
        renderTable(contacts);
    }
}

function addContact(formName, formNumber) {
    const newContact = {name: formName, number: formNumber}
    contacts.push(newContact);
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
    undoHighlight();
}

function printMessage(message) {
    const messagesDisplay = document.getElementById('messagesDisplay');
    messagesDisplay.innerHTML += `<p class="message">${message}</p>`
}

function undoPrintMessage() {
    const messagesDisplay = document.getElementById('messagesDisplay');
    while (messagesDisplay.firstChild) {
        messagesDisplay.removeChild(messagesDisplay.firstChild);
    }
}

function highlight(element) {
    contacts.forEach( contact => {
        const printedContacts = document.querySelectorAll('.contact');
        const indexContact = contacts.indexOf(contact);
        const printedName = printedContacts[indexContact].querySelector('.name');
        const printedNumber = printedContacts[indexContact].querySelector('.number');
        if (contact.name === element) {
            printedName.classList.add('highlight');
        } 
        if (contact.number === element) {
            printedNumber.classList.add('highlight');
        }
    })
}

function undoHighlight() {
    const printedContacts = document.querySelectorAll('.contact');
    printedContacts.forEach(contact => {
        const data = contact.querySelectorAll('*');
        for (let i = 0; i < data.length; i++) {
            let dataClassList = data[i].classList;
            dataClassList.remove('highlight');
        }
    })
}

function addSubmitButtonListener(contacts) {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', readValidationResultAndRun);
}

loadContacts();
renderTable(contacts);
addSubmitButtonListener();




