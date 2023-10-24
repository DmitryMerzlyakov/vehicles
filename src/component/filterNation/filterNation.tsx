import { useQuery, gql } from '@apollo/client'
import { Order } from '../../types'

import s from './filterNation.module.scss'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface IProps {
  setFilterNation: (sortNation: string) => void
  setIsFatching: (isFatching: boolean) => void
  isFatching: boolean
}

const FilterNation = ({
  setFilterNation,
  setIsFatching,
  isFatching
}: IProps) => {
  const GET_NATION = gql`
    query GetNation {
      vehicles {
        nation {
          icons {
            small
          }
        }
      }
    }
  `

  const { data } = useQuery(GET_NATION)

  const nationArr: string[] = []

  if (data) {
    data.vehicles.map((item: Order) => {
      let { nation } = { ...item }
      nationArr.push(nation.icons.small)
    })
  }

  const uniqArr = nationArr.filter(
    (item, index) => nationArr.indexOf(item) === index
  )

  const handleClick = (item: string) => {
    setFilterNation(item)
    setIsFatching(!isFatching)
  }

  return (
    <DropdownButton id="dropdown-item-button" title="нации">
      {uniqArr.map((item, index) => (
        <Dropdown.Item
          as="button"
          key={index}
          onClick={() => handleClick(item)}
        >
          <img src={item} className={s.img} />
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default FilterNation
