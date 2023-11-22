export default {
  ApplyMask: (input: string, type: string) => {
    const masks = {
      'cpf': () => {
        if (input.length === 11) {
          return input.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
        }
        return input
      }
    }

    if (type in masks) {
      return masks[type]()
    }
  }
}
