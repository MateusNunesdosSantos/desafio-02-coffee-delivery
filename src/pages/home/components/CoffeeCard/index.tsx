import { ShoppingCart } from "phosphor-react";
import { useState } from "react";
import { RegularText, TitleText } from "../../../../components/Header/Typography";
import { QuantityInput } from "../../../../components/QuantityInput";
import { useCart } from "../../../../hooks/useCart";
import { formatMoney } from "../../../../utils/formatMoney";
import { AddCardWrapper, CardFooter, CoffeeCardContainer, Description, Name, Tags } from "./styles";

export interface Coffee {
    id: number;
    tags: string[];
    name: string;
    description: string;
    photo: string;
    price: number
}

interface CoffeeeProps {
    coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeeProps) {
    const [quantity, setQuantity] = useState(1)

    function handleIncrease() {
        setQuantity(state => state + 1)
    }

    function handleDecrease() {
        setQuantity(state => state - 1)
    }
    const { addCoffeToCart } = useCart()
    function handleAddTpCart() {
        const coffeeAdd = {
            ...coffee,
            quantity: 1
        }
        addCoffeToCart(coffeeAdd)
    }

    const formattedPrice = formatMoney(coffee.price)
    return (
        <CoffeeCardContainer>
            <img src={`/coffees/${coffee.photo}`} alt={coffee.name} />
            <Tags>
                {coffee.tags.map((tag) => (
                    <span key={`${coffee.id}${tag}`}>{tag}</span>
                ))}
            </Tags>
            <Name>
                {coffee.name}
            </Name>
            <Description>
                {coffee.description}
            </Description>
            <CardFooter>
                <div>
                    <RegularText size="s">R$</RegularText>
                    <TitleText size='m' color='text' as='strong'>
                        {formattedPrice}
                    </TitleText>
                </div>
                <AddCardWrapper>
                    <QuantityInput
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        quantity={quantity}

                    />
                    <button onClick={handleAddTpCart}>
                        <ShoppingCart size={22} weight='fill' />
                    </button>
                </AddCardWrapper>
            </CardFooter>
        </CoffeeCardContainer>
    )
}