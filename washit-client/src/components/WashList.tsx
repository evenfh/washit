import React from 'react'

function WashList() {
    const wash_list = [
        {
            type: "Kokvask",
            time: 90,
            degrees: 60
        },
        {
            type: "Tøyvask",
            time: 60,
            degrees: 40
        },
        {
            type: "Håndvask",
            time: 30,
            degrees: 20
        }
    ]

    return (
        <div>WashList</div>
    )
}

export default WashList