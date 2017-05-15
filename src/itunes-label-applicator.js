const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const xml2js = require('xml2js');

const getItunesLibraryXml = filepath => {
  const parseString = denodeify(new xml2js.Parser().parseString);

  readFile(filepath)
    .then(xml => {
      parseString(xml);
    });

  readFile(filepath, (err, data) => {
    parseString(data, (err, result) => {
      console.dir(result);
      console.log('Done');
    });
  });
};

const convertXml2Pojo = itunesLibraryXml => {
  return {};
};

class ItunesLabelApplicator {
  constructor(options) {
    const xml = getItunesLibraryXml(options.libraryXmlPath);
    const dict = convertXml2Pojo(xml);

    this.library = {
      json: JSON.stringify(dict),
      xml: xml,
      dict: dict
    };
  }
}

module.exports = ItunesLableApplicator;
