import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { Hono } from 'hono'
import { PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string   //Without mentioning this you'll get error at line 14 
  }                       
}>()

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter)

// app.use('/api/v1/blog/*', async(c, next) => {   //Middleware type-1
//   const jwt = c.req.header('Authorization');
//   if(!jwt) {
//     c.status(401);
//     return c.json({ error: "unauthorized"});
//   }
//   const token = jwt.split(' ')[1];
//   const payload = await verify(token, c.env.JWT_SECRET);
//   if(!payload) {
//     c.status(401);
//     return c.json({error: "unauthorized"});
//   }
//   c.set('userId', payload.id);
//   await next()
// })

// app.use('/api/v1/blog/*', async (c, next) => {      //Middleware type-2
//   //get the header  
//   const header = c.req.header("authorization") || "";
//   //Bearer token => ["Bearer", "token"]
//   const token = header.split(" ")[1]

//    //verify the header
//   const response = await verify(token, c.env.JWT_SECRET)
//   //if the header is correct, we can procees
//   if(response.id){
//     next()
//   } else {                  //if not, we return the user a 403 status code
//     c.status(403)
//     return c.json({error: "unauthorized"})
//   }
// })

export default app


//Hono return 