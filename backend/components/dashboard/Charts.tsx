'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DonutChart } from '@tremor/react'

interface Props {
  areaChartData: any[]
  donutChartData: any[]
}

export function AreaChartComponent({ data }: { data: any[] }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DonutChartComponent({ data }: { data: any[] }) {
  return (
    <div className="h-[300px]">
      <DonutChart
        data={data}
        category="sales"
        index="name"
        valueFormatter={(number) => `${Intl.NumberFormat('us').format(number).toString()}`}
        colors={['blue', 'amber', 'violet', 'green', 'slate']}
      />
    </div>
  )
}
