import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// create a user
export async function createUser(firstName: string, lastName: string, username: string, password: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password,
      },
    });
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } 
}

// get all the friends of a user
export async function getFriends(userId: number) {
  const friends = await prisma.friend.findMany({
    where: { userId },
    select: {
      friend: {
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }
     
    }
  }).catch(error => {
    console.error('Error getting friends:', error);
    throw error;
  });

  return friends.map(friend => friend.friend);

}

// get the details of a user
export const getDetails= async function (id:number){
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: { firstName: true, lastName: true },
      });
      return user;
}

    // Add friend to the user
    export async function addFriend(userId: number, friendId: number) {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
    
      // Check if the friend exists
      const friend = await prisma.user.findUnique({
        where: { id: friendId },
      });
      if (!friend) {
        throw new Error(`Friend with ID ${friendId} not found`);
      }
    
      // Add the friend to the user
      const newFriend = await prisma.friend.create({
        data: {
          userId, friendId
        },
      });
    
      console.log(`Friend added to user ${userId}:`, newFriend);
      
     
    }
    export async function findByUandP(username:string,password:string) {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
          password: password,
        },
        select:{id:true,
        firstName:true}
      });
      return user;
      
    }





  
