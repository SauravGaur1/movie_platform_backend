const {
    sendSuccessResp,
    sendFailureResp,
} = require("../../../utils/response.js");

const { listFiles, downloadFile } = require("../../../services/aws_s3.js");
const { customError } = require("../../../utils/error.js");
const { Movie } = require("../../../database/index.js");
const { isEmpty, isArray } = require("../../../utils/validators.js");

module.exports = {
    addMovie: async (req, res, next) => {
        try {
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
    downloadFiles: async (req, res) => {
        try {
            const movieNumber = req.query.movieId;
            const fileCategory = req.query.fileCategory;

            const prefix = `movie/${movieNumber}/${fileCategory}`;

            const files = await listFiles(prefix);

            if (isEmpty(files)) {
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
    addFiles: async (req, res) => {
        try {
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
