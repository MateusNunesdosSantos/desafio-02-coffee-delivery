import { TitleText } from "../../../../components/Header/Typography";
import { coffees } from "../../../../data/coffees";
import { CoffeeCard } from "../CoffeeCard";
import { CoffeeList, OurCoffesContainer } from "./styles";


export function OurCoffees() {
    return (
        <OurCoffesContainer className="container">
            <TitleText size="l" color="subtitle">
                Nossos cafés
            </TitleText>

            <CoffeeList>
                {coffees.map((coffee) => (
                    <CoffeeCard key={coffee.id} coffee={coffee} />
                ))}

            </CoffeeList>
        </OurCoffesContainer>
    )
}