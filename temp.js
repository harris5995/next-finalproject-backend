import prisma from "./src/utils/prisma.js"

async function main() {
  prisma.users.create({
    data: {
      name: 'John',
      email: 'john@example.com',
      password: 'insecure',
    },
  }).then(users => {
    console.log(users)
  }).catch(e => {
    console.log(e.message)
  })
}

main()