const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
//@desc Get all contacts
//@route GET/api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET/api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found...");
  }
  res.status(200).json(contact);
});

//@desc Create a contacts
//@route POST/api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required...");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  console.log(req.body);
  res.status(201).json(contact);
});

//@desc Update a contact
//@route PUT/api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact =await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contct not found...");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have permission to update other user contact")
    }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Update a contact
//@route UPDATE/api/contacts
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User don't have permission to delete other user contact")

    }
  const deletedContact = await Contact.deleteOne(contact);
  res.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
