const BootCamp = require('../model/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await BootCamp.find();
  res.status(200).json({ sucess: true, data: bootcamps });
});
//@desc     Get single bootcamp
//@route    GET /api/v1/bootcamp/:id
//@access   Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found  with the ${req.params.id}`),
      404
    );
  }
  res.status(200).json({ sucess: true, data: bootcamp });
});
//@desc     Create bootcamps
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);

  res.status(200).json({ sucess: true, data: bootcamp });
});
//@desc     Update single bootcamps
//@route    PUT /api/v1/bootcamp/:id
//@access   Private
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ sucess: false });
  }
  res.status(200).json({ sucess: true, data: bootcamp });
});
//@desc     Delete Single bootcamp
//@route    DELETE /api/v1/bootcamp/:id
//@access   Private
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({ sucess: false });
  }
  res.status(200).json({ sucess: true, data: {} });
});
