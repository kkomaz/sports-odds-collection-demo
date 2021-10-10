import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import { fetchOdds } from '../api/fetchOdds'
import { sportsList } from '../constant'
import { SportsCard } from './SportsCard'
import { OddsModal } from './OddsModal'
import '../stylesheets/App.scss'

function App () {
  const [odds, setOdds] = useState(null)
  const [error, setError] = useState(false)
  const [activeSport, setActiveSport] = useState('soccer_epl')
  const [activeGame, setActiveGame] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    const getOdds = async () => {
      const result = await fetchOdds(activeSport)

      if (result.success) {
        setOdds({ ...odds, soccer_epl: result.data })
      }

      if (result.error) {
        setError(true)
        setOdds({})
      }
    }

    getOdds()
  }, [])

  if (!odds) {
    return null
  }

  const onSeeMoreOdds = game => {
    setActiveGame(game)
    setModalShow(true)
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' className='mb-2'>
        <Container>
          <Navbar.Brand>Sports Odds Collection</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={2}>
            <ListGroup>
              {sportsList.map(sport => {
                return (
                  <ListGroup.Item
                    key={sport.key}
                    as='button'
                    onClick={() => setActiveSport(sport.key)}
                    active={activeSport === sport.key}
                  >
                    {sport.view}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col xs={12} md={10}>
            {error ? (
              <h5>
                Sports Odd API is not available...Please check in later ❤️{' '}
              </h5>
            ) : (
              <Row>
                {odds[activeSport] ? (
                  odds[activeSport].map(sportsGame => {
                    return (
                      <Col
                        key={sportsGame.id}
                        xs={12}
                        md={4}
                        className='mb-3 sports-grid-divider'
                      >
                        <SportsCard
                          sportsGame={sportsGame}
                          onSeeMoreOdds={onSeeMoreOdds}
                        />
                      </Col>
                    )
                  })
                ) : (
                  <div>No sports yet!</div>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <OddsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeGame={activeGame}
      />
    </>
  )
}

export default App
