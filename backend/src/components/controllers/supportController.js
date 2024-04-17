import Support from '../../models/Support.js';

const supportController = {
  sendForm: async (req, res) => {
    try {
      const { topic, content, userId } = req.body;
      let { images } = req.body;

      images = images.map((name) => `/static/support/${name}`);
      const message = {
        userId,
        topic,
        content,
        images,
      };
      const newMessage = new Support(message);
      const saveMessage = await newMessage.save();

      res.status(201).json({ message: 'message created', content: saveMessage });
    } catch (error) {
      res.status(500).json({ message: 'server error', error });
    }
  },
};

export default supportController;
