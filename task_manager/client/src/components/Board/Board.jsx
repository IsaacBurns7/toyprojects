import React from "react";
import Column from "./Column";

function Board({columnsArray}){
    const columns = columnsArray.map((columnObject) => {
        return (
            <Column columnObject = {columnObject}/>
        )
    })
    console.log(columns);
    return (
        <div class = "board">
            {columns}
        </div>
    );
}

export default Board;