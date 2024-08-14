const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { customError } = require("../utils/error");

const awsConfig = require("../config/config").aws;

const s3 = new AWS.S3({
    accessKeyId: awsConfig.credentials.accessKeyId,
    secretAccessKey: awsConfig.credentials.secretKeyAccess,
    region: awsConfig.region,
});

const BUCKET_NAME = awsConfig.bucketName;

class S3Service {
    // Static method to upload a file to S3
    static async uploadFile(filePath, key) {
        // Read the file content from the filePath
        if (!fs.existsSync(filePath)) {
            throw new customError("File not found", 400);
        }
        const fileContent = fs.readFileSync(filePath);
        const params = {
            Bucket: BUCKET_NAME,
            Key: key, // File name you want to save as in S3
            Body: fileContent,
            ContentType: "image/jpeg",
        };

        try {
            const data = await s3.upload(params).promise();
            return data.Location; // Return the URL of the uploaded file
        } catch (error) {
            throw new customError(`Failed to upload file:`, 500, error);
        }
    }
    // Static method to download a file from S3
    static async downloadFile(key) {
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
        };

        try {
            const data = await s3.getObject(params).promise();
            return data.Body; // Return the file data
        } catch (error) {
            throw new customError(`Failed to download file:`, 500, error);
        }
    }

    // Static method to delete a file from S3
    // static async deleteFile(key) {
    //     const params = {
    //         Bucket: BUCKET_NAME,
    //         Key: key,
    //     };

    //     try {
    //         await s3.deleteObject(params).promise();
    //         return `File ${key} deleted successfully`;
    //     } catch (error) {
    //         throw new customError(`Failed to delete file:`, 500, error);
    //     }
    // }
}

module.exports = {
    uploadFile: S3Service.uploadFile,
    downloadFile: S3Service.downloadFile,
};

const filePath = path.resolve("public/dice.jpg");
// console.log(filePath);
const keyName = "dice.jpg"; // The name you want to save the file as


(async () => {
    try {
        // console.log(filePath);
        // const uploadedFileURL = await S3Service.uploadFile(filePath, keyName);
        // console.log(`File uploaded at:${uploadedFileURL}`);

        const downloadedFile = await S3Service.downloadFile(keyName);
        const downloadDir = path.resolve("public/download");
        
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
        const outputFilePath=path.join(downloadDir,keyName);

        fs.writeFileSync(outputFilePath, downloadedFile);

        // console.log("downloaded File and saved at: ",outputFilePath ); // Handle the downloaded file data as needed
    } catch (error) {
        console.error(`Error downloading file: ${error.message}`);
    }
})();
