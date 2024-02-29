import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { afterAll, beforeAll } from 'vitest'

const response = {
        status: '200',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        userData: {
            "_id": "65d435bde8482308c2e3b11b",
            "name": "Test Administrator",
            "email": "admin@example.com",
            "password": "admin1234",
            "DOB": "1995-04-11T14:00:00.000Z",
            "is_admin": true,
            "reservations": [
              "65d435bde8482308c2e3b12e",
              "65d435bde8482308c2e3b12f",
              "65d435bde8482308c2e3b133"
            ],
            "__v": 0
          }
}
const MOCK_SERVER_PORT = 4002

// Update the mock request setup to use the mock server port
const restHandler = [
    rest.get(`http://127.0.0.1:${MOCK_SERVER_PORT}/login`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response))
    })
]

// Start the mock server on the mock server port
const server = setupServer(...restHandler)

beforeAll(() => server.listen({ onUnhandledRequest: 'error'}, MOCK_SERVER_PORT))

afterAll(() => server.close())
