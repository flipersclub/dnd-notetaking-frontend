import React, { JSX, useEffect, useRef, useState } from 'react'


interface TProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PageTitleField = (props: TProps): JSX.Element => {
  const {value, onChange, placeholder} = props;
  const ref = useRef<HTMLHeadingElement>(null)
  const [showPlaceholder, setShowPlaceholder] = useState(!value);

  return (
    <div className="w-full font-display text-7xl relative">
      {!value && placeholder && showPlaceholder && (
        <div className="absolute z-0 px-6 w-full text-stone-400 text-center">{placeholder}</div>
      )}
      <h1
        contentEditable
        suppressContentEditableWarning={true}
        ref={ref}
        className="relative z-10 border-none bg-transparent px-6 -mt-1 break-words text-center outline-none"
        onBlur={(e) => onChange(e.currentTarget.textContent || '')}
        onInput={(e) => {
          setShowPlaceholder(e.currentTarget.textContent?.trim() === '')
        }}
      >{value}</h1>
    </div>
  )
}

export default PageTitleField