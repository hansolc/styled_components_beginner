import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    max-width: 400px;
    margin: 0 auto;
`

const Header = styled.header`
    display: flex;
    justify-content: center;
    font-size: 32px;
`

const CoinsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Coin = styled.li`
    background-color: white;
    border-radius: 10px;
    /* height: 50px; */
    color: ${props => props.theme.bgColor};
    display: flex;
    align-items: center;
    &:hover{
        color: ${props => props.theme.accentColor}
    }

    a{
        text-decoration: none;
        color: inherit;
        padding: 10px;
        display: block;

        &:hover{
            color: ${props => props.theme.accentColor}
        }
    }
`

const Img = styled.img`
    width: 35px;
    height: 35px;
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

export default function Coins(){
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true)
    const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);

    return(
        <Container>
            <Header>Coins</Header>
            <CoinsList>
                {
                    isLoading ?
                    <span>loading...</span>
                    :
                    data?.slice(0,100).map((coin) => {
                        return (
                            <Coin key={coin.id}>
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                <Link to={{
                                    pathname: `/${coin.id}`,
                                    state: {
                                        name: coin.name
                                    }
                                }}>{coin.name}&rarr;</Link>
                            </Coin>
                        )
                    })
                }
            </CoinsList>
        </Container>
    )
}