import { Hono } from 'hono'
import { PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import z from "zod";
import { signupInput, signinInput } from '../zod';

// //zod
// const signupInput = z.object({
//   username: z.string().email(),
//   password: z.string().min(6),
//   name: z.string().optional()
// })

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string   //Without mentioning this you'll get error at line 14 
    }                       
  }>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,          //To Access environment variable
    }).$extends(withAccelerate())
  
    try{
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      }
    })
  
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)  //jwt secret can be string or like env where we give in wrangler.jsonc
    
    return c.json({jwt}) 
  } catch(e) {
    c.status(403);
    return c.json({e}); 
  }
  })
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      const user = await prisma.user.findUnique({  //const user = await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password
        }
      });
    
      if(!user){
        c.status(403);   //unauthorized
        return c.json({
          meessage: "Incorrect Credentials"
        });
      }
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
      return c.json({jwt})
    } catch(e) {
      c.status(403);
    return c.json({e}); 
    }
    
  })