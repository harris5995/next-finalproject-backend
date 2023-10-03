export function validateBottoms(input) {

    const validationErrors = {}
  
    if (!('name' in input) || input['name'].length == 0) {
      validationErrors['name'] = 'cannot be blank'
    }
  
    if (!('color' in input) || input['description'].length == 0) {
      validationErrors['description'] = 'cannot be blank'
    }
  
    return validationErrors
  }