import '@testing-library/jest-dom'
import { describe, expect, it, beforeEach} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../components/Home Page/Home'
import { BrowserRouter } from 'react-router-dom'

describe('Home Page', () => {
    let container

    beforeEach(() => {
        container = render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        ).container
      })

    it('renders the home component', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Get On Board!')
    })

    it('renders Search component when Book Now button is clicked', async () => {

        await userEvent.click(screen.getByText('Book Now'))

        expect(container.querySelector('h1')).not.toBeNull()
    })

    it('renders location modal when Locations arrow is clicked', async () => {
        await userEvent.click(screen.getByRole('button', {name: 'locations-button'}))
        expect(screen.getByText('Close')).toBeInTheDocument()
    })

    it('renders location modal when Locations arrow is clicked', async () => {
        await userEvent.click(screen.getByRole('button', {name: 'buses-button'}))
        expect(screen.getByText('Close')).toBeInTheDocument()
    })

    it('renders location modal when Locations arrow is clicked', async () => {
        await userEvent.click(screen.getByRole('button', {name: 'contact-button'}))
        expect(screen.getByText('Close')).toBeInTheDocument()
    })

})