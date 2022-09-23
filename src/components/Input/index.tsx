import { forwardRef, InputHTMLAttributes } from "react";
import { RegularText } from "../Header/Typography";
import { InputStyle, InputStyleContainer, InputWrapper, RightText } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string
    rightText?: string

}


export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, className, rightText, ...props }, ref) => {
        return (
            <InputWrapper className={className}>
                <InputStyleContainer hasError={!!error}>
                    <InputStyle  {...props} ref={ref} />
                    {rightText && <RightText>{rightText}</RightText>}
                </InputStyleContainer>
                {error && <RegularText size="s">{error}</RegularText>}
            </InputWrapper>
        )
    }
)