import { PRICE, PrismaClient } from "@prisma/client"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"

const prisma = new PrismaClient()

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantByCity = (searchParams: SearchParams) => {
    const where: any = {}

    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location
    }
    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine
    }
    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price
    }

    const select = {
        name: true,
        id: true,
        main_image: true,
        cuisine: true,
        price: true,
        slug: true,
        location: true,
        reviews: true
    }


    return prisma.restaurant.findMany({
        where,
        select

    })

}


const fetchLocations = async () => {
    return prisma.location.findMany()
}

const fetchCuisines = async () => {
    return prisma.cuisine.findMany()

}


async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantByCity(searchParams)
    const location = await fetchLocations()
    const cuisine = await fetchCuisines()

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar locations={location} cuisines={cuisine} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length ?
                        restaurants.map((restaurant) => (
                            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                        ))
                        : <p>Sorry, we found no restaurants in this area!</p>}
                </div>
            </div>
        </>
    )
}

export default Search