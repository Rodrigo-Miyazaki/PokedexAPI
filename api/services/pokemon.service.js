 getAttacksQuantity = (pokemon)=>{
    let attacksQuantity = 0;
    if(pokemon.fastAttack && pokemon.fastAttack.length > 0){
        attacksQuantity += pokemon.fastAttack.length;
    }
    if(pokemon.specialAttack && pokemon.specialAttack.length > 0){
        attacksQuantity += pokemon.specialAttack.length;
    }
    return attacksQuantity;
}

getFormattedTypes = (pokemon)=>{
    let types = "";
    if(pokemon.types && pokemon.types.length > 0){
        pokemon.types.forEach((type, index)=>{
            types  += `${type}`;
            if(index != pokemon.types.length -1){
                types  += ", ";
            }
        })
    }
    return types;
}

module.exports = {getAttacksQuantity, getFormattedTypes}