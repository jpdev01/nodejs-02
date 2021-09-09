import multer from 'multer';
import path from 'path';
import crypto from  'crypto-js';

export default {
    //onde os arquivos serao guardados
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            // file ja vem com um nome do cliente
            const fileName = String(CryptoJS.AES.encrypt(file.originalname, "Secret Passphrase"));

            callback(null, fileName);
        }
    })
}