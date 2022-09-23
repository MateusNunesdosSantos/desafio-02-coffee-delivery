import { ReactNode } from "react"
import { RegularText } from "../../../../components/Header/Typography"
import { SectionTitleContainer } from "./styles"

interface SectionTitleProps {
    title: string
    subtitle: string
    icon: ReactNode
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
    return (
        <SectionTitleContainer>
            {icon}
            <div>
                <RegularText color="subtitle">
                    {title}
                </RegularText>
                <RegularText color="text">
                    {subtitle}
                </RegularText>
            </div>
        </SectionTitleContainer>
    )
}