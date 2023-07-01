import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import CardForm from "./CardForm"
import Breadcrumb from "../Common/Breadcrumb"
import { readDeck, readCard, updateCard } from "../../utils/api"

function EditCard() {
    const { deckId, cardId } = useParams()
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    //load deck and card
    useEffect(() => {
        const loadDeck = async () => setDeck(await readDeck(deckId))
        loadDeck()
        const loadCard = async () => setCard(await readCard(cardId))
        loadCard()
    }, [deckId, cardId])

    //create change handler form
    const handleChange = ({ target }) => {
        setCard({ ...card, [target.name]: target.value })
    }

    //create submit handler
    const handleSubmit = (event) => {
        event.preventDefault()
        async function updateCardData() {
            try {
                await updateCard(card)
                history.push(`/decks/${deckId}`)
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error
                }
            }
        }
        updateCardData()
    }

    return (
        <div>
            <Breadcrumb link={`/decks/${deckId}`} linkName={`Deck ${deck.name}`} pageName={`Edit Card ${cardId}`} />
            <div className="row w-100">
                <CardForm formData={card} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
            <div className="row w-100">
                <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-1">Cancel</Link>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default EditCard