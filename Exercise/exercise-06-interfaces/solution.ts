// Person interface
interface Person {
  name: string
  age: number
  email: string
}

// Product interface
interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
}

// Create person object
const person: Person = {
  name: "John Doe",
  age: 30,
  email: "john@example.com"
}

// Create product objects
const product1: Product = {
  id: "P001",
  name: "Laptop",
  price: 999.99,
  inStock: true
}

const product2: Product = {
  id: "P002",
  name: "Mouse",
  price: 29.99,
  inStock: true
}

// Function to greet person
const greetPerson = (person: Person): string => {
  return `Welcome, ${person.name}!`
}

// Function to calculate total price
const calculateTotalPrice = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.price, 0)
}

// Test the code
console.log(`Person: ${person.name}, ${person.age}, ${person.email}`)
console.log("Greeting:", greetPerson(person))
console.log(`Product: ${product1.name} ($${product1.price})`)
console.log("Total Price: $" + calculateTotalPrice([product1, product2]).toFixed(2))
