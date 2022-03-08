import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps){
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlv", coinId], () => fetchCoinHistory(coinId))

    return (
        <>
        {
            isLoading ? "Loading Chart..." 
            :
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: data?.map(price => price.close)
                    }
                ]}
                options={{
                    theme: {
                        mode: "dark"
                    },
                    chart: {
                        height: 500,
                        width: 500,
                        background: "transparent",
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {show: false},
                    yaxis: {show: false},
                    xaxis: {
                        labels: {show: false},
                        axisTicks: {show: false},
                        axisBorder: {show: false},
                        categories: data?.map(price => price.time_close),
                        type: "datetime"
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    fill: {
                        type: "gradient",
                        gradient: { gradientToColors: ["blue"]},
                    },
                    colors: ["red"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${value.toFixed(3)}`
                        }
                    }
                }}
            >

            </ApexChart>

        }
        </>
    )
}

export default Chart;