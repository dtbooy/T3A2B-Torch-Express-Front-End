import { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={value}
        onChange={onChange}
        isInvalid={!!error}
      />
      <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </InputGroup>
  )
}

export default PasswordInput

