import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
  
    return {
      user: userEvent.setup(),
      ...render(ui),
    }
}

export default renderWithRouter
