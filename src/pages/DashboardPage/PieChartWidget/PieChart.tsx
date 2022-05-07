import React, { ReactElement } from 'react';
import { ResponsivePie } from '@nivo/pie';

interface IData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const PieChart = (): ReactElement => {
  const dataMockup: IData[] = [
    {
      id: 'closed',
      label: 'Closed',
      value: 25,
      color: 'hsl(126, 70%, 50%)',
    },
    {
      id: 'clients',
      label: 'Clients',
      value: 12,
      color: 'hsl(126, 70%, 50%)',
    },
    {
      id: 'sold',
      label: 'Sold',
      value: 25,
      color: 'hsl(37, 70%, 50%)',
    },
    {
      id: 'products',
      label: 'Products',
      value: 38,
      color: 'hsl(251, 70%, 50%)',
    },
  ];

  return (
    <ResponsivePie
      data={dataMockup}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export { PieChart };
