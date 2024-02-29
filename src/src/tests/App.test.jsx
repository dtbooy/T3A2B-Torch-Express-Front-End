import '@testing-library/jest-dom'
import { describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import App from '../components/App'

describe('App Component', () => {
    it('Render App Component', () => {
        render(
            <App />
        )

        expect(screen.getByText('© Torch Express 2024')).toBeDefined()
    })
})