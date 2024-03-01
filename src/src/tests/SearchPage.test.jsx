import '@testing-library/jest-dom'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Search from '../components/Search Page/Search'
import SearchBar from '../components/Search Page/SearchBar'
import SearchResults from '../components/Search Page/SearchResults'
import BookTicket from '../components/Search Page/BookTicket'

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation(query => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }
})

describe('Search Page', () => {
    let container

    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <Search />
            </BrowserRouter>
        ).container
    })

    it('renders the search component', () => {
        // Header rendering 
        expect(container.querySelector('h1')).toHaveTextContent('Search')
        // Image rendering 
        expect(screen.getByAltText('brisbane skyline')).toBeInTheDocument()
        // Search Bar rendering 
        expect(container.querySelector('.search-bar')).not.toBeNull()
    })
})

describe('SearchBar component', () => {
    // Mock locations data
    const mockLocations = [
        { _id: '1', name: 'Location 1' },
        { _id: '2', name: 'Location 2' },
    ]

    // Mock setResults function
    const mockSetResults = vi.fn()

    it('renders the component with input fields', () => {

        render(
            <SearchBar locations={mockLocations} setResults={mockSetResults} />
        )

        // Render input fields 
        expect(screen.getByLabelText('Pickup Location')).toBeInTheDocument()
        expect(screen.getByLabelText('Dropoff Location')).toBeInTheDocument()
        expect(screen.getByLabelText('Travel Date')).toBeInTheDocument()
        expect(screen.getByText('Search')).toBeInTheDocument()
    })

    it('updates form inputs correctly', () => {
        render(
            <SearchBar locations={mockLocations} setResults={mockSetResults} />
        )

        // Simulate user input in the form inputs
        fireEvent.change(screen.getByLabelText('Pickup Location'), { target: { value: '1' } })
        fireEvent.change(screen.getByLabelText('Dropoff Location'), { target: { value: '2' } })
        fireEvent.change(screen.getByLabelText('Travel Date'), { target: { value: '2032-08-22' } })

        // Check if form inputs are updated correctly
        expect(screen.getByLabelText('Pickup Location')).toHaveValue('1')
        expect(screen.getByLabelText('Dropoff Location')).toHaveValue('2')
        expect(screen.getByLabelText('Travel Date')).toHaveValue('2032-08-22')
    })
})

describe('Search Results Components', () => {
    // Mock locations
    const mockLocations = [
        { _id: '1', name: 'Location 1' },
        { _id: '2', name: 'Location 2' },
    ]

    // Mock result
    const sampleResult = {
        "_id": "1",
        "busNumber": 123,
        "collectionTime": "2032-08-22T21:30:00.000Z",
        "estimatedTravelTime": 30,
        "pickupLocation": mockLocations[0],
        "dropoffLocation": mockLocations[1],
        "capacity": 30,
        "reservations": [
            "2"
        ],
    }

    // Mock setResults function
    const mockSetResults = vi.fn()

    it('renders "No Matches found..." when results is an empty array', () => {
        const { getByText } = render(
            <BrowserRouter>
                <SearchResults results={[]} locations={mockLocations} setResults={mockSetResults} />
            </BrowserRouter>
        )

        expect(getByText('No Matches found...')).toBeInTheDocument()
    })

    it('renders loading spinner when results is "loading"', () => {
        const { container } = render(
            <BrowserRouter>
                <SearchResults results="loading" locations={mockLocations} setResults={mockSetResults} />
            </BrowserRouter>
        )

        expect(container.querySelector('.loading-bar')).toBeInTheDocument()
    })

    it('renders search results when results is not empty', () => {
        const { container } = render(
            <BrowserRouter>
                <SearchResults results={[sampleResult]} locations={mockLocations} setResults={mockSetResults} />
            </BrowserRouter>
        )
        expect(container.querySelector('.search-results')).toBeInTheDocument()
        expect(container.querySelector('.search-result')).toBeInTheDocument()


    })

})

