import React, { useState, useEffect } from 'react'
import { MessageFilled } from '@ant-design/icons'
function Card({ card }) {
    let term = card
    console.log("term i s", term.length)



    return (
        <div className='card-container'>
            <div><MessageFilled
                style={{
                    color: 'grey',
                    fontSize: '24px',
                    height: '30px',
                    width: '30px',
                }} /></div>
            <div style={{ marginLeft: 30 }}>{card}</div>
        </div>

    )
}

export default Card