import React from 'react'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug} from "react-icons/fa"
import { useAppContext } from '../Context/AppContext'
import Wrapper from "../assets/Wrappers/StatsContainer"
import StatsItem from './StatsItem'


const StatsContainer = () => {
    // get context state
    const { stats } = useAppContext()

    // create local object data for mapping stats
    const defaultStats = [
        {
            title:"Pending Applications",
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7"
        },
        {
            title:"Interviews Scheduled",
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9"
        },
        {
            title:"Jobs Declined",
            count: stats.declined || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee"
        },             
    ]


    return (
        // map stats item
        <Wrapper>
            { defaultStats.map((item, index) => {
                return <StatsItem {...item} key={index} /> // spread all properties
            })}
        </Wrapper>
    )
}

export default StatsContainer