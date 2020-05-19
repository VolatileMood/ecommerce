exports.create = async (req, res, next) => {
  try {
    console.log('Files: ', req.files);
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
