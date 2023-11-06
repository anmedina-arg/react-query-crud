export const handleValidate = (input) => {
    const errors = {}
      if (!input.name) {
        errors.name = 'Required'
      }
      if (!input.description) {
        errors.description = 'Description required cabezon'
      }
      if (!input.price) {
        errors.price = 'Price required'
      }
      return errors
  }