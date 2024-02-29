import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import MyTrips from "../components/Mytrips"
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { beforeEach } from "node:test"



describe('Mytrip Component', () => {
  const userId = "65dd1c93a8300ebb63c80e32" 
  let container
  beforeEach (() => {
    container = render(
      <MemoryRouter initialEntries={[`/user/${userId}/mytrips`]}> {/* Use the user ID in the test URL */}
        <Routes>
          <Route path="/user/:userId/mytrips" element={<MyTrips />} />
        </Routes>
      </MemoryRouter>
    ).container
  })

  it('Renders MyTrips Header if logged in', async () => {
    // Use the user ID from your mock data
    // Wait for MyTrips component to render
    await screen.findByText('My Trips')
    
    // Assert that the MyTrips header is rendered
    expect(screen.getByText('My Trips')).toBeInTheDocument()
  })
  it('does not render My Trips header if not logged in', async () => {

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.queryByText('My Trips')).not.toBeInTheDocument()
    })
  })
})



