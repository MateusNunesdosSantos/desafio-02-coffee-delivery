import { RegularText, TitleText } from "../../components/Header/Typography";
import { OrderConfirmedContainer, OrderDetaisContainer } from "./styles";
import confirmedOrderIllustration from '../../assets/confirmed-order.svg'
import { InfoWithIcon } from "../../components/InfoWithIcon";
import { Clock, CurrencyDollar, MapPin } from "phosphor-react";
import { useTheme } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderData } from "../CompleteOrder";
import { paymentMethods } from "../CompleteOrder/components/CompleteOrderForm/PaymentMethodOptions";
import { useEffect } from "react";


interface LocationType {
    state: OrderData
}

export function OrderConfirmed() {
    const { colors } = useTheme()

    const { state } = useLocation() as unknown as LocationType

    const navidate = useNavigate()

    useEffect(() => {
        if (!state) {
            navidate('/')
        }
    }, [])

    if (!state) return <></>

    console.log(state)
    return (
        <OrderConfirmedContainer className="container">
            <div>
                <TitleText size="l">Uhu! Pedido confirmado</TitleText>
                <RegularText size="l" color="subtitle">Agora é só agurdar que logo o café chegara até você</RegularText>
            </div>

            <section>
                <OrderDetaisContainer>
                    <InfoWithIcon
                        icon={<MapPin width='fill' />}
                        iconBg={colors["brand-purple"]}
                        text={
                            <RegularText>
                                Entrega em <strong>{state.street}, {state.number}</strong>
                                <br />
                                {state.district} - {state.city}, {state.uf}
                            </RegularText>
                        }
                    />
                    <InfoWithIcon
                        icon={<Clock width='fill' />}
                        iconBg={colors["brand-yellow"]}
                        text={
                            <RegularText>
                                Previsão de entrega
                                <br />
                                <strong> 20 min - 30 min</strong>
                            </RegularText>
                        }
                    />
                    <InfoWithIcon
                        icon={<CurrencyDollar width='fill' />}
                        iconBg={colors["brand-yellow-dark"]}
                        text={
                            <RegularText>
                                Pagamento na entrega
                                <br />
                                <strong>{paymentMethods[state.paymentMethod].label}</strong>
                            </RegularText>
                        }
                    />
                </OrderDetaisContainer>

                <img src={confirmedOrderIllustration} />
            </section>
        </OrderConfirmedContainer>
    )
}