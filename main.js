function getValue (fieldName) {
    return document.getElementById(fieldName).value;
}


(function run() {

    let contacts = [];

    function validate(contacts, formName, formNumber) {

        const errors = [];
        const bothEqual = ({name, number}) => name == formName && number == formNumber
        const sameName = ({name, number}) => name == formName && number != formNumber
        const sameNumber = ({name, number}) => name != formName && number == formNumber
        const highlighted = document.querySelectorAll('.repeatedData');
        highlighted.forEach(element => element.classList.remove('repeatedData'));

        function highlightContact(caseOfRepeatedData) {
            const indexOfRepeatedData = contacts.findIndex(caseOfRepeatedData);
            const existingContact = document.querySelectorAll('.contact');
            const repeatedData = existingContact[indexOfRepeatedData];
            const repeatedName = repeatedData.querySelector('.name');
            const repeatedNumber = repeatedData.querySelector('.number');

            repeatedName.classList.remove('repeatedData');
            repeatedNumber.classList.remove('repeatedData');

            if (contacts.find(bothEqual)) {

                repeatedName.classList.add('repeatedData');
                repeatedNumber.classList.add('repeatedData');

            } else if(contacts.find(sameName)) {

                repeatedName.classList.add('repeatedData');
                repeatedNumber.classList.remove('repeatedData');

            } else if (contacts.find(sameNumber)) {

                repeatedName.classList.remove('repeatedData');
                repeatedNumber.classList.add('repeatedData');

            }
        }

        if (contacts.find(bothEqual)) {
            highlightContact(bothEqual);
            errors.push('Esse contato já existe');
        } else if(contacts.find(sameName)) {
            highlightContact(sameName);
            errors.push('Esse nome já existe');
        } else if (contacts.find(sameNumber)) {
            highlightContact(sameNumber);
            errors.push('Esse número já existe');
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