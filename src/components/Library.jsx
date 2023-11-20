import React from 'react'

export default function Library() {
  
    return (
      <>
        <h1>Eric's Music Dashboard</h1>
        <div className="button-options" style={{}}>
          <button style={{border: '2px solid black', borderRadius: '10px', width: '200px', margin: '0 25px 0 0'}}>
            Go To Library
          </button>
          <button style={{border: '2px solid black', borderRadius: '10px', width: '200px'}}>
            Go To Personal Music
          </button>
        </div>
      </>
    )
}
