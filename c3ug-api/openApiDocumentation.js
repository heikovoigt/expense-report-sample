module.exports = {
  openapi: '3.0.1',
  info: {
    version: '0.5.1',
    title: 'C3UG Expense Management',
    description: 'Expense management REST API',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Cross Canada Collaboration User Group (C3UG)',
      email: 'heiko.voigt@harbour-light.com',
      url: 'http://www.c3ug.ca/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'https://localhost:8084/',
      description: 'Local server'
    },
    {
      url: 'https://localhost:8084/',
      description: 'Testing server'
    },
    {
      url: 'https://sitfp10.sit.de:8085/',
      description: 'Production server'
    }
  ],
  security: [
    {
        bearerAuth: [] 
    }
  ],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {'/expense_api/categories' : {
    get: {
        tags: ['CRUD operations'],
        description: 'Get all expense categories',
        operationId: 'categories',
        parameters: [ ],
        security:[{
                bearerAuth: []
        }],
        responses: {
          '200': {
            description: 'Categories have been found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExpenseCategory'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized Request',
            content: {
              'string': {}
              }
            },
          
          '500': {
            description: 'Internal Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Internal Error',
                  internal_code: 'internal_error'
                }
              }
            }
          }
        }
      }
  },
  '/expense_api/category': {
    post: {
        tags: ['CRUD operations'],
        description: 'Create / update expense Categories',
        operationId: 'category',
        parameters: [],
        security:[{
            bearerAuth: []
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ExpenseCategory'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Expense Category got created'
          },
          '401': {
            description: 'Unauthorized Request',
            content: {
              'string': {}
              }
            },
          '500': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Error on',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      },
      put: {
        tags: ['CRUD operations'],
        description: 'Create / update expense Categories',
        operationId: 'category',
        parameters: [],
        security:[{
            bearerAuth: []
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ExpenseCategory'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Expense Category got updated'
          },
          '401': {
            description: 'Unauthorized Request',
            content: {
              'string': {}
              }
            },
          '500': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Error on',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
  },
    '/expense_api/category/{id}': {
      get: {
        tags: ['CRUD operations'],
        description: 'Get expense category by Id',
        operationId: 'category',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              type: 'string',
              default: '5ad744a3-527f-4dd7-a3f0-b2f837f4044d'
            },
            required: true
          }
        ],
        ssecurity:[{
            bearerAuth: []
        }],
        responses: {
          '200': {
            description: 'Category was found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExpenseCategory'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized Request',
            content: {
              'string': {}
              }
            },
          
          '500': {
            description: 'Missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Expense Category ID is missing',
                  internal_code: 'missing_parameters'
                }
              }
            }
          }
        }
      },
      
      delete: {
        tags: ['CRUD operations'],
        description: 'Create / update expense Categories',
        operationId: 'category',
        parameters: [{
            name: 'id',
            in: 'path',
            schema: {
              type: 'string',
              default: '5ad744a3-527f-4dd7-a3f0-b2f837f4044d'
            },
            required: true
          }],
        security:[{
            bearerAuth: []
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ExpenseCategory'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'Expense Category got deleted'
          },
          '401': {
            description: 'Unauthorized Request',
            content: {
              'string': {}
              }
            },
          '500': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Error on',
                  internal_code: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
    },
},
  components: {
    schemas: {
      expenseCategoryId: {
        type: 'string',
        description: 'Category ID in UUIDV4 format',
        example: '5ad744a3-527f-4dd7-a3f0-b2f837f4044d'
      },
      expenseCategoryName: {
        type: 'string',
        example: 'Notorious RBG'
      },
      unid: {
        type: 'string',
        example: '3C2636DFA421263BC12585FA003DB537'
      },
      ExpenseCategory: {
        type: 'object',
        properties: {
          expenseCategoryId: {
            $ref: '#/components/schemas/expenseCategoryId'
          },
          expenseCategoryName: {
            $ref: '#/components/schemas/expenseCategoryName'
          },
          unid: {
            $ref: '#/components/schemas/unid'
          }
        }
      },
      Categories: {
        type: 'object',
        properties: {
          Categories: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ExpenseCategory'
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          result: {
            type: 'string'
          },
          error: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
    }
  }
};