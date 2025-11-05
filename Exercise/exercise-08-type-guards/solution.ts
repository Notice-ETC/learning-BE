// User interface
interface User {
  id: string
  name: string
  age: number
}

// Type guard function
const isUser = (data: unknown): data is User => {
  // Check if it's an object and not null
  if (typeof data !== 'object' || data === null) {
    return false
  }

  // Convert to Record to access properties
  const obj = data as Record<string, unknown>

  // Check all properties
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.age === 'number'
  )
}

// Function to process data
const processUserData = (data: unknown): string => {
  if (isUser(data)) {
    return `User ${data.name} is ${data.age} years old`
  } else {
    return 'Invalid user data'
  }
}

// Test with valid data
const validUser = {
  id: '1',
  name: 'John',
  age: 25
}

console.log("Valid user:", validUser)
console.log("Is valid user:", isUser(validUser))
console.log("Processing result:", processUserData(validUser))

// Test with invalid data
const invalidData = {
  id: '2',
  name: 'Jane'
  // missing age
}

console.log("\nInvalid data:", invalidData)
console.log("Is valid user:", isUser(invalidData))
console.log("Processing result:", processUserData(invalidData))
