import React from 'react'

function useTodo (initTodo) {
  const [todo,setTodo] = React.useState([])

  return {
    data: todo,
    remove:(i)=> setTodo(pre=>pre.splice(i,1)),
    clear:()=> setTodo([]),
    add: (field)=> setTodo(pre=>setTodo.push({field,check:false,})),
    check: (i)=> setTodo(pre=>{
      setTodo.splice(i,1,{...pre[i],check:!pre[i]})
      return pre
    })
  }
}

function About(props) {
  return (
    <div>
      todoList
    </div>
  )
}

export default About
