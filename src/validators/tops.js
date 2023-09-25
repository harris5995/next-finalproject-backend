export function validateTops(input) {

    //item_id, user, user_id, name, description, occasion
    const validationErrors = {}
  
    if (!('name' in input) || input['name'].length == 0) {
      validationErrors['name'] = 'cannot be blank'
    }
  
    if (!('description' in input) || input['description'].length == 0) {
      validationErrors['description'] = 'cannot be blank'
    }
  
    if (!('occasion' in input) || input['occasion'].length == 0) {
      validationErrors['occasion'] = 'cannot be blank'
    }
  
    return validationErrors
  }