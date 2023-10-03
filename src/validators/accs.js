export function validateAccs(input) {


    const validationErrors = {}
  
    if (!('name' in input) || input['name'].length == 0) {
      validationErrors['name'] = 'cannot be blank'
    }
  
    if (!('color' in input) || input['color'].length == 0) {
      validationErrors['color'] = 'cannot be blank'
    }
  
    return validationErrors
  }