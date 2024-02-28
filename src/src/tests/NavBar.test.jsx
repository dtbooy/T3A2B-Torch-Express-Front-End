import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavigationBar from '../components/NavBar'

describe('NavigationBar Component', () => {
    it('renders the navigation bar', () => {
        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={() => { }} isLoggedIn={false} isAdmin={false} user={{}} />
            </BrowserRouter>
        )
    })

    it('displays correct links when user is not logged in', () => {
        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={() => { }} isLoggedIn={false} isAdmin={false} user={{}} />
            </BrowserRouter>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Buses')).toBeInTheDocument()
        expect(screen.getByText('Sign Up')).toBeInTheDocument()
        expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('displays correct links when user is logged in', () => {
        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={() => { }} isLoggedIn={true} isAdmin={false} user={{ _id: '123' }} />
            </BrowserRouter>
        )
        // Renders the Links 
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Buses')).toBeInTheDocument()
        expect(screen.getByText('My Trips')).toBeInTheDocument()
    })

    it('opens logout modal when Logout button is clicked', () => {
        const user = {
            "_id": "65de9e83b1aa280128d1d379",
            "name": "Test User",
            "email": "user@example.com",
            "password": "$2b$10$aZEkcFRjEZL5lK.dJBPr8eIjrrQVRs7z.T.29fwZF1Qrp5XSZSaIK",
            "DOB": "1990-09-19T14:00:00.000Z",
            "is_admin": false,
            "reservations": [
                "65de9e83b1aa280128d1d38d"
            ]
        }

        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={true} isLoggedIn={true} isAdmin={false} user={user} />
            </BrowserRouter>
        )
        // Click Profile Icon
        fireEvent.click(screen.getByRole('button', { name: 'Test' }))
        // Click Logout Button
        fireEvent.click(screen.getByText('Logout'))

        expect(screen.getByText('Are you sure you want to logout?')).toBeInTheDocument()
    })
})

describe('Admin Dropdown in NavigationBar Component', () => {
    it('displays admin dropdown when user is an admin', () => {
        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={() => { }} isLoggedIn={true} isAdmin={true} user={{ _id: '123' }} />
            </BrowserRouter>
        )

        // Open the admin dropdown
        fireEvent.click(screen.getByText('Admin'))

        // Check if dropdown items are displayed
        expect(screen.getByText('Routes')).toBeInTheDocument()
        expect(screen.getByText('Users')).toBeInTheDocument()
        expect(screen.getByText('Reservations')).toBeInTheDocument()
        expect(screen.getByText('Locations')).toBeInTheDocument()
    })

    it('does not display admin dropdown when user is not an admin', () => {
        render(
            <BrowserRouter>
                <NavigationBar setIsLoggedIn={() => { }} isLoggedIn={true} isAdmin={false} user={{ _id: '123' }} />
            </BrowserRouter>
        )

        // Check if dropdown is not present
        expect(screen.queryByText('Admin')).toBeNull()
    })
})