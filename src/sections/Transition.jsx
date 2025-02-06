import React from 'react'

const Transition = ({ color, height }) => {

    const styles={
        backgroundColor: color,
        height: height,
        width: '100%',
        position: 'relative',
        zIndex: 5


    }

  return (
    <div style={styles}></div>
  )
}

export default Transition