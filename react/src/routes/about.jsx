import React,{Suspense} from 'react'

const TodoList = React.lazy(async ()=>{
  const result = import('./todoList')
  await new Promise(r=>setTimeout(r,2000))
  return result
});

function About(props) {
  const [name] = React.useState('Seven')
  return (
    <div>
      <Suspense fallback={<div>pending...</div>}>
        <TodoList></TodoList>
      </Suspense>
      <h1>Hello! My Name is Seven</h1>
    </div>
  )
}

export default About
