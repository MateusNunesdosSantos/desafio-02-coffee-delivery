import { CompleteOrderForm } from "./components/CompleteOrderForm";
import { SelectedCoffees } from "./components/SelectedCoffees";
import { CompleteOrderContainer } from "./styles";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

enum PaymentMethod {
    credit = 'credit',
    debit = 'debit',
    money = 'money'
}

const confirmOrderFormValidadtionSchema = zod.object({
    cep: zod.string().min(1, 'Informe o CEP'),
    street: zod.string().min(1, "Informe o Rua"),
    number: zod.string().min(1, "Informe o Número"),
    complement: zod.string(),
    district: zod.string().min(1, "Informe o Bairro"),
    city: zod.string().min(1, "Informe a Cidade"),
    uf: zod.string().min(1, "Informe a UF"),
    paymentMethod: zod.nativeEnum(PaymentMethod, {
        errorMap: () => {
            return { message: 'Informe o método de pagamento' }
        }
    })
});

export type OrderData = zod.infer<typeof confirmOrderFormValidadtionSchema>

type ConfirmOrderFormData = OrderData

export function CompleteOrder() {
    const confirmOrderForm = useForm<ConfirmOrderFormData>({
        resolver: zodResolver(confirmOrderFormValidadtionSchema)
    })

    const { handleSubmit } = confirmOrderForm

    const navigate = useNavigate()

    const { cleanCart } = useCart()

    function handleConfirmOrder(data: ConfirmOrderFormData) {
        console.log(data)
        navigate("/orderConfirmed", {
            state: data
        })

        cleanCart()
    }



    return (
        <FormProvider {...confirmOrderForm}>
            <CompleteOrderContainer className="container" onSubmit={handleSubmit(handleConfirmOrder)}>
                <CompleteOrderForm />
                <SelectedCoffees />
            </CompleteOrderContainer>
        </FormProvider>
    )
}

function PaymentMethods(PaymentMethods: any, arg1: { errorMap: () => { message: string; }; }): zod.ZodNativeEnum<any> {
    throw new Error("Function not implemented.");
}
