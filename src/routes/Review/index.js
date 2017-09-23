import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Motion, TransitionMotion, spring, presets } from 'react-motion'

// Styling helpers
import styled from 'styled-components'
import { colors, variables } from '../../styles'

// Local components
import KeyboardArrow from '../../ui/KeyboardArrow'
import ExpenseItem from '../../components/ExpenseItem'
import Roubles from '../../components/Roubles'
import {
  getUntaggedExpenses,
  updateExpenseTag,
  getNeedsRawTotal,
  getWantsRawTotal
} from '../../store/modules/transactions'

class Review extends React.Component {
  constructor(props) {
    super(props)

    // We need this interval mapping in order to get
    // the fade animation direction
    this.wantsMaping = {}
  }

  static propTypes = {
    expensesToReview: PropTypes.array,
    updateExpenseTag: PropTypes.func,
    total: PropTypes.object
  }

  // Will assign the category to the expense
  // Possible values: true/false
  categorizeLastExpense(isNeeds) {
    const lastExpense = this.props.expensesToReview[0]

    if (!lastExpense) {
      return
    }

    this.props.updateExpenseTag(lastExpense.id, isNeeds)
    this.wantsMaping[lastExpense.id] = !isNeeds
  }

  handleKeyDown = event => {
    const KEY_LEFT = 37
    const KEY_RIGHT = 39

    if (event.keyCode === KEY_LEFT) this.categorizeLastExpense(true)
    if (event.keyCode === KEY_RIGHT) this.categorizeLastExpense(false)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true)
  }

  render() {
    // styles for TransitionMotion
    const motionStyles = this.props.expensesToReview.map((expense, i) => ({
      key: expense.id.toString(),
      data: expense,
      style: {
        fade: spring(1.0, presets.gentle),
        x: spring(0.0, presets.wobbly)
      }
    }))

    return (
      <div>
        <Container>
          <Header>
            <Title>
              Оцените свои<br />
              последние траты
            </Title>

            <Annotation>
              Определите, была ли трата <b>«нуждой»</b> или <b>«желанием»</b>.
              Используйте стрелочки <KeyboardArrow left /> и <KeyboardArrow />,
              чтобы быстро распределять траты.
            </Annotation>
          </Header>
        </Container>

        <Playground>
          <Column left>
            <Stats>
              <StatsLabel>Нужды</StatsLabel>
              <Motion
                defaultStyle={{ amount: Math.abs(this.props.total.needs) }}
                style={{ amount: spring(Math.abs(this.props.total.needs)) }}
              >
                {value => (
                  <Roubles size={28} amount={Math.ceil(value.amount)} />
                )}
              </Motion>
            </Stats>
          </Column>
          <ExpenseList>
            <TransitionMotion
              willLeave={item => {
                const id = item.data.id

                // Calculte the animation direction
                const direction = this.wantsMaping[id] ? 1 : -1
                return { x: spring(direction), fade: spring(0) }
              }}
              willEnter={() => ({ x: 0, fade: 1 })}
              styles={motionStyles}
            >
              {interpolatedStyles => (
                <div>
                  {interpolatedStyles.map(config => {
                    const expense = config.data
                    const { x, fade } = config.style

                    const fadeOffset = 500.0
                    const maxHeight = 200.0
                    const translate = fadeOffset * x

                    return (
                      <ExpenseItemWrapper
                        key={config.key}
                        style={{
                          opacity: fade,
                          maxHeight: fade * maxHeight,
                          transform: `translateX(${translate}px)`
                        }}
                      >
                        <ExpenseItemCover>
                          <ExpenseItem carded expense={expense} />
                        </ExpenseItemCover>
                      </ExpenseItemWrapper>
                    )
                  })}
                </div>
              )}
            </TransitionMotion>
          </ExpenseList>
          <Column>
            <Stats>
              <StatsLabel>Желания</StatsLabel>
              <Motion
                defaultStyle={{ amount: Math.abs(this.props.total.wants) }}
                style={{ amount: spring(Math.abs(this.props.total.wants)) }}
              >
                {value => (
                  <Roubles size={28} amount={Math.ceil(value.amount)} />
                )}
              </Motion>
            </Stats>
          </Column>
        </Playground>
      </div>
    )
  }
}

Review.propTypes = {}

const Stats = styled.div`
  display: inline-block;
  position: relative;
  top: 100px;
`

const ExpenseItemCover = styled.div`margin-bottom: 10px;`

const ExpenseItemWrapper = styled.div`
  box-sizing: border-box;
  overflow: hidden;
`

const Column = styled.div`
  flex: 1 1;
  text-align: right;

  ${props => (props.left ? 'text-align: left' : '')};
`

const Playground = styled.div`
  max-width: 1000px;
  margin: auto;

  display: flex;

  height: 380px;
  overflow-y: hidden;
  position: relative;

  &:after {
    display: inline-block;
    content: '';
    position: absolute;

    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(rgba(0, 0, 0, 0), white);
  }
`

const StatsLabel = styled.div`
  font-size: 20px;
  color: ${colors.ultraBlue};
  text-transform: uppercase;
`

const ExpenseList = styled.div`width: 320px;`

const Container = styled.div`
  width: ${variables.containerWidth};
  margin: auto;
`
const Annotation = styled.div`
  color: ${colors.gray};
  font-size: 18px;

  b {
    font-weight: 600;
    color: ${colors.ultraBlue};
  }
`

const Header = styled.div`
  margin-top: 42px;
  margin-bottom: 35px;
`

const Title = styled.h3`
  font-size: 26px;
  font-weight: 800;
  line-height: 1.15;
`

function mapStateToProps(state) {
  return {
    expensesToReview: getUntaggedExpenses(state),
    total: {
      needs: getNeedsRawTotal(state),
      wants: getWantsRawTotal(state)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateExpenseTag: (...args) => dispatch(updateExpenseTag(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
