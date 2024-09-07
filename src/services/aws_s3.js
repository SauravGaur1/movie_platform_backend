const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { customError } = require("../utils/error");

const awsConfig = require("../config/config").aws;

const s3 = new AWS.S3({
    accessKeyId: awsConfig.credentials.accessKeyId,
    secretAccessKey: awsConfig.credentials.secretKeyAccess,
    region: awsConfig.region,
});

const BUCKET_NAME = awsConfig.bucketName;

class S3Service {
    static  uploadFile() {
        return multer({
            storage: multerS3({
                s3: s3,
                bucket: BUCKET_NAME,
                contentType: multerS3.AUTO_CONTENT_TYPE,

                key: function (req, file, cb) {
                    try {
                        console.log("inside key func")
                        const movieId = req.body.movieId;
                        const fileCategory = req.body.fileCategory;
                        if (!movieId || !fileCategory) {
                            throw new customError('Missing movieId or fileCategory in request body.');
                        }
                        console.log(file);
                        const fileName = `movie/${movieId}/${fileCategory}/${fileCategory}1${path.extname(
                            file.originalname
                        )}`;
                        cb(null, fileName);
                        console.log("after cb");
                    } catch (error) {
                        new customError(
                            `Failed to set file name: ${error.message}`,
                            500
                        );
                    }
                },
            }),
        })
    }
    // Static method to upload a file to S3
    // static async uploadFile(filePath, key, contentType) {
    //     // Read the file content from the filePath
    //     if (!fs.existsSync(filePath)) {
    //         throw new customError("File not found", 400);
    //     }
    //     const fileContent = fs.readFileSync(filePath);
    //     const params = {
    //         Bucket: BUCKET_NAME,
    //         Key: key, // File name you want to save as in S3
    //         Body: fileContent,
    //         ContentType: contentType,
    //     };

    //     try {
    //         const data = await s3.upload(params).promise();
    //         return data.Location; // Return the URL of the uploaded file
    //     } catch (error) {
    //         throw new customError(`Failed to upload file:`, 500, error);
    //     }
    // }

    static async uploadFileStream(stream, key, contentType) {
        try {
            const params = {
                Bucket: BUCKET_NAME,
                Key: key, // File name you want to save as in S3
                Body: fileContent,
                ContentType: contentType,
            };
            const data = await s3.upload(params).promise();
        } catch (error) {
            throw new customError(
                `failed to upload Stream ${error.message}`,
                500,
                error
            );
        }
    }
    // Static method to download a file from S3
    static async downloadFile(key) {
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
        };

        try {
            const data = s3.getObject(params).createReadStream();
            return data; // Return the file data
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

    static async listFiles(prefix) {
        const params = {
            Bucket: BUCKET_NAME,
            Prefix: prefix,
        };

        try {
            const data = await s3.listObjectsV2(params).promise();

            // console.log("data: ",data);
            return data?.Contents?.map((item) => item.Key); //return list of items
        } catch (error) {
            throw new customError("Failed to list files", 500, error);
        }
    }
    static async uploadMultiple() {}
}

module.exports = {
    uploadFile: S3Service.uploadFile,
    downloadFile: S3Service.downloadFile,
    listFiles: S3Service.listFiles,
};

//----------------To Download a File----------------
// (async () => {
//     try {
//         const prefix = `movie/${movieNumber}/${fileCategory}`;
//         const files = await S3Service.listFiles(prefix);

//         console.log(files);

//         for (const key of files) {
//             const downloadedFile = await S3Service.downloadFile(key);
//             const downloadDir = path.resolve(
//                 `public/${movieNumber}/${fileCategory}/`
//             );

//             if (!fs.existsSync(downloadDir)) {
//                 fs.mkdirSync(downloadDir, { recursive: true });
//             }
//             const outputFilePath = path.join(downloadDir, path.basename(key));
//             fs.writeFileSync(outputFilePath, downloadedFile);
//         }
//     } catch (error) {
//         console.error(`Error downloading file: ${error.message}`);
//     }
// })();

//----------------To Upload a File----------------
// (async () => {
//     try {
//         console.log(filePath);
//         const uploadedFileURL = await S3Service.uploadFile(filePath, keyName,"image/png");
//         console.log(`File uploaded at:${uploadedFileURL}`);

//         // console.log("downloaded File and saved at: ",outputFilePath ); // Handle the downloaded file data as needed
//     } catch (error) {
//         console.error(`Error downloading file: ${error.message}`);
//     }
// })();
