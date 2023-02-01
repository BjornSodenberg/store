import "./styles.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
    data: Array<{
        name: string,
        value: number,
    }>
}

export const Chart = (props: Props) => {
    const data = props.data;

    return (
        <BarChart
        width={414}
        height={190}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#52AEF8" />
        </BarChart>
    );
}
