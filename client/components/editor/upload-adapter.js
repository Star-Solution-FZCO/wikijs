import Cookies from 'js-cookie'

class UploadAdapter {
  constructor(loader) {
    this.loader = loader
    this.controller = new AbortController()
    this.signal = this.controller.signal
  }

  upload() {
    return this.loader.file.then((file) => {
      const formData = new FormData()
      formData.append('mediaUpload', file)
      formData.append('mediaUpload', JSON.stringify({ folderId: 0 }))

      const jwtCookie = Cookies.get('jwt')
      const headers = {
        'Authorization': `Bearer ${jwtCookie}`
      }

      return fetch('/u', {
        method: 'POST',
        body: formData,
        headers: headers,
        signal: this.signal
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json()
            return {
              default: data.url
            }
          } else {
            const errorMessage = await response.text()
            alert(
              `An error occurred while uploading the file: ${errorMessage}`
            )
            throw new Error(errorMessage || 'Upload failed')
          }
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            return
          }
          alert('An error occurred while uploading the file')
          throw error
        })
    })
  }

  abort() {
    this.controller.abort()
  }
}

function UploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader)
  }
}

export default UploadAdapterPlugin
