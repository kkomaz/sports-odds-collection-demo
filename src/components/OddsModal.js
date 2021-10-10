import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import { icons } from '../constant'
import { filterTeam, calculateOdds } from '../utils'

export function OddsModal (props) {
  const { activeGame } = props

  if (!activeGame) {
    return null
  }

  const team1 = activeGame.teams[0]
  const team2 = activeGame.teams[1]

  const team1FilteredBadge = filterTeam(team1)
  const team2FilteredBadge = filterTeam(team2)

  return (
    <Modal
      className='odds-modal'
      onHide={props.onHide}
      show={props.show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <Image
            className='odds-modal__image'
            src={icons[team1FilteredBadge]}
            rounded
          />{' '}
          {team1} vs.{' '}
          <Image
            className='odds-modal__image'
            src={icons[team2FilteredBadge]}
            rounded
          />{' '}
          {team2}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Sportsbook</th>
              <th>{team1}</th>
              <th>Draw</th>
              <th>{team2}</th>
            </tr>
          </thead>
          <tbody>
            {activeGame.sites.map(site => {
              return (
                <tr key={site.site_key}>
                  <td>{site.site_nice}</td>
                  <td>{calculateOdds(site.odds.h2h[0])}</td>
                  <td>{calculateOdds(site.odds.h2h[2])}</td>
                  <td>{calculateOdds(site.odds.h2h[1])}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
