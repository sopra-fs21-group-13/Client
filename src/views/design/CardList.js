import React from 'react'
import Card from './CardRender';

//TODO: A way of showing all the cards in a set. Could implement this on the edit page

export default function CardList({flashcards}) {
    return (
        <div>
            {flashcards.map(flashcard => {
                return <Card flashcard = {flashcard} key={flashcard.id} />
            })}
        </div>
    )
}
