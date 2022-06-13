import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const AreaChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{top: 50}}>{/* monthlyApplications data */}
            <CartesianGrid strokeDasharray="3 3" /> {/* hovers */}
            <XAxis dataKey="date"/> {/* date key in monthlyApplications */}
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Area type="monotone" dataKey="count" fill="#bef8fd"strok="#2cb1bc" barSize={75} />{/* count key in monthlyApplications */}
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent