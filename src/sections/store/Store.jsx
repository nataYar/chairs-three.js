import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './StoreButton'

import Autoplay from 'embla-carousel-autoplay'

import "../../styles/Store.scss";
import Item1 from './Item1';
// import Item2 from './Item2';


const Store = (props) => {
  const { slides } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <section className="store">
      <div className='store__text'>
       
        <h2> Not all office chairs are built the same.</h2>
        <h2>Some are practical.</h2>
        <h2>Some are extra.</h2>
        <h2>Some… are legendary.</h2>

        <h2>Find yours.</h2>
        
        
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <Item1 />
          {/* <Item2 /> */}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Store