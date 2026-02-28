const API = "http://localhost:5000/api/contacts"

async function addContact() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value

    await fetch(API, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name,email,phone})
    })

    loadContacts()
}

async function loadContacts() {
    const res = await fetch(API)
    const data = await res.json()

    const list = document.getElementById('contactList')
    list.innerHTML = ''

    data.forEach(c => {
        list.innerHTML += `
        <li>
            ${c.name} - ${c.email} - ${c.phone}
            <button onclick="deleteContact('${c._id}')">Delete</button>
        </li>`
    })
}

async function searchContact() {
    const name = document.getElementById('search').value
    const res = await fetch(API + "/search/" + name)
    const data = await res.json()

    const list = document.getElementById('contactList')
    list.innerHTML = ''

    data.forEach(c => {
        list.innerHTML += `<li>${c.name} - ${c.email} - ${c.phone}</li>`
    })
}

async function deleteContact(id) {
    await fetch(API + "/" + id, { method: 'DELETE' })
    loadContacts()
}

loadContacts()