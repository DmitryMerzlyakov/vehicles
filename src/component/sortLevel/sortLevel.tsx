import { useQuery, gql } from '@apollo/client'
import { Order } from '../../types'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface IProps {
  setSortLevel: (sortLevel: number) => void
}

const SortLevel = ({ setSortLevel }: IProps) => {
  const GET_LEVEL = gql`
    query GetLevel {
      vehicles {
        level
      }
    }
  `

  const { data } = useQuery(GET_LEVEL)

  const levelArr: number[] = []

  if (data) {
    data.vehicles.map((item: Order) => {
      levelArr.push(item.level)
    })
  }

  const uniqArr = levelArr
    .filter((item, index) => levelArr.indexOf(item) === index)
    .sort((a, b) => a - b)

  const handleClick = (item: number) => {
    setSortLevel(item)
  }

  return (
    <DropdownButton id="dropdown-item-button" title="уровню">
      {uniqArr.map((item, index) => (
        <Dropdown.Item
          as="button"
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export default SortLevel
