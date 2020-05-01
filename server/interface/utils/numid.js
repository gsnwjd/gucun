function id(a){
    let num_id=''
    let char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNLOPRSTUVWXYZ1234567890'.split("")
    for(let i=0;i<a;i++){
        let x = Math.floor(Math.random()*(char.length))
        num_id = char[x]+num_id
    }
    return num_id
  }

  exports.id = id