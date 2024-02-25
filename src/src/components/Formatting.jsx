const formatDOB = (dob) => {

    const date = new Date(dob)
    
   
    const day = date.getDate()
    const month = date.getMonth() + 1 
    const year = date.getFullYear()
    
  
    return `${day} / ${month} / ${year}`
}
export { formatDOB }