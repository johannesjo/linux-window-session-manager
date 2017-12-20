module.exports = () => {
  return process.argv.indexOf('--debug') > -1;
};