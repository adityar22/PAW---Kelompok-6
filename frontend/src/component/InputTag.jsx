import { useState } from 'react'

const InputTag = ({ tag, setTag }) => {

    function handleKeyDown(e) {
        e.stopPropagation();

        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTag([...tag, value])
        e.target.value = ''

        e.preventDefault();
    }

    function removeTag(index) {
        setTag(tag.filter((el, i) => i !== index))
    }

    return (
        <div className="">
            {tag.map((tag, index) => (
                <div className="inline-block badges text-base mb-3" key={index}>
                    <span
                        className="">
                        {tag}
                    </span>
                    <span className="font-extrabold ml-3 cursor-pointer" onClick={() => removeTag(index)}>x</span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Type somthing" />
        </div>
    )
}


export default InputTag