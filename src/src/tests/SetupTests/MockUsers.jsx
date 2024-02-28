import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http, graphql } from 'msw'

let userData = {}
let token = {}

// Function to perform login request and store user data and token
async function login() {
  const response = await fetch('http://127.0.0.1:4001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'admin1234',
    }),
  })
  const data = await response.json()
  userData = data.user
  token = data.token
  return { userData, token }
}

const adminData = {
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

const userData = {
  "_id": "65dd1c93a8300ebb63c80e32",
  "name": "Test User",
  "email": "user@example.com",
  "password": "123456",
  "DOB": "1990-09-19T14:00:00.000Z",
  "is_admin": false,
  "reservations": [
    "65dd1c94a8300ebb63c80e46"
  ],
  "__v": 0
}

const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ0MzViZGU4NDgyMzA4YzJlM2IxMWIiLCJpc19hZG1pbiI6dHJ1ZSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwODQwODMzOCwiZXhwIjoxNzA4NDUxNTM4fQ.4z2WXZAaGYYY_1rTmbg1jZVOLeIwNxZeOR-aNTuLj-Y"
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRkMWM5M2E4MzAwZWJiNjNjODBlMzIiLCJpc19hZG1pbiI6ZmFsc2UsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTcwOTA4ODA3MSwiZXhwIjoxNzA5MTMxMjcxfQ.55K3IOJx47XWSlSlLrbnO976q_wP-NYIFpCrixiOLIw"



