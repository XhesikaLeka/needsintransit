export const queryRequest  = async (request) =>{
    try{
      return await request();
    }catch{(err => {
        let errors  = []
        if(err.status === 500){
            errors.push("Something wrong happened, please try again ")
        }
    })}
}