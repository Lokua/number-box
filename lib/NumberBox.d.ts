type Override<T, U> = Omit<T, keyof U> & U;
export type Props = Override<React.InputHTMLAttributes<HTMLInputElement>, {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    pixelRange?: number;
}>;
export default function NumberBox({ value, min, max, step, pixelRange, onChange, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export {};
