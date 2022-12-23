// let names = [];
// let numbers = [];

function getValue (fieldName) {
    return document.getElementById(fieldName).value;
}


(function run() {

    let contacts = [];

    function contactExists(contacts, formName, formNumber) {
        const isEqual = ({name, number})=> name == formName && number == formNumber  
        return contacts.find(isEqual)
    }

    function validate(contacts, formName, formNumber) {
        console.log(formName, formNumber);
        const errors = [];
        const existingContact = contactExists(contacts, formName, formNumber)
        if(existingContact) {
            errors.push('Esse contato já existe')
        } else {
            //const existingName = nameExists....
            // if(existingName) {
            //     errors.push('Esse nome já existe no contato.....')
            // }
            //const existingNumber = numberExists....
            // if(existingNumber) {
            //     errors.push('Esse número já existe no contato.....')
            // }
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
                    `<tr>
                        <td>${name}</td>
                        <td>${number}</td>
                    </tr>`;
            }
        )
    }

    function addNewLine(contacts, name, number) {
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
        const hasValidationError = validationResults.length > 0
        hasValidationError ? showErrorMessages(validationResults) : addNewLine(contacts, name, number)
    }

    function addSubmitButtonListener(contacts) {
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', readFormAndAddNewLine);
    }

    loadContacts();
    renderTable(contacts);
    addSubmitButtonListener();
    
})();