import React from 'react'

function Description({ description }: { description: string }) {
    return (
        <div className="mt-4">
            <p className="text-lg font-light">
                {description}
            </p>
        </div>)
}

export default Description