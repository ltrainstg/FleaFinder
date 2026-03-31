// App.jsx
import { useState } from "react";

import { usePyodide } from "./usePyodide";
import FleaButton from "./FleaButton";

import flea_links from "./assets/flea_links";
import FleaTable from "./FleaTable";

export default function App() {
  const { ready, runPython, setGlobal, getGlobal } = usePyodide();

  const [inputValue, setInputValue] = useState(5);
  const [fileContent, setFileContent] = useState('');
  const [foundFleas, setFoundFleas] = useState(0);


  const data = [
    { id: 1, found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 2, found: true, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 3, found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 4, found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' },
    { id: 5, found: false, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom' }

  ];
  const [output, setOutput] = useState(
    // data
  )


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const bytes = new Uint8Array(arrayBuffer);
        setGlobal("ciphertext_bytes", bytes);
        setGlobal("flea_links", flea_links);

        const decrypted = await runPython(`
              import json 
              import base64
              from Crypto.Cipher import AES
              from functools import reduce
              c_sharp_header = bytes.fromhex('0001000000FFFFFFFF01000000000000000601000000')
              aes_key = b'UKu52ePUBwetZ9wNX88o54dnfKRu0T1l'

              # print('Get Data')
              # print('ciphertext_bytes')
              # print(ciphertext_bytes)
              ciphertext = bytes(ciphertext_bytes.to_py())
              # print(type(ciphertext))
              flea_links = flea_links.to_py()
              # print(flea_links)
              # print(type(flea_links))
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

              def get27Fleas(json_data):
                flea_data = []
                for key1 in json_data:
                    for key2 in json_data[key1]:
                        if('SavedFlea' in key2):
                            flea_data.append({key2: json_data[key1][key2]})
                      
                return flea_data

              def getGiantFlea(json_data):
                return {'tamedGiantFlea': json_data['playerData']['tamedGiantFlea']}

              def getVogg(json_data):
                  for item in json_data['sceneData']['persistentBools']['serializedList']:
                      if(item['ID'] == 'Caravan Troupe Hunter'):
                          return {'vogg':  item['Value']}
                  return {'vogg':  item['Value']}


              def getKratt(json_data):
                for item in json_data['sceneData']['persistentBools']['serializedList']:
                    if(item['ID'] == 'Caravan Lech'):
                        return {'kratt':  item['Value']}
                return {'kratt': False}


              def getResult30Flea(json_data):
                  Flea_30 = get27Fleas(json_data)
                  Flea_30.append(getGiantFlea(json_data))
                  Flea_30.append(getVogg(json_data))
                  Flea_30.append(getKratt(json_data))  
                  Flea_30 = reduce(lambda a, b: dict(a, **b), Flea_30)

                  results = []
                  for item in flea_links:
                      result_item = item
                      result_item['found'] = Flea_30[item['id']]
                      results.append(result_item)
                  return results


              data_as_bytes = decode_and_decrypt(ciphertext)
              # print(data_as_bytes)
              dict_ = json.loads(data_as_bytes)
              str_to_write = json.dumps(dict_, indent=2, sort_keys=False)
              json_data = json.loads(str_to_write)
              # print(json_data)


              Flea_30 = getResult30Flea(json_data)
              # print(Flea_30)
              flea_count = 0
              for item in Flea_30:
                if item["found"]:
                  flea_count = flea_count+1

              json.dumps({"output":Flea_30, "N": flea_count})
      `);
        setOutput(JSON.parse(decrypted)['output']);
        setFoundFleas(JSON.parse(decrypted)['N']);
      };


      reader.readAsArrayBuffer(file);
    }


  };



  const handleRun = async () => {

    // On How to handle variables See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    const result = await runPython(`
      import random
      data = random.sample(range(1, 50), ${inputValue})
      json.dumps(data)
    `);
    setOutput(result);
    setFoundFleas(result);
  };



  const link_style = {
    color: 'white',



  };


  return (

    <div>
      <h1> FleaFinder</h1>
      <div>
        <h3>
          This app takes the PC version of silksong from the *.dat files and tells you how many and which of the 30 fleas are found/missing.
          <br />
          This app uses react and piodide to run python on the client side to parse the file so it can be hosted on github pages.
          <br />
          Inspired by:
          <a style={link_style} href="https://mikkerlo.github.io/silksong-flea/" rel="noreferrer">
            mikkerlo's silksong-flea app
          </a>
          <br />
          You can view the source code in the :
          <a style={link_style} href="https://github.com/ltrainstg/FleaFinder" rel="noreferrer">
            GitHub repository
          </a>
          <br />
        </h3>
      </div>

      <div>




      </div>



      <div>
        <input type="file" accept=".dat" onChange={handleFileChange} />
        {/* <h3>File Content:</h3>
          <p>{fileContent}</p> */}
      </div>

      {/* 
      <button onClick={handleRun} disabled={!ready}>


        {ready ? "Run Python" : "Loading Pyodide..."}


      </button> */}




      <h1>Found Fleas:{foundFleas}/30</h1>
      <FleaTable data={output}> </FleaTable>



    </div>



  );
}