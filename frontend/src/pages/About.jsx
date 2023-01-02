import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { useDisplayContext } from '../hooks/useDisplayContext';

import Loading from '../component/Loading';

const About = () => {
    const [markdown, setMarkdown] = useState('')
    const { isPending, error, setLoading, setError } = useDisplayContext();

    useEffect(() => {
        setLoading(true);

        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/adityar22/PAW---Kelompok-6/master/README.md');
            const data = await response.text();
            if (data) {
                setLoading(false);
                setError(null);
            }
            if (!data) {
                setLoading(false);
                setError('Cannot fetch to github readme :(');
            }

            setMarkdown(data);
        }
        getData();
    }, [markdown]);

    return (
        <>
            {markdown ?
                <ReactMarkdown className="prose py-40 sm:py-20 justify-start px-6 sm:px-28 max-w-full h-screen" rehypePlugins={[rehypeRaw]}>
                    {markdown}
                </ReactMarkdown>
                :
                <div className="py-20 sm:py10 px-10 sm:px-28 h-screen w-full" >
                    <div className="my-12 mx-auto" >
                        {error && < div className='font-semibold text-lg text-red-400 mt-4' > Somehing error is occured🙀 </div>}
                        {isPending && < Loading />}
                    </div>
                </div>
            }
        </>
    );
}

export default About;