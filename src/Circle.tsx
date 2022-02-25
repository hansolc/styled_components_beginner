import styled from 'styled-components';

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%;
    border-color: ${props => props.borderColor};
    border: 1px solid;
`

interface CircleProps {
    bgColor: string;
    borderColor?: string;
}

function Circle({bgColor, borderColor}: CircleProps) {
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>

        </Container>
    )
}

export default Circle;