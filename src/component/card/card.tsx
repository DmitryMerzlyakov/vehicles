import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import s from './card.module.scss'

interface IProps {
  title: string
  description: string
  icons: { large: string; medium: string }
  level: number
  nations: { icons: { small: string } }
  type: { name: string }
}

const Item = ({ title, description, icons, level, nations, type }: IProps) => {
  let image = { ...icons }

  let flag = { ...nations }

  let { small } = { ...flag.icons }

  let isType = { ...type }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.medium} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={s.text}>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Level: {level}</ListGroup.Item>
        <ListGroup.Item>Type: {isType.name}</ListGroup.Item>
        <ListGroup.Item>
          Nation:
          <Card.Img className={s.image} src={small} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Item
