// App.jsx
import { useState } from "react";

import { usePyodide } from "./usePyodide";
import FleaButton from "./FleaButton";

export default function App() {
  const { ready, runPython, setGlobal, getGlobal } = usePyodide();
  const [output, setOutput] = useState("");
  const [inputValue, setInputValue] = useState(5);
  const [fileContent, setFileContent] = useState('');
  const [foundFleas, setFoundFleas] = useState("0");


  const data = [
    { id: 1, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 2, name: 'Apple', found: true, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 3, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 4, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 5, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 6, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 7, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 8, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 9, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 10, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 11, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 12, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 13, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 14, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 15, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 16, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 17, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 18, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 19, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 20, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 21, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 22, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 23, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 24, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 25, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 26, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 27, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 28, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 29, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 30, name: 'Apple', found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' }

  ];


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        setGlobal("ciphertext_bytes", bytes);   // ✅ available to all components
 


        const decrypted = await runPython(`
              import json 
              import base64
              from Crypto.Cipher import AES
              c_sharp_header = bytes.fromhex('0001000000FFFFFFFF01000000000000000601000000')
              aes_key = b'UKu52ePUBwetZ9wNX88o54dnfKRu0T1l'

              print('Get Data')
              print('ciphertext_bytes')
              print(ciphertext_bytes)
              ciphertext = bytes(ciphertext_bytes.to_py())
              print(type(ciphertext))

              def create_cipher():
                  return AES.new(aes_key, AES.MODE_ECB)

              def decode_and_decrypt(bytes_):
                  # remove header and last byte
                  bytes_ = bytes_[len(c_sharp_header): len(bytes_) - 1]
                  # decode the base64 bytes          
                  bytes_ = base64.b64decode(bytes_)
                  # create a aes ecb-mode cipher             
                  cipher = create_cipher()
                  # decrypt         
                  bytes_ = cipher.decrypt(bytes_)
                  # finally remove padding
                  return bytes_[:-bytes_[-1]]
              data_as_bytes = decode_and_decrypt(ciphertext)


              print(data_as_bytes)


      `);

        // setOutput(decrypted);
      };


      reader.readAsArrayBuffer(file);
    }


  };



  const handleRun = async () => {

    // On How to handle variables See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    const result = await runPython(`
      import json
      import random
      import base64
      from Crypto.Cipher import AES
      c_sharp_header = bytes.fromhex('0001000000FFFFFFFF01000000000000000601000000')
      end_header = bytes([11])
      aes_key = b'UKu52ePUBwetZ9wNX88o54dnfKRu0T1l'

      cypher = AES.new(aes_key, AES.MODE_ECB)
      decrypted = "asd"
      data_as_bytes = read_binary_file(${fileContent})
      print(data_as_bytes)

      data = random.sample(range(1, 50), ${inputValue})

      json.dumps(data)
    `);
    setOutput(result);
    setFoundFleas(result);
  };

  return (

    <div>
      <h1> FleaFinder</h1>
      <div>
        <h3>
          This is a project app to mostly see how piodide runs in react.
          A javascript version of this apps already exists and inspired this app.
          See https://github.com/mikkerlo/silksong-flea.
          Currently a bunch of pieces, but not a coherent app yet.

        </h3>



      </div>


      <label>
        <div>
          <input type="file" accept=".txt" onChange={handleFileChange} />
          <h3>File Content:</h3>
          <p>{fileContent}</p>
        </div>
      </label>

      <button onClick={handleRun} disabled={!ready}>


        {ready ? "Run Python" : "Loading Pyodide..."}


      </button>
      <h3>{output}</h3>



      <h1>Fleas:{foundFleas}/30</h1>

      <div className="grid-container">

        {data.map((item) => (

          <FleaButton key={item.id} name={item.name} id={item.id} found={item.found} link={item.link} />

        ))}

      </div>

    </div>



  );
}