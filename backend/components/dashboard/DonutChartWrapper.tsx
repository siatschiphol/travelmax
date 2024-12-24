'use client'

import dynamic from 'next/dynamic'

const DonutChart = dynamic(
  () => import('@tremor/react').then((mod) => mod.DonutChart),
  { ssr: false }
)

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
