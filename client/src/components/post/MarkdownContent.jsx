import { useState } from 'react'
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark, coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSelector } from 'react-redux';


const MarkdownContent = ({content}) => {
  if (!content)  return

  return (
    <div className='max-w-full'>
        <div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";

                        const isInline = !className;
                        return !isInline ? (
                              <CodeBlock code={String(children).replace(/\n$/, "")} language={language}/>
                        ) : (
                            <code className='px-1 py-0.5 text-sm bg-gray-100 dark:bg-primary/30 rounded' {...props}>
                                {children}
                            </code>
                        );
                    },
                    p({children}){
                        return <p className='mb-4 leading-[22px]'>{children}</p>
                    },
                    strong({children}){
                        return <strong className=''>{children}</strong>
                    },
                    em({children}){
                        return <em className=''>{children}</em>
                    },
                    ul({children}){
                        return <ul className='list-disc pl-6 space-y-2 my-4'>{children}</ul>
                    },
                    ol({children}){
                        return <ol className='list-decimal pl-6 space-y-2 my-4'>{children}</ol>
                    },
                    li({children}){
                        return <li className='mb-2 leading-[22px]'>{children}</li>
                    },
                    blockquote({children}){
                        return <blockquote className='border-l-4 border-teal-400 pl-4 italic bg-gray-200 dark:bg-primary/30 pt-6 pb-2 mb-4 rounded'>{children}</blockquote>
                    },
                    h1({children}){
                        return <h1 className='text-2xl font-bold mt-6 mb-4'>{children}</h1>
                    },
                    h2({children}){
                        return <h2 className='text-xl font-bold mt-6 mb-3'>{children}</h2>
                    },
                    h3({children}){
                        return <h3 className='text-lg font-bold mt-5 mb-2'>{children}</h3>
                    },
                    h4({children}){
                        return <h4 className='text-base font-bold mt-4 mb-2'>{children}</h4>
                    },
                    a({children}){
                        return <a className='text-teal-400 cursor-pointer hover:underline'>{children}</a>
                    },
                    table({children}){
                        return <div className='overflow-x-auto my-4 rounded border border-gray-300 dark:border-gray-200/40'>
                            <table className='min-w-full divide-y divide-gray-300 dark:divide-gray-200/40 '>
                                {children}
                            </table>
                        </div>
                    },
                    thead({children}){
                        return <thead className='text-xs  uppercase bg-primary text-white text-left dark:bg-primary/40'>{children}</thead>
                    },
                    tbody({children}){
                        return <tbody className=''>{children}</tbody>
                    },
                    tr({children}){
                        return <tr className='bg-white dark:bg-primaryDark dark:border-gray-200/30 border-b border-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20'>{children}</tr>
                    },
                    th({children}){
                        return <th className='px-2.5 md:px-6 py-3 bg-primary/70'>{children}</th>
                    },
                    td({children}){
                        return <td className='px-2.5 md:px-6 py-2'>{children}</td>
                    },
                    hr(){
                        return <hr className='border-gray-200 border-b dark:border-gray-200/40'/>
                    },
                    img({src, alt}){
                        return <img src={src} alt={alt} className=''/>
                    }
                }}
            >

                {content}
            </ReactMarkdown>
        </div>
    </div>
  )
}

export default MarkdownContent;


// const CodeBlock  = ({code, language}) => {

//     const [copied, setCopied] = useState(false);
//     const {theme} = useSelector(state => state.themeR)

//     const copyCode = () => {
//         navigator.clipboard.writeText(code);
//         setCopied(true);
//         setTimeout(() => {
//             setCopied(false);
//         }, 2000);
//     }

//     return (
//         <div className='mb-10 w-full border border-gray-300 dark:border-gray-200/40 rounded-md custom-scrollbar'>
//             <div className='flex items-center justify-between bg-gray-300 dark:bg-primaryDark h-full px-2 py-1 rounded-t-md border-b border-b-gray-300 dark:border-gray-200/40 '>
//                 <div className='flex items-center gap-2'>
//                     <LuCode size={16} className=''/>
//                     <span className=''>
//                         {language || "Code"}
//                     </span>
//                 </div>
                
//                 <button
//                     onClick={copyCode}
//                     className='flex gap-2 items-center cursor-pointer'
//                     aria-label='Copy code'
//                 >
//                     {copied ? (<LuCheck size={16} className='text-green-600' />) : (<LuCopy size={16}/>)}
//                     {copied && <span className=''>Copied!</span>}
//                 </button>
//             </div>
            
//             <SyntaxHighlighter language={language} style={theme === "dark" ? coldarkDark : coldarkCold} customStyle={{margin : 0, borderRadius : "0 0 6px 6px"}}>
//                 {code}
//                 hello world
//             </SyntaxHighlighter>

//         </div>
//     )

// }





const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useSelector(state => state.themeR);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-10 w-full rounded-md border border-gray-300 dark:border-gray-200/40 overflow-auto">
      <div className="flex items-center justify-between rounded-t-md bg-gray-300 dark:bg-primaryDark px-2 py-1 border-b border-b-gray-300 dark:border-gray-200/40">
        <div className="flex items-center gap-2">
          <LuCode size={16} />
          <span>{language || "Code"}</span>
        </div>
        <button
          onClick={copyCode}
          className="flex gap-2 items-center cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <LuCheck size={16} className="text-green-600 dark:text-white" />

            </>
          ) : (
            <LuCopy size={16} />
          )}
        </button>
      </div>

      {/* Responsive scrollable code block */}
      <div className="overflow-x-auto max-w-fit text-sm">



        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? coldarkDark : coldarkCold}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            padding: "1rem 1rem 1rem 0.5rem",
            borderRadius : "0 0 6px 6px",
            whiteSpace: "pre",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

