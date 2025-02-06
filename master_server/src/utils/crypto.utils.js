import crypto from 'crypto';

export const encryptData = (data) => {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decryptData = (encryptedData) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex'); 

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
};