

const remoteURL = "http://localhost:5002"

export default {


    get(page, id) {
        return fetch(`${remoteURL}/${page}/${id}`)
            .then(r => r.json())
    },

    getAll(page) {
        return fetch(`${remoteURL}/${page}`)
            .then(r => r.json())
    },

    post(page, newItem) {
        return fetch(`${remoteURL}/${page}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(r => r.json())
    },

    put(page, id, editedItem) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(r => r.json())
    },

    delete(page, id) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "DELETE",
        }).then(r => r.json())
    }

}
