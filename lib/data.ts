// user data 
const users = [
  {
    name: "Md Dipul Hasan",
    email: "mddipulhasan@gmail.com",
    password: "password",
    image: '/images/users/user-1.jpg',
  },
  
]

export type User = (typeof users)[number]

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}