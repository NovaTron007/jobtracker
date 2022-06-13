import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const BarChartComponent = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{top: 50}}>{/* monthlyApplications data */}
            <CartesianGrid strokeDasharray="3 3" /> {/* hovers */}
            <XAxis dataKey="date"/> {/* date key in monthlyApplications */}
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey="count" fill="#2cb1bc" barSize={75} />{/* count key in monthlyApplications */}
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent