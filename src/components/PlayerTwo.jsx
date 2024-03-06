import { useState } from "react";
import "./styles.css";

function PlayerTwo({P2UserName}) {
    // State to store the indices of clicked icons
    const [clickedIndices, setClickedIndices] = useState([]);

    var newIndices_p2
    // Function to handle click events on the icons
    const handleIconClick = (index) => {
        setClickedIndices((prevIndices) => {
            // Check if the index already exists in the array
            if (!prevIndices.includes(index)) {
                // Add the index to the array if it's not already clicked
                newIndices_p2 = [...prevIndices, index];
                // Log the new array of clicked indices
                console.log('Selected Indices(player2):', newIndices_p2);
                return newIndices_p2;
            }
            // Return the previous indices if the index is already clicked
            return prevIndices;
        });
    };

    // Function to determine the opacity based on whether the icon is clicked
    const getOpacity = (index) => {
        return clickedIndices.includes(index) ?   1 :   0.35;
    };

    return (
        <div className={`border-black border-4 rounded-xl p-1 flex flex-wrap w-1/2 ${P2UserName ? 'opacity-50 pointer-events-none disabled:pointer-events-none disabled:opacity-50' : ''}`}>
            {Array.from({ length:   25 }, (_, index) => (
                <div
                    key={index}
                    onClick={() => handleIconClick(index)}
                    style={{ opacity: getOpacity(index) }}
                    onMouseEnter={() => {
                        // Only change the opacity to   0.5 on mouse enter if the icon is not clicked
                        if (!clickedIndices.includes(index)) {
                            document.getElementById(`icon2-${index}`).style.opacity = '0.5';
                        }
                    }}
                    onMouseLeave={() => {
                        // Only reset the opacity to   0.35 on mouse leave if the icon is not clicked
                        if (!clickedIndices.includes(index)) {
                            document.getElementById(`icon2-${index}`).style.opacity = '0.35';
                        }
                    }}
                    id={`icon2-${index}`}
                    className={`relative bg-blue-500 rounded-md border-2 border-black w-1/5 disabled:pointer-events-none disabled:opacity-50 ${clickedIndices.length > 6 ? 'opacity-50 pointer-events-none' : ''}`}
                ></div>
            ))}
        </div>
    );
}

export default PlayerTwo;
