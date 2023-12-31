const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);

        if (popOptions) query = query.populate(popOptions);

        const data = await query;

        if (!data) {
            return next(new AppError('No document found with that id', 404));
        }

        res.status(200).json({
            status: 'success',
            data,
        });
    });

exports.getAll = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.find();
        if (popOptions) query = query.populate(popOptions);
        const features = new APIFeatures(query, req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const data = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: data.length,
            data,
        });
    });
