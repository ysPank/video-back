export class BaseAuth {
  authenticator() {
    return (req, res, next) => { next(); };
  }

  toSchema() {
    return {};
  }
}
