/// <reference types="react" />
interface IProps {
    content: JSX.Element;
    onClick?: () => void;
    offsetRadius: number;
    index: number;
    animationConfig: object;
}
export default function Slide({ content, offsetRadius, index, animationConfig, onClick }: IProps): JSX.Element;
export {};
