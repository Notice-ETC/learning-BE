// Function to add two numbers
function add(a: number, b: number): number {
  return a + b
}

// Function to multiply two numbers
function multiply(a: number, b: number): number {
  return a * b
}

// Function to greet a person
function greet(name: string): string {
  return `Hello, ${name}!`
}

// Function to calculate circle area
function calculateCircleArea(radius: number): number {
  return Math.PI * radius * radius
}

// Call all functions and print results
console.log("Sum:", add(5, 10))
console.log("Product:", multiply(5, 10))
console.log("Greeting:", greet("Alice"))
console.log("Circle Area:", calculateCircleArea(5).toFixed(2))
