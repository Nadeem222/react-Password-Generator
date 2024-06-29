import { useCallback, useEffect, useState , useRef } from 'react'


function App() {
  const [length , setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");

  //useRef Hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!~@#$%^&*(){}_-"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      
      pass += str.charAt(char)
    }
    setPassword(pass)
    
  },[length , numberAllowed , charAllowed , setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 4)
    window.navigator.clipboard.writeText(password)
  }, [password])


    useEffect(() => {
      passwordGenerator()
    } ,[length , numberAllowed , charAllowed , passwordGenerator])
  return (
    <>
      <div className='  w-full max-w-md mx-auto text-#93deff  rounded-lg px-4 py-3 my-8 shadow-md bg-gray-600'>
        <h1 className='text-white text-center text-2xl font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-2'>
          <input 
          type="text"
          value={password}
          className='w-full py-1 outline-none px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
           <button 
           className='text-white bg-blue-500 px-3 py-0.5 shrink-0 outline-none text'
           onClick={copyToClipboard}
           >
            copy
           </button>
        </div>
        <div className='flex text-sm gap-x-2'>
      <div className='flex gap-x-1 items-center'>
        <input 
        type='range'
        min={6}
        max={100}
        value={length} 
        onChange={(e) => {setLength(e.target.value)}}/>
        <label className='font-bold' >Label: {length} </label>
      </div>
      <div className='flex gap-x-1 items-center'>
        <input
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
          
        />
        <label htmlFor="numbersInput" className='font-bold'>Numbers</label>
      </div>
      <div className='flex gap-x-1 items-center'>
        <input
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          
        />
        <label htmlFor="characterInput" className='font-bold'>Characters</label>
      </div>
        </div>
      </div>
    </>
  )
}

export default App
