import React from 'react'
import ChatCard from './ChatCard'
function History({ messages }) {
    return (
        <div>

            {
                messages.map((obj) => (
                    <ChatCard
                        card={obj.text}
                        key={obj.index}
                    />
                ))
            }
        </div>
    )
}

export default History