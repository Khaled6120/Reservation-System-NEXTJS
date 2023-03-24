import { PRICE } from '@prisma/client'

function Price({ price }: { price: PRICE }) {

    const renderPrice = () => {
        if (price === PRICE.CHEAP) {
            return (
                <>
                    <span className='text-green-500 font-semibold'>$$</span> <span className='text-gray-400'>$$</span>
                </>
            )

        } else if (price === PRICE.REGULAR) {
            return (
                <>
                    <span className='text-green-500 font-semibold'>$$$</span> <span className='text-gray-400'>$</span>
                </>
            )

        } else {
            return (
                <>
                    <span className='text-green-500 font-semibold'>$$$$</span>
                </>
            )
        }
    }
    return (
        <p className='flex mr-3'>{renderPrice()}</p>
    )
}

export default Price