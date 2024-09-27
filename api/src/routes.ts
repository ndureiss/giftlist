/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ListController } from './controllers/ListController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserManagementController } from './controllers/UserManagementController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserLoggedController } from './controllers/UserLoggedController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GiftController } from './controllers/GiftController';
import { expressAuthentication } from './middlewares/authenticate';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UUID": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListIdDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Validation failed"],"required":true},
            "details": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ISOString": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"([\\+-]?\\d{4}(?!\\d{2}\\b))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))([T\\s]((([01]\\d|2[0-3])((:?)[0-5]\\d)?|24\\:?00)([\\.,]\\d+(?!:))?)?(\\17[0-5]\\d([\\.,]\\d+)?)?([zZ]|([\\+-])([01]\\d|2[0-3]):?([0-5]\\d)?)?)?)?"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_List.Exclude_keyofList.id-or-sharingCode-or-gifts-or-hasBookedGifts-or-owners-or-grantedUsers-or-ownersDTO-or-grantedUsersDTO-or-createdDate-or-updatedDate__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string","required":true},"description":{"dataType":"string"},"closureDate":{"dataType":"union","subSchemas":[{"ref":"ISOString"},{"dataType":"enum","enums":[null]}]},"ownersIds":{"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"},"required":true},"isOwner":{"dataType":"boolean"},"isShared":{"dataType":"boolean","required":true},"grantedUsersIds":{"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_List.id-or-sharingCode-or-gifts-or-hasBookedGifts-or-owners-or-grantedUsers-or-ownersDTO-or-grantedUsersDTO-or-createdDate-or-updatedDate_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_List.Exclude_keyofList.id-or-sharingCode-or-gifts-or-hasBookedGifts-or-owners-or-grantedUsers-or-ownersDTO-or-grantedUsersDTO-or-createdDate-or-updatedDate__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateListDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_List.id-or-sharingCode-or-gifts-or-hasBookedGifts-or-owners-or-grantedUsers-or-ownersDTO-or-grantedUsersDTO-or-createdDate-or-updatedDate_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UnauthorizedErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Unauthorized"],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_EditListDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"description":{"dataType":"string"},"closureDate":{"dataType":"union","subSchemas":[{"ref":"ISOString"},{"dataType":"enum","enums":[null]}]},"ownersIds":{"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"}},"isOwner":{"dataType":"boolean"},"isShared":{"dataType":"boolean"},"grantedUsersIds":{"dataType":"array","array":{"dataType":"refAlias","ref":"UUID"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserNameDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "displayName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_List.id-or-description-or-title-or-isShared-or-sharingCode-or-hasBookedGifts-or-closureDate-or-ownersDTO-or-grantedUsersDTO-or-isOwner_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"ref":"UUID","required":true},"sharingCode":{"ref":"UUID","required":true},"hasBookedGifts":{"dataType":"boolean"},"ownersDTO":{"dataType":"array","array":{"dataType":"refObject","ref":"UserNameDTO"}},"grantedUsersDTO":{"dataType":"array","array":{"dataType":"refObject","ref":"UserNameDTO"}},"title":{"dataType":"string","required":true},"description":{"dataType":"string"},"closureDate":{"dataType":"union","subSchemas":[{"ref":"ISOString"},{"dataType":"enum","enums":[null]}]},"isOwner":{"dataType":"boolean"},"isShared":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_List.id-or-description-or-title-or-isShared-or-sharingCode-or-hasBookedGifts-or-closureDate-or-ownersDTO-or-grantedUsersDTO-or-isOwner_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SelectKindList": {
        "dataType": "refEnum",
        "enums": ["all","owned","granted"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "email": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserIdDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserDTO": {
        "dataType": "refObject",
        "properties": {
            "displayName": {"dataType":"string","required":true},
            "auth0Id": {"dataType":"string","required":true},
            "email": {"ref":"email","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Gift.id-or-title-or-isBooked-or-bookedByDTO-or-isBookedByMe-or-isFavorite-or-isHidden-or-category-or-listId-or-price-or-linkURL-or-brand-or-size-or-color-or-comments_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"ref":"UUID","required":true},"title":{"dataType":"string","required":true},"isBooked":{"dataType":"boolean","required":true},"bookedByDTO":{"dataType":"array","array":{"dataType":"refObject","ref":"UserNameDTO"},"required":true},"isBookedByMe":{"dataType":"boolean"},"isFavorite":{"dataType":"boolean","required":true},"isHidden":{"dataType":"boolean","required":true},"category":{"dataType":"string","required":true},"listId":{"ref":"UUID","required":true},"price":{"dataType":"double"},"linkURL":{"dataType":"string"},"brand":{"dataType":"string"},"size":{"dataType":"string"},"color":{"dataType":"string"},"comments":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GiftDTO": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Gift.id-or-title-or-isBooked-or-bookedByDTO-or-isBookedByMe-or-isFavorite-or-isHidden-or-category-or-listId-or-price-or-linkURL-or-brand-or-size-or-color-or-comments_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDTO": {
        "dataType": "refObject",
        "properties": {
            "displayName": {"dataType":"string","required":true},
            "bookingsDTO": {"dataType":"array","array":{"dataType":"refAlias","ref":"GiftDTO"}},
            "email": {"ref":"email","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_UserDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"displayName":{"dataType":"string"},"bookingsDTO":{"dataType":"array","array":{"dataType":"refAlias","ref":"GiftDTO"}},"email":{"ref":"email"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GiftIdDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateGiftDTO": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "isBookedByMe": {"dataType":"boolean"},
            "isFavorite": {"dataType":"boolean","required":true},
            "isHidden": {"dataType":"boolean","required":true},
            "category": {"dataType":"string","required":true},
            "price": {"dataType":"double"},
            "linkURL": {"dataType":"string"},
            "brand": {"dataType":"string"},
            "size": {"dataType":"string"},
            "color": {"dataType":"string"},
            "comments": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_EditGiftDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"isBooked":{"dataType":"boolean"},"bookedByDTO":{"dataType":"array","array":{"dataType":"refObject","ref":"UserNameDTO"}},"isBookedByMe":{"dataType":"boolean"},"isFavorite":{"dataType":"boolean"},"isHidden":{"dataType":"boolean"},"category":{"dataType":"string"},"price":{"dataType":"double"},"linkURL":{"dataType":"string"},"brand":{"dataType":"string"},"size":{"dataType":"string"},"color":{"dataType":"string"},"comments":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GiftDTOForOwner": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"UUID","required":true},
            "title": {"dataType":"string","required":true},
            "isFavorite": {"dataType":"boolean","required":true},
            "isHidden": {"dataType":"boolean","required":true},
            "category": {"dataType":"string","required":true},
            "price": {"dataType":"double"},
            "linkURL": {"dataType":"string"},
            "brand": {"dataType":"string"},
            "size": {"dataType":"string"},
            "color": {"dataType":"string"},
            "comments": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/lists',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.create)),

            function ListController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"CreateListDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.edit)),

            function ListController_edit(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    body: {"in":"body","name":"body","required":true,"ref":"Partial_EditListDTO_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.edit.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/lists/:listId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.delete)),

            function ListController_delete(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lists',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.getAll)),

            function ListController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    select: {"in":"query","name":"select","required":true,"ref":"SelectKindList"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.getAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lists/:listId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.get)),

            function ListController_get(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/share',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.share)),

            function ListController_share(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.share.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/unshare',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.private)),

            function ListController_private(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.private.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/invite/:sharingCode',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.accessFromCode)),

            function ListController_accessFromCode(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    sharingCode: {"in":"path","name":"sharingCode","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.accessFromCode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/eject',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ListController)),
            ...(fetchMiddlewares<RequestHandler>(ListController.prototype.removeGrantedUser)),

            function ListController_removeGrantedUser(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    userMail: {"in":"query","name":"userMail","required":true,"ref":"email"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ListController();


              const promise = controller.removeGrantedUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserManagementController)),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController.prototype.create)),

            function UserManagementController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateUserDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserManagementController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/users/admin/:userAuth0Id',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController)),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController.prototype.delete)),

            function UserManagementController_delete(request: any, response: any, next: any) {
            const args = {
                    userAuth0Id: {"in":"path","name":"userAuth0Id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserManagementController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController)),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController.prototype.getAll)),

            function UserManagementController_getAll(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserManagementController();


              const promise = controller.getAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users/profiles/:userMail',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController)),
            ...(fetchMiddlewares<RequestHandler>(UserManagementController.prototype.get)),

            function UserManagementController_get(request: any, response: any, next: any) {
            const args = {
                    userMail: {"in":"path","name":"userMail","required":true,"ref":"email"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserManagementController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users/me',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController)),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController.prototype.get)),

            function UserLoggedController_get(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserLoggedController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/users/me',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController)),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController.prototype.edit)),

            function UserLoggedController_edit(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"Partial_UserDTO_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserLoggedController();


              const promise = controller.edit.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/users/me',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController)),
            ...(fetchMiddlewares<RequestHandler>(UserLoggedController.prototype.delete)),

            function UserLoggedController_delete(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserLoggedController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/lists/:listId/gifts',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.create)),

            function GiftController_create(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    body: {"in":"body","name":"body","required":true,"ref":"CreateGiftDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.edit)),

            function GiftController_edit(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
                    body: {"in":"body","name":"body","required":true,"ref":"Partial_EditGiftDTO_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.edit.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/lists/:listId/gifts/:giftId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.delete)),

            function GiftController_delete(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lists/:listId/gifts',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.getAll)),

            function GiftController_getAll(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.getAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lists/:listId/gifts/:giftId',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.get)),

            function GiftController_get(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/hide',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.hide)),

            function GiftController_hide(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.hide.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/unhide',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.unhide)),

            function GiftController_unhide(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.unhide.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/fav',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.favorite)),

            function GiftController_favorite(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.favorite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/unfav',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.unfavorite)),

            function GiftController_unfavorite(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.unfavorite.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/book',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.book)),

            function GiftController_book(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.book.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lists/:listId/gifts/:giftId/unbook',
            authenticateMiddleware([{"auth0":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GiftController)),
            ...(fetchMiddlewares<RequestHandler>(GiftController.prototype.unbook)),

            function GiftController_unbook(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    listId: {"in":"path","name":"listId","required":true,"ref":"UUID"},
                    giftId: {"in":"path","name":"giftId","required":true,"ref":"UUID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GiftController();


              const promise = controller.unbook.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
