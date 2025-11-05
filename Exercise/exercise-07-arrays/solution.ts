// Create array of numbers
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Create array of strings
const words: string[] = ["Hello", "world", "from", "TypeScript"]

// Calculate sum
const sum: number = numbers.reduce((total, num) => total + num, 0)

// Find largest number
const largest: number = Math.max(...numbers)

// Filter even numbers
const evenNumbers: number[] = numbers.filter(num => num % 2 === 0)

// Map to squares
const squares: number[] = numbers.map(num => num * num)

// Join strings
const sentence: string = words.join(" ")

// Print results
console.log("Numbers:", numbers)
console.log("Sum:", sum)
console.log("Largest:", largest)
console.log("Even numbers:", evenNumbers)
console.log("Squares:", squares)
console.log("Sentence:", sentence)
