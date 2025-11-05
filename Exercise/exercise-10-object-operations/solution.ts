// Student interface
interface Student {
  id: string
  name: string
  scores: number[]
}

// Create student object
const student: Student = {
  id: 'S001',
  name: 'John Doe',
  scores: [85, 90, 88]
}

// Function to calculate average score
const calculateAverage = (scores: number[]): number => {
  const sum = scores.reduce((total, score) => total + score, 0)
  return sum / scores.length
}

// Function to add score
const addScore = (student: Student, newScore: number): Student => {
  return {
    ...student,
    scores: [...student.scores, newScore]
  }
}

// Use destructuring
const { id, name: studentName, scores } = student

console.log("Student:", studentName)
console.log("Scores:", scores)
console.log("Average:", calculateAverage(scores).toFixed(2))

// Add new score
const updatedStudent = addScore(student, 95)

console.log("\nAfter adding new score:", updatedStudent.scores)
console.log("New average:", calculateAverage(updatedStudent.scores).toFixed(2))

// Original student unchanged (immutability)
console.log("\nOriginal student scores:", student.scores)
