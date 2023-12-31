import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, deleteDeck } from "../../utils/api"
import Breadcrumb from "../Common/Breadcrumb"
import CardsList from "../Cards/CardsList"

function Deck() {
    const { deckId } = useParams()
    const history = useHistory()
    const [deck, setDeck] =  useState({})

    //load deck and cards
    useEffect(() => {
        async function loadDeck() {
            if (deckId) {
                const loadedDeck = await readDeck(deckId)
                setDeck(() => loadedDeck)
            }
        }
        loadDeck()
    }, [deckId])

    //delete the deck
    const handleDeckDelete = async () => {
        const confirm = window.confirm("Delete this deck? You will not be able to recover it.")
        if (confirm) {
            await deleteDeck(deckId)
            history.push("/")
        }
    }

    if (deck.id) {
        return (
            <div>
                <Breadcrumb link={`/decks/${deckId}`} linkName={deck.name} pageName={deck.name} />
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Link to={`/decks/${deckId}/edit`}>
                            <button className="btn btn-secondary mr-1"><i class="bi bi-book mr-1"></i>Study</button>
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`}>
                            <button className="btn btn-primary"><i class="bi bi-plus mr-1"></i>Add Card</button>
                        </Link>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-danger" onClick={handleDeckDelete}><i className="bi bi-trash"></i>Delete</button>
                    </div>
                </div>
                <CardsList deck={deck} />
            </div>
        )
    }
    return "No deck here! Please create a new deck."
}

export default Deck