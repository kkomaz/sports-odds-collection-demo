import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { PatchMinus } from 'react-bootstrap-icons'
import Image from 'react-bootstrap/Image'
import { icons } from '../constant'
import '../stylesheets/SportsCard.scss'
import { calculateOdds, getDate, filterTeam } from '../utils'

export function SportsCard (props) {
  const { sportsGame, onSeeMoreOdds } = props

  const team1 = sportsGame.teams[0]
  const team2 = sportsGame.teams[1]

  const team1FilteredBadge = filterTeam(team1)
  const team2FilteredBadge = filterTeam(team2)

  return (
    <Card className='sports-card'>
      <Card.Body>
        <Row>
          <Card.Subtitle className='mb-2 text-muted'>
            Game Date: {getDate(sportsGame.commence_time)}
          </Card.Subtitle>
          <Card.Text>
            <Image
              className='sports-card__image'
              src={icons[team1FilteredBadge]}
              rounded
            />
            {team1}: {calculateOdds(sportsGame.sites[0].odds.h2h[0])}
          </Card.Text>
          <Card.Text>
            <PatchMinus className='sports-card__draw' size={25} />
            Draw: {calculateOdds(sportsGame.sites[0].odds.h2h[2])}
          </Card.Text>
          <Card.Text>
            <Image
              className='sports-card__image'
              src={icons[team2FilteredBadge]}
              rounded
            />
            {team2}: {calculateOdds(sportsGame.sites[0].odds.h2h[1])}
          </Card.Text>
          <Card.Text>
            <Button
              className='sports-card__see-more-odds'
              variant='link'
              onClick={() => onSeeMoreOdds(sportsGame)}
            >
              See more odds
            </Button>
          </Card.Text>
        </Row>
      </Card.Body>
    </Card>
  )
}
