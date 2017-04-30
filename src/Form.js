import React from 'react'
import PropTypes from 'prop-types'

const { object, string, array } = PropTypes

/**
 * Warning! This class uses context
 *
 * @class Form
 * @extends {React.Component}
 */
class Form extends React.Component {
  constructor (props, context) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleFormSubmit (e) {
    e.preventDefault()
    this.context.router.history.push(this.props.to)
  }

  render () {
    return (
      <form className={this.props.className} onSubmit={this.handleFormSubmit}>
        {this.props.children}
      </form>
    )
  }
}

Form.contextTypes = {
  router: object
}

Form.propTypes = {
  className: string,
  to: string,
  children: array
}

export default Form
