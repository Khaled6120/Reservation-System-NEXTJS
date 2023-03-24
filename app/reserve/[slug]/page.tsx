import React from 'react'
import Header from './components/Header'
import Form from './components/Form'
function Reserve() {
    return (
        <>
            <div className="border-t h-screen">
                <div className="py-9 w-3/5 m-auto">
                    <Header />
                    {/* FORM */}
                    <Form />
                </div>
            </div>
        </>
    )
}

export default Reserve