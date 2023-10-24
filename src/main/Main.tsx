import { useQuery, gql } from '@apollo/client'
import { Order } from '../types'
import { useState, useEffect } from 'react'

import { Item } from '../component/card'
import { FilterLevel } from '../component/filterLevel'
import { FilterType } from '../component/filterType'
import { FilterNation } from '../component/filterNation'
import Button from 'react-bootstrap/Button'

import s from './main.module.scss'

function Main() {
  const GET_DATA = gql`
    query GetVehicles {
      vehicles {
        title
        description
        icons {
          large
          medium
        }
        level
        type {
          name
          title
          icons {
            default
          }
        }
        nation {
          name
          title
          color
          icons {
            small
            medium
            large
          }
        }
      }
    }
  `

  const { data, loading, error } = useQuery(GET_DATA)

  const [responseData, setResponseData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterLevel, setFilterLevel] = useState(0)
  const [filterType, setFilterType] = useState('')
  const [filterNation, setFilterNation] = useState('')
  const [isFatching, setIsFatching] = useState(false)

  useEffect(() => {
    data && !error && setResponseData(data.vehicles)
  }, [loading])

  // -------- for filterLevel -----------//
  useEffect(() => {
    if (filterLevel !== 0 && filterType !== '' && filterNation !== '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.level === filterLevel)
          .filter((item: Order) => item.type.name === filterType)
          .filter((item: Order) => item.nation.icons.small === filterNation)
      )
    }
    if (filterLevel !== 0 && filterType === '' && filterNation !== '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.level === filterLevel)
          .filter((item: Order) => item.nation.icons.small === filterNation)
      )
    }
    if (filterLevel !== 0 && filterType === '' && filterNation === '') {
      setFilterData(
        responseData.filter((item: Order) => item.level === filterLevel)
      )
    }
  }, [isFatching])
  // -------- for filterType -----------//
  useEffect(() => {
    if (filterLevel !== 0 && filterType !== '' && filterNation !== '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.level === filterLevel)
          .filter((item: Order) => item.type.name === filterType)
          .filter((item: Order) => item.nation.icons.small === filterNation)
      )
    }
    if (filterLevel !== 0 && filterType !== '' && filterNation === '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.level === filterLevel)
          .filter((item: Order) => item.type.name === filterType)
      )
    }
    if (filterLevel === 0 && filterType !== '' && filterNation === '') {
      setFilterData(
        responseData.filter((item: Order) => item.type.name === filterType)
      )
    }
  }, [isFatching])
  // -------- for filterNation -----------//
  useEffect(() => {
    if (filterLevel !== 0 && filterType !== '' && filterNation !== '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.level === filterLevel)
          .filter((item: Order) => item.type.name === filterType)
          .filter((item: Order) => item.nation.icons.small === filterNation)
      )
    }
    if (filterLevel === 0 && filterType !== '' && filterNation !== '') {
      setFilterData(
        responseData
          .filter((item: Order) => item.type.name === filterType)
          .filter((item: Order) => item.nation.icons.small === filterNation)
      )
    }
    if (filterLevel === 0 && filterType === '' && filterNation !== '') {
      setFilterData(
        responseData.filter(
          (item: Order) => item.nation.icons.small === filterNation
        )
      )
    }
  }, [isFatching])

  const handleClearFilter = () => {
    setFilterLevel(0)
    setFilterNation('')
    setFilterType('')
    setFilterData([])
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div className={s.wrapper}>
      <div className={s.sort}>
        <h2>Фильрация по:</h2>
        <div className={s.sort__box}>
          <div className={s.sort__box_buttons}>
            <FilterLevel
              setFilterLevel={setFilterLevel}
              setIsFatching={setIsFatching}
              isFatching={isFatching}
            />
            <FilterType
              setFilterType={setFilterType}
              setIsFatching={setIsFatching}
              isFatching={isFatching}
            />
            <FilterNation
              setFilterNation={setFilterNation}
              setIsFatching={setIsFatching}
              isFatching={isFatching}
            />
            <Button variant="primary" onClick={handleClearFilter}>
              Очистить фильтр
            </Button>
          </div>
          <div className={s.sort__box_text}>
            <h4>Уровень:{filterLevel !== 0 ? filterLevel : ''}</h4>
            <h4>Тип:{filterType}</h4>
            {filterNation !== '' ? (
              <img src={filterNation} className={s.img} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {filterData.length !== 0 ? (
        filterData.length === 0 && filterLevel && filterNation && filterType ? (
          <h3>Кораблей с таками параметрами не существует</h3>
        ) : (
          <div className={s.main}>
            {filterData.map((item: Order) => (
              <Item
                key={item.id}
                title={item.title}
                description={item.description}
                icons={item.icons}
                level={item.level}
                nations={item.nation}
                type={item.type}
              />
            ))}
          </div>
        )
      ) : (
        <div className={s.main}>
          {responseData.map((item: Order) => (
            <Item
              key={item.id}
              title={item.title}
              description={item.description}
              icons={item.icons}
              level={item.level}
              nations={item.nation}
              type={item.type}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Main
