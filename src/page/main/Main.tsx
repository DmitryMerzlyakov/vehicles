import { useQuery, gql } from '@apollo/client'
import { Order, Response } from '../../types'
import { useState, useEffect } from 'react'

import { Item } from '../../component/card'
import { SortLevel } from '../../component/sortLevel'
import { SortType } from '../../component/sortType'
import { SortNation } from '../../component/sortNation'

import s from './main.module.scss'

function Main() {
  const [isData, setIsData] = useState<Response>([])
  const [sortLevel, setSortLevel] = useState(0)
  const [sortType, setSortType] = useState('')
  const [sortNation, setSortNation] = useState('')

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

  useEffect(() => {
    data && !error && setIsData(data.vehicles)
  }, [loading])

  useEffect(() => {
    const sortData = isData.filter((item: Order) => item.level === sortLevel)
    setIsData(sortData)
  }, [sortLevel])

  useEffect(() => {
    const sortData = isData.filter((item: Order) => item.type.name === sortType)
    setIsData(sortData)
  }, [sortType])

  useEffect(() => {
    const sortData = isData.filter(
      (item: Order) => item.nation.icons.small === sortNation
    )
    setIsData(sortData)
  }, [sortNation])

  console.log(isData)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div className={s.wrapper}>
      <div className={s.sort}>
        <h2>Сортировать по:</h2>
        <div className={s.sort__box}>
          <div className={s.sort__box_buttons}>
            <SortLevel setSortLevel={setSortLevel} />
            <SortType setSortType={setSortType} />
            <SortNation setSortNation={setSortNation} />
          </div>
          <div className={s.sort__box_text}>
            <h4>Уровень:{sortLevel !== 0 ? sortLevel : ''}</h4>
            <h4>Тип:{sortType}</h4>
            {sortNation !== '' ? (
              <img src={sortNation} className={s.img} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {isData.length === 0 ? (
        <h2>Кораблей с такими параметрами не существует</h2>
      ) : (
        <div className={s.main}>
          {isData.map((item: Order) => (
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
