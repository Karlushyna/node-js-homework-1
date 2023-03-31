const { listContacts, getContactById, removeContact, addContact } = require('./contacts')

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action){
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;
        case "get":
            const contact = await getContactById(id);
            console.table(contact);
            break;


    }
}


