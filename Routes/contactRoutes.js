const express = require("express");
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../Controllers/contactController");
const validateToken = require("../Middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact)

module.exports = router;