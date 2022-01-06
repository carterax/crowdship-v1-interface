import formidable from 'formidable-serverless';
import { ipfs } from '@/lib/infura/ipfs';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async function (err, fields, file) {
    if (err) return res.status(400).json({ message: err });

    const campaignPreview = file.campaignPreview;
    const isLt2M = campaignPreview.size / 1024 / 1024 < 2;
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const data = fs.readFileSync(campaignPreview.path);

    if (!isLt2M) return res.status(400).send('file exceeds size limit');

    if (!acceptedTypes.includes(campaignPreview.type))
      return res
        .status(400)
        .send(`invalid file extension ${campaignPreview.type}`);

    const ipfsResonse = await ipfs.add({
      path: file.campaignPreview.name,
      content: data,
    });

    if (!ipfsResonse) return res.status(500).send('internal server error');

    return res.status(201).send(ipfsResonse.cid.toString());
  });
};

const upload = (req, res) => {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).send('');
};

export default upload;
