import React from 'react'
import Header from './components/Header'

function Loading() {
    return (
        <main className='text-center text-lg h-screen text-black'>
            <Header />
            <div className='py-3 px-36'>
                <div className="py-3 px-3 mt-10 flex flex-wrap justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <div className='animate-pulse bg-slate-100 w-64 h-72 rounded overflow-hidden m-3 border cursor-pointer'></div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Loading