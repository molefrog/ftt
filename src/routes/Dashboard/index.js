import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { colors, variables } from '../../styles'
import { rgba } from 'polished'

import {
  getWants,
  getNeeds,
  getSavings,
  getNeedsLimit,
  getWantsLimit,
  syncTransactions
} from '../../store/modules/transactions'

import ExpencesList from '../../components/ExpencesList'
import CategoryBox from '../../components/CategoryBox'
import Roubles from '../../components/Roubles'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: 'needs'
    }
  }

  static propTypes = {
    wants: PropTypes.array,
    needs: PropTypes.array,
    savings: PropTypes.number,
    limits: PropTypes.object,
    sync: PropTypes.func
  }

  render() {
    const { currentTab } = this.state

    const expences =
      currentTab === 'needs' ? this.props.needs : this.props.wants

    return (
      <Container>
        <Header>
          <Title>
            Как вы можете<br /> потратить деньги.
          </Title>
          <Annotation>
            Вы пытаетесь откладывать 20%, тратить на необходимые вещи 50%, а
            остальные 30% — на развлечения.
          </Annotation>

          <RefreshButton onClick={this.props.sync}>
            Обновить список транзакций
          </RefreshButton>
        </Header>
        <Categories>
          {/* Needs */}
          <CategoryBox
            active={currentTab === 'needs'}
            onSelect={() => this.setState({ currentTab: 'needs' })}
            title="Нужды"
            percent={50}
          >
            <CategoryContent>
              <div>
                <Roubles amount={10320} size={18} />
                <Separator>{' из '}</Separator>
                <Roubles amount={this.props.limits.needs} size={18} />
              </div>
            </CategoryContent>
          </CategoryBox>

          {/* Wants */}
          <CategoryBox
            active={currentTab === 'wants'}
            onSelect={() => this.setState({ currentTab: 'wants' })}
            title="Желания"
            percent={30}
          >
            <CategoryContent>
              <div>
                <Roubles amount={10320} size={18} />
                <Separator>{' из '}</Separator>
                <Roubles amount={this.props.limits.wants} size={18} />
              </div>
            </CategoryContent>
          </CategoryBox>

          <CategoryBox title="Накопления" percent={20}>
            <CategoryContent>
              <Roubles amount={this.props.savings} size={22} />
            </CategoryContent>
          </CategoryBox>
        </Categories>
        <Transactions>
          <IncomesList />

          <ExpencesList expences={expences} />
        </Transactions>
      </Container>
    )
  }
}

const RefreshButton = styled.div`
  display: inline-block;
  margin-top: 4px;
  color: ${colors.ultraBlue};
  cursor: pointer;
  padding: 4px 5px;
  user-select: none;
  border-radius: 3px;

  &:hover {
    background-color: ${rgba(colors.ultraBlue, 0.06)};
  }
`

const Container = styled.div`
  width: ${variables.containerWidth};
  margin: auto;
`

const Separator = styled.span`
  font-size: 13px;
  color: ${colors.gray};
`

const CategoryContent = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
`

// Header
const Header = styled.div`
  margin-top: 42px;
  margin-bottom: 35px;
`

const Title = styled.h3`
  font-size: 26px;
  font-weight: 800;
  line-height: 1.15;
`
const Annotation = styled.div`
  color: ${colors.gray};
  font-size: 18px;
`

// Categories
const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`

const Transactions = styled.div`padding-bottom: 150px;`

const IncomesList = styled.div``

function mapStateToProps(state) {
  return {
    savings: getSavings(state),
    wants: getWants(state),
    needs: getNeeds(state),
    limits: {
      needs: getNeedsLimit(state),
      wants: getWantsLimit(state)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sync: () => dispatch(syncTransactions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
