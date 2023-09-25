'use client'
import { memo, useState, useMemo, useCallback } from 'react'
import styles from './page.module.css'


// コンポーネントのメモ化
const Child_1 = () => {
  return (
    <>
      <p>子コンポーネント１です。</p>
    </>
  )
}
const MemoChild_1 = memo(Child_1)

const Child_2 = ( props: { handleClick: () => void }) => {
  return (
    <>
      <p>子コンポーネント2です。</p>
      <button onClick={props.handleClick}>ボタン</button>
    </>
  )
}

export default function Parent() {
  const [text, setText] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // コールバック関数のメモ化
  const handleClick = useCallback(() => {
    console.log('ボタンがクリックされました。')
  },[])


  const [count, setCount] = useState(0)

  const double = (count: number) => {
    let i = 0
    while (i < 1000000000) {
      i++
    }
    return count * 2
  }
  // const doubleCount = double(count) //重い計算処理 
  // 処理のメモ化
  const doubleCount = useMemo(()=>double(count),[count]) //メモ化

  return (
    <div>
      <p>親コンポーネントです。</p>
      <input type="text" onChange={handleInputChange} value={text} />
      <MemoChild_1 />
      <Child_2 handleClick={handleClick} />
      <p>親コンポーネントで重い計算処理</p>
      <p>Counter:{count} , {doubleCount}</p>
      <button onClick={()=>setCount(count + 1)}>Increment Count</button>
    </div>
  )
}
