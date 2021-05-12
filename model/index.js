// const fs = require("fs/promises");
// const path = require("path");
// const contactSchema = require("./validator");
const Contact = require("./contact");

// const contacts = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   try {
//     const response = await fs.readFile(contacts, "utf8");
//     const data = await JSON.parse(response);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const response = await fs.readFile(contacts, "utf8");
//     const data = await JSON.parse(response);
//     const contact = data.find((contact) => contact.id === +contactId);
//     return contact;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const response = await fs.readFile(contacts, "utf8");
//     const data = await JSON.parse(response);
//     const find = data.find((item) => item.id === +contactId);
//     const newContactsList = data.filter((contact) => contact.id !== +contactId);

//     fs.writeFile(contacts, JSON.stringify(newContactsList));
//     return find ? find : null;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const validData = await contactSchema.isValid(body);
//   if (!validData) {
//     return {
//       contact: {
//         name,
//         email,
//         phone,
//       },
//       isValid: validData,
//     };
//   } else {
//     try {
//       const response = await fs.readFile(contacts, "utf8");
//       const data = await JSON.parse(response);
//       data.push({
//         id: data.length + 1,
//         name,
//         email,
//         phone,
//       });
//       fs.writeFile(contacts, JSON.stringify(data));
//       return {
//         contact: {
//           id: data.length,
//           name,
//           email,
//           phone,
//         },
//         isValid: validData,
//       };
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const { email, name, phone } = body;
//     const list = await fs.readFile(contacts, "utf8");
//     const data = await JSON.parse(list);
//     const updatedList = data.map((item) => {
//       if (item.id !== +contactId) {
//         return item;
//       } else {
//         return {
//           id: +contactId,
//           name: name ? name : item.name,
//           email: email ? email : item.email,
//           phone: phone ? phone : item.phone,
//         };
//       }
//     });
//     await fs.writeFile(contacts, JSON.stringify(updatedList));
//     return updatedList.find((item) => item.id === +contactId)
//       ? updatedList.find((item) => item.id === +contactId)
//       : null;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = {
  // listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
  Contact,
};
