import axios from "axios";

// TODO: move to env variable (10/25/2022, akravets)
const CDN = 'http://localhost:8080';

async function loadFromCDN(path: string) {
    const response = await axios.get(CDN + '/' + path);
    return response.data;
}

const promise = loadFromCDN(`module-manifest.json`);

export default promise;