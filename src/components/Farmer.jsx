 import {z} from 'zod';

const Farmer = ({name, age, location}) =>{
    const schema = z.object({
        name: z.string("Name must be in string format").nonempty("Name cannot be empty"),
        age: z.number(),
        location: z.string().optional()
    })

        const result = schema.safeParse({name,age,location});
        if(!result.success){
            console.error(result.error.issues);
        }else{
            console.log(result.data);
        }

    
    return(

        <>
        

        <h4>Name : {name}</h4>
        <h4>Age : {age}</h4>
        <h4>Farm Location : {location}</h4>
        <p>___________________________________________________________________________________</p>
        </>
        
    )
}
export default Farmer;