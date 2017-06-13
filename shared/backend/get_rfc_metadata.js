const path = require('path');
const AWS = require("aws-sdk");

const config = require('../../global-config.json');

AWS.config.loadFromPath(path.resolve(__dirname, '../../awsconfig.json'));
const proposalsDocs = new AWS.DynamoDB.DocumentClient();

const RFC_TABLE_NAME = 'rfc';
const LATEST_RFC_ID = 'test-request';

function fetchCurrentRFC() {
    const params = {
        TableName: RFC_TABLE_NAME,
        Key: {
            id: LATEST_RFC_ID
        }
    };

    return new Promise((res, rej) => {
        proposalsDocs.get(params, function(err, data) {
            if (err) {
                rej(err);
            } else {
                res(data['Item']);
            }
        });
    });
}


module.exports = {
    get_rfc_metadata: function (req, res, my_cache) {

        var topic = "Do you think Tensor Processing Units (TPUs) will totally replace GPUs for deep learning?"
        var description = "Deep learning requires GPUs to achieve good results in a reasonable amount of time on many problems.  Presently, it seems unclear whether or not specialized hardware will provide an advantage for general cases.  Google has created the TPU.  Either it or something like it will eventually be available on the market.  At that time, will these eventually sunset GPUs for use in deep learning?"
        var deadline = new Date('2017,03,01, 07, 00, 00')
        // var rfc = {topic, description, deadline}

        fetchCurrentRFC()
            .then((rfc) => {
                return res.status(200).end(JSON.stringify(rfc))
            })
            .catch((err) => {
                return res.status(500).end(JSON.stringify(err));
            })
    }
};