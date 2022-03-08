import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPriceInfo } from "../api";
import { Helmet } from 'react-helmet';

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

const OverView = styled.div`
    width: 100%;
    background-color: #2f3640;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    
    &:first-child{

    }
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface LocationInterface {
    name: string
}

interface ITag{
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

export default function Coin(){
    const { coinId } = useParams<{coinId: string}>();
    const { state } = useLocation<LocationInterface>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch =useRouteMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
        ["info", coinId], 
        () => fetchCoinInfo(coinId),
        {
            refetchInterval: 3000
        }
    );
    const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(["price",coinId], () => fetchCoinPriceInfo(coinId))

    return (
        <Container>
            <Helmet>
                <title>{coinId}</title>
            </Helmet>
            {state?.name ? state.name : "Loading..." }
            <OverView>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol: </span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>OPEN_SOURCE: </span>
                    <span>{infoData?.open_source ? 'yes' : 'no'}</span>
                </OverviewItem>
            </OverView>
            <div>{infoData?.description}</div>
            <OverView>
                <OverviewItem>
                    <span>TOTAL_SUPPLY</span>
                    <span>{priceData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>MAX_SUPPLY</span>
                    <span>{priceData?.max_supply}</span>
                </OverviewItem>
            </OverView>

            <Tabs>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>chart</Link>
                </Tab>
            </Tabs>

            <Switch>
                <Route path={`/${coinId}/price`}>
                    <Price />
                </Route>
                <Route path={`/${coinId}/chart`}>
                    <Chart coinId={coinId} />
                </Route>
            </Switch>
        </Container>
    )
}