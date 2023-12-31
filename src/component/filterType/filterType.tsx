import { useQuery, gql } from '@apollo/client'
import { Order } from '../../types'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface IProps {
  setFilterType: (sortType: string) => void
  setIsFatching: (isFatching: boolean) => void
  isFatching: boolean
}

const FilterType = ({ setFilterType, setIsFatching, isFatching }: IProps) => {
  const GET_TYPE = gql`
    query GetType {
      vehicles {
        type {
          name
        }
      }
    }
  `

  const { data } = useQuery(GET_TYPE)

  const typeArr: string[] = []

  if (data) {
    data.vehicles.map((item: Order) => {
      let { type } = { ...item }
      typeArr.push(type.name)
    })
  }

  const uniqArr = typeArr.filter(
    (item, index) => typeArr.indexOf(item) === index
  )

  const handleClick = (item: string) => {
    setFilterType(item)
    setIsFatching(!isFatching)
  }

  return (
    <DropdownButton id="dropdown-item-button" title="типу">
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

export default FilterType
