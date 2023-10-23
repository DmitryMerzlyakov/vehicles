import { useQuery, gql } from '@apollo/client'
import { Order } from '../../types'

import s from './sortNation.module.scss'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

interface IProps {
  setSortNation: (sortNation: string) => void
}

const SortNation = ({ setSortNation }: IProps) => {
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
    setSortNation(item)
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

export default SortNation
