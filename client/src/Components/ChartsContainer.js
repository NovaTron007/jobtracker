import React, { useState } from 'react'
import AreaChart from './AreaChart'
import BarChart from './BarChart'
import { useAppContext } from '../Context/AppContext'
import Wrapper from "../assets/Wrappers/ChartsContainer"

const ChartsContainer = () => {
    // get data from context
    const { monthlyApplications:data } = useAppContext()
    // toggle charts
    const [barChart, setBarChart] = useState(true)

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={() => setBarChart(!barChart)}>{barChart ? "View Area Chart" : "View Bar Chart"}</button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer