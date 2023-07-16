import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
    return (
        <main className='Missing' style={{color: "white"}}>
            <p>Page Not Found</p>
            <p>Well that's disappointing</p>
            <p>
                <Link to="/">Visit Our Homepage</Link>
            </p>
        </main>
    )
}

export default Missing