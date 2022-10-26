import axios from "axios";

async function loadFromCDN(path: string) {
    const response = await axios.get(process.env.REACT_APP_CDN_URL + '/' + path);
    return response.data;
}

const promise = loadFromCDN(`module-manifest.json`);

export default promise;