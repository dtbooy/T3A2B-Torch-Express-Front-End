import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import MyTrips from "../components/Mytrips"
import { MemoryRouter, Routes, Route } from 'react-router-dom'



describe('Mytrip Component', () => {
  it('Renders MyTrips Header if logged in', async () => {
    const userId = "65dd1c93a8300ebb63c80e32" // Use the user ID from your mock data
    render(
      <MemoryRouter initialEntries={[`/user/${userId}/mytrips`]}> {/* Use the user ID in the test URL */}
        <Routes>
          <Route path="/user/:userId/mytrips" element={<MyTrips />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Wait for MyTrips component to render
    await screen.findByText('My Trips')
    
    // Assert that the MyTrips header is rendered
    expect(screen.getByText('My Trips')).toBeInTheDocument()
  })
})
