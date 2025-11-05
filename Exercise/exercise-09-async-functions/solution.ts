// Interface for User
interface User {
  id: string
  name: string
}

// Async function to fetch user data
const fetchUserData = async (): Promise<User> => {
  console.log("Fetching user data...")
  
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'John Doe'
      })
    }, 1000)
  })
}

// Async function to save user
const saveUser = async (user: User): Promise<void> => {
  console.log("Saving user...")
  
  // Simulate save operation delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User saved successfully!")
      resolve()
    }, 1000)
  })
}

// Main function
const main = async (): Promise<void> => {
  try {
    // Fetch user data
    const user = await fetchUserData()
    console.log("User data:", user)
    
    // Save user
    await saveUser(user)
    
  } catch (error) {
    console.error("Error:", error)
  }
}

// Run main function
main()
