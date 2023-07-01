import React from "react"
import DeckList from "../Decks/DeckList"
import { Link } from "react-router-dom"

function Home({ decks, setDecks }) {
    return (
        <div>
            <div>
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <br />
            <DeckList decks={decks} setDecks={setDecks}/>
        </div>
    )
}

export default Home
