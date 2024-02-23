const StatusController = {
  ping: async (req, res) => {
    res.status(200).json({ message: 'server online' });
  },

  info: async (req, res) => {
    const currentDate = new Date();

    res.status(200).json({
      message: 'server online',
      serverTime: currentDate,
    });
  },

  clear: async (req, res) => {
    const { count } = req.params;
    const numberOfTimes = parseInt(count, 10);

    if (Number.isNaN(numberOfTimes)) {
      return res.status(400).send('Invalid count provided');
    }

    for (let i = 0; i < numberOfTimes; i += 1) {
      /* eslint-disable no-console */
      console.log('\\');
    }

    const currentDate = new Date().toLocaleString();

    /* eslint-disable no-console */
    console.log(`Current date: ${currentDate}`);

    res.send(
      `Message printed to console ${numberOfTimes} times. Current date: ${currentDate}`,
    );
  },
};

export default StatusController;
