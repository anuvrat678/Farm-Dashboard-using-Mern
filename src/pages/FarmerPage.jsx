import React from 'react'
import {farmer} from '../data.js'
import Farmer from '../components/Farmer.jsx'

const FarmerPage = () => {
    return (
        <div>
            <div style={{ border: '2px solid black', borderRadius: '10px' }}>
                <h2>
                    Farms Detail
                </h2>
            </div>

            {farmer.map((e, i) =>
                (<Farmer key={i} {...e} />)
            )}
        </div>
    )
}

export default FarmerPage