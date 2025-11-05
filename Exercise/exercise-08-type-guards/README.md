# Exercise 08: Type Guards

## Objective
Learn to validate data types using type guards.

## Instructions
1. Create interface for User (id, name, age)
2. Create type guard function to validate User
3. Create function to process unknown data
4. Test with valid and invalid data

## Expected Output
```
Valid user: { id: '1', name: 'John', age: 25 }
Invalid data: rejected
Processing result: User John is 25 years old
```

## Hints
- Type guard syntax: `(data: unknown): data is Type`
- Use `typeof` to check property types
- Check if data is object and not null first
