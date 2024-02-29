
import App from "../components/App"
// import Register from "../components/Register"
import renderWithRouter from "./SetupTests/TestUtils"
import { describe, it} from "vitest"
import { screen } from '@testing-library/react'

describe("Register Component", () => {
    it("renders register component when not logged in", () => {
        const {container} = renderWithRouter(<App/>)
        const signupButton = screen.getByRole('button', { name: 'Sign Up' })
        expect
    })

})