switch(n) {
    case (contact[0] === eachContact[0] && contact[1] === eachContact[1]): //nome igual e numero igual
        alert('Esse número já foi definido para esse contato');
        break;
    case (contact[0] === eachContact[0] && contact[1] !== eachContact[1]): //nome igual número diferente
        alert('Esse nome já foi atribuído para esse número');
        break;
    default: 
        allContactsArray.push(contact);
}




function makeAllContactsArray(contact) {
    if (allContactsArray == 0) {
        allContactsArray.push(contact);
    } else {
        for (let i = 0; i < allContactsArray.length; i++) {
        if (allContactsArray[i][0] === contact[0] ) {
            console.log(`O nome ${contact[0]} já está na lista`);
        }
        console.log(allContactsArray[i][1]);
        }
    }
}