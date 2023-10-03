export function validateShoes(input) {

    //item_id, user, user_id, name, color, occasion
    const validationErrors = {}
  
    if (!('name' in input) || input['name'].length == 0) {
      validationErrors['name'] = 'cannot be blank'
    }
  
    if (!('color' in input) || input['color'].length == 0) {
      validationErrors['color'] = 'cannot be blank'
    }
  
    return validationErrors
  }