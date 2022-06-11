import React, { useEffect } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { StatsContainer, ChartsContainer, Loading } from '../../Components' // loaded in index

const Stats = () => {
  // context state
  const { getStats, isLoading, monthlyApplications } = useAppContext()


  // get stats on render
  useEffect(() => {
    getStats()
  }, [])
  
  // loading
  if(isLoading) {
    return <Loading center />
  }

  // stats
  return (
    <>
      <h4>Stats</h4>
      <StatsContainer />
      { monthlyApplications.length > 0 && <ChartsContainer /> }      
    </>
  )
}

export default Stats