import React, { useState } from "react"
import { useHistory, Link, useParams } from "react-router-dom"

function StudyCard({cards}) {
    const initialState = {
        onBack: false,
        currentCard: 0,
    }

    const { deckId } = useParams()
    const history = useHistory()
    const [studySession, setStudySession] = useState({...initialState})

    //go to next card until last is reached
    const handleNext = () => {
        if (studySession.currentCard < cards.length -1) {
            setStudySession({
                ...studySession,
                currentCard: studySession.currentCard + 1,
                onBack: false,
            })
        } else {
            const confirm = window.confirm("Restart cards? Click cancel to return to the home page.")
            if (confirm) {
                setStudySession(initialState)
            } else {
                history.push("/")
            }
        }
    }

    const handleFlip = () => {
        if (studySession.onBack) {
            setStudySession({...studySession, onBack: true})
        } else {
            setStudySession({...studySession, onBack:true})
        }
    }

    if (cards.length > 2) {
        return (
            <div className="container">
                <div className="card w-100">
                    <div className="card-body">
                        <h4 className="card-title">Card {studySession.currentCard + 1} of {cards.length}</h4>
                        <p className="card-text font-weight-lighter">
                            {studySession.onBack ? cards[studySession.currentCard].back : cards[studySession.currentCard].front}
                        </p>
                        <button className="btn btn-secondary mr-1" onClick={handleFlip}>Flip</button>
                        {studySession.onBack && (
                            <button className="btn btn-primary" onClick={handleNext}>Next</button>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Not Enough Cards.</h3>
                <div className="row my-2">
                    <p>You need at least 3 cards to study. This deck has {cards} cards.</p>
                </div>
                <div className="row">
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <button className="btn btn-primary"><i class="bi bi-plus mr-1"></i>Add Card</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default StudyCard