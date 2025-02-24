import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    //store it in state
    //store it directly here
    //store it in a context variable?
    //create our own custom hook called useBlogs

    const { loading, blogs } = useBlogs();
    console.log("blogs: ", blogs)

    if (loading) {
        return <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">

            <div className="mx-w-xl">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author?.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"15th Feb 2024"}
                />)}
            </div>

        </div>
    </div>
}