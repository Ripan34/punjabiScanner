import { readText } from "../service/firebase";

async function f(imgC){
    const img = imgC.base64;
try{
    const result  = await readText(img);
    return result;
} catch(err){
    console.log(err)
}
}
export default f;