import { createContext, ReactNode, useEffect, useState } from "react";
import { Coffee } from "../pages/home/components/CoffeeCard";
import { produce } from 'immer'


export interface CartItem extends Coffee {
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    cartQuantity: number
    cartItemsTotal: number
    addCoffeToCart: (coffee: CartItem) => void
    changeCartItemQuantity: (cartItemId: number, type: 'increase' | 'decrease') => void
    removeCartItem: (cartItemId: number) => void
    cleanCart: () => void
}

interface CartContextProviderProps {
    children: ReactNode
}

const COFFEE_ITEMS_STORAGE_KEY = 'coffeeDelivery:cartItems'

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storageCartItmes = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)
        if (storageCartItmes) {
            return JSON.parse(storageCartItmes)
        }
        return []
    })

    const cartQuantity = cartItems.length

    const cartItemsTotal = cartItems.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity
    }, 0)

    function addCoffeToCart(coffee: CartItem) {
        const coffeAlreadyExistesInCart = cartItems.findIndex(
            (cartItem) => cartItem.id === coffee.id
        )

        const newCart = produce(cartItems, (draft) => {
            if (coffeAlreadyExistesInCart < 0) {
                draft.push(coffee)
            } else {
                draft[coffeAlreadyExistesInCart].quantity += coffee.quantity
            }
        })

        setCartItems(newCart)
    }

    function changeCartItemQuantity(cartItemId: number, type: 'increase' | 'decrease') {
        const newCart = produce(cartItems, (draft) => {
            const coffeeExistesInCart = cartItems.findIndex(cartItem => cartItem.id === cartItemId)

            if (coffeeExistesInCart >= 0) {
                const item = draft[coffeeExistesInCart]
                draft[coffeeExistesInCart].quantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1
            }


        })
        setCartItems(newCart)
    }
    function removeCartItem(cartItemId: number) {
        const newCart = produce(cartItems, darf => {
            const coffeeExistesInCart = cartItems.findIndex(cartItem => cartItem.id === cartItemId
            )
            if (coffeeExistesInCart >= 0) {
                darf.splice(coffeeExistesInCart, 1)
            }
        })
        setCartItems(newCart)

    }

    function cleanCart() {
        setCartItems([])
    }

    useEffect(() => {
        localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
    }, [cartItems])
    return (
        <CartContext.Provider value={{
            cartItems, addCoffeToCart, cartQuantity, changeCartItemQuantity,
            removeCartItem, cartItemsTotal, cleanCart
        }}>
            {children}
        </CartContext.Provider>
    )
}