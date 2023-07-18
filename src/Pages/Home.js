import React,{ useState } from 'react'
// import { toast } from 'react-toastify';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = '-';
const projectSecretKey = '-';
const authorization = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

function Home() {
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    
    let ipfs = undefined;
    try{
        ipfs = ipfsHttpClient({
            url: "https://ipfs.infura.io:5001/api/v0",
              headers: {
                authorization,
              },
          });
    } catch(error) {
        console.error("IPFS error ", error);
        ipfs = undefined;
    }

    const uploadImageToIPFS = async()=> {
        if (!file) {
            return alert("No files selected");
          }
        try {
            const added = await ipfs.add(file)
            const url = `https://nftree.infura-ipfs.io/ipfs/${added.path}`
            // await uploadMetadataToIPFS(url)
            setFileUrl(url)
          } catch (error) {
            console.log('Error uploading file: ', error)
          }
    }

    return (
        <>
            <div>Home</div>
            <div className="mb-3">
                <label htmlFor="NFTimage" className="form-label"> Image </label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button type="submit" onClick={()=>uploadImageToIPFS()} > Mint NFT </button>
            <br/><br/>

            <br/>
            {fileUrl && (<img src={fileUrl} width="600px" /> )}
            
            {!ipfs && (<p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>)}
        </>
    )
}

export default Home