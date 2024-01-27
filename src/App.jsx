import { useState } from 'react'
import './App.css'

export default function App() {
  const [items,setItems] = useState([])
  function handleAddItems(newItem) {
    setItems((prevItems) => [...prevItems, newItem])
  }
  function deleteItem (id){
    setItems(items=>items.filter(item=>item.id!==id))
  }
  function handleToggleItem(id){
    setItems(items=>items.map((item)=>item.id===id?{...item, packed: !item.packed}:item ))
  } 
  function handleDeleteAll (){
    alert("Do you really want to delete all the items in the list?")
    setItems([])
  }
  return (
    <div className='app'>
     <Logo/>
     <Form onAddItems={handleAddItems}/>
     <PackingList items={items} onDelete = {deleteItem} onToggleItem={handleToggleItem} onDeleteAll = {handleDeleteAll}/>
     <Stats items={items}/>
    </div>
  )
}

function Logo(){
  return (
    <h1>🏖️Far Away🌴</h1>
  )
}
function Form({onAddItems}){
  const [description,setDescription] = useState('')
  const [quantity,setQuantity] = useState(1)
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!description) return
   const newItems = {description,quantity,packed:false,id:Date.now()}
   console.log(newItems)
   onAddItems(newItems)
   setDescription('')
   setQuantity(1)
  }
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip😍</h3>
      <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
       {Array.from({length:20},(_,i)=>i+1).map((num)=>(
        <option value={num} key={num}>{num}</option>
       ))}
      </select>
        <input
         type='text'
          placeholder='add here..'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />
        <button>Add</button>
    </form>
  )
}
function PackingList({ items,onDelete, onToggleItem, onDeleteAll }) {
  const [sortBy,setSortBy] = useState('input')
  let sortedItems;
  if(sortBy === 'input') sortedItems=items
  if(sortBy==='description') sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description))
  if(sortBy==="packed") sortedItems =items.slice().sort((a,b)=>Number(a.packed) - Number(b.packed))
  return (
    <div className='list'>
      <ul >
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={onDelete} onToggleItem={onToggleItem}/>
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAll}>Clear All</button>
      </div>
    </div>
  );
}
function Item({item,onDelete, onToggleItem}){
  
  return(
    <li>
      <input type='checkbox' value={item.packed} onChange={()=>{onToggleItem(item.id)}}/>
      <span style={item.packed ? {textDecoration:"line-through"}:{}}>
         {item.quantity} {item.description}
      </span>
    <button onClick={()=>onDelete(item.id)}>❌</button>
    </li>
  )
}
function Stats({items}){
  if(!items.length)
    return(
      <p className='stats'>
        <em>Start adding items to your packing list🚀</em>
      </p>
  );
  const numItems= items.length //4
  const numItemsPacked = items.filter((item)=>item.packed).length //2 //per 50%
  const numItemspackedPercentage = Math.round((numItemsPacked/numItems ) *100)
  return (
    <footer className='stats'>
      <em>
        {numItemspackedPercentage ===100 ? "You have got everything. Ready to go✈️" :  ` 💼You have ${numItems} items on your list and you have already packed ${numItemsPacked}(${numItemspackedPercentage}%)`}
     
      </em>
    </footer>
  )
}



