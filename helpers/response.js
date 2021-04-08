module.exports = {
  ok: async (res, data, message, limit = -1, offset = -1, total = -1) => {
    res.status(200).send({
      meta: {
        success: true,
        message: message,
        info: {
          limit: limit,
          offset: offset,
          total: total,
        },
      },
      data: data,
    });
  },
  noContent: async (res, message) => {
    res.status(204).send({
      meta: {
        success: true,
        message: message,
      },
      data: null,
    });
  },
  badrequest: async (res, message) => {
    res.status(400).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  forbidden: async (res, message) => {
    res.status(403).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
  unauthorized: async (res, message) => {
    res.status(401).send({
      meta: {
        success: false,
        message: message,
      },
      data: null,
    });
  },
};
