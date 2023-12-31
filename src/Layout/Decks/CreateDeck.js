import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import DeckForm from "./DeckForm"
import Breadcrumb from "../Common/Breadcrumb"
import { createDeck } from "../../utils/api"

function CreateDeck({ addDecktoStateFn }) {
    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState})
    const history = useHistory()

    //set form data with change handler
    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value})
    }

    //create new deck with submit handler
    const handleSubmit = (event) => {
        event.preventDefault()
        async function deckCreate() {
            try {
                const newDeck = await createDeck(formData)
                newDeck.cards = []
                addDecktoStateFn(newDeck)
                history.push(`/decks/${newDeck.id}`)
            } catch (error) {
                if (error !== "AbortError") {
                    throw error
                }
            }
        }
        deckCreate()
    }

    return (
        <div>
            <Breadcrumb link={`/decks/new`} pageName={"Create Deck"} />
            <div>
                <h1>Create Deck</h1>
                <br/>
                <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                <br />
                <br />
                <Link to="/"><button className="btn btn-secondary mr-1">Cancel</button></Link> 
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
        </div>
    )
}

export default CreateDeck