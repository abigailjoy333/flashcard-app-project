import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import DeckForm from "./DeckForm"
import Breadcrumb from "../Common/Breadcrumb"
import { readDeck, updateDeck } from "../../utils/api"

function EditDeck() {
    const initialFormState = {
        name: "",
        description: ""
    }

    const [deck, setDeck] = useState({...initialFormState})
    const history = useHistory()
    const { deckId } = useParams()

    useEffect(() => {
        async function loadDeck() {
            try {
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error
                }
            }
        }
        loadDeck()
    }, [deckId])

    const handleChange = ({ target }) => {
        setDeck({...deck, [target.name]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        async function updateDeckData() {
            await updateDeck(deck)
            history.push(`/decks/${deck.id}`)
        }
        updateDeckData()
    }

    return (
        <div>
            <Breadcrumb link={`/decks/${deckId}/edit`} linkName={deck.name} pageName={"Edit"} />
            <div className="container">
                <div className="row">
                    <h1>Edit Deck</h1>
                    <br />
                </div>
                <div className="row w-100">
                    <DeckForm formData={deck} handleChange={handleChange} handleSubmit={handleSubmit}/>
                </div>
                <div className="row">
                    <Link to={`/decks/${deckId}`}><button className="btn btn-secondary mr-1">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditDeck