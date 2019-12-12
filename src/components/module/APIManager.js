import React, { Component } from 'react';

const remoteURL = "http://localhost:5002"

export default {


    get(id) {
        return fetch(`${remoteURL}/trips/${id}`)
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
        }).then(data => data.json())
    },

    put(page, id, editedItem) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json())
    },

    delete(id) {
        return fetch(`${remoteURL}/trips/${id}`, {
            method: "DELETE",
        }).then(data => data.json())
    }

}
