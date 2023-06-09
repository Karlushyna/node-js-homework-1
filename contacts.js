const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const  contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

const listContacts = async() => {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(contacts);
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red)
    }
}
const getContactById = async contactId =>  {
    try {
        const contacts = await listContacts();
        const result = contacts.filter(({id}) => id === contactId);
        return result;

    }
    catch (error) {
        console.log(`Error: ${error.message}`.red)
    }
}
const removeContact = async contactId => {
    try {
        const contacts = await listContacts();
        const newContacts = contacts.filter(({id}) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return newContacts;
    }
    catch (error) {
        console.log(`Error: ${error.message}`.red)
    }
}

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        }
        const updatedContacts = [newContact, ...contacts];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        return newContact;

    }
    catch (error) {
        console.log(`Error: ${error.message}`.red)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,

}