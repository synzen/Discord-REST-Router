import {
  RequestHandler, Request, Response, NextFunction,
} from 'express';

/**
 * Wrap controllers function calls to automatically call
 * next(err) if the controller is a promise and is
 * rejected. Without using this, any errors thrown in
 * controller that are promises will result in
 * unhandled rejections
 *
 * @param controller Controller function
 */
function asyncRouteWrapper(controller: RequestHandler): void {
  async function wrapper(request: Request, response: Response, next: NextFunction) {
    try {
      await controller(request, response, next);
    } catch (err) {
      next(err);
    }
  }
  return wrapper;
}

export default asyncRouteWrapper;
