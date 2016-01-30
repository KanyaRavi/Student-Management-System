exports.database = {
  url: 'mongodb://127.0.0.1:27017/sms-dev',
  options: {
    db: { native_parser: true,safe:true },
    server: { poolSize: 10 }
  }
}
