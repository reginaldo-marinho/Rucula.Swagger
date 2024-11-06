let config = {
    openapi: "3.0.0",
    info: {
        title: "Product API",
        version: "1.0.0",
        description: "A simple CRUD API for managing products"
    },
    paths: {
        "/products": {
            get: {
                summary: "Get all products",
                operationId: "getProducts",
                tags: ["Products"],
                responses: {
                    "200": {
                        description: "A list of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: "Create a new product",
                operationId: "createProduct",
                tags: ["Products"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Product created successfully"
                    }
                }
            }
        },
        "/products/{id}": {
            get: {
                summary: "Get a product by ID",
                operationId: "getProductById",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Product details",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product"
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Product not found"
                    }
                }
            },
            put: {
                summary: "Update a product by ID",
                operationId: "updateProduct",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Product"
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Product updated successfully"
                    },
                    "404": {
                        description: "Product not found"
                    }
                }
            },
            delete: {
                summary: "Delete a product by ID",
                operationId: "deleteProduct",
                tags: ["Products"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: "Product deleted successfully"
                    },
                    "404": {
                        description: "Product not found"
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Product: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "12345"
                    },
                    name: {
                        type: "string",
                        example: "Example Product"
                    },
                    description: {
                        type: "string",
                        example: "A detailed description of the example product."
                    },
                    price: {
                        type: "number",
                        example: 29.99
                    },
                    category: {
                        type: "string",
                        example: "Electronics"
                    },
                    address: {
                        type: "object",
                        properties: {
                            cep: {
                                type: "string",
                                example: "12345-678"
                            },
                            logradouro: {
                                type: "string",
                                example: "Rua Exemplo"
                            }
                        },
                        required: ["cep", "logradouro"]
                    }
                },
                required: ["name", "price"]
            }
        }
    }
}

export default config; 