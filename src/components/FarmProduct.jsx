import React from 'react'
import { z } from 'zod'


const FarmProduct = ({name, type, quantity}) => {
  const schema = z.object({
    name: z.string().nonempty(),
    type: z.enum(["vegetable","fruit","grain"]),
    quantity: z.number().min(1).max(10)
  })


  const result = schema.safeParse({name,type,quantity});

  if(!result.success){
    console.error(result.error.issues);
  }else{
    console.log(result.data);
  }

  return (
    <div>
      <h4>Product Name: {name}</h4>
      <h4>Type: {type}</h4>
      <h4>Quantity: {quantity}</h4>
      <p>___________________________________________________________________________________</p>
    </div>
    
  )
}

export default FarmProduct