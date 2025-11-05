// Arrow function to subtract two numbers
const subtract = (a: number, b: number): number => {
  return a - b
}

// Arrow function to divide two numbers
const divide = (a: number, b: number): number => {
  return a / b
}

// Arrow function to check if number is even
const isEven = (num: number): boolean => {
  return num % 2 === 0
}

// Arrow function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32
}

// Shorter version (single expression)
// const celsiusToFahrenheit = (celsius: number): number => (celsius * 9/5) + 32

// Call all functions and print results
console.log("Difference:", subtract(15, 10))
console.log("Quotient:", divide(10, 5))
console.log("Is Even:", isEven(10))
console.log("Fahrenheit:", celsiusToFahrenheit(25))
