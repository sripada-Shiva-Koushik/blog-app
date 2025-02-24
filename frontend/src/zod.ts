// import z from "zod";

// export declare const signupInput: z.ZodObject<{       //export declare const signupInput: z.ZodObject<{
//     username: z.ZodString;
//     password: z.ZodString;
//     name: z.ZodOptional<z.ZodString>;
// }, "strip", z.ZodTypeAny, {
//     username: string;
//     password: string;
//     name?: string | undefined;
// }, {
//     username: string;
//     password: string;
//     name?: string | undefined;
// }>;

// export declare const signinInput: z.ZodObject<{
//     username: z.ZodString;
//     password: z.ZodString;
// }, "strip", z.ZodTypeAny, {
//     username: string;
//     password: string;
// }, {
//     username: string;
//     password: string;
// }>;

// export declare const createBlogInput: z.ZodObject<{
//     tutle: z.ZodString;
//     content: z.ZodString;
// }, "strip", z.ZodTypeAny, {
//     tutle: string;
//     content: string;
// }, {
//     tutle: string;
//     content: string;
// }>;

// export declare const updateBlogInput: z.ZodObject<{
//     tutle: z.ZodString;
//     content: z.ZodString;
//     id: z.ZodNumber;
// }, "strip", z.ZodTypeAny, {
//     tutle: string;
//     content: string;
//     id: number;
// }, {
//     tutle: string;
//     content: string;
//     id: number;
// }>;
// // export type SignupInput = z.infer<typeof signupInput>;
// // export type SigninInput = z.infer<typeof signinInput>;
// // export type CreateBlogInput = z.infer<typeof createBlogInput>;
// // export type UpdateBlogInput = z.infer<typeof updateBlogInput>;


import z from "zod"

// zod
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

//type inference in zod
export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
  })
  
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
  })

 export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
  })

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>  
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>