import { Tiny } from '@ant-design/plots';
import { ChartAreaProps } from '../../../models/performance-analysis';

export const ChartArea = (props: ChartAreaProps) => {
    const { data } = props;
    const map = data && data.map((value, index) => ({ value, index }))
    const config = {
        data: map,
        height: 80,
        padding: 8,
        shapeField: 'smooth',
        xField: 'index',
        yField: 'value',
        style: {
            fill: '#d1e9ff',
        },
    };
    return <Tiny.Line {...config} />;
};
