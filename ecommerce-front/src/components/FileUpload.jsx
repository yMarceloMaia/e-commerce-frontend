import React from 'react';

function FileUpload({setFile, setError}) {

    
  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file && file.type.includes("text/csv")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvContent = e.target.result
        
        setFile(csvContent.split('\r\n'))
        setError(null)
      };

      reader.readAsText(file)
    }else if(file && !file.type.includes("text/csv")){
      setError(`O arquivo deve ser do tipo CSV`, file && file.type)
      setFile(null)
    }else(
      setFile(null)
    )
  }

  return (
    <div>
      <h2>Upload de Arquivo CSV</h2>
      <label htmlFor="sendFile">Enviar arquivo</label>
      <input type="file" accept=".csv" name="sendFile" id="sendFile" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
