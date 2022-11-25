import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const About = () => {
    const [markdown, setMarkdown] = useState('')

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/adityar22/PAW---Kelompok-6/master/README.md');
            const data = await response.text();
            setMarkdown(data);
        }
        getData();
    }, [markdown]);

    return (
        <>
            <ReactMarkdown className="prose py-40 sm:py-20 justify-start px-6 sm:px-28 max-w-full h-screen" rehypePlugins={[rehypeRaw]}>
                {markdown}
            </ReactMarkdown>
        </>
    );
}

export default About;