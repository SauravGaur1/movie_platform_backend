const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { listFiles, downloadFile } = require("../../../services/aws_s3.js");
const { customError } = require("../../../utils/error.js");
const { Movie } = require("../../../database/index.js");
const { isEmpty } = require("../../../utils/validators.js");

module.exports = {
    add: async (req, res, next) => {
        try {
            // if verified, Authenticate middleware will have added a new User prop to request
            if (!isEmpty(req.User) && req.User.role < 1) {
                throw new customError({
                    message: "User not Allowed on this Path!",
                    statusCode: 401,
                });
            }
            const { title } = req.body;
            const movieExists = await Movie.findMovie(title);
            // console.log(movieExists);

            if (movieExists) {
                throw new customError({
                    message: "Movie already Exists!",
                    statusCode: 409,
                    payload: {
                        isExist: true,
                        movieDetails: movieExists?.dataValues,
                    },
                });
            }
            const createdMovie = await Movie.createMovie(req.body);
            if (createdMovie) {
                console.log("movie created");
            }
            sendSuccessResp(res, {
                status: 200,
                data: {
                    isExist: false,
                    message: "New Movie Added Successfully!",
                    movieDetails: createdMovie?.dataValues,
                },
            });
        } catch (error) {
            return sendFailureResp(res, {
                status: error.statusCode,
                data: {
                    message: error.message,
                    ...error.payload,
                },
            });
        }
    },
    files: async (req, res) => {
        try {
            const movieNumber = 101;
            const fileCategory = "thumbnail";

            const prefix = `movie/${movieNumber}/${fileCategory}`;

            const files = await listFiles(prefix);
            
            if (!files || files.length == 0) {
                throw new customError({
                    message: "No files found in specifies Directory",
                    statusCode: 404,
                });
            }
            // Set response headers
            // res.setHeader("Content-Type", "application/octet-stream");
            // res.setHeader("Transfer-Encoding", "chunked");
            res.setHeader(
                "Content-Type",
                "multipart/x-mixed-replace; boundary=--boundary"
            );

            // Stream each file one by one
            for (const key of files) {
                res.write(`--file-boundary\n`);
                res.write(
                    `Content-Disposition: attachment; filename=${encodeURIComponent(
                        key.split("/").pop()
                    )}\n`
                );
                res.write(`Content-Type: application/octet-stream\n\n`);

                const fileStream = await downloadFile(key);
                fileStream.pipe(res, { end: false });
                await new Promise((resolve) => fileStream.on("end", resolve));

                res.write(`\n--file-boundary--\n`);
            }

            res.end();

            // const key = files[0]; // You can change this logic to download all files
            // const s3Stream = await downloadFile(key);
            // console.log(s3Stream);

            // Set headers
            // res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(key.split('/').pop())}"`);
            // res.setHeader('Content-Type', 'application/octet-stream');

            // Pipe the S3 stream to the response
            // s3Stream.pipe(res);
        } catch (err) {
            return sendFailureResp(res, {
                status: err.statusCode,
                data: {
                    message: err.message,
                    ...err.payload,
                },
            });
        }
    },
};
