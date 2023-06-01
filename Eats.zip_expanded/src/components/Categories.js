import React from 'react'

const Categories = ({filterCategories, categories}) => {
  return (
    <div className='Container'>
       <div className='row'></div>
       <div className='col-8  mx-auto'></div>
       <center>
       <div >
        {
       categories.map((category)=>
       {
        return <><button type="button" className='btn btn-info'  onClick={()=>filterCategories(category)}>
        {category}</button>{" "}</>
       })
        }
        </div>  
        </center>    
    </div>
  )
}

export default Categories
