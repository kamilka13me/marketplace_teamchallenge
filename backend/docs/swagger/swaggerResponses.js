// src/swagger/responses/apiResponses.js

const InternalServerError = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Internal server error',
          },
        },
      },
    },
  },
};

const NotFoundResponse = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Resource not found',
          },
        },
      },
    },
  },
};

export { NotFoundResponse, InternalServerError };
