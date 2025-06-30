const blogPostIdeasPrompt = (topics) => `

    Generate a list of 5 blog post ideas releted to ${topics}.

    For each blog post idea, return : 
    - a title
    - a 2-line description about the post
    - 3 relevent tags
    - the tone (e.g., technical, casual, beginner-friendly, etc.)
    - there are only 4 categories. Programming, Technology, Travel and Health

    Return the result as an array of JSON objects in this format : 

    [
        {
            "title" : "",
            "description" : "",
            "category" : "",
            "tags" : ["", "", ""],
            "tone" : ""
        }
    ]


    Important : Do NOT add any extra text outside the JSON format. Only return valid JSON.

`;


const generateReplyPrompt = (comment) => {
    

    return `You're replying to a blog comment. The comment says : "${comment.content}".
       Write a thoughtful, concise, and relevant one-line reply to this comment.
    `
}

const blogSummeryPrompt = (blogContent) => (`
    
    You are an AI assistant that summarizes blog posts.

    Instructions : 
    - Read the blog post content below
    - Generate a short, catchy, SEO-friendly title (max 12 words)
    - Write a clear, engaging summary of about 100 words.
    - At the end of the summary, add a markdown section titled **## What You'll Learn**.
    - Under that heading, list 3-5 keys takeaways or skills the reader will learn in the **bullet points** using markdown (\`-\`).

    Return the result in **valid JSON** with the following structure : 

    {
        "title" : "",
        "summary" : ""
    }

    Only return valid JSON. Do NOT include markdown or code blocks around the JSON. 

    Important : Must include a section in the last with the title "What You'll Learn" with the bullet points, don't put comma before the title. i want the summary in a single markdown.


    Blog Post Content : 
    ${blogContent}

    
    `)

    export  {blogPostIdeasPrompt, generateReplyPrompt, blogSummeryPrompt}