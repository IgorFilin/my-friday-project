export const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.result) resolve(reader.result as string)
            else reject('getBase64: Unexpected error')
        }
        reader.onerror = (error) => reject(error)
    })
