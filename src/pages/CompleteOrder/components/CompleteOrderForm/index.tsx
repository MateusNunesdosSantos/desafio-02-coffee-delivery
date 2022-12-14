import { CurrencyDollar, MapPinLine } from "phosphor-react";
import { useTheme } from "styled-components";
import { TitleText } from "../../../../components/Header/Typography";
import { SectionTitle } from "../SectionTitle";
import { AddressForm } from "./AdderssForm";
import { PaymentMethodOptions } from "./PaymentMethodOptions";
import { CompleteOrderFormContainer, FormSectionContainer } from "./styles";

export function CompleteOrderForm() {
    const { colors } = useTheme()
    return (
        <CompleteOrderFormContainer>
            <TitleText size="xs" color="subtitle">
                Complete seu Pedido
            </TitleText>
            <FormSectionContainer>
                <SectionTitle
                    title="Endereço de entrega"
                    subtitle="Inform o endereço de onde deseja receber seu pedido"
                    icon={<MapPinLine size={22} color={colors["brand-yellow-dark"]} />}
                />
                <AddressForm />
            </FormSectionContainer>

            <FormSectionContainer>
                <SectionTitle
                    title="Pagamento"
                    subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
                    icon={<CurrencyDollar size={22} color={colors["brand-purple"]} />}
                />
                <PaymentMethodOptions />
            </FormSectionContainer>
        </CompleteOrderFormContainer>
    )
}