import axios from "axios";

const config = {
headers:{
key: 'alGcuJdBOM77YsTdfu4ZKHyQBnmnWXT97BK4sO5KyyF4S0skm8GHo2dnRZpe_sLHr54'
}
};
const url = "https://api.onlineocrconverter.com/api/image";

async function f(img){
    const base64 = img.base64;
try{
    const data ={
        "base64": base64,
        "language": "pan"
        }
const res = await axios.post(url, data, config);

console.log(res.data)
} catch(err){
    console.log(err)
}
}
export default f;