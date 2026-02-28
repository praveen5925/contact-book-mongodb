const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

// Add Contact
router.post('/', async (req, res) => {
    const contact = new Contact(req.body)
    await contact.save()
    res.json(contact)
})

// Get All Contacts
router.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.json(contacts)
})

// Search Contact
router.get('/search/:name', async (req, res) => {
    const contacts = await Contact.find({
        name: { $regex: req.params.name, $options: 'i' }
    })
    res.json(contacts)
})

// Delete
router.delete('/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

module.exports = router