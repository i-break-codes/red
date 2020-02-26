class Session {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  userDetails() {
    return this.req.user;
  }
}

module.exports = Session;
