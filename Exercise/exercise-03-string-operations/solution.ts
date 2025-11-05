// Create variables
const firstName: string = "John"
const lastName: string = "Doe"

// Concatenate strings
const fullName: string = firstName + " " + lastName
// or using template literals: `${firstName} ${lastName}`

// Convert to uppercase
const upperName: string = fullName.toUpperCase()

// Convert to lowercase
const lowerName: string = fullName.toLowerCase()

// Get length
const nameLength: number = fullName.length

// Extract first 5 characters
const firstFive: string = fullName.substring(0, 5)

// Print all results
console.log("Full Name:", fullName)
console.log("Uppercase:", upperName)
console.log("Lowercase:", lowerName)
console.log("Length:", nameLength)
console.log("First 5 characters:", firstFive)
