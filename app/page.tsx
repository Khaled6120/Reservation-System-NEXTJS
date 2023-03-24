import Header from './components/Header'
import RestaurantCards from './components/RestaurantCards'
import { PrismaClient, Cuisine, Location, PRICE } from '@prisma/client'


export interface RestaurantCartType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location
  price: PRICE,
  slug: string
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCartType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true
    }

  })
  return restaurants
}

export default async function Home() {
  const restaurants = await fetchRestaurants()
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(restaurant => (
          <RestaurantCards restaurant={restaurant} />
        ))}

      </div>
    </main>


  )
}
