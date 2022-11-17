import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const About = () => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/adityar22/PAW---Kelompok-6/master/README.md');
            const data = await response.text();
            console.log(data);
            setMarkdown(data);
        }
        getData();
    }, [markdown]);

    return (
        <>
            <ReactMarkdown className="prose py-20 px-28 h-screen max-w-full" rehypePlugins={[rehypeRaw]}>
                {markdown}
            </ReactMarkdown>
        </>
    );
}

export default About;