import '@testing-library/jest-dom'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { fireEvent, render, screen, } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Services from '../components/Admin Pages/Services/Services'
import Users from '../components/Admin Pages/Users/Users'
import Reservations from '../components/Admin Pages/Reservations/Reservations'
import Locations from '../components/Admin Pages/Locations/Locations'
import NewRoute from '../components/Admin Pages/Services/NewRoute'
import NewLocation from '../components/Admin Pages/Locations/NewLocation'
import AdminPage from '../components/Admin Pages/AdminPage'
import AdminTable from '../components/Admin Pages/AdminTable'
import LocationModal from '../components/Admin Pages/Locations/LocationModal'

describe('AdminPage New Form Rendering', () => {
    it('renders the new form when New button is clicked', () => {
        // Mock Route for New Form
        const mockNewForm = '/admin/services/new' 

        const { container } = render(
            // Render Compoment with mock props   
            <BrowserRouter>
                <AdminPage
                    heading="Admin Page"
                    newForm={mockNewForm}
                    tableHeaders={[]}
                    renderRow={() => { }}
                    prepareData={() => { }}
                />
            </BrowserRouter>
        )
        // Click New Button
        fireEvent.click(container.querySelector('button'))
        // Link to New Form
        const newFormLink = container.querySelector(`a[href="${mockNewForm}"]`)
        expect(newFormLink).toBeInTheDocument()
    })
})

describe('AdminTable Component Renders', () => {
    // Mock Table Data
    const tableHeaders = ['Header 1', 'Header 2']
    const data = [
      { id: 1, name: 'Item 1', value: 'Value 1' },
      { id: 2, name: 'Item 2', value: 'Value 2' },
    ]
  
    beforeEach(() => {
        // Render the component
      render(
        <AdminTable
          tableHeaders={tableHeaders}
          data={data}
          renderRow={(item) => (
            <>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </>
          )}
          filter={{}}
          setFilter={() => {}}
          filterProps={[]}
        />
      )
    })
  
    it('renders table headers', () => {
      tableHeaders.forEach((header) => {
        expect(screen.getByText(header)).toBeInTheDocument()
      })
    })
  
    it('renders table rows with data', () => {
      data.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
        expect(screen.getByText(item.value)).toBeInTheDocument()
      })
    })
        
})

describe('Admin Services Page', () => {
    let container
    // Render Compoment
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <Services />
            </BrowserRouter>
        ).container
    })
    it('renders the service component in the admin pages', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Services')
    })

    it('renders New Route button', async () => {
        const newButton = screen.getByRole('button', { name: 'New' })
        expect(newButton).toBeInTheDocument()
    })
})

describe('Admin New Service Page', () => {
    let container
    // Render Compoment
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <NewRoute />
            </BrowserRouter>
        ).container
    })
    it('renders the new service form in the admin pages', () => {

        expect(container.querySelector('.card-header')).toHaveTextContent('New Service')
    })
})

describe('Admin Users Page', () => {
    let container
    // Render Compoment
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <Users />
            </BrowserRouter>
        ).container
    })
    it('renders the users component in the admin pages', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Users')
    })
})

describe('Admin Reservations Page', () => {
    let container
    // Render Compoment
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <Reservations />
            </BrowserRouter>
        ).container
    })
    it('renders the reservations component in the admin pages', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Reservations')
    })
})

describe('Admin Locations Page', () => {
    let container
    // Render Compoment
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <Locations />
            </BrowserRouter>
        ).container
    })
    it('renders the locations component in the admin pages', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Locations')
    })


    it('renders New Location button', async () => {
        const newButton = screen.getByRole('button', { name: 'New' })
        expect(newButton).toBeInTheDocument()
    })
})

describe('Admin New Location Form', () => {
    let container
    // Render Compoment 
    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <NewLocation />
            </BrowserRouter>
        ).container
    })
    it('renders the new location form in the admin pages', () => {

        expect(container.querySelector('.card-header')).toHaveTextContent('New Location')
    })
})

describe('LocationModal handleSubmit', () => {
    it('calls updateField and handleCloseEditModal when form is submitted with valid data', () => {
      // Mock functions
      const handleChangeMock = vi.fn()
      const handleCloseEditModalMock = vi.fn()
      const updateFieldMock = vi.fn()
  
      // Render the component with mock props
      render(
        <LocationModal
          editedField={{ name: 'Sample Name', address: 'Sample Address', directions: 'Sample Directions' }}
          handleChange={handleChangeMock}
          handleCloseEditModal={handleCloseEditModalMock}
          updateField={updateFieldMock}
        />
      )
  
      // Submit the form with valid data
      fireEvent.click(screen.getByText('Save'))
  
      // Check if updateField and handleCloseEditModal are called
      expect(updateFieldMock).toHaveBeenCalledTimes(1)
      expect(handleCloseEditModalMock).toHaveBeenCalledTimes(1)
    })
  
    it('displays validation error when form is submitted with empty fields', () => {
      // Mock functions
      const handleChangeMock = vi.fn()
      const handleCloseEditModalMock = vi.fn()
      const updateFieldMock = vi.fn()
  
      // Render the component with mock functions
      render(
        <LocationModal
          editedField={{ name: '', address: '', directions: '' }}
          handleChange={handleChangeMock}
          handleCloseEditModal={handleCloseEditModalMock}
          updateField={updateFieldMock}
        />
      )
  
      // Submit the form with empty fields
      fireEvent.click(screen.getByText('Save'))
  
      // Check if validation errors are displayed
      expect(screen.getAllByText('This Field is Required')).not.toBeNull()
    })
  })