import { Star } from 'lucide-react';
export const StarNote = ( { note } : { note: number }) => {
    let node_color= "text-yellow-500"
    return (
      <>
          {Array.from({length: 5}).map((_, max_note)=>{
              return (
                  <StarItem
                      key={max_note}
                      node_color={node_color}
                      max_note={max_note}
                      note={note}
                  />
              )
          })}

      </>
    );
}
const StarItem = ( { note, max_note , node_color } : { note: number , max_note: number, node_color: string})=>{
    return (
        <div
            className={`${ note >= max_note && note !== 0 ? node_color : ""}`}
        >
            <Star
                size={10}
                absoluteStrokeWidth
            />
        </div>
    )
}