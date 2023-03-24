import { PrismaClient } from '@prisma/client'
import React from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import RestaurantNavBar from '../components/RestaurantNavBar'

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            Items: true
        }
    })

    if (!restaurant) throw new Error

    return restaurant.Items
}

async function RestaurantMenu({ params }: { params: { slug: string } }) {
    const menu = await fetchRestaurantMenu(params.slug)
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug} />
                <Menu menu={menu} />
            </div>

        </>

    )
}

export default RestaurantMenu