import { useState } from "react";
import useLRUCache from "../hooks/useLRUCache";

const DynamicContentLoader = () => {
    const [content, setContent] = useState([])
    const {get, put} = useLRUCache(3)

    const loadContent = async(id) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const loadedContent = {
            id,
            text: `Tab ${id} data`
        }
        // save new content to cache
        put(id, loadedContent)
        setContent((prevData) => [...prevData, loadedContent])
    }

    const handleButtonClick = (id) => {
        // get content form cache
        const cachedContent = get(id)
        if (cachedContent) {
            console.log(`content ${id} loaded from cache`)
            setContent((prevData) => [...prevData, cachedContent])
        } else {
            console.log(`loading content ${id}`)
            loadContent(id)
        }
    }

    return (
        <div>
            <h2>Dynamic Content Loader with LRU cache</h2>
            <button onClick={() => handleButtonClick(1)}>Tab 1</button>
            <button onClick={() => handleButtonClick(2)}>Tab 2</button>
            <button onClick={() => handleButtonClick(3)}>Tab 3</button>
            <button onClick={() => handleButtonClick(4)}>Tab 4</button>
            <button onClick={() => handleButtonClick(5)}>Tab 5</button>

            <div>
                <h3>Loaded content</h3>
                <ul>
                    {content.map((item, i) => {
                       return <li key={`${item.id}${i}`}>{item.text}</li>
                    })
                }</ul>
            </div>
        </div>
    )
}
export default DynamicContentLoader