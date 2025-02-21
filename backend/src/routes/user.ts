import { Hono } from 'hono'
import { PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string   //Without mentioning this you'll get error at line 14 
    }                       
  }>();

userRouter.post('/signup', async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,          //To Access environment variable
    }).$extends(withAccelerate())
  
    try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
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
    return c.json({error: "error while signing up"}); 
  }
  })
  
userRouter.post('/api/v1/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const user = await prisma.user.findUnique({  //const user = await prisma.user.findFirst({
      where: {
        email: body.email,
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
  })